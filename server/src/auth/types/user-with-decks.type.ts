import { Prisma } from '@prisma/client';

export type UserWithDecks = Prisma.UserGetPayload<{ include: { decks: true } }>;
