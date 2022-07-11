import { ApiKeyStrategy } from '@app/auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EspApiKeyStrategy extends ApiKeyStrategy {
  constructor(config: ConfigService) {
    super([{ client: 'web', token: config.get('WEB_TN_API_KEY') }]);
  }
}
