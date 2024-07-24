import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@src/plugins/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';

type Playload = {
  username: string;
  id: number;
  mobile: string;
  status: number;
  address: string;
  description: string;
  created_time: Date;
  date: string;
};
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) { }

  // 生成token
  createToken(payload) {
    return this.jwtService.signAsync(payload);
  }
  // 验证token
  validateToken(token: string): Playload {
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
    // 验证密码是否正确
    const isok = bcryptjs.compareSync(body.password, user.password);
    if (!isok) {
      throw new HttpException('账号与密码不匹配', HttpStatus.BAD_REQUEST);
    }
    const payload: Playload = {
      username: user.username,
      id: user.id,
      mobile: user.mobile,
      status: user.status,
      address: user.address,
      description: user.description,
      created_time: user.created_time,
      date: new Date().toString(),
    };
    const token = await this.createToken(payload);
    this.redisService.set(
      `${user.id}`,
      token,
      this.configService.get('JWT_EXPIRES_In') * 60 * 60,
    );
    return {
      token,
    };
  }
}
