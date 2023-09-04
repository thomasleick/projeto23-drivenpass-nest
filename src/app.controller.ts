import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  };
  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  };
 @UseGuards(AuthGuard('jwt'))
 @Post('/erase')
  async eraseAccount(@Request() req: any, @Body('password') password: string) {
    // Verifique se a senha fornecida pelo usuário está correta
    const isPasswordValid = await this.appService.validatePassword(req.user.id, password);
    
    if (!isPasswordValid) {
      // Senha incorreta, retorne 401 Unauthorized
      return { message: 'Senha incorreta' };
    }

    // Se a senha estiver correta, exclua todos os dados do usuário
    await this.appService.eraseUserData(req.user.id);

    // Retorne uma mensagem de confirmação de exclusão bem-sucedida
    return { message: 'Conta excluída com sucesso' };
  }
  

}
