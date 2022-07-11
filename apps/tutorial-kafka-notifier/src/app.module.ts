import { AuthModule } from '@app/auth';
import { UserModule } from '@app/core/user/user.module';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActionsModule } from './module/actions/actions.module';
import { TknAuthModule } from './module/tkn-auth/tkn-auth.module';
import { TknUserModule } from './module/tkn-user/tkn-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    TknAuthModule,
    TknUserModule,
    ActionsModule,
  ],
})
export class AppModule {}
