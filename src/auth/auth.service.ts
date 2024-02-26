import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import * as argon from 'argon2';
import { AuthDto, UserRole } from './dto';
import {
  ADMIN_API_KEY_MISSING,
  ADMIN_CANNOT_BE_CREATED_BY_USER,
  INVALID_CREDETIALS,
  USER_ALREADY_EXISTS,
} from 'utils/errorMessages';
import ErrorDTO from 'utils/dto/errorDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(signDto: AuthDto, bearerToken: string) {
    const email = signDto.email;
    const role = signDto.role || UserRole.USER;

    if (role == UserRole.ADMIN) {
      const errRes = await this.checkForAdminUser(bearerToken);
      if (errRes) throw new ForbiddenException(errRes);
    }

    try {
      const hash = await argon.hash(signDto.password);

      const user = await this.prismaService.user.create({
        data: {
          email,
          hash,
          role,
          name: signDto.name ?? null,
        },
      });

      return this.signToken(
        user.id,
        user.email,
        user.role.toString(),
        user.name,
        user.isEmailVerified,
      );
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        const error: ErrorDTO = {
          code: 403,
          message: USER_ALREADY_EXISTS,
          errorCode: 'USER_ALREADY_EXISTS',
        };
        throw new ForbiddenException(error);
      }

      throw error;
    }
  }

  async login(loginDto: AuthDto) {
    let errorCode: string;
    let errorMessage: string;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      errorCode = 'INVALID_CREDETIALS';
      errorMessage = INVALID_CREDETIALS;
    }

    const pwMatches = await argon.verify(user.hash, loginDto.password);
    if (!pwMatches) {
      errorCode = 'INVALID_CREDETIALS';
      errorMessage = INVALID_CREDETIALS;
    }

    if (errorCode) {
      const error: ErrorDTO = {
        code: 401,
        message: errorMessage,
        errorCode: errorCode,
      };
      throw new ForbiddenException(error);
    }

    return this.signToken(
      user.id,
      user.email,
      user.role.toString(),
      user.name,
      user.isEmailVerified,
    );
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
    name: string,
    isVerified: boolean,
  ) {
    const payload = {
      sub: userId,
      email,
      role,
      name,
      isVerified,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }

  async checkForAdminUser(bearerToken: string) {
    let errorCode: string;
    let errorMessage: string;

    if (!bearerToken || bearerToken.split(' ').length != 2) {
      errorCode = 'ADMIN_API_KEY_MISSING';
      errorMessage = ADMIN_API_KEY_MISSING;
    } else {
      const token = bearerToken.split(' ')[1];
      try {
        const payload = await this.jwt.verify(token, {
          secret: this.config.get('JWT_SECRET'),
        });
        if (!payload || payload.role != 'ADMIN') {
          errorCode = 'ADMIN_CANNOT_BE_CREATED_BY_USER';
          errorMessage = ADMIN_CANNOT_BE_CREATED_BY_USER;
        }
      } catch (err) {
        console.log(err);
        errorCode = 'ADMIN_CANNOT_BE_CREATED_BY_USER';
        errorMessage = ADMIN_CANNOT_BE_CREATED_BY_USER;
      }
    }

    if (errorCode) {
      const error: ErrorDTO = {
        code: 403,
        message: errorMessage,
        errorCode,
      };
      return error;
    }

    return null;
  }
}
