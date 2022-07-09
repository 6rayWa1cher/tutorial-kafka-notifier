import { UserModule } from '@app/core/user/user.module';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { PasswordEncoderModule } from './module/password-encoder/password-encoder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    PasswordEncoderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
