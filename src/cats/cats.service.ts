import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from './cats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private userRepository: Repository<Cats>,
  ) {}

  findAll(): Promise<Cats[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<Cats | null> {
    return this.userRepository.findOneBy({ id });
  }
}
