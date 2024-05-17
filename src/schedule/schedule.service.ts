import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from 'src/models/Schedule';
import mongoose, { Model } from 'mongoose';
import { Task } from 'src/models/Task';
import { getDateWithoutTime } from './utils/scheduleUtils';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
    private userService: UserService,
  ) {}

  async getScheduleByDate(dateStr: string, id: string) {
    const scheduleDate = getDateWithoutTime(dateStr);
    const data = await this.scheduleModel.findOne({
      date: {
        $eq: scheduleDate,
      },
      user: {
        $eq: new mongoose.Types.ObjectId(id),
      },
    });

    return data;
  }

  async addTaskToSchedule(task: Task, userEmail: string) {
    const { taskStartDate, user } = task;
    const scheduleDate = getDateWithoutTime(taskStartDate);
    const schedule = await this.scheduleModel.findOne({
      date: scheduleDate,
      user: user,
    });
    if (schedule) {
      //TODO update schedule in user model
      schedule.tasks.push(task);
      await schedule.save();
      await this.userService.updateScheduleInUser(schedule, userEmail);
    } else {
      //TODO create new schedule in user model
      const newSchedule = new this.scheduleModel({
        _id: new mongoose.Types.ObjectId(),
        date: scheduleDate,
        user: user,
        tasks: [task],
      });
      await newSchedule.save();
      await this.userService.addScheduleToUser(newSchedule, userEmail);
      return newSchedule;
    }
  }

  async getSchedulesByUserId(id: string) {
    const data = await this.scheduleModel.find({
      user: {
        $eq: new mongoose.Types.ObjectId(id),
      },
    });
    return data;
  }
}
