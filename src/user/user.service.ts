import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/User';
import { createUserDto } from '../dto/userDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  addUser(newUser: createUserDto) {
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }
  getUserFromDB(email: string) {
    return this.userModel.find({ email });
  }
}
