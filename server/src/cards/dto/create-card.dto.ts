import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @MaxLength(30)
  front: string;

  @IsNotEmpty()
  @MaxLength(30)
  back: string;

  @IsNotEmpty()
  deckId: string;
}
