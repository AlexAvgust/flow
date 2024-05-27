import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserDocument } from 'src/models/User';
import { UserService } from './user.service';
import { JWTGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(JWTGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUserByEmail(@Query('email') email: string): Promise<UserDocument> {
    console.warn(await this.userService.getUserFromByEmailDB(email));
    return await this.userService.getUserFromByEmailDB(email);
  }
}
