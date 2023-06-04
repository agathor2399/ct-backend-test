import { ID } from './valueObjects/id-vo';

export abstract class Entity<T, O = T> {
  private readonly _id: ID;
  public readonly props: T;

  constructor(props: T, id?: ID) {
    this._id = id ? id : ID.generate();
    this.props = props;
  }

  get id(): ID {
    return this._id;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }
}
