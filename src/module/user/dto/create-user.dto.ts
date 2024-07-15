import {
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 50, { message: '用户名最少2位，最多50位' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 50, { message: '密码最少8位，最多50位' })
  password: string;

  @IsOptional()
  @IsMobilePhone(null, {}, { message: '手机号码格式错误' })
  mobile?: string;

  @IsOptional()
  @IsIn([0, 1])
  status?: number;

  @IsOptional()
  @Length(0, 255)
  address?: string;

  @IsOptional()
  @Length(0, 255)
  description?: string;
}
