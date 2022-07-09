import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class PasswordEncoderService {
  encodePassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  comparePasswords(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
