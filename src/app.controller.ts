import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseGuildTextChannel, GatewayIntentBits, Routes } from 'discord.js';
import { BotService } from './bot-service/bot.service';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Public } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private botService: BotService,
  ) {}

  // @Public()
  // @Get()
  // async getHello(): Promise<Cat[]> {
  //   // const createCatDto: CreateCatDto = {
  //   //   age: 9,
  //   //   name: 'Koteł',
  //   //   breed: 'Europejski',
  //   // };
  //   //
  //   // const createdCat = new this.catModel(createCatDto);
  //   // await createdCat.save();
  //
  //   console.log('request!');
  //   return this.catModel.find().exec();
  // }

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

  @Public()
  @Post('interactions')
  interactions(@Req() req) {
    console.log('bot interraction');
    console.log(req.body);
    if (req.body.type === InteractionType.PING) {
      return {
        type: InteractionResponseType.PONG,
      };
    }

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: '👍',
        ephemeral: true,
      },
      ephemeral: true,
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
