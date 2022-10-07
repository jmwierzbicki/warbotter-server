import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  public ds;

  constructor() {
    this.ds = new DataSource({
      useUnifiedTopology: true,
      type: 'mongodb',
      host: 'cluster0.qbrxwv9.mongodb.net',
      port: 27017,
      database: 'warbotter',
      password: 'jQPoH8LwPty2nAFa',
    });

    this.ds
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }
}
