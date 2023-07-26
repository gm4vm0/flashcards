import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from '@prisma/client';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async getCards(): Promise<Card[]> {
    return this.cardsService.getCards();
  }

  @Get(':id')
  async getCard(@Param('id') id: string): Promise<Card> {
    return this.cardsService.getCard(id);
  }

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.createCard(createCardDto);
  }

  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<Card> {
    return this.cardsService.deleteCard(id);
  }
}
