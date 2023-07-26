import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Session } from 'express-session';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalGuard } from './local.guard';
import { LoggedInGuard } from './logged-in.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDto) {
    return await this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request & { session: Session }) {
    return req.session;
  }

  @UseGuards(LoggedInGuard)
  @Get('protected')
  protected() {
    return 'Protected Route';
  }
}
