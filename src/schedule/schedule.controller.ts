import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('by-date')
  async getScheduleByDate(
    @Query('date') dateStr: string,
    @Query('userId') id: string,
  ) {
    console.log(id);
    const data = await this.scheduleService.getScheduleByDate(dateStr, id);
    console.log('data in getScheduleByDate', JSON.stringify(data));
    return data;
  }
}
