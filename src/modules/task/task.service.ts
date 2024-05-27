import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/taskDto';
import { Task } from 'src/models/Task';
import { ScheduleService } from 'src/modules/schedule/schedule.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private scheduleService: ScheduleService,
  ) {}

  async addTask(createTaskDto: CreateTaskDto) {
    const task = {
      ...createTaskDto,
      _id: new mongoose.Types.ObjectId(),
    };
    const createdTask = await this.taskModel.create(task);

    await this.scheduleService.addTaskToSchedule(
      createdTask,
      createTaskDto.user.email,
    );

    return createdTask;
  }

  async getTaskNamesByUser(id: string) {
    const tasks = await this.taskModel.find({ user: id });
    return tasks.map((task) => task.name);
  }

  async deleteTaskById(id: string, @Req() userId: string) {
    await this.taskModel.deleteOne({ _id: id });
    await this.scheduleService.removeTaskFromSchedule(id, userId);
    return null;
  }

  async updateTask(task: UpdateTaskDto) {
    return await this.taskModel.updateOne({ _id: task._id }, task);
  }
}
