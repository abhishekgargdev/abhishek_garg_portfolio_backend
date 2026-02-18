import { Module, Global } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [ConfigModule, PrismaModule, ScheduleModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
