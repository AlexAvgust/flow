import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/models/Task';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/models/User';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
