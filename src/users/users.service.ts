import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT = 10;
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.findEmail(email);
    if (existingUser) {
      throw new ConflictException('O email já está em uso');
    }

    const hashPassword = await bcrypt.hash(password, this.SALT);
    const result = await this.userRepository.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    delete result.password;

    return result;
  }

  async createSession(userId: number, token: string) {
    return await this.userRepository.createSession(userId, token);
  }

  async findEmail(email: string) {
    return await this.userRepository.findEmail(email);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}