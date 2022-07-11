import { GetUser, JwtGuard } from '@app/auth';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs';
import { ActionsService } from './actions.service';
import { MessageDto } from './dto';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post('make')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: MessageDto,
  })
  makeAction(@GetUser('id') userId: number) {
    return this.actionsService
      .makeAction(userId)
      .pipe(map(() => new MessageDto({ message: 'ok' })));
  }
}
