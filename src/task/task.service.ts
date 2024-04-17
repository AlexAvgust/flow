import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/taskDto';
import { Task } from 'src/models/Task';
import { UserService } from 'src/user/user.service';
import { ScheduleService } from 'src/schedule/schedule.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private userService: UserService,
    private scheduleService: ScheduleService,
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

    const schedule = await this.scheduleService.addTaskToSchedule(createdTask);
    user.schedules.push(schedule);
    await user.save();
  }

  // addDummyTask() {
  //   const { taskEndInMilliseconds, taskStartInMilliseconds } =
  //     generateRandomMilliseconds();
  //   const name = getRandomTaskName();

  //   const isRepeating = Math.random() > 0.5 ? true : false;
  //   const priority = Math.floor(Math.random() * 5);
  //   const task = {
  //     _id: new mongoose.Types.ObjectId(),
  //     name,
  //     taskStartDate: generateRandomDate(),
  //     taskDuration: taskEndInMilliseconds - taskStartInMilliseconds,
  //     priority,
  //     description: `Do ${name} for ${taskEndInMilliseconds - taskStartInMilliseconds}, priority ${priority}, task ${isRepeating ? 'repeats in future' : 'not repeats in future'}`,
  //     isRepeating,
  //   };

  //   this.taskModel.create(task);
  // }
}
