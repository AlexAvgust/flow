import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/User';
import { createUserDto } from '../dto/userDto';

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
}
