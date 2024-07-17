import {
  HttpException,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public-auth.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 用来过滤白名单，被@Public装饰器修饰的控制器直接跳过不做验证
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const req = context.switchToHttp().getRequest();
    const accessToken = req.get('Authorization');
    if (!accessToken)
      throw new HttpException('请先登录', HttpStatus.UNAUTHORIZED);
    // 验证token是否正确，验证失败时会抛出错误
    this.authService.validateToken(accessToken);
    return super.canActivate(context);
  }
}
