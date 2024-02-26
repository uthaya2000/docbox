import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllDocBox(userId: number) {
    const docBoxes = await this.prisma.docBox.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        displayName: true,
      },
    });

    return { data: docBoxes };
  }
}
