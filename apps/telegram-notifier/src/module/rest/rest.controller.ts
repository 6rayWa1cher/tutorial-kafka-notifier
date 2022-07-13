import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDto } from './dto';
import { RestService } from './rest.service';

@ApiTags('message')
@Controller('message')
export class RestController {
  constructor(private messageService: RestService) {}

  @Post('notify')
  @HttpCode(HttpStatus.OK)
  notify(@Body() dto: NotificationDto) {
    return this.messageService.notify(dto);
  }
}
