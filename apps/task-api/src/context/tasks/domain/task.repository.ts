import { CrudRepository } from "../../shared/domain/crud.repository";
import { TaskAggregateRoot } from "./task.entity";

export type TaskRepository = CrudRepository<TaskAggregateRoot>
