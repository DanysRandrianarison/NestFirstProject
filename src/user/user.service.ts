import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IUser, OUser } from './user.interface';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userCreateParams: IUser): Promise<User> {
  
    const user = await this.userRepository.create(userCreateParams);
    return this.userRepository.save(user);
  }

  findAll(): Promise<OUser[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<OUser | string> {
    return this.userRepository.findOneBy({ id });
  }
  findOneByEmail(email: string): Promise<OUser | string> {
    return this.userRepository.findOneBy({ email });
  }
  findOneByUsername(username: string): Promise<IUser> {
    return this.userRepository.findOneBy({ username });
  }
  async update(id: string, updateParams: IUser): Promise<void> {
    await this.userRepository.update(id, updateParams);
  }
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async validateUser(username:string,password:string) {
    const user = await this.findOneByUsername(username)
    const valid_password = bcrypt.compare(user.password,password)
    if(!user) {
      throw new UnauthorizedException("User not found")
    }
    if(!valid_password) {
      throw new UnauthorizedException("Wrong password")
    }
    return user
  }
}
