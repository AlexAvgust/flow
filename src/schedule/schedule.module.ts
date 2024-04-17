import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from 'src/models/Schedule';
import { ScheduleController } from './schedule.controller';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { ScheduleService } from './schedule.service';
import { Task, TaskSchema } from 'src/models/Task';
import { User, UserSchema } from 'src/models/User';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, TaskService, UserService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
