import { AggregateRoot } from '../../shared/domain/aggregate.root';

export interface AuthenticationPrimitives {
  id: string;
  payload: Record<string, string>;
}

export class AuthenticationEntity extends AggregateRoot<AuthenticationPrimitives> {
  constructor(
    public readonly id: string,
    public readonly payload: Record<string, string>
  ) {
    super(id);
  }
  static fromPrimitives(
    primitives: AuthenticationPrimitives
  ): AuthenticationEntity {
    return new AuthenticationEntity(primitives.id, primitives.payload);
  }
}
