import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { TelegramService } from '../telegram/telegram.service';
import { SocialNotConnectedException } from './exception';

@Injectable()
export class SocialService {
  constructor(private readonly telegramService: TelegramService) {}
  sendNotificationToTelegram(user: User, message: string) {
    const telegramId = user.telegramId;
    if (telegramId == null)
      throw new SocialNotConnectedException('telegram', user.id);
    return this.telegramService.sendMessage(telegramId, message);
  }
}
