import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/taskDto';
import { TaskService } from './task.service';
import { JWTGuard } from '../auth/auth.guard';
import { UserJWTPayload } from 'src/types/UserJWTPayload';
import { User } from 'src/decorators/user.decorator';

@Controller('task')
@UseGuards(JWTGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  addTask(
    @Body(ValidationPipe) task: CreateTaskDto,
    @User() user: UserJWTPayload,
  ) {
    return this.taskService.addTask(task, user);
  }

  @Get('user/:id')
  getTaskNamesByUser(@Param('id') id: string) {
    return this.taskService.getTaskNamesByUser(id);
  }

  @Put()
  async updateTask(@Body() task: UpdateTaskDto, @User() user: UserJWTPayload) {
    return this.taskService.updateTask(task, user);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string, @User() user: UserJWTPayload) {
    const { userId } = user;
    return this.taskService.deleteTaskById(id, userId);
  }
}
