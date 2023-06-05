import { Inject, Injectable } from '@nestjs/common';
import { SaveCTSearchUseCase } from './application/useCases/saveCTSearch-useCase';
import { SaveCTSearch } from './interface/dtos/saveCTSearch-dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('SaveCTSearchUseCase') private readonly saveCTSearchUseCase: SaveCTSearchUseCase,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async saveCTSearch(data: SaveCTSearch) {
    return await this.saveCTSearchUseCase.execute(data);
  }
}
