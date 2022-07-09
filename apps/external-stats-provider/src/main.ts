import { NestFactory } from '@nestjs/core';
import { ExternalStatsProviderModule } from './external-stats-provider.module';

async function bootstrap() {
  const app = await NestFactory.create(ExternalStatsProviderModule);
  await app.listen(5000);
}
bootstrap();
