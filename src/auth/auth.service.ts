import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService
  ) {}
  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async login(user:User) {
    const payload = {username: user.username, sub:user.id}
    return {
        access_token : this.jwtService.sign(payload)
    }
  }


  async validateUser(payload:any):Promise<User> {
    return this.userService.findOneByUsername(payload.username)
  }
//   verifyPassword(password, hash_password) {
//     return bcrypt.compareSync(password, hash_password);
//   }

//   createAccessToken(user: User) {
//     if (user) {
//       const payload = {
//         sub: user.id,
//         username: user.username,
//         email: user.email,
//       };
//       return this.jwtService.signAsync(payload);
//     }
//   }
//   // async signIn(username:string,password:string):Promise<{access_token:string}> {
  //        const user = await this.userService.findOneByUsername(username);

  //        if(!user || user?.password !== password) {
  //            throw new UnauthorizedException
  //        }

  // }

//   createRefreshToken(user: IUser) {
//     if (user) {
//       const payload = {
//         sub: user.id,
//         username: user.username,
//         email: user.email,
//       };
//       return this.jwtService.sign(payload);
//     }
//   }
}
