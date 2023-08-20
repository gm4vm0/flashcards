import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Session } from 'express-session';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserWithDecks } from './types/user-with-decks.type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(user: LoginUserDto): Promise<Omit<User, 'password'>> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
      include: { decks: true },
    });
    if (!foundUser) throw new UnauthorizedException();
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!isPasswordMatch) throw new UnauthorizedException();
    Reflect.deleteProperty(foundUser, 'password');
    return foundUser;
  }

  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) throw new BadRequestException();
    user.password = await bcrypt.hash(user.password, 8);
    const newUser = await this.prisma.user.create({
      data: user,
    });
    Reflect.deleteProperty(user, 'password');
    return newUser;
  }

  async logout(session: Session) {
    if (!session) throw new BadRequestException();
    session.destroy((err) => {
      if (err) throw new BadRequestException();
    });
  }

  async findById(id: string): Promise<Omit<UserWithDecks, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { decks: true },
    });
    if (!user) throw new BadRequestException();
    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
