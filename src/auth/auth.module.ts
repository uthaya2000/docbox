import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './strategy/user.jwt.strategy';
import { AdminJwtStrategy } from './strategy/admin.jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy, AdminJwtStrategy],
})
export class AuthModule {}
