import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalStatsProviderService {
  getHello(): string {
    return 'Hello World!';
  }
}
