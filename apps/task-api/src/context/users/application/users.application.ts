import { UserRepository } from '../domain/users.repository';
import { UserAggregateRoot, UserPrimitives } from '../domain/users.entity';
import { EncryptService } from '../../shared/domain/encrypt.service';

export class UserApplication {
  constructor(private repository: UserRepository) {}

  async getAll(query?: Record<string, string>): Promise<UserAggregateRoot[]> {
    return this.repository.findAll(query);
  }

  async getById(id: string): Promise<UserAggregateRoot | null> {
    return this.repository.findById(id);
  }

  async create(user: UserPrimitives): Promise<UserAggregateRoot> {
    const encrypt = new EncryptService();
    const existingUser = await this.repository.findOne({ email: user.email });

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    return this.repository.create(
      UserAggregateRoot.fromPrimitives({
        ...user,
        password: await encrypt.encrypt(user.password),
      })
    );
  }

  async update(
    id: string,
    updateUser: UserPrimitives
  ): Promise<UserAggregateRoot | null> {
    return this.repository.update(
      id,
      UserAggregateRoot.fromPrimitives(updateUser)
    );
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
