import { Length } from 'class-validator';

export class LoginUserDto {
  @Length(2, 50)
  email: string;

  @Length(2, 50)
  password: string;
}
