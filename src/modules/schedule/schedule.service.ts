import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Schedule } from 'src/models/Schedule';
import { Task } from 'src/models/Task';
import { UserService } from 'src/modules/user/user.service';
import { compareDates, getDateWithoutTime } from './utils/scheduleUtils';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
    private readonly userService: UserService,
  ) {}

  async addTaskToSchedule(task: Task) {
    const {
      taskStartDate,
      user: { _id: userId },
      _id: taskId,
    } = task;
    const scheduleDate = getDateWithoutTime(taskStartDate);
    const schedule = await this.scheduleModel.findOne({
      date: scheduleDate,
      user: userId,
    });
    if (schedule) {
      schedule.tasks.push(taskId);
      await schedule.save();
    } else {
      const newSchedule = new this.scheduleModel({
        _id: new mongoose.Types.ObjectId(),
        date: scheduleDate,
        user: new mongoose.Types.ObjectId(userId),
        tasks: [taskId],
      });
      await newSchedule.save();
      await this.userService.addScheduleToUser(newSchedule, userId.toString());
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
      schedule.tasks = schedule.tasks.filter(
        (taskIdInSchedule) => taskIdInSchedule.toString() !== taskId,
      );
      await schedule.save();
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
