import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Stats } from '@prisma/client';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async processStats(userId: number): Promise<Stats> {
    const stats = await this.prisma.stats.upsert({
      where: {
        userId,
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        userId,
      },
    });
    return stats;
  }
}
