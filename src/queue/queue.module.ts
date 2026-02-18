import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUE_NAMES } from './constants/queue.constants';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // Prefer a single REDIS_URL (useful for Upstash TLS Redis URL). Fallback to host/port/password.
        redis: (() => {
          const redisUrl = configService.get<string>('REDIS_URL');
          if (redisUrl) return { url: redisUrl } as any;

          const host = configService.get('REDIS_HOST', 'localhost');
          const port = Number(configService.get('REDIS_PORT', 6379));
          const password = configService.get('REDIS_PASSWORD');

          return { host, port, password } as any;
        })(),
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      { name: QUEUE_NAMES.MAIL },
      { name: QUEUE_NAMES.NOTIFICATION },
      { name: QUEUE_NAMES.FILE_PROCESSING },
      { name: QUEUE_NAMES.ANALYTICS },
      { name: QUEUE_NAMES.CLEANUP },
    ),
  ],
  exports: [BullModule],
})
export class QueueModule {}
