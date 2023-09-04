import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptedCardDto } from './dto/encrypted-card.dto';

@Injectable()
export class CardsRepository{
  constructor(
    private readonly prisma: PrismaService) {
  }

  async findAllByUserId(userId: number): Promise<EncryptedCardDto[]> {
    return await this.prisma.card.findMany({
      where: {
        userId,
      },
    });
  }


  async createCard(card: EncryptedCardDto) {
    return this.prisma.card.create({
      data: { ...card }
    })
  }

  async findByIdAndUserId(id: number, userId: number): Promise<EncryptedCardDto | null> {
    return this.prisma.card.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  async deleteCard(id: number): Promise<void> {
    await this.prisma.card.delete({
      where: { id },
    });
  }

  async isTitleUniqueForUser(title: string, userId: number): Promise<boolean> {
    const existingCard = await this.prisma.card.findFirst({
      where: {
        title,
        userId,
      },
    });

    return !!existingCard;
  }
}