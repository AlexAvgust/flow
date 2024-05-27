import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Schedule } from 'src/models/Schedule';
import { Task } from 'src/models/Task';
import { UserService } from 'src/modules/user/user.service';
import { compareDates, getDateWithoutTime } from './utils/scheduleUtils';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async addTaskToSchedule(task: Task, userEmail: string) {
    const { taskStartDate, user } = task;
    const scheduleDate = getDateWithoutTime(taskStartDate);
    const schedule = await this.scheduleModel.findOne({
      date: scheduleDate,
      user: user,
    });
    if (schedule) {
      schedule.tasks.push(task._id);
      await schedule.save();
    } else {
      const newSchedule = new this.scheduleModel({
        _id: new mongoose.Types.ObjectId(),
        date: scheduleDate,
        user: new mongoose.Types.ObjectId(user._id),
        tasks: [task._id],
      });
      await newSchedule.save();
      await this.userService.addScheduleToUser(newSchedule, userEmail);
    }
  }

  async getScheduleByRangeOfDate(
    startDate: string,
    endDate: string,
    id: string,
  ) {
    const { startDate: startDateWithoutTime, endDate: endDateWithoutTime } =
      compareDates(startDate, endDate);
    const data = await this.scheduleModel
      .find({
        date: {
          $gte: startDateWithoutTime,
          $lte: endDateWithoutTime,
        },
        user: {
          $eq: new mongoose.Types.ObjectId(id),
        },
      })
      .populate({ path: 'tasks', model: Task.name });
    console.log('\n');
    console.log('startDate', startDateWithoutTime);
    console.log('endDate', endDateWithoutTime);
    console.log('data:', JSON.stringify(data));
    return data;
  }

  private async findOneScheduleByTaskIdAndUserId(
    taskId: string,
    userId: string,
  ) {
    return await this.scheduleModel.findOne({
      tasks: {
        $eq: new mongoose.Types.ObjectId(taskId),
      },
      user: {
        $eq: new mongoose.Types.ObjectId(userId),
      },
    });
  }

  async removeTaskFromSchedule(taskId: string, userId: string) {
    const schedule = await this.findOneScheduleByTaskIdAndUserId(
      taskId.toString(),
      userId.toString(),
    );

    if (schedule) {
      schedule.tasks.filter(
        (task) => task._id !== new mongoose.Types.ObjectId(taskId),
      );
      await schedule.save();
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
