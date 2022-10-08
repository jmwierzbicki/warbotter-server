import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { User } from './database/models/user';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DatabaseService,
  ) {}

  @Get()
  async getHello(): Promise<User[]> {
    const user = User.build({ name: 'bob' });
    await user.save();

    return await User.findAll();
    // return 'string';
  }
}
