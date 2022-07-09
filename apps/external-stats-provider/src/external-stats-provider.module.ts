import { Module } from '@nestjs/common';
import { ExternalStatsProviderController } from './external-stats-provider.controller';
import { ExternalStatsProviderService } from './external-stats-provider.service';

@Module({
  imports: [],
  controllers: [ExternalStatsProviderController],
  providers: [ExternalStatsProviderService],
})
export class ExternalStatsProviderModule {}
