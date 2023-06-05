import { Entity } from '@/common/entity.base';
import { ID } from '@/common/valueObjects/id-vo';
import { InputTrain, Train } from '../valueObjects/train-vo';
import { InputPrice, Price } from '../valueObjects/price-vo';

export interface ICTSearch {
  parameters: any;
  train: Train;
  price: Price;
}

type InputCTSearch = {
  parameters: any;
  train: InputTrain;
  price: InputPrice;
};

export class CTSearch extends Entity<ICTSearch> {
  get value(): InputCTSearch {
    return {
      ...this.props.parameters,
      ...this.props.train.value,
      ...this.props.price.value,
    };
  }

  constructor(props: InputCTSearch, id?: ID) {
    const { parameters, train, price } = props;
    super({ parameters, train: new Train(train), price: new Price(price) }, id);
  }
}
