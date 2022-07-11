import { UserModule } from '@app/core/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PasswordEncoderService } from './password-encoder.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [AuthService, JwtStrategy, PasswordEncoderService],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
