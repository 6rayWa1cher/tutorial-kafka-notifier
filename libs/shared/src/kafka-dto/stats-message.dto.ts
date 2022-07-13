import { IsNotEmpty, IsNumber } from 'class-validator';

export class StatsMessage {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;

  constructor(partial: Partial<StatsMessage>) {
    Object.assign(this, partial);
  }
}
