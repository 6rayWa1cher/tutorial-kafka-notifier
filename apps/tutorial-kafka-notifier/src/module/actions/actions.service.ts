import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class ActionsService {
  constructor(private readonly httpService: HttpService) {}

  makeAction(userId: number) {
    return this.httpService
      .post('/stats', { userId })
      .pipe(map((res) => res.data));
  }
}
