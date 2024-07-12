import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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
  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('身份验证失败', HttpStatus.UNAUTHORIZED);
    }
  }
  // 登录
  async login(body) {
    const user = await this.userService.findOneName(body.username);
    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.FORBIDDEN);
    }
    if (user.password !== body.password) {
      throw new HttpException('账号与密码不匹配', HttpStatus.FORBIDDEN);
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
      message: '登录成功',
      token: await this.createToken(payload),
    };
  }
}
