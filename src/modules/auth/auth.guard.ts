import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = this.authService.validateToken(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new ForbiddenException('session expired');
    }
  }
}
