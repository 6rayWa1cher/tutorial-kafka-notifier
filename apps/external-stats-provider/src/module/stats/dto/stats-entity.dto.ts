import { ApiProperty } from '@nestjs/swagger';

export class StatsEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  userId: number;

  constructor(partial: Partial<StatsEntity>) {
    Object.assign(this, partial);
  }
}
