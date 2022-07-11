import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  message: string;

  constructor(partial: Partial<MessageDto>) {
    Object.assign(this, partial);
  }
}
