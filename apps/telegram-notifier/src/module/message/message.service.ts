import { PrismaService } from '@app/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SocialService } from '../social/social.service';
import { NotificationDto } from './dto';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private socialService: SocialService,
    private readonly prisma: PrismaService,
  ) {}

  async notify(dto: NotificationDto) {
    const userId = dto.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException(`Unknown user ${userId}`);

    for (const provider of dto.whereToNotify) {
      switch (provider) {
        case 'telegram':
          try {
            this.socialService.sendNotificationToTelegram(user, dto.message);
          } catch (err) {
            this.logger.debug(err.message);
          }
          break;
        default:
          throw new BadRequestException(`Unknown provider ${provider}`);
      }
    }
  }
}
