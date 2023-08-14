import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from '@prisma/client';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @UseGuards(LoggedInGuard)
  @Get(':deckId')
  async getCards(
    @Req() req: AuthenticatedRequest,
    @Param('deckId') deckId: string,
  ): Promise<Card[]> {
    return await this.cardsService.getCards(deckId, req.user);
  }

  @UseGuards(LoggedInGuard)
  @Get(':deckId/:id')
  async getCard(
    @Req() req: AuthenticatedRequest,
    @Param('deckId') deckId: string,
    @Param('id') id: string,
  ): Promise<Card> {
    return await this.cardsService.getCard(id, deckId, req.user);
  }

  @UseGuards(LoggedInGuard)
  @Post(':deckId')
  async createCard(
    @Req() req: AuthenticatedRequest,
    @Param('deckId') deckId: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return await this.cardsService.createCard(createCardDto, deckId, req.user);
  }

  @UseGuards(LoggedInGuard)
  @Patch(':id')
  async updateCard(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return await this.cardsService.updateCard(id, updateCardDto, req.user);
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  async deleteCard(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<Card> {
    return await this.cardsService.deleteCard(id, req.user);
  }
}
