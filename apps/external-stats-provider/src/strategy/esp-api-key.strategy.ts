import { ApiKeyStrategy } from '@app/auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EspApiKeyStrategy extends ApiKeyStrategy {
  constructor(config: ConfigService) {
    super([{ client: 'tkn', token: config.get('TKN_API_TOKEN') }]);
  }
}
