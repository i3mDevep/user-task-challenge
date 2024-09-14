export interface AggregatePrimitives {
  id: string;
}

export abstract class AggregateRoot<TPrimitives extends AggregatePrimitives> {
  constructor(public readonly id: string) {}

  toPrimitives<T>(custom?: (p: TPrimitives) => T): TPrimitives | T {
    const defaultPrimitives: TPrimitives = {
      id: this.id,
    } as TPrimitives;
    return custom?.(defaultPrimitives) ?? defaultPrimitives;
  }
}
