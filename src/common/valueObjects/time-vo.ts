import { ValueObject } from '../valueObject.base';

export class Time extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate();
  }

  static isValidTime(value: string): boolean {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(value);
  }

  protected validate(): void {
    if (!Time.isValidTime(this.props.value)) {
      throw new Error(`Invalid Time format ${this.props.value}`);
    }
  }
}
