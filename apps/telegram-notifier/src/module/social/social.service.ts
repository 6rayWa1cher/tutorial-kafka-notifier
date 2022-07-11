import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { TelegramService } from '../telegram/telegram.service';
import { SocialNotConnectedException } from './exception';

@Injectable()
export class SocialService {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly prisma: PrismaService,
  ) {}

  sendNotificationToTelegram(user: User, message: string) {
    const telegramId = user.telegramId;
    if (telegramId == null)
      throw new SocialNotConnectedException('telegram', user.id);
    return this.telegramService.sendMessage(telegramId, message);
  }

  async connectTelegramToken(
    chatId: string,
    token: string,
  ): Promise<User | null> {
    const user = this.prisma.user.findFirst({
      where: { telegramToken: token },
    });

    if (!user) return null;

    const outUser = await this.prisma.user.update({
      where: { telegramToken: token },
      data: { telegramId: chatId },
    });
    return outUser;
  }

  async disconnectTelegramToken(chatId: string, token: string) {
    await this.prisma.user.update({
      where: { telegramToken: token, telegramId: chatId },
      data: { telegramId: null },
    });
  }
}
