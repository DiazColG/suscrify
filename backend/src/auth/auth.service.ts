import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CsvService } from '../common/csv/csv.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private csvService: CsvService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const users = await this.csvService.findByField('users', 'email', email);
    const user = users[0];

    if (user && await bcrypt.compare(password, user.password as string)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        planStatus: user.planStatus,
      },
    };
  }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await this.csvService.create('users', {
      email,
      password: hashedPassword,
      planStatus: 'free',
    });

    const { password: _, ...result } = user;
    return result;
  }
} 