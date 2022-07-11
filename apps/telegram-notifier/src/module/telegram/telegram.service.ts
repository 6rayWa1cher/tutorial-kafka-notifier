import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  sendMessage(chatId: string, message: string) {
    this.bot.telegram.sendMessage(chatId, message);
  }
}
