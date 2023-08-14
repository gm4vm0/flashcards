import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { Deck } from '@prisma/client';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Get()
  async getDecks(): Promise<Deck[]> {
    return this.decksService.getDecks();
  }

  @Get(':id')
  async getDeck(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.getDeck(id);
  }

  @Post()
  async createCard(@Body() createDeckDto: CreateDeckDto): Promise<Deck> {
    return await this.decksService.createDeck(createDeckDto);
  }

  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<Deck> {
    return await this.decksService.updateDeck(id, updateDeckDto);
  }

  @Delete(':id')
  async deleteDeck(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.deleteDeck(id);
  }
}
