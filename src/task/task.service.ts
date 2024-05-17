import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/taskDto';
import { Task } from 'src/models/Task';
import { ScheduleService } from 'src/schedule/schedule.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private scheduleService: ScheduleService,
  ) {}

  async addTask(createTaskDto: CreateTaskDto): Promise<void> {
    const task = {
      ...createTaskDto,
      _id: new mongoose.Types.ObjectId(),
    };
    const createdTask = await this.taskModel.create(task);

    await this.scheduleService.addTaskToSchedule(
      createdTask,
      createTaskDto.user.email,
    );
  }

  async getTaskNamesByUser(id: string) {
    const tasks = await this.taskModel.find({ user: id });
    return tasks.map((task) => task.name);
  }
}
