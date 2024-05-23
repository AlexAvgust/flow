import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/models/Task';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserService } from 'src/modules/user/user.service';
import { User, UserSchema } from 'src/models/User';
import { ScheduleService } from 'src/modules/schedule/schedule.service';
import { Schedule, ScheduleSchema } from 'src/models/Schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UserService, ScheduleService],
  exports: [TaskService],
})
export class TaskModule {}
