import { Controller, Get } from '@nestjs/common';
import { ExternalStatsProviderService } from './external-stats-provider.service';

@Controller()
export class ExternalStatsProviderController {
  constructor(private readonly externalStatsProviderService: ExternalStatsProviderService) {}

  @Get()
  getHello(): string {
    return this.externalStatsProviderService.getHello();
  }
}
