import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [SocialModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
