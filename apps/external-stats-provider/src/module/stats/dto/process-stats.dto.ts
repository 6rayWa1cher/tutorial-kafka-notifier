import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProcessStatsDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
