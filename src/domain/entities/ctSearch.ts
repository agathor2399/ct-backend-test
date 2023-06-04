import { Entity } from '@/common/entity.base';
import { ID } from '@/common/valueObjects/id-vo';
import { Train } from '../valueObjects/train-vo';
import { Price } from '../valueObjects/price-vo';

export interface ICTSearch {
  parameters: any;
  train: Train;
  price: Price;
}

export class CTSearch extends Entity<ICTSearch> {
  constructor(props: ICTSearch, id?: ID) {
    super(props, id);
  }
}
