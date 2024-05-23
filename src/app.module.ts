import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MlTrainModule } from './modules/ml_train/ml_train.module';
import { ScheduleController } from './modules/schedule/schedule.controller';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ScheduleGateway } from './modules/schedule/schedule.gateway';

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
  providers: [AppService, ScheduleGateway],
  exports: [UserModule, TaskModule, ScheduleModule],
})
export class AppModule {}
