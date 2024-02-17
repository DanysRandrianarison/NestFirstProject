import { Body, Controller,  Post } from '@nestjs/common';
import { IUser } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService:UserService,private authService:AuthService) {}
    
    @Post("login")
    async signIn(@Body("username") username:string, @Body("password") password:string ) {
          const user = await this.userService.validateUser(username,password);
          return this.authService.login(user)
          
    }
}
