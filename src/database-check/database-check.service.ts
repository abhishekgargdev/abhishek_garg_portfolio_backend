import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabaseCheckService {
  private readonly logger = new Logger(DatabaseCheckService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async scheduledDailyCheck() {
    this.logger.log('Running scheduled PostgreSQL database check...');
    await this.checkAndStore();
  }

  private async checkAndStore() {
    const now = new Date();
    try {
      // Perform a simple query to check if the database is accessible
      await this.prisma.$queryRaw`SELECT 1`;
      
      this.logger.log('PostgreSQL database connection successful');
      await this.upsertDatabaseRecord('up', { message: 'Database connection successful' });
    } catch (error: any) {
      this.logger.error('PostgreSQL database connection failed', error?.stack ?? error);
      await this.upsertDatabaseRecord('down', { error: error?.message ?? String(error) });
    }
  }

  private async upsertDatabaseRecord(status: string, details: any) {
    const now = new Date();
    try {
      const existing = await this.prisma.databaseCheck.findFirst();
      if (existing) {
        await this.prisma.databaseCheck.update({
          where: { id: existing.id },
          data: {
            status,
            details,
            lastCheckedAt: now,
          },
        });
      } else {
        await this.prisma.databaseCheck.create({
          data: {
            status,
            details,
            lastCheckedAt: now,
          },
        });
      }
    } catch (err) {
      this.logger.error('Failed to upsert DatabaseCheck record', err);
    }
  }
}
