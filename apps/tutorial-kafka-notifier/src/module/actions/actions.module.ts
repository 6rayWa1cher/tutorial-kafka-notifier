import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
  Module,
} from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    const baseURL = this.config.getOrThrow('ESP_URL');
    const apiKey = this.config.getOrThrow('TKN_ESP_API_KEY');
    return {
      baseURL,
      timeout: 5000,
      headers: {
        Authorization: 'Bearer ' + apiKey,
      },
    };
  }
}

@Injectable()
class RpcConfigService implements ClientsModuleOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createClientOptions(): ClientProvider | Promise<ClientProvider> {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'tutorial-kafka-notifier',
          brokers: [this.config.getOrThrow('KAFKA_URL')],
        },
        producerOnlyMode: true,
      },
    };
  }
}

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useClass: RpcConfigService,
      },
    ]),
  ],
  controllers: [ActionsController],
  providers: [ActionsService, HttpConfigService],
})
export class ActionsModule {}
