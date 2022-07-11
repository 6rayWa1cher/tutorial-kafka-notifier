import { UserService } from '@app/core/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TokensDto } from './dto/tokens.dto';
import { PasswordEncoderService } from './password-encoder.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private passwordEncoderService: PasswordEncoderService,
    private config: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (!user) return null;

    const passwordCorrect = await this.passwordEncoderService.comparePasswords(
      pass,
      user.passwordHash,
    );

    if (!passwordCorrect) return null;

    return user;
  }

  async login(username: string, password: string): Promise<TokensDto> {
    const user = await this.validateUser(username, password);

    if (user == null)
      throw new UnauthorizedException('Credentials are not valid');

    return await this.signToken(user.id, username);
  }

  private async signToken(
    userId: number,
    username: string,
  ): Promise<TokensDto> {
    const payload = {
      sub: userId,
      username,
    };

    const secret = this.config.get('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return new TokensDto({ accessToken });
  }

  async createUser(username: string, pass: string): Promise<User> {
    const passwordHash = await this.passwordEncoderService.encodePassword(pass);

    const user = await this.userService.createUser(username, passwordHash);

    return user;
  }
}
