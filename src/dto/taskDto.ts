import {
  IsBoolean,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { PriorityNum, allowedNumsValues } from '../types/taskTypes';

export class CreateTaskDto {
  @IsString()
  taskStartTime: string;
  @IsString()
  taskEndTime: string;
  @IsString()
  taskAddedBy: string;
  @IsNotEmpty()
  name: string;
  @IsString()
  taskStartDate: string;
  @IsInt()
  taskDuration: number;
  @IsIn(allowedNumsValues)
  priority: PriorityNum;
  @IsString()
  description: string;
  @IsBoolean()
  isRepeating: boolean;
  tags?: string[];
  @IsNotEmpty()
  user: string;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsMongoId()
  _id: mongoose.Types.ObjectId;
}
