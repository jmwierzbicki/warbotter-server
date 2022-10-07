import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DatabaseService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const animals = this.dbService.db.collection('animals');
    const leo = await animals.set('leo', {
      type: 'cat',
      color: 'orange',
    });
    console.log(leo)
    console.log(process.env);

    const item = await animals.get('leo');
    console.log(item);

    return item;
  }
}
