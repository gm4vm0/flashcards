import { IsOptional, MaxLength } from 'class-validator';

export class UpdateCardDto {
  @MaxLength(30)
  @IsOptional()
  front?: string;

  @MaxLength(30)
  @IsOptional()
  back?: string;
}
