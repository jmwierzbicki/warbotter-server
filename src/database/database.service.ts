import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
@Injectable()
export class DatabaseService {
  public db: Sequelize;

  constructor() {
    this.db = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        dialect: 'mysql',
        host: process.env.DB_HOST,
      },
    );
    this.db.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    });
  }
}
