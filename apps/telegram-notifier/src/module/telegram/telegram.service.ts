import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log('telegram service init');
  }
  onModuleDestroy() {
    console.log('telegram service destroy');
  }

  sendMessage(chatId: string, message: string) {
    console.log(`TG[${chatId}]: ${message}`);
  }
}
