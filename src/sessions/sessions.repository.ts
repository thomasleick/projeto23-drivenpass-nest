import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Session } from '@prisma/client';

@Injectable()
export class SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: number, token: string): Promise<Session> {
    return this.prisma.session.create({
      data: {
        userId,
        token,
      },
    });
  }

  async findSessionById(id: number): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: {
        id,
      },
    });
  }
}