import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty()
  accessToken: string;

  constructor(partial: Partial<TokensDto>) {
    Object.assign(this, partial);
  }
}
