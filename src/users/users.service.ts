import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT = 10;
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Verifique se o email já está em uso
    const existingUser = await this.findEmail(email);
    if (existingUser) {
      throw new ConflictException('O email já está em uso');
    }

    // Continue criando o usuário se o email não estiver em uso
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

  async loginUser(email: string, password: string) {
    const user = await this.findEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}