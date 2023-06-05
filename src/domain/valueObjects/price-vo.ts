import { ValueObject } from '@/common/valueObject.base';

interface IPrice {
  total: number;
  breakdown: {
    adult: number;
    children: number;
  };
}

export type InputPrice = {
  total: number;
  breakdown: {
    adult: number;
    children: number;
  };
};

export class Price extends ValueObject<IPrice> {
  get value() {
    return { ...this.props };
  }

  protected validate(props: IPrice): void {
    if (!Number.isInteger(props.total)) {
      throw new Error(`Invalid "Total" value: ${props.total}`);
    }

    if (!Number.isInteger(props.breakdown?.adult)) {
      throw new Error(`Invalid "Total adults" value: ${props.breakdown?.adult}`);
    }

    if (!Number.isInteger(props.breakdown?.children)) {
      throw new Error(`Invalid "Total childrens" value: ${props.breakdown?.children}`);
    }
  }
}
