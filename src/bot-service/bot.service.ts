import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
  constructor() {
    console.log('test!!');
    console.log(process.env.TOKEN);
  }
}
