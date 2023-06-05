import { ValueObject } from '../valueObject.base';

export class DateVO extends ValueObject<Date> {
  get value(): Date {
    return this.props.value;
  }

  constructor(value: Date | number | string) {
    super({ value: new Date(value) });
    this.validate();
  }

  static isValidDate(value: Date): value is Date {
    return value instanceof Date;
  }

  protected validate(): void {
    if (!DateVO.isValidDate(this.props.value)) {
      throw new Error(`Invalid Date format ${this.props.value}`);
    }
  }
}
