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
  async googleAuthRedirect(@Req() req) {
    console.log('redirect controller');
    const userData = await this.authService.googleLogin(req);
    console.log('userData', userData);
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    return {
      link: `${process.env.EXPO_APP_LINK}user=${encodedUserData}`,
    };
  }
}
