import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from '../database/models/cat';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = await this.getHash(createdUser.password);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.getHash(updateUserDto.password);
    }

    return this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }, '+password').exec();
  }

  async getHash(password: string): Promise<string> {
    const HASH_ROUNDS = 10;
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    return await bcrypt.hash(password, salt);
  }
}
