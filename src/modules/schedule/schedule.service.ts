import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from 'src/models/Schedule';
import mongoose, { Model } from 'mongoose';
import { Task } from 'src/models/Task';
import { compareDates, getDateWithoutTime } from './utils/scheduleUtils';
import { UserService } from 'src/modules/user/user.service';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
    private userService: UserService,
  ) {}

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
    }
  }

  async getScheduleByRangeOfDate(
    startDate: string,
    endDate: string,
    id: string,
  ) {
    const { startDate: startDateWithoutTime, endDate: endDateWithoutTime } =
      compareDates(startDate, endDate);
    const data = await this.scheduleModel.find({
      date: {
        $gte: startDateWithoutTime,
        $lte: endDateWithoutTime,
      },
      user: {
        $eq: new mongoose.Types.ObjectId(id),
      },
    });
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    console.log('id', id);

    console.log('result', JSON.stringify(data));
    return data;
  }
}
