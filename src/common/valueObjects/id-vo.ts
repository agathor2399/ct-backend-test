import { Types } from 'mongoose';
import { ValueObject } from '@common/valueObject.base';

export class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate();
  }

  static generate(): ID {
    return new ID(new Types.ObjectId().toString());
  }

  static isValidID(value: string): boolean {
    const regex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    return regex.test(value);
  }

  protected validate(): void {
    if (!ID.isValidID(this.props.value)) {
      throw new Error(`Invalid ID format ${this.props.value}`);
    }
  }
}
