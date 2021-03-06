import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { PrismaClientExceptionFilter } from '@app/prisma/filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
        clientId: 'tutorial-kafka-notifier',
        brokers: [config.getOrThrow('KAFKA_URL')],
      },
      producerOnlyMode: true,
    },
  });

  await app.startAllMicroservices();
  await app.listen(8080);
}
bootstrap();
