/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MakeNullishOptional } from 'sequelize/types/utils';
import {
  AggregatePrimitives,
  AggregateRoot,
} from '../../domain/aggregate.root';
import { CrudRepository } from '../../domain/crud.repository';
import { Model, WhereOptions, ModelStatic } from 'sequelize';

export class PersistenceMySqlRepositoryImpl<
  T extends AggregateRoot<AggregatePrimitives>,
  M extends Model
> implements CrudRepository<T>
{
  constructor(
    private model: ModelStatic<M>,
    private dto?: (attributes: any) => any
  ) {
    this.model = model;
  }

  async findAll(query?: Record<string, string>): Promise<T[]> {
    try {
      const whereClause: WhereOptions = query ? { where: query } : {};
      const results = await this.model.findAll({
        ...whereClause,
        order: [['createdAt', 'DESC']],
      });
      return results.map(
        (result) => this?.dto?.(result) ?? (result as M['_attributes'])
      );
    } catch (error) {
      console.log('🚀 ~ [findAll] ~ error:', error);
      throw new Error(error.sqlMessage);
    }
  }

  async findOne(query: Record<string, any>): Promise<T> {
    try {
      const whereClause: WhereOptions = query ? { where: query } : {};
      const result = await this.model.findOne(whereClause);
      return result
        ? this?.dto?.(result) ?? (result as M['_attributes'])
        : null;
    } catch (error) {
      console.log('🚀 ~ [findOne] ~ error:', error);
      throw new Error(error.sqlMessage);
    }
  }

  async findById(id: string): Promise<T> {
    const result = await this.model.findByPk(id);
    if (!result) {
      throw new Error(`Item with ID ${id} not found.`);
    }
    return this?.dto?.(result) ?? (result as M['_attributes']);
  }

  async create(item: T): Promise<T> {
    try {
      const result = await this.model.create(
        item as MakeNullishOptional<M['_creationAttributes']>
      );
      return result as M['_attributes'];
    } catch (error) {
      console.log('🚀 ~ [create] ~ error:', error);
      throw new Error(error.sqlMessage);
    }
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    await this.model.update(item, {
      where: { id } as WhereOptions,
      returning: true,
    });

    return item as M['_attributes'];
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.destroy({ where: { id } as WhereOptions });
    return result > 0;
  }
}
