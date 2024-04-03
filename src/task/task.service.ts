import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/taskDto';
import { Task } from 'src/models/Task';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private userService: UserService,
  ) {}

  async addTask(createTaskDto: CreateTaskDto): Promise<void> {
    const task = {
      ...createTaskDto,
      _id: new mongoose.Types.ObjectId(),
    };
    const createdTask = await this.taskModel.create(task);
    const user = await this.userService.getUserFromByEmailDB(
      createTaskDto.user.email,
    );

    user.tasks.push(createdTask);
    await user.save();
  }

  async getTaskByDate(date: Date): Promise<Task> {
    return await this.taskModel.findOne({
      taskStartDate: date,
    });
  }
}
