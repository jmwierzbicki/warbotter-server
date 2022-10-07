import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CyclicDB = require('cyclic-dynamodb');


@Injectable()
export class DatabaseService {
  public db = CyclicDB('zany-jade-toad-beltCyclicDB');

  constructor() {
    const run = async function () {

    };
    run();
  }
}
