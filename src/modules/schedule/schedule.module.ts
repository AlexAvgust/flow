import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from 'src/models/Schedule';
import { ScheduleController } from './schedule.controller';
import { TaskService } from 'src/modules/task/task.service';
import { UserService } from 'src/modules/user/user.service';
import { ScheduleService } from './schedule.service';
import { Task, TaskSchema } from 'src/models/Task';
import { User, UserSchema } from 'src/models/User';
import { ScheduleGateway } from './schedule.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, TaskService, UserService, ScheduleGateway],
  exports: [ScheduleService],
})
export class ScheduleModule {}
