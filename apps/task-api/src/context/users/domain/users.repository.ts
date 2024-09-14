import { CrudRepository } from '../../shared/domain/crud.repository';
import { UserAggregateRoot } from './users.entity';

export type UserRepository = CrudRepository<UserAggregateRoot>;
