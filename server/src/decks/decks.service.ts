import { Injectable, NotFoundException } from '@nestjs/common';
import { Deck } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DecksService {
  constructor(private prisma: PrismaService) {}

  async getDecks(): Promise<Deck[]> {
    return await this.prisma.deck.findMany();
  }

  async getDeck(id: string): Promise<Deck> {
    const deck = await this.prisma.deck.findUnique({
      where: { id: id },
    });
    if (!deck) throw new NotFoundException();
    return deck;
  }

  async createDeck(createDeckDto: CreateDeckDto) {
    return await this.prisma.deck.create({
      data: createDeckDto,
    });
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck> {
    const updatedDeck = await this.prisma.deck.update({
      where: { id: id },
      data: updateDeckDto,
    });
    return updatedDeck;
  }

  async deleteDeck(id: string): Promise<Deck> {
    const deletedDeck = await this.prisma.deck.delete({
      where: { id: id },
    });
    return deletedDeck;
  }
}
