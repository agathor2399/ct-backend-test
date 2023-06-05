import { SaveCTSearch } from '@/interface/dtos/saveCTSearch-dto';
import { ICTSearchRepository } from '../ports/ctSearchRespository-port';
import { CTSearch } from '@/domain/entities/ctSearch';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SaveCTSearchUseCase {
  constructor(
    @Inject('CTSearchRepository') private readonly ctSearchRepository: ICTSearchRepository,
  ) {}

  async execute(data: SaveCTSearch) {
    const ctSearch = new CTSearch(data);
    await this.ctSearchRepository.save(ctSearch);
  }
}
