import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, OUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: IUser) {
    const hash_password = await bcrypt.hash(user.password, 10);
    return this.userService.createUser({ ...user, password: hash_password });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<OUser[]> {
    return this.userService.findAll();
  }

  @Get()
  async findOneByUsername(@Body() username: string): Promise<OUser | string> {
    return this.userService.findOneByUsername(username);
  }

  @Get()
  async findOneByEmail(@Body() email: string): Promise<OUser | string> {
    return this.userService.findOneByEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParams: IUser,
  ): Promise<string> {
    await this.userService.update(id, updateParams);
    return 'user updated';
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    await this.userService.deleteUser(id);
    return 'user deleted';
  }
}
