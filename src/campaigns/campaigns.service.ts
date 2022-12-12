import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign, CampaignDocument } from './entities/campaign.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import Hashids from 'hashids';
import { UserProvider } from '../global/user.provider';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    private readonly userProvider: UserProvider,
  ) {}

  async create(createCampaignDto: CreateCampaignDto, user: User) {
    const hashIds = new Hashids();
    const createdCampaign = new this.campaignModel({
      ...createCampaignDto,
      owner: user,
      code: hashIds.encodeHex(user.toString()),
    });

    // createdCampaign.code = hashIds.encodeHex(createdCampaign._id.toString());

    return await createdCampaign.save();
  }

  async registerChannel(code: string, channel: number) {
    const campaign = await this.campaignModel.findOne({ code });
    this.userProvider.checkOwnership(campaign);

    campaign.channelId = channel;
    campaign.save();
  }

  findAll() {
    return `This action returns all campaigns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
