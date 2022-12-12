import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Hero } from './entities/hero.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { Campaign } from '../campaigns/entities/campaign.entity';

@Module({
  controllers: [HeroController],
  imports: [
    MongooseModule.forFeature([
      { name: Hero.name, schema: SchemaFactory.createForClass(Hero) },
    ]),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: SchemaFactory.createForClass(Campaign) },
    ]),

    AuthModule,
    UsersModule,
    CampaignsModule,
  ],
  providers: [HeroService],
})
export class HeroModule {}
