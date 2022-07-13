import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { MessageModule } from './module/message/message.module';
import { RestModule } from './module/rest/rest.module';
import { SocialModule } from './module/social/social.module';
import errorMiddleware from './module/telegram/middleware/error.middleware';
import { TelegramModule } from './module/telegram/telegram.module';
import { EspApiKeyStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        token: config.get('TELEGRAM_TOKEN'),
        middlewares: [errorMiddleware],
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    TelegramModule,
    SocialModule,
    RestModule,
    MessageModule,
  ],
  providers: [EspApiKeyStrategy],
})
export class TelegramNotifierModule {}
