import {
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StatsMessage } from 'libs/shared/src';
import { RpcBadRequestException } from './filter';
import { MessageService } from './message.service';

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(RpcBadRequestException)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @EventPattern('stats-topic')
  statsPublished(@Payload() message: StatsMessage): Promise<void> {
    return this.messageService.sendNotification(message);
  }
}
