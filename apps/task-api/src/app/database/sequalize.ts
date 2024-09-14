import { Dialect, Sequelize } from 'sequelize';
import {
  database,
  dialect,
  host,
  password,
  port,
  username,
} from './config/sequelize.config';

export class SequelizeDatabase {
  static #instance: SequelizeDatabase;
  private constructor(private sequelize: Sequelize) {}

  public static get instance(): SequelizeDatabase {
    if (!SequelizeDatabase.#instance) {
      SequelizeDatabase.#instance = new SequelizeDatabase(
        new Sequelize(database, username, password, {
          host: host,
          dialect: dialect as Dialect,
          port: port,
        })
      );
    }

    return SequelizeDatabase.#instance;
  }

  get sequelize_() {
    return this.sequelize;
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
