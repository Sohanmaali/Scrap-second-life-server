

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import decodeToken from '../Helpers.ts/authHelper';
import { Reflector } from '@nestjs/core';

export const SkipAuth = () => SetMetadata('isPublic', true);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const resp = await decodeToken(request, 'authorization');

      request.auth = resp;
      if (resp) {
        return true;
      } else {
        throw new UnauthorizedException('Please provide token');
      }
    } catch (error) {
      console.log('auth error - ', error.message);
    }
  }
}

@Injectable()
export class JwtCustomerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);

      if (
        isPublic &&
        !request.cookies['aok'] &&
        !request?.headers?.authorization
      ) {
        return true;
      }

      const resp = await decodeToken(request, 'aok');

      request.auth = resp;
      if (resp) {
        return true;
      } else {
        throw new UnauthorizedException('Please provide token');
      }
    } catch (error) {
      console.log('auth error - ', error.message);
    }
  }
}
