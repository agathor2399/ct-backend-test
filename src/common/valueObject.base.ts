type Primitives = string | boolean | number;

interface IDomainPrimitive<T extends Primitives | Date> {
  value: T;
}

type ValueObjectProps<T> = T extends Primitives | Date ? IDomainPrimitive<T> : T;

export abstract class ValueObject<T, O = T> {
  protected props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }

  static isValueObject(value: unknown): value is ValueObject<unknown> {
    return value instanceof ValueObject;
  }

  protected abstract validate(props: ValueObjectProps<T>): void;
}
