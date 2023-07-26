import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    return context.switchToHttp().getRequest().isAuthenticated();
  }
}
