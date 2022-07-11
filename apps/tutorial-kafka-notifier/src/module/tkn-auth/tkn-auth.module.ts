import { AuthModule } from '@app/auth';
import { Module } from '@nestjs/common';
import { TknAuthController } from './tkn-auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [TknAuthController],
})
export class TknAuthModule {}
