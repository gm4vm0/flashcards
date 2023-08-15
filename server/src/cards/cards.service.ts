import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from '@prisma/client';
import { UserWithDecks } from 'src/auth/types/user-with-decks.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async getCards(deckId: string, user: UserWithDecks): Promise<Card[]> {
    if (user.decks.some((deck) => deck.id === deckId)) {
      return await this.prisma.card.findMany({
        where: { deckId: deckId },
      });
    }
    throw new NotFoundException();
  }

  async getCard(
    id: string,
    deckId: string,
    user: UserWithDecks,
  ): Promise<Card> {
    if (user.decks.some((deck) => deck.id === deckId)) {
      const card = await this.prisma.card.findUnique({
        where: { id: id, deckId: deckId },
      });
      if (!card) throw new NotFoundException();
      return card;
    }
    throw new NotFoundException();
  }

  async createCard(
    createCardDto: CreateCardDto,
    deckId: string,
    user: UserWithDecks,
  ): Promise<Card> {
    if (user.decks.some((deck) => deck.id === deckId)) {
      const newCard = await this.prisma.card.create({
        data: { ...createCardDto, deckId: deckId },
      });
      return newCard;
    }
    throw new NotFoundException();
  }

  async updateCard(
    id: string,
    updateCardDto: UpdateCardDto,
    user: UserWithDecks,
  ): Promise<Card> {
    const updatedCard = await this.prisma.card.update({
      where: { id: id },
      data: updateCardDto,
    });
    if (!user.decks.some((deck) => deck.id === updatedCard.deckId))
      throw new NotFoundException();
    return updatedCard;
  }

  async deleteCard(id: string, user: UserWithDecks): Promise<Card> {
    const deletedCard = await this.prisma.card.delete({
      where: { id: id },
    });
    if (!user.decks.some((deck) => deck.id === deletedCard.deckId))
      throw new NotFoundException();
    return deletedCard;
  }
}
