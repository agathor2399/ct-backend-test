import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Search } from './interface/dtos/search-dto';
import { SaveCTSearch } from './interface/dtos/saveCTSearch-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  search(@Body() data: Search): string {
    return this.appService.getHello();
  }

  @Post()
  save(@Body() data: SaveCTSearch): string {
    return this.appService.getHello();
  }
}
