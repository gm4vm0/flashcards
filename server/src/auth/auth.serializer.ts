import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './types/user.type';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, userId: string) => void) {
    done(null, user.id);
  }

  async deserializeUser(
    payload: string,
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.authService.findById(payload);
    done(null, user);
  }
}
