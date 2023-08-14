import { User } from '@prisma/client';
import { Request } from 'express';

export type AuthenticatedRequest = Omit<Request, 'user'> & { user: User };
