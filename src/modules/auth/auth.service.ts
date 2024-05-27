import { Injectable, NotFoundException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import { User } from 'src/models/User';
import { UserService } from 'src/modules/user/user.service';
import { UserJWTPayload } from 'src/types/UserJWTPayload';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private readonly secret = process.env.JWT_SECRET;
  private readonly expiresIn = process.env.JWT_EXPIRES_IN;

  private generateJWT(user: User) {
    const payload = { userId: user._id, email: user.email };

    const options = { expiresIn: this.expiresIn };

    return jwt.sign(payload, this.secret, options);
  }

  async googleLogin(req: any) {
    if (!req?.user) {
      throw new NotFoundException('no user info ');
    }
    const { email, name: nameObj, picture } = req.user;
    const userInDB = await this.userService.getUserFromByEmailDB(email);
    if (!userInDB) {
      const addedUser = await this.userService.addUser({
        email,
        name: `${nameObj.givenName} ${nameObj.familyName}`,
        profilePicture: picture,
      });
      const token = this.generateJWT(addedUser);
      return { user: addedUser, token };
    }
    const token = this.generateJWT(userInDB);
    return { user: userInDB, token };
  }

  validateToken(token: string): UserJWTPayload {
    return jwt.verify(token, this.secret);
  }

  encode(token: string): UserJWTPayload {
    return jwt.encode(token, this.secret);
  }
}
