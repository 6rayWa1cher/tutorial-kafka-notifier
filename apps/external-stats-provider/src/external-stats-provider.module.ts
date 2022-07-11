import { UserModule } from '@app/core/user/user.module';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatsModule } from './module/stats/stats.module';
import { EspApiKeyStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    StatsModule,
  ],
  providers: [EspApiKeyStrategy],
})
export class ExternalStatsProviderModule {}
