import { ApiKeyGuard } from '@app/auth';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProcessStatsDto, StatsEntity } from './dto';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: StatsEntity,
  })
  async processStats(@Body() dto: ProcessStatsDto): Promise<StatsEntity> {
    const stats = await this.statsService.processStats(dto.userId);
    return new StatsEntity(stats);
  }
}
