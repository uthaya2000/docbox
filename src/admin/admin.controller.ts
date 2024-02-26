import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import ErrorDTO from 'utils/dto/errorDto';
import { INVALID_LIMIT_OFFSET } from 'utils/errorMessages';
import { CreateDocBoxDto } from './dto/createdocbox.dto';
import { Request, RequestHandler } from 'express';
import { AdminAuthGuard } from 'src/auth/guards/admin.jwt.guard';
import { isNumberString } from 'class-validator';

@Controller('admin/docbox')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('all')
  getAllDocBoxes(
    @Req() req: Request,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('userId') userId?: number,
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

    if (!userId || !isNumberString(userId)) userId = 0;

    return this.adminService.getAllDocBoxes(limit, offset, Number(userId));
  }

  @Post('create')
  createDocBox(@Body() dto: CreateDocBoxDto, @Req() req: Request) {
    let userId = dto.userId;
    if (!userId) {
      const user = req.user;
      userId = user['id'];
    }

    return this.adminService.createDocBox(dto, userId);
  }

  @Delete('/:docBoxId')
  deleteDocBox(@Param('docBoxId') docBoxId: number) {
    return this.adminService.deleteDocBox(docBoxId);
  }
}
