import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userTable: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userTable.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (user) {
      throw new HttpException('用户名已经存在', HttpStatus.OK);
    }
    const userInfo = { ...createUserDto };
    userInfo.password = bcryptjs.hashSync(createUserDto.password, 10);
    await this.userTable.save(userInfo);
    return '创建成功';
  }

  async findAll() {
    const users = await this.userTable.find({
      relations: {
        idCard: true,
        photos: true,
        questions: true,
      },
    });
    return users.map((user) => ({ ...user, password: undefined }));
  }

  async findOneId(id: number) {
    const user = await this.userTable.findOne({
      where: {
        id: id,
      },
    });
    user && delete user.password;
    return user;
  }

  findOneName(name: string) {
    return this.userTable.findOne({
      where: {
        username: name,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.userTable.update({ id }, updateUserDto);
    // return this.userTable.findOne({
    //   where: {
    //     username: name,
    //   },
    // });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
