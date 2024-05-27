import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User } from '../models/User';
import { PriorityNum, allowedNumsValues } from '../types/taskTypes';
import mongoose from 'mongoose';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;
  @IsDate()
  taskStartDate: string;
  @IsInt()
  taskDuration: number;
  @IsIn(allowedNumsValues)
  priorityEnum: PriorityNum;
  @IsString()
  description: string;
  @IsBoolean()
  isRepeating: boolean;
  tags?: string[];
  user: User;
}

export class UpdateTaskDto extends CreateTaskDto {
  _id: mongoose.Types.ObjectId;
}
