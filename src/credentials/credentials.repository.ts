import { Injectable } from '@nestjs/common';
import { Credential } from './entities/credential.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository{
  constructor(
    private readonly prisma: PrismaService) {
  }

async createCredential(data: Partial<Credential>): Promise<Credential> {
  return await this.prisma.credential.create({
    data: {
      title: data.title,
      site: data.site,
      username: data.username,
      password: data.password,
      userId: data.userId,
    },
  });
}

  async isTitleUniqueForUser(title: string, userId: number): Promise<boolean> {
    const existingCredential = await this.prisma.credential.findFirst({
      where: {
        title,
        userId,
      },
    });

    return !!existingCredential;
  }

    async findAllByUserId(userId: number): Promise<Credential[]> {
    return this.prisma.credential.findMany({
      where: {
        userId,
      },
    });
  }

  async findByIdAndUserId(id: number, userId: number): Promise<Credential | null> {
    return this.prisma.credential.findUnique({
      where: {
        id: +id,
        userId,
      },
    });
  }

  async remove(id: number): Promise<Credential> {
    return this.prisma.credential.delete({
      where: {
        id,
      },
    });
  }
  
  async deleteCredential(id: number): Promise<void> {
    await this.prisma.credential.delete({
      where: { id },
    });
  }
}