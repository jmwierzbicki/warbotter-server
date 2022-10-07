import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CyclicDB = require('cyclic-dynamodb');
const db = CyclicDB('zany-jade-toad-beltCyclicDB');


@Injectable()
export class DatabaseService {
  public sequelize;

  constructor() {
    const run = async function () {
      const animals = db.collection('animals');
      const leo = await animals.set('leo', {
        type: 'cat',
        color: 'orange',
      });
    };
    run();
  }
}
