import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

function getUrl(config: ConfigService): string {
  const rawUrl = config.getOrThrow('DATABASE_URL');
  const interpolateRegex = /\${([\s\S]+?)}/g;
  const match = rawUrl.matchAll(interpolateRegex);
  let output: string = rawUrl;
  for (const result of match) {
    const [block, varName] = result;
    const varValue = config.getOrThrow(varName);
    output = output.replace(block, varValue);
  }
  return output;
}

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: getUrl(config),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([this.stats.deleteMany(), this.user.deleteMany()]);
  }
}
