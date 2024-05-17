import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/User';
import { createUserDto } from '../dto/userDto';
import { Schedule } from 'src/models/Schedule';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async addUser(newUser: createUserDto) {
    const createdUser = new this.userModel(newUser);
    return await createdUser.save();
  }

  async getUserFromByEmailDB(email: string) {
    return await this.userModel.findOne({ email });
  }

  async addScheduleToUser(schedule: Schedule, userEmail: string) {
    const user = await this.getUserFromByEmailDB(userEmail);
    console.log('user', JSON.stringify(user));
    user.schedules.push(schedule);
    await user.save();
  }

  async updateScheduleInUser(schedule: Schedule, userEmail: string) {
    const user = await this.getUserFromByEmailDB(userEmail);
    console.log('user', JSON.stringify(user));

    const indexOfScheduleThatShouldUpdate = user.schedules.findIndex(
      (elem) => elem._id === schedule._id,
    );
    user.schedules[indexOfScheduleThatShouldUpdate] = schedule;
    await user.save();
  }
}
