import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../../models/User';
import { createUserDto } from '../../dto/userDto';
import { Schedule } from 'src/models/Schedule';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async addUser(newUser: createUserDto) {
    const createdUser = new this.userModel(newUser);
    createdUser._id = new mongoose.Types.ObjectId();
    return await createdUser.save();
  }

  async getUserFromByEmailDB(email: string) {
    return await this.userModel.findOne({ email });
  }

  async addScheduleToUser(schedule: Schedule, userEmail: string) {
    const user = await this.getUserFromByEmailDB(userEmail);
    console.log('user', JSON.stringify(user));
    user.schedules.push(schedule._id);
    await user.save();
  }
}
