import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { SocialService } from './social.service';

@Module({
  imports: [TelegramModule],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
