import { ApiKeyStrategy } from '@app/auth';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EspApiKeyStrategy extends ApiKeyStrategy {
  constructor(config: ConfigService) {
    super(getEspApiTokens(config));
  }
}

function getEspApiTokens(config: ConfigService) {
  const clients = [{ client: 'tkn', token: config.get('TKN_API_TOKEN') }];
  const filtered = clients.filter((c) => c.token != null);

  const logger = new Logger(EspApiKeyStrategy.name);
  filtered.forEach(({ client }) =>
    logger.log(`Registered api-key for client ${client}`),
  );
  return filtered;
}
