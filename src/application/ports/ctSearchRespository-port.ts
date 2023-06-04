import { CTSearch } from '@/domain/entities/ctSearch';

export interface ICTSearchRepository {
  save(ctSearch: CTSearch): Promise<void>;
}
