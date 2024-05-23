import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import moment from 'moment';
import { Server, Socket } from 'socket.io';
import { ScheduleService } from './schedule.service';
import { ReqDataScheduleDTO } from 'src/dto/scheduleDto';

@WebSocketGateway()
export class ScheduleGateway {
  constructor(private readonly scheduleService: ScheduleService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('getScheduleByRangeOfDate')
  async handleGetScheduleByRangeOfDate(
    @MessageBody() data: ReqDataScheduleDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const { startDate, endDate = moment().format('YYYY-MM-DD'), userId } = data;

    try {
      const schedule = await this.scheduleService.getScheduleByRangeOfDate(
        startDate,
        endDate,
        userId,
      );
      client.emit('scheduleByRangeOfDate', schedule);
    } catch (error) {
      client.emit('error', {
        message: 'An error occurred while fetching the schedule.',
        error,
      });
    }
  }
}
