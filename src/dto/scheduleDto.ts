import { IsString } from 'class-validator';

export class ReqDataScheduleDTO {
  @IsString()
  startDate: string;
  @IsString()
  endDate: string;
  @IsString()
  userId: string;
}
