import { IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsString()
  @IsNotEmpty({
    message: '请输入用户名',
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty({
    message: '请输入密码',
  })
  readonly password: string;
}
