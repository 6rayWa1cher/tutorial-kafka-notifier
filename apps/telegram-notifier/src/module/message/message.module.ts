import { Module } from '@nestjs/common';
import { SocialModule } from '../social/social.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [SocialModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
