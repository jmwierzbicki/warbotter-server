import { User } from '../../users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LvlUpMode } from '../dto/create-campaign.dto';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: Types.ObjectId | User;

  @Prop({ type: Number, enum: LvlUpMode, default: LvlUpMode.standard })
  levelUpMode: number;

  @Prop({ required: true, unique: true })
  campaignName: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  channelId: number;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
