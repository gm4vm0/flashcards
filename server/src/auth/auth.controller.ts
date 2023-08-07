import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Session } from 'express-session';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalGuard } from './local.guard';
import { LoggedInGuard } from './logged-in.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getUser(
    @Req() req: Request & { session: Session },
  ): Promise<Omit<User, 'password'>> {
    const user = req.user as User;
    Reflect.deleteProperty(user, 'password');
    return user;
  }

  @Post('register')
  async registerUser(
    @Body() user: RegisterUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request & { session: Session }): Promise<Session> {
    return req.session;
  }

  @Get('logged-in')
  async isLoggedIn(@Req() req: Request): Promise<boolean> {
    return req.isAuthenticated();
  }

  @Delete('logout')
  async logout(@Req() req: Request & { session: Session }) {
    return await this.authService.logout(req.session);
  }

  @UseGuards(LoggedInGuard)
  @Get('protected')
  protected(): string {
    return 'Protected Route';
  }
}
