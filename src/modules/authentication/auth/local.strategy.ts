// src/modules/authentication/auth/strategies/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('local strategy');
    
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('local strategy', email, password);

    const admin = await this.authService.validateAdmin(email, password);

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return admin;
  }
}
