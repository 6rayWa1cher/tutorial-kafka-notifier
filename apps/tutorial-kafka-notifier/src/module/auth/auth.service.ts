import { UserEntity } from '@app/core/user/dto';
import { UserService } from '@app/core/user/user.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PasswordEncoderService } from '../password-encoder/password-encoder.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordEncoderService: PasswordEncoderService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (!user) return null;

    if (!this.passwordEncoderService.comparePasswords(pass, user.passwordHash))
      return null;

    return user;
  }

  async createUser(username: string, pass: string): Promise<UserEntity> {
    const passwordHash = await this.passwordEncoderService.encodePassword(pass);

    const user = await this.userService.createUser(username, passwordHash);

    return user;
  }
}
