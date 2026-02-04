import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: Date;
  checks: {
    database: HealthCheckResult;
    server: HealthCheckResult;
    memory: HealthCheckResult;
  };
  uptime: number;
}

export interface HealthCheckResult {
  status: 'up' | 'down';
  responseTime?: number;
  message?: string;
  details?: Record<string, unknown>;
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private lastHealthStatus: HealthStatus | null = null;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async performHealthCheck(): Promise<void> {
    this.logger.log('Starting scheduled health check...');

    const healthStatus = await this.checkHealth();
    this.lastHealthStatus = healthStatus;

    if (healthStatus.status === 'unhealthy') {
      this.logger.error('Health check failed!', JSON.stringify(healthStatus));
      // Here you could add alerting logic (email, Slack, etc.)
      await this.handleUnhealthyStatus(healthStatus);
    } else {
      this.logger.log('Health check passed successfully');
    }
  }

  async checkHealth(): Promise<HealthStatus> {
    const startTime = Date.now();

    const [databaseCheck, serverCheck, memoryCheck] = await Promise.all([
      this.checkDatabase(),
      this.checkServer(),
      this.checkMemory(),
    ]);

    const allHealthy =
      databaseCheck.status === 'up' &&
      serverCheck.status === 'up' &&
      memoryCheck.status === 'up';

    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date(),
      checks: {
        database: databaseCheck,
        server: serverCheck,
        memory: memoryCheck,
      },
      uptime: process.uptime(),
    };
  }

  private async checkDatabase(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      // Execute a simple query to check database connectivity
      await this.prisma.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - startTime;

      // Check if response time is acceptable (under 5 seconds)
      if (responseTime > 5000) {
        return {
          status: 'down',
          responseTime,
          message: 'Database response time is too slow',
        };
      }

      return {
        status: 'up',
        responseTime,
        message: 'Database connection is healthy',
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.logger.error('Database health check failed', error);

      return {
        status: 'down',
        responseTime,
        message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private async checkServer(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      // Check if the server process is running properly
      const pid = process.pid;
      const nodeVersion = process.version;
      const platform = process.platform;

      const responseTime = Date.now() - startTime;

      return {
        status: 'up',
        responseTime,
        message: 'Server is running',
        details: {
          pid,
          nodeVersion,
          platform,
          env: this.configService.get('NODE_ENV', 'development'),
        },
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.logger.error('Server health check failed', error);

      return {
        status: 'down',
        responseTime,
        message: `Server check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private async checkMemory(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      const memoryUsage = process.memoryUsage();
      const totalMemory = memoryUsage.heapTotal;
      const usedMemory = memoryUsage.heapUsed;
      const memoryUsagePercent = (usedMemory / totalMemory) * 100;

      const responseTime = Date.now() - startTime;

      // Alert if memory usage is above 90%
      if (memoryUsagePercent > 90) {
        return {
          status: 'down',
          responseTime,
          message: 'Memory usage is critically high',
          details: {
            heapTotal: this.formatBytes(totalMemory),
            heapUsed: this.formatBytes(usedMemory),
            external: this.formatBytes(memoryUsage.external),
            rss: this.formatBytes(memoryUsage.rss),
            usagePercent: `${memoryUsagePercent.toFixed(2)}%`,
          },
        };
      }

      return {
        status: 'up',
        responseTime,
        message: 'Memory usage is within acceptable limits',
        details: {
          heapTotal: this.formatBytes(totalMemory),
          heapUsed: this.formatBytes(usedMemory),
          external: this.formatBytes(memoryUsage.external),
          rss: this.formatBytes(memoryUsage.rss),
          usagePercent: `${memoryUsagePercent.toFixed(2)}%`,
        },
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.logger.error('Memory health check failed', error);

      return {
        status: 'down',
        responseTime,
        message: `Memory check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private formatBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  }

  private async handleUnhealthyStatus(status: HealthStatus): Promise<void> {
    // Log detailed information about the failure
    this.logger.error('=== HEALTH CHECK FAILURE DETAILS ===');

    if (status.checks.database.status === 'down') {
      this.logger.error(
        `Database: ${status.checks.database.message}`,
        status.checks.database.details,
      );
    }

    if (status.checks.server.status === 'down') {
      this.logger.error(
        `Server: ${status.checks.server.message}`,
        status.checks.server.details,
      );
    }

    if (status.checks.memory.status === 'down') {
      this.logger.error(
        `Memory: ${status.checks.memory.message}`,
        status.checks.memory.details,
      );
    }

    this.logger.error('=====================================');

    // TODO: Add alerting integration (email, Slack, PagerDuty, etc.)
    // Example: await this.alertService.sendAlert(status);
  }

  getLastHealthStatus(): HealthStatus | null {
    return this.lastHealthStatus;
  }
}
