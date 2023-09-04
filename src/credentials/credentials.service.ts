import { Injectable, ConflictException } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialDto } from './dto/create-credential.dto';
import Cryptr = require("cryptr");

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
  ) {}

  private readonly cryptr = new Cryptr(process.env.CRYPTR_SECRET);

  async createCredential(createCredentialDto: CreateCredentialDto) {
    const { title, site, username, password, userId } = createCredentialDto;

    // Verifique se o título é único para o usuário atual
    const existingCredential = await this.credentialsRepository.findOne({
      where: {
        title,
        userId,
      },
    });

    if (existingCredential) {
      // O título já está em uso pelo mesmo usuário
      throw new ConflictException('Título já existe para este usuário');
    }

    // Criptografe a senha antes de salvar
    const encryptedPassword = this.cryptr.encrypt(password);

    return this.credentialsRepository.createCredential({
      title,
      site,
      username,
      password: encryptedPassword,
      userId,
    });
  }
}