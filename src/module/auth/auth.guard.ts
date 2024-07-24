import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-auth.decorator';
import { AuthService } from './auth.service';
import { RedisService } from '@src/plugins/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private redisService: RedisService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 用来过滤白名单，被@Public装饰器修饰的控制器直接跳过不做验证
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('请先登录', HttpStatus.UNAUTHORIZED);
    }
    // 验证token是否正确，验证失败时会抛出错误
    const payload = this.authService.validateToken(token);
    const redisToken = await this.redisService.get(`${payload.id}`);
    // 同时只能有一个用户存在
    if (token !== redisToken) {
      throw new HttpException(
        '用户已经在其他地方登录,请重新登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
    request['user'] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
