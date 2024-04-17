import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MlTrainModule } from './ml_train/ml_train.module';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      autoIndex: true,
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
    AuthModule,
    UserModule,
    TaskModule,
    MlTrainModule,
    ScheduleModule,
  ],
  controllers: [AppController, ScheduleController],
  providers: [AppService],
  exports: [UserModule, TaskModule, ScheduleModule],
})
export class AppModule {}
