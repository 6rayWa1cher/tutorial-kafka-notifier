import { AuthService } from '@app/auth/auth.service';
import { UserEntity } from '@app/core/user/dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('auth')
@Controller('auth')
export class TknAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokensDto,
  })
  async login(@Body() dto: AuthDto): Promise<TokensDto> {
    const tokens = await this.authService.login(dto.username, dto.password);
    return tokens;
  }

  @Post('reg')
  @ApiCreatedResponse({
    type: UserEntity,
  })
  async register(@Body() dto: AuthDto): Promise<UserEntity> {
    const user = await this.authService.createUser(dto.username, dto.password);
    return new UserEntity(user);
  }
}
