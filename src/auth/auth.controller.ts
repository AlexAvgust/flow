import { Controller, UseGuards, Req, Get, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Render('index')
  googleAuthRedirect(@Req() req) {
    console.log('redirect controller');
    const userData = this.authService.googleLogin(req);
    console.log('userData', userData);
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    return {
      link: `exp://192.168.1.109:8081?user=${encodedUserData}`,
    };
  }
}
