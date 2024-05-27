import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from 'src/models/Schedule';
import { Task, TaskSchema } from 'src/models/Task';
import { User, UserSchema } from 'src/models/User';
import { TaskService } from 'src/modules/task/task.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from '../auth/auth.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleGateway } from './schedule.gateway';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    TaskService,
    UserService,
    AuthService,
    ScheduleGateway,
  ],
  exports: [ScheduleService],
})
export class ScheduleModule {}
