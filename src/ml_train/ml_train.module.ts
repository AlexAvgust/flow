import { Module } from '@nestjs/common';
import { MlTrainController } from './ml_train.controller';
import { MlTrainService } from './ml_train.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [MlTrainController],
  providers: [MlTrainService],
})
export class MlTrainModule {}
