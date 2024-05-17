import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/taskDto';
import { TaskService } from './task.service';

@Controller('task')
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
