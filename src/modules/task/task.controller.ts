import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/taskDto';
import { TaskService } from './task.service';
import { JWTGuard } from '../auth/auth.guard';

@Controller('task')
@UseGuards(JWTGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  addTask(@Body() task: CreateTaskDto) {
    return this.taskService.addTask(task);
  }

  @Get('user/:id')
  getTaskNamesByUser(@Param('id') id: string) {
    return this.taskService.getTaskNamesByUser(id);
  }
}
