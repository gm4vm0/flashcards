import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './types/user.type';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private users: User[] = [];

  async validateUser(user: LoginUserDto): Promise<Omit<User, 'password'>> {
    const foundUser = this.users.find((u) => u.email === user.email);
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!(user && isPasswordMatch)) throw new UnauthorizedException();
    Reflect.deleteProperty(foundUser, 'password');
    return foundUser;
  }

  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) throw new BadRequestException();
    user.password = await bcrypt.hash(user.password, 8);
    const newUser = { ...user, id: Date.now().toString() };
    this.users.push(newUser);
    Reflect.deleteProperty(user, 'password');
    return newUser;
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new BadRequestException();
    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
