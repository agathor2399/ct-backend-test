import { ICTSearchRepository } from '@/application/ports/ctSearchRespository-port';
import { CTSearch } from '@/domain/entities/ctSearch';
export class CTSearchMongooseRepository implements ICTSearchRepository {
  async save(ctSearch: CTSearch): Promise<void> {
    // Mongoose query here
  }
}
