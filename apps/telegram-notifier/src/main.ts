import { PrismaClientExceptionFilter } from '@app/prisma/filter';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { TelegramNotifierModule } from './telegram-notifier.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tutorial-Kafka-Notifier')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(TelegramNotifierModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.use(helmet());
  app.enableCors();

  setupSwagger(app);

  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'telegram-notifier',
        brokers: [config.getOrThrow('KAFKA_URL')],
      },
      consumer: {
        groupId: 'telegram-notifier-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
