import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (await bcrypt.compare(pass, user.password)) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
