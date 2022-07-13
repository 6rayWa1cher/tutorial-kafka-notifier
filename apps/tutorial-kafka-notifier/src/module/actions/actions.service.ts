import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { delayWhen, from, map, mergeMap } from 'rxjs';
import { Client, ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ActionsService implements OnModuleDestroy {
  constructor(
    private readonly httpService: HttpService,
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka,
  ) {}

  onModuleDestroy() {
    this.client.close();
  }

  makeAction(userId: number) {
    return this.httpService.post('/stats', { userId }).pipe(
      map((res) => res.data),
      mergeMap((data) =>
        from(
          this.client.emit('stats-topic', {
            key: userId,
            value: data,
          }),
        ),
      ),
    );
  }
}
