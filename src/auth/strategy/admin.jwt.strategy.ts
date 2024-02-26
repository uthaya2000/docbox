import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import ErrorDTO from 'utils/dto/errorDto';
import { EMAIL_NOT_VERIFIED, INVALID_TOKEN } from 'utils/errorMessages';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'adminjwt') {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    let errorCode: string;
    let message: string;

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user || user.role != 'ADMIN') {
      message = INVALID_TOKEN;
      errorCode = 'INVALID_TOKEN';
    }

    if (!user.isEmailVerified) {
      message = EMAIL_NOT_VERIFIED;
      errorCode = 'EMAIL_NOT_VERIFIED';
    }

    if (errorCode) {
      const err: ErrorDTO = {
        code: 401,
        errorCode,
        message,
      };
      throw new UnauthorizedException(err);
    }

    delete user.hash;
    return user;
  }
}
