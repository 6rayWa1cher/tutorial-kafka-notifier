import { Module } from '@nestjs/common';
import { RestService } from './rest.service';
import { RestController } from './rest.controller';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [SocialModule],
  providers: [RestService],
  controllers: [RestController],
})
export class RestModule {}
