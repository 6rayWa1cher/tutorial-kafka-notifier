import { UserEntity } from '@app/core/user/dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Render('auth/login')
  @Get('login')
  loginForm(@Query('failed') failed?: string) {
    return { error: !!failed ? 'Incorrect username or password' : '' };
  }

  @Render('auth/login')
  @Post('login')
  async login(@Body() dto: AuthDto) {
    throw new Error('kinda error');
    // return user;
  }

  @Render('auth/reg')
  @Get('reg')
  registerForm() {
    return;
  }

  @Post('reg')
  async register(@Body() dto: AuthDto, @Res() res: Response) {
    // try {
    //   await this.authService.createUser(dto.username, dto.password);
    //   res.redirect('/');
    // } catch (err) {
    //   let errorMessage: string;
    //   if (err instanceof Prisma)
    //   res.render('auth/reg', { error:  });
    // }
  }
}
