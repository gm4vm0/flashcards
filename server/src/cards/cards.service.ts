import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './card.type';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async getCards(): Promise<Card[]> {
    return await this.prisma.card.findMany();
  }

  async getCard(id: string): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id: id },
    });
    if (!card) throw new NotFoundException();
    return card;
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const newCard = await this.prisma.card.create({
      data: createCardDto,
    });
    return newCard;
  }

  async updateCard(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const updatedCard = await this.prisma.card.update({
      where: { id: id },
      data: updateCardDto,
    });
    return updatedCard;
  }

  async deleteCard(id: string): Promise<Card> {
    const deletedCard = await this.prisma.card.delete({
      where: { id: id },
    });
    return deletedCard;
  }
}
