import { GetUser, JwtGuard } from '@app/auth';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from './dto';

@ApiTags('user')
@Controller('user')
export class TknUserController {
  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
  })
  getMe(@GetUser() user: User) {
    return new UserEntity(user);
  }
}
