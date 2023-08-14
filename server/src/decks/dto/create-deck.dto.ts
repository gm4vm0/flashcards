import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDeckDto {
  @MaxLength(50)
  @IsNotEmpty()
  name: string;
}
