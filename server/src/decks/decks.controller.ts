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
import { Deck } from '@prisma/client';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';

@Controller('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async getDecks(@Req() req: AuthenticatedRequest): Promise<Deck[]> {
    return this.decksService.getDecks(req.user.id);
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  async getDeck(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<Deck> {
    return await this.decksService.getDeck(id, req.user.id);
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async createCard(
    @Req() req: AuthenticatedRequest,
    @Body() createDeckDto: CreateDeckDto,
  ): Promise<Deck> {
    return await this.decksService.createDeck(createDeckDto, req.user.id);
  }

  @UseGuards(LoggedInGuard)
  @Patch(':id')
  async updateCard(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<Deck> {
    return await this.decksService.updateDeck(updateDeckDto, id, req.user.id);
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  async deleteDeck(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<Deck> {
    return await this.decksService.deleteDeck(id, req.user.id);
  }
}
