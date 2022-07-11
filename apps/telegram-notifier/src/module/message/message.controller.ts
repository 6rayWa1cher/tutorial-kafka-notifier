import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDto } from './dto';
import { MessageService } from './message.service';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('notify')
  @HttpCode(HttpStatus.OK)
  notifyHttp(@Body() dto: NotificationDto) {
    return this.messageService.notify(dto);
  }
}
