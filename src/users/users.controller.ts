import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return { message: 'Conta criada com sucesso!', user };
  }

  @Post('login')
  async loginUser(@Body() { email, password }: { email: string; password: string }) {
    const { accessToken } = await this.usersService.loginUser(email, password);
    return { accessToken };
  }
}