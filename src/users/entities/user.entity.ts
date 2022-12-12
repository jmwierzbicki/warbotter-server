import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum RoleEnum {
  User,
  GM,
  Admin,
}

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({ type: Number, enum: RoleEnum, default: RoleEnum.User })
  role: number;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  discordUser: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
