import { IsOptional, MaxLength } from 'class-validator';

export class UpdateDeckDto {
  @MaxLength(50)
  @IsOptional()
  name?: string;
}
