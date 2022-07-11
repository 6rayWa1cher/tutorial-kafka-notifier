import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  username: string;

  @Exclude()
  passwordHash: string;

  @ApiProperty()
  telegramToken?: string;
  @Exclude()
  telegramId?: string;

  @Expose({ name: 'telegramConnected' })
  @ApiProperty({ type: Boolean })
  isTelegramConnected(): boolean {
    return this.telegramId != null;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
