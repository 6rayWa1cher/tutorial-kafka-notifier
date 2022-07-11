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

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [ActionsController],
  providers: [ActionsService, HttpConfigService],
})
export class ActionsModule {}
