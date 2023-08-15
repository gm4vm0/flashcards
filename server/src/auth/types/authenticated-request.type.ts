import { Request } from 'express';
import { UserWithDecks } from './user-with-decks.type';

export type AuthenticatedRequest = Omit<Request, 'user'> & {
  user: UserWithDecks;
};
