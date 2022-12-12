import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RoleEnum, User } from '../users/entities/user.entity';
import { Types } from 'mongoose';
import { Exceptions } from './exceptions';

@Injectable({ scope: Scope.REQUEST })
export class UserProvider {
  get user(): User {
    return this.req.user.userId;
  }
  get userId(): Types.ObjectId {
    return new Types.ObjectId(this.req.user.userId._id);
  }

  constructor(@Inject(REQUEST) private readonly req) {}

  checkOwnership(resource: any) {
    if (this.user.role === RoleEnum.Admin) {
      return;
    }
    if (this.userId === resource.owner) {
      return;
    }
    if (this.userId === resource.gameMaster) {
      return;
    }
    Exceptions.missingPermissions();
  }
}
