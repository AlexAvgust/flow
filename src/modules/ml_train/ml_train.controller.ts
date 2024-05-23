import { Controller, Get } from '@nestjs/common';
import { MlTrainService } from './ml_train.service';

@Controller('ml-train')
export class MlTrainController {
  constructor(private readonly mlTrainService: MlTrainService) {}

  @Get('generate-dummy-data')
  generateDummyData() {
    return this.mlTrainService.generateDummyData();
  }
}
