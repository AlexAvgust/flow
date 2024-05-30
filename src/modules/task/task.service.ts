import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/taskDto';
import { Task } from 'src/models/Task';
import { ScheduleService } from 'src/modules/schedule/schedule.service';
import { UserJWTPayload } from 'src/types/UserJWTPayload';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private scheduleService: ScheduleService,
  ) {}

  async addTask(createTaskDto: CreateTaskDto, user: UserJWTPayload) {
    const task = {
      ...createTaskDto,
      user: new mongoose.Types.ObjectId(user.userId),
      taskAddedBy: 'User',
      _id: new mongoose.Types.ObjectId(),
    };
    const createdTask = await this.taskModel.create(task);

    await this.scheduleService.addTaskToSchedule(createdTask, user.email);

    return createdTask;
  }

  async getTaskNamesByUser(id: string) {
    const tasks = await this.taskModel.find({
      user: new mongoose.Types.ObjectId(id),
    });
    return tasks.map((task) => task.name);
  }

  async updateTask(task: UpdateTaskDto) {
    try {
      const { _id, ...updateData } = task;
      const result = await this.taskModel.updateOne(
        { _id: new mongoose.Types.ObjectId(_id) },
        { $set: updateData },
      );

      if (result.modifiedCount === 0) {
        throw new NotFoundException(`Task with id ${_id} not found`);
      }

      return result;
    } catch (err) {
      console.error(err);
      throw new NotFoundException('Task not found or could not be updated');
    }
  }

  async deleteTaskById(id: string, userId: string) {
    try {
      await this.taskModel.deleteOne({
        _id: {
          $eq: new mongoose.Types.ObjectId(id),
        },
      });
      await this.scheduleService.removeTaskFromSchedule(id, userId);
      return null;
    } catch (err) {
      console.error(err);
      throw new NotFoundException(err);
    }
  }
}
