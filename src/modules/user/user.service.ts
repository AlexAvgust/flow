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

  async getUserById(id: string) {
    return await this.userModel.findOne({
      _id: { $eq: new mongoose.Types.ObjectId(id) },
    });
  }

  async addScheduleToUser(schedule: Schedule, userId: string) {
    const user = await this.getUserById(userId);
    user.schedules.push(schedule._id);
    await user.save();
  }
}
