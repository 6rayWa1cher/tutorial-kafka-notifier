import { Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

export abstract class ApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  private readonly logger = new Logger(ApiKeyStrategy.name);
  private readonly tokenMap: Map<string, string>;

  constructor(apiKeys: { client: string; token: string }[]) {
    super();
    this.tokenMap = new Map(
      apiKeys
        .filter(({ client, token }) => token != null && client != null)
        .map(({ client, token }) => [token, client]),
    );
    this.tokenMap.forEach((client) =>
      this.logger.log(`Registered api-key for client "${client}"`),
    );
  }

  async validate(token: string) {
    const client = this.tokenMap.get(token);
    if (client == null) {
      throw new UnauthorizedException();
    }
    return client;
  }
}
