import { Body, Controller } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/taskDto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  addTask(@Body() task: CreateTaskDto) {
    this.taskService.addTask(task);
  }
}
