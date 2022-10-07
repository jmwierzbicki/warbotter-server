import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { MongoRepository } from 'typeorm';
import { User } from './models/user';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DatabaseService,
    @InjectRepository(User) private usersRepository: MongoRepository<User>,
  ) {}

  @Get()
  async getHello(): Promise<User[]> {
    // await this.usersRepository.clear();
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';

    await this.usersRepository.save(user);

    const users = await this.usersRepository.find();

    return users;
  }
}
