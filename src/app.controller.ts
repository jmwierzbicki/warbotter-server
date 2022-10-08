import { Controller, Get, Post, RawBodyRequest, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument, CreateCatDto } from './database/models/cat';
import { Model } from 'mongoose';
import {
  BaseGuildTextChannel,
  Client,
  GatewayIntentBits,
  Routes,
} from 'discord.js';
import { BotService } from './bot-service/bot.service';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DatabaseService,
    private botService: BotService,
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
  ) {}

  @Get()
  async getHello(): Promise<Cat[]> {
    // const createCatDto: CreateCatDto = {
    //   age: 9,
    //   name: 'Koteł',
    //   breed: 'Europejski',
    // };
    //
    // const createdCat = new this.catModel(createCatDto);
    // await createdCat.save();

    console.log('request!');
    return this.catModel.find().exec();
  }

  @Get('test-bot')
  async testBot() {
    console.log(this.botService.client.isReady());
    // console.log(this.botService.client)

    const channelId = '547839876784062507';
    const channel = (await this.botService.client.channels.cache.get(
      channelId,
    )) as BaseGuildTextChannel;
    // console.log(JSON.stringify(channel));

    // console.log(this.botService.connection);;
    // this.botService.connection.destroy();
    // console.log(this.botService.client.isReady());;

    return channel;
  }

  @Get('update-commands')
  updateCommands() {
    this.botService.registerCommands();
  }

  @Post('interactions')
  interactions(@Req() req) {
    console.log(req.body.type);
    if (req.body.type === InteractionType.PING) {
      return {
        type: InteractionResponseType.PONG,
      };
    }

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: '👍',
      },
    };
  }

  @Get('send')
  async sendMessage() {
    const webhooks = await this.botService.rest.get(
      Routes.channelWebhooks('547839876784062507'),
    );

    console.log(webhooks);

    // this.botService.rest.post(Routes.channelMessages('547839876784062507'), {
    //   body: {
    //     content: 'hello world!',
    //
    //   },
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
  }
}
