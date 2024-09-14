import { AggregateRoot } from "../../shared/domain/aggregate.root";

export interface TaskPrimitives {
  id: string;
  title: string;
  description: string;
  user_id: string;
  status: string;
  created_at?: string;
}

export class TaskAggregateRoot extends AggregateRoot<TaskPrimitives>  {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly user_id: string,
    public readonly description: string,
    public readonly status: string,
    public created_at?: string
  ) {
    super(id);
  }

  static fromPrimitives(primitives: TaskPrimitives): TaskAggregateRoot {
    return new TaskAggregateRoot(
      primitives.id,
      primitives.title,
      primitives.user_id,
      primitives.description,
      primitives.status,
      primitives.created_at
    );
  }

  toPrimitives<T>(custom?: (p: TaskPrimitives) => T): TaskPrimitives | T {
    const defaultPrimitives: TaskPrimitives = {
      id: this.id,
      title: this.title,
      user_id: this.user_id,
      description: this.description,
      status: this.status,
      created_at: this.created_at,
    };
    return custom?.(defaultPrimitives) ?? defaultPrimitives;
  }
}
