import { AuthenticationApplication } from '../../context/authentication/application/authentication.application';
import { AuthenticationVerifyServices } from '../../context/authentication/domain/authentication-verify.service';
import { JwtJoseProviderImpl } from '../../context/shared/infrastructure/providers/jwt-jose.provider.impl';
import { TasksApplication } from '../../context/tasks/application/tasks.application';
import { TaskDbInfrastructure } from '../../context/tasks/infrastructure/persistence/db.infrastructure';
import { UserApplication } from '../../context/users/application/users.application';
import { UserDbInfrastructure } from '../../context/users/infrastructure/persistence/db.infrastructure';

const dbTaskRepository = new TaskDbInfrastructure();
const dbUserRepository = new UserDbInfrastructure();
const jwtJoseProviderImpl = new JwtJoseProviderImpl();

export const taskApplication = new TasksApplication(dbTaskRepository);

export const userApplication = new UserApplication(dbUserRepository);

export const authenticationVerifyServices = new AuthenticationVerifyServices(jwtJoseProviderImpl)

export const authenticationApplication = new AuthenticationApplication(
  dbUserRepository,
  jwtJoseProviderImpl
);
