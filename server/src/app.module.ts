import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import RedisStore from 'connect-redis';
import session from 'express-session';
import ms from 'ms';
import passport from 'passport';
import { RedisClientType } from 'redis';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { DecksModule } from './decks/decks.module';
import { PrismaModule } from './prisma/prisma.module';
import { REDIS } from './redis/redis.constants';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [PrismaModule, CardsModule, DecksModule, RedisModule, AuthModule],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private redis: RedisClientType) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redis }),
          resave: false,
          saveUninitialized: false,
          secret: process.env.JWT_SECRET,
          cookie: {
            maxAge: ms('0.5 Y'),
            sameSite: 'none',
            secure: 'auto',
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
