import {
  Length,
  IS_ENUM,
  IsNotEmpty,
  IsDate,
  IsInt,
  IsString,
  IsEnum,
} from 'class-validator';
import { User } from '../models/User';
import { PriorityEnum } from '../types/taskTypes';

export class CreateTaskDto {
  @Length(8)
  @IsNotEmpty()
  name: string;
  @IsDate()
  taskStartDate: string;
  @IsInt()
  taskDuration: number;
  @IsString()
  difficulty: string;
  @IsEnum(PriorityEnum)
  priorityEnum: PriorityEnum;
  @IsString()
  description: string;
  tags?: string[];
  user: User;
}
