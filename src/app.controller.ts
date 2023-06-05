import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Search } from './interface/dtos/search-dto';
import { SaveCTSearch } from './interface/dtos/saveCTSearch-dto';
import { Response } from 'express';

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

  @Post('ct-search/save')
  async save(@Body() data: SaveCTSearch, @Res() res: Response): Promise<any> {
    try {
      await this.appService.saveCTSearch(data);
      return res.status(201).send();
    } catch (e) {
      return res.status(400).json({
        message: e.message || 'Unexpected error',
      });
    }
  }
}
