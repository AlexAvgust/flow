import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
import { ScheduleService } from './schedule.service';
import { JWTGuard } from '../auth/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserType } from 'src/models/User';
import { UserJWTPayload } from 'src/types/UserJWTPayload';

@Controller('schedule')
@UseGuards(JWTGuard)
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('by-date')
  async getScheduleByRangeOfDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string = moment().format('YYYY-MM-DD'),
    @User() user: UserJWTPayload,
  ) {
    const { userId: id } = user;
    console.log('idStr', user);
    const data = await this.scheduleService.getScheduleByRangeOfDate(
      startDate,
      endDate,
      id,
    );
    return data;
  }
}
