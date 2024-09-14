/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregatePrimitives, AggregateRoot } from "./aggregate.root";

export interface CrudRepository<T extends AggregateRoot<AggregatePrimitives>> {
  findAll(query?: Record<string, any>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findOne(query: Record<string, any>): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
