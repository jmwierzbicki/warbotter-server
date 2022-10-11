import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot-service/bot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './database/models/cat';
import { LoggerMiddleware } from './bot-service/discord.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGODB_CONNECTION_STRING,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [],
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, BotService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('interactions');
  }
}
