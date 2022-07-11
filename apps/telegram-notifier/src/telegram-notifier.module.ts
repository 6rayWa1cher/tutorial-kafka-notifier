import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './module/message/message.module';
import { SocialModule } from './module/social/social.module';
import { TelegramModule } from './module/telegram/telegram.module';
import { EspApiKeyStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TelegramModule,
    SocialModule,
    MessageModule,
  ],
  providers: [EspApiKeyStrategy],
})
export class TelegramNotifierModule {}
