import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocBoxDto } from './dto/createdocbox.dto';
import ErrorDTO from 'utils/dto/errorDto';
import { DISPLAYNAME_ALREADY_EXISTS } from 'utils/errorMessages';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  getAllDocBoxes(limit: number, offset: number, userId: number) {
    if (userId) {
      return this.prisma.docBox.findMany({
        where: {
          ownerId: userId,
        },
        take: limit,
        skip: offset,
      });
    } else {
      return {
        data: this.prisma.docBox.findMany({
          take: limit,
          skip: offset,
        }),
      };
    }
  }

  async createDocBox(createDocBoxDto: CreateDocBoxDto, userId: number) {
    const displayName = createDocBoxDto.displayName;

    let docBox = await this.prisma.docBox.findFirst({
      where: {
        ownerId: userId,
        displayName,
      },
    });

    if (docBox != null) {
      const err: ErrorDTO = {
        code: 400,
        errorCode: 'DISPLAYNAME_ALREADY_EXISTS',
        message: DISPLAYNAME_ALREADY_EXISTS,
      };
      throw new BadRequestException(err);
    }

    docBox = await this.prisma.docBox.create({
      data: {
        displayName,
        ownerId: userId,
      },
    });

    return docBox;
  }

  async deleteDocBox(docBoxId: number) {
    const deleteDocBox = await this.prisma.docBox.delete({
      where: {
        id: docBoxId,
      },
    });

    return deleteDocBox;
  }
}
