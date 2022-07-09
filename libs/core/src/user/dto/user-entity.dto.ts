import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  username: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  telegramToken?: string;
  @Exclude()
  telegramId?: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
