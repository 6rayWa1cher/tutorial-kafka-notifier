import { UserModule } from '@app/core/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ViewErrorInterceptor } from '../../interceptor';
import { PasswordEncoderModule } from '../password-encoder/password-encoder.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy';

@Module({
  imports: [UserModule, PassportModule, PasswordEncoderModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, ViewErrorInterceptor],
})
export class AuthModule {}
