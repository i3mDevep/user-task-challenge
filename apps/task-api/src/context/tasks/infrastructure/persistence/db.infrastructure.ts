import { PersistenceMySqlRepositoryImpl } from '../../../shared/infrastructure/persistence/sequelize-orm.infrastructure';
import TaskModel from '../../../../app/database/models/task';

import { TaskAggregateRoot } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';

export class TaskDbInfrastructure extends PersistenceMySqlRepositoryImpl<
  TaskAggregateRoot,
  TaskModel
> implements TaskRepository {
  constructor() {
    super(TaskModel);
  }
}
