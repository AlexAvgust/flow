import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from 'src/models/Schedule';
import mongoose, { Model } from 'mongoose';
import { Task } from 'src/models/Task';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}

  async getScheduleByDate(dateStr: string, id: string) {
    const isoDate = new Date(dateStr);
    const data = await this.scheduleModel.findOne({
      date: {
        $eq: isoDate.toISOString(),
      },
      user: {
        $eq: new mongoose.Types.ObjectId(id),
      },
    });

    return data;
  }

  async addTaskToSchedule(task: Task) {
    const { taskStartDate, user } = task;
    const schedule = await this.scheduleModel.findOne({
      date: taskStartDate,
      user: user,
    });

    if (schedule) {
      schedule.tasks.push(task);
      //TODO update schedules in user document
      await schedule.save();
      return schedule;
    } else {
      const newSchedule = new this.scheduleModel({
        _id: new mongoose.Types.ObjectId(),
        date: taskStartDate,
        user: user,
        tasks: [task],
      });
      await newSchedule.save();
      return newSchedule;
    }
  }
}
