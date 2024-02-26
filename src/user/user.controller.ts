import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { Request } from 'express';
import { UserAuthGuard } from 'src/auth/guards/user.jwt.guard';
import ErrorDTO from 'utils/dto/errorDto';
import { INVALID_LIMIT_OFFSET } from 'utils/errorMessages';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('docBox')
  getAllDocBox(
    @Req() req: Request,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    limit = !limit || !isNumberString(limit) ? 10 : limit;
    offset = !offset || !isNumberString(offset) ? 0 : offset;

    if (limit < 0 || offset < 0) {
      const err: ErrorDTO = {
        code: 400,
        message: INVALID_LIMIT_OFFSET,
        errorCode: 'INVALID_LIMIT_OFFSET',
      };
      throw new BadRequestException(err);
    }

    const user = req.user;
    const userId = user['id'];

    return this.userService.getAllDocBox(userId);
  }
}
