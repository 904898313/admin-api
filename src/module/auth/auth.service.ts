import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  // 生成token
  createToken(payload) {
    return this.jwtService.signAsync(payload);
  }
  // 验证token
  validateToken(authorizationHeader: string): Promise<any> {
    const token = authorizationHeader.replace(/^Bearer\s/, '');
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (error) {
      throw new HttpException(
        '当前登录已过期，请重新登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  // 登录
  async login(body) {
    const user = await this.userService.findOneName(body.username);
    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== body.password) {
    }
    // 验证密码是否正确
    const isok = bcryptjs.compareSync(body.password, user.password);
    if (!isok) {
      throw new HttpException('账号与密码不匹配', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      username: user.username,
      id: user.id,
      mobile: user.mobile,
      status: user.status,
      address: user.address,
      description: user.description,
      created_time: user.created_time,
    };
    return {
      token: await this.createToken(payload),
    };
  }
}
