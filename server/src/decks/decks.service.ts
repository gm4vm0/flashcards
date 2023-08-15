import { Injectable, NotFoundException } from '@nestjs/common';
import { Deck } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DecksService {
  constructor(private prisma: PrismaService) {}

  async getDecks(userId: string): Promise<Deck[]> {
    return await this.prisma.deck.findMany({
      where: { ownerId: userId },
    });
  }

  async getDeck(deckId: string, userId: string): Promise<Deck> {
    const deck = await this.prisma.deck.findUnique({
      where: {
        id: deckId,
        ownerId: userId,
      },
    });
    if (!deck) throw new NotFoundException();
    return deck;
  }

  async createDeck(createDeckDto: CreateDeckDto, userId: string) {
    return await this.prisma.deck.create({
      data: { ...createDeckDto, ownerId: userId },
    });
  }

  async updateDeck(
    updateDeckDto: UpdateDeckDto,
    deckId: string,
    userId: string,
  ): Promise<Deck> {
    const updatedDeck = await this.prisma.deck.update({
      where: {
        id: deckId,
        ownerId: userId,
      },
      data: updateDeckDto,
    });
    return updatedDeck;
  }

  async deleteDeck(deckId: string, userId: string): Promise<Deck> {
    const deletedDeck = await this.prisma.deck.delete({
      where: {
        id: deckId,
        ownerId: userId,
      },
    });
    return deletedDeck;
  }
}
