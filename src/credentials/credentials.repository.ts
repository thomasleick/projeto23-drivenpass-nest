import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Credential } from './entities/credential.entity';

@Injectable()
export class CredentialsRepository extends Repository<Credential> {
  async findByTitle(title: string): Promise<Credential | undefined> {
    return this.findOne({ where: title });
  }

  async createCredential(data: Partial<Credential>): Promise<Credential> {
    const credential = this.create(data);
    return this.save(credential);
  }

  // Outros métodos de acesso ao banco de dados podem ser definidos aqui
}