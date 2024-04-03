import {
  Length,
  IsIn,
  IsNotEmpty,
  IsDate,
  IsInt,
  IsString,
} from 'class-validator';
import { User } from '../models/User';
import { PriorityNum, allowedNumsValues } from '../types/taskTypes';

export class CreateTaskDto {
  @Length(8)
  @IsNotEmpty()
  name: string;
  @IsDate()
  taskStartDate: string;
  @IsInt()
  taskStartInMilliseconds: number;
  @IsInt()
  taskEndInMilliseconds: number;
  @IsIn(allowedNumsValues)
  priorityEnum: PriorityNum;
  @IsString()
  description: string;
  tags?: string[];
  user: User;
}
