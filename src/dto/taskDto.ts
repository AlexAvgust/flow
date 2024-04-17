import {
  Length,
  IsIn,
  IsNotEmpty,
  IsDate,
  IsInt,
  IsString,
  IsBoolean,
} from 'class-validator';
import { User } from '../models/User';
import { PriorityNum, allowedNumsValues } from '../types/taskTypes';

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
