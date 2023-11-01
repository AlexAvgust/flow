import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  googleLogin(req: any) {
    if (!req?.user) {
      return 'no user info ';
    }
    const { email, name: nameObj, picture } = req.user;
    const userInDB = this.userService.getUserFromDB(email);
    if (!userInDB) {
      this.userService.addUser({
        email,
        name: `${nameObj.givenName} ${nameObj.familyName}`,
        profilePicture: picture,
      });
    }
    return {
      message: 'user info from google',
      user: req.user,
    };
  }
}
