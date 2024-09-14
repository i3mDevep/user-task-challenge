import { TaskRepository } from '../domain/task.repository';
import { TaskAggregateRoot, TaskPrimitives } from '../domain/task.entity';

export class TasksApplication {
  constructor(private repository: TaskRepository) {}

  async getAll(query?: Record<string, string>): Promise<TaskAggregateRoot[]> {
    return this.repository.findAll(query);
  }

  async getById(id: string): Promise<TaskAggregateRoot | null> {
    return this.repository.findById(id);
  }

  async create(task: TaskPrimitives): Promise<TaskAggregateRoot> {
    return this.repository.create(TaskAggregateRoot.fromPrimitives(task));
  }

  async update(id: string, updatedTask: TaskPrimitives): Promise<TaskAggregateRoot | null> {
    return this.repository.update(id, TaskAggregateRoot.fromPrimitives(updatedTask));
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
