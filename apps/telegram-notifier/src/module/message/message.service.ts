import { PrismaService } from '@app/prisma';
import { StatsMessage } from '@app/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { KafkaRetriableException } from '@nestjs/microservices';
import { SocialService } from '../social/social.service';

@Injectable()
export class MessageService {
  constructor(
    private socialService: SocialService,
    private prisma: PrismaService,
  ) {}

  async sendNotification(message: StatsMessage) {
    const userId = message.userId;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new KafkaRetriableException(`Unknown user ${userId}`);

    if (user.telegramId != null) {
      this.socialService.sendNotificationToTelegram(
        user,
        `You clicked the "make" button ${message.count} times`,
      );
    }
  }
}
