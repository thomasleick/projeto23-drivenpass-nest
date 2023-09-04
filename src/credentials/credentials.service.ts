import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialDto } from './dto/get-credential.dto';
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
    const existingCredential = await this.credentialsRepository.isTitleUniqueForUser(title, userId);

    if (existingCredential) {
      // O título já está em uso pelo mesmo usuário
      throw new ConflictException('Título já existe para este usuário');
    }

    const encryptedPassword = this.cryptr.encrypt(password);

    return this.credentialsRepository.createCredential({
      title,
      site,
      username,
      password: encryptedPassword,
      userId,
    });
  }

  async getAllCredentials(userId: number): Promise<CredentialDto[]> {
    const credentials = await this.credentialsRepository.findAllByUserId(userId);

    return credentials.map((credential) => this.mapToCredentialDto(credential));
  }

  async getCredentialById(id: number, userId: number): Promise<CredentialDto> {
    const credential = await this.credentialsRepository.findByIdAndUserId(id, userId);

    if (!credential) {
      throw new NotFoundException('Credencial não encontrada');
    }

    return this.mapToCredentialDto(credential);
  }
  async deleteCredential(id: number, userId: number): Promise<void> {
  const credential = await this.credentialsRepository.findByIdAndUserId(id, userId);

  if (!credential) {
    throw new NotFoundException('Credencial não encontrada');
  }

  await this.credentialsRepository.deleteCredential(id);
}

  private mapToCredentialDto(credential: any): CredentialDto {
      // Descriptografe a senha usando a chave de descriptografia
      const decryptedPassword = this.cryptr.decrypt(credential.password);

      return {
        id: credential.id,
        title: credential.title,
        site: credential.site,
        username: credential.username,
        password: decryptedPassword,
        userId: credential.userId,
      };
    }

}