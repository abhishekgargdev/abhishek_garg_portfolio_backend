import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing Redis connection check...');
    await this.checkAndStore();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scheduledDailyCheck() {
    this.logger.log('Running scheduled Redis connection check...');
    await this.checkAndStore();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scheduledDailyRedisInsert() {
    this.logger.log('Running scheduled Redis test data insertion...');
    await this.insertTestData();
  }

  private async insertTestData() {
    const url = this.configService.get<string>('UPSTASH_REDIS_REST_URL');
    const token = this.configService.get<string>('UPSTASH_REDIS_REST_TOKEN');

    if (!url || !token) {
      this.logger.warn('Upstash Redis REST URL or token not configured for test data insertion');
      return;
    }

    const testKey = 'db_check:test:timestamp';
    const testValue = new Date().toISOString();

    try {
      // Set a test key with the current timestamp
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(['SET', testKey, testValue]),
      });

      const text = await res.text();

      if (!res.ok) {
        this.logger.error(`Redis test data insertion failed: ${res.status} ${text}`);
        return;
      }

      this.logger.log(`Redis test data inserted successfully: ${testKey} = ${testValue}`);
    } catch (error: any) {
      this.logger.error('Redis test data insertion error', error?.stack ?? error);
    }
  }

  private async checkAndStore() {
    const url = this.configService.get<string>('UPSTASH_REDIS_REST_URL');
    const token = this.configService.get<string>('UPSTASH_REDIS_REST_TOKEN');

    if (!url || !token) {
      this.logger.warn('Upstash Redis REST URL or token not configured');
      await this.upsertRedisRecord('down', { reason: 'missing_credentials' });
      return;
    }

    try {
      // Upstash REST accepts Redis commands as JSON array in POST body
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(['PING']),
      });

      const text = await res.text();

      if (!res.ok) {
        this.logger.error(`Upstash ping failed: ${res.status} ${text}`);
        await this.upsertRedisRecord('down', { status: res.status, body: text });
        return;
      }

      // store success
      this.logger.log(`Upstash ping succeeded: ${text}`);
      await this.upsertRedisRecord('up', { status: res.status, body: text });
    } catch (error: any) {
      this.logger.error('Upstash ping error', error?.stack ?? error);
      await this.upsertRedisRecord('down', { error: error?.message ?? String(error) });
    }
  }

  private async upsertRedisRecord(status: string, details: any) {
    const now = new Date();
    try {
      const existing = await this.prisma.redisConnection.findFirst();
      if (existing) {
        await this.prisma.redisConnection.update({
          where: { id: existing.id },
          data: {
            status,
            details,
            lastCheckedAt: now,
          },
        });
      } else {
        await this.prisma.redisConnection.create({
          data: {
            status,
            details,
            lastCheckedAt: now,
          },
        });
      }
    } catch (err) {
      this.logger.error('Failed to upsert RedisConnection record', err);
    }
  }
}
