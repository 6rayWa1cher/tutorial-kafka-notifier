import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

export abstract class ApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  private tokenMap: Map<string, string>;

  constructor(apiKeys: { client: string; token: string }[]) {
    super();
    this.tokenMap = new Map(
      apiKeys.map(({ client, token }) => [token, client]),
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
