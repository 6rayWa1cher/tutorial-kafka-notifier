import { Module } from '@nestjs/common';
import { TknUserController } from './tkn-user.controller';

@Module({
  controllers: [TknUserController],
})
export class TknUserModule {}
