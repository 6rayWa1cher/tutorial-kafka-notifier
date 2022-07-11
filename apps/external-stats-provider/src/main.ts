import { PrismaClientExceptionFilter } from '@app/prisma/filter';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ExternalStatsProviderModule } from './external-stats-provider.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('External-Stats-Provider')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(ExternalStatsProviderModule);

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

  await app.listen(5000);
}
bootstrap();
