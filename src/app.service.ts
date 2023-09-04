import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  };

  getHealth(): string {
    return 'I’m okay!';
  }
  async validatePassword(id: number, password: string) {

    const user = await this.usersService.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  async eraseUserData (id: number) {
    return await this.usersService.removeUser(id)
  }
}
