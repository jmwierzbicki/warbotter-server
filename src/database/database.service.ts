import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  public db;

  constructor() {
    // this.db = new Sequelize({
    //   database: process.env.DB_NAME,
    //   dialect: 'mysql',
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   host: process.env.DB_HOST,
    //   models: models, // or [Player, Team],
    // });
    // this.db.authenticate().then(async () => {
    //   console.log('Connection has been established successfully.');
    //
    //   for (const model of models) {
    //     await model.sync({ alter: true });
    //   }
    // });
  }
}
