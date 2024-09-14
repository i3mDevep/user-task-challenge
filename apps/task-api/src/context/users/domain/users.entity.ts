import { AggregateRoot } from '../../shared/domain/aggregate.root';

export interface UserPrimitives {
  id: string;
  username: string;
  email: string;
  password: string;
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserAggregateRoot extends AggregateRoot<UserPrimitives> {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly  roles?: string[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
    super(id);
  }

  static fromPrimitives(primitives: UserPrimitives): UserAggregateRoot {
    return new UserAggregateRoot(
      primitives.id,
      primitives.username,
      primitives.email,
      primitives.password,
      primitives.roles,
      primitives.createdAt,
      primitives.updatedAt
    );
  }

  toPrimitives<T>(custom?: (p: UserPrimitives) => T): UserPrimitives | T {
    const defaultPrimitives: UserPrimitives = {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return custom?.(defaultPrimitives) ?? defaultPrimitives;
  }
}
