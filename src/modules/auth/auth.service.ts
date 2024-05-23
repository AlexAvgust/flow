import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async googleLogin(req: any) {
    if (!req?.user) {
      return 'no user info ';
    }
    const { email, name: nameObj, picture } = req.user;
    const userInDB = await this.userService.getUserFromByEmailDB(email);
    if (!userInDB) {
      const addedUser = await this.userService.addUser({
        email,
        name: `${nameObj.givenName} ${nameObj.familyName}`,
        profilePicture: picture,
      });

      return { user: addedUser };
    }
    return { user: userInDB };
  }
}
