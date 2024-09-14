import express from 'express';
import { ExpressApi } from '../backend/server';
import { SequelizeDatabase } from '../database/sequalize';


export class Bootstrap {
  static run() {
    const app = express()
    const db = SequelizeDatabase.instance

    new ExpressApi(app)
    db.testConnection();
  }
}
