import { Injectable } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';
// import {} from '@tensorflow/tfjs-node';
@Injectable()
export class MlTrainService {
  constructor(private taskService: TaskService) {}

  generateDummyData() {
    for (let i = 0; i < 1000; i++) {
      // this.taskService.addDummyTask();
    }
  }
}
