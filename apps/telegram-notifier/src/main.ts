import { NestFactory } from '@nestjs/core';
import { TelegramNotifierModule } from './telegram-notifier.module';

async function bootstrap() {
  const app = await NestFactory.create(TelegramNotifierModule);
  await app.listen(4000);
}
bootstrap();
