import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';

@Controller('credentials')
@UseGuards(AuthGuard('jwt'))
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async createCredential(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialsService.createCredential(createCredentialDto);
  }
}