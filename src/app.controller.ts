import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { IUser, User } from './database/models/user';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument, CreateCatDto } from './database/models/cat';
import { Model } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DatabaseService,
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
  ) {}

  @Get()
  async getHello(): Promise<Cat[]> {
    const createCatDto: CreateCatDto = {
      age: 9,
      name: 'Koteł',
      breed: 'Europejski',
    };

    const createdCat = new this.catModel(createCatDto);
    await createdCat.save();

    return this.catModel.find().exec();
  }
}
