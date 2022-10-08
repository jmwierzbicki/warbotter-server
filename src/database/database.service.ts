import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './models/cat';

@Injectable()
export class DatabaseService {
  public db;

  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {
    //
    // const user = new User({
    //   name: 'Bill',
    //   email: 'bill@initech.com',
    //   avatar: 'https://i.imgur.com/dM7Thhn.png',
    // });
    // user.save();
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
