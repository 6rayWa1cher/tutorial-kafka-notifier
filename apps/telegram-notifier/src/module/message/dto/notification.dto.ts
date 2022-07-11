import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum NotificationProviders {
  Telegram = 'telegram',
}
export class NotificationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsArray()
  @IsString({ each: true })
  @IsIn(['telegram'], { each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    enum: NotificationProviders,
    isArray: true,
  })
  whereToNotify: NotificationProviders[];
}
