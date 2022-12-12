import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { Campaign, CampaignSchema } from './entities/campaign.entity';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({
  controllers: [CampaignsController],
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  providers: [CampaignsService],
})
export class CampaignsModule {}