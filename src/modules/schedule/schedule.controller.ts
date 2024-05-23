import { Controller, Get, Query } from '@nestjs/common';
import * as moment from 'moment';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('by-date')
  async getScheduleByRangeOfDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string = moment().format('YYYY-MM-DD'),
    @Query('userId') id: string,
  ) {
    const data = await this.scheduleService.getScheduleByRangeOfDate(
      startDate,
      endDate,
      id,
    );
    return data;
  }
}
