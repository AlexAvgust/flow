import { Controller, UseGuards, Req, Get, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    console.log('redirect controller');
    return this.authService.googleLogin(req);
  }
}
