import { AuthGuard } from '@nestjs/passport';

export class AdminAuthGuard extends AuthGuard('adminjwt') {
  constructor() {
    super();
  }
}
