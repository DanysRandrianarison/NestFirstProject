import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ICat, OCat } from './cats.interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCat: ICat) {
    try {
      await this.catsService.create(createCat);
    } catch (error) {
      throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async getAllCat(): Promise<OCat[]> {
    return this.catsService.findAll();
  }
}
