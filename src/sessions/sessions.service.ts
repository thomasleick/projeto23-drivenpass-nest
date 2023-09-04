import { Injectable } from '@nestjs/common';
import { SessionsRepository } from './sessions.repository';
import { Session } from '.prisma/client';

@Injectable()
export class SessionsService {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async createSession(userId: number, token: string): Promise<Session> {
    return this.sessionsRepository.createSession(userId, token);
  }

  async findSessionById(id: number): Promise<Session | null> {
    return this.sessionsRepository.findSessionById(id);
  }
}