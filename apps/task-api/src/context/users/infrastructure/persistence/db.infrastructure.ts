import { PersistenceMySqlRepositoryImpl } from '../../../shared/infrastructure/persistence/sequelize-orm.infrastructure';
import UserModel from '../../../../app/database/models/user';

import { UserAggregateRoot } from '../../domain/users.entity';
import { UserRepository } from '../../domain/users.repository';

export class UserDbInfrastructure
  extends PersistenceMySqlRepositoryImpl<UserAggregateRoot, UserModel>
  implements UserRepository
{
  constructor() {
    super(UserModel, UserDbInfrastructure.modelTOEntity);
  }

  static modelTOEntity(attributes: UserModel) {
    const { email, password, username, id, roles } = attributes.dataValues
    return UserAggregateRoot.fromPrimitives({
      id,
      email,
      username,
      password,
      roles
    })
  }
}
