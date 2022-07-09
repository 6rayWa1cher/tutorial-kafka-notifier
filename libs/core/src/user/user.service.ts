import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findById(userId: number): Promise<User | null> {
    const entity = this.prisma.user.findUnique({ where: { id: userId } });
    return entity;
  }

  findByUsername(username: string): Promise<User | null> {
    const entity = this.prisma.user.findUnique({ where: { username } });
    return entity;
  }

  findByTelegramToken(telegramToken: string): Promise<User | null> {
    const entity = this.prisma.user.findUnique({
      where: { telegramToken },
    });
    return entity;
  }

  findByTelegramId(telegramId: string): Promise<User | null> {
    const entity = this.prisma.user.findUnique({ where: { telegramId } });
    return entity;
  }

  createUser(username: string, passwordHash: string): Promise<User> {
    const user = this.prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });
    return user;
  }
}
