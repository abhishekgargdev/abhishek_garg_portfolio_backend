import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService, HealthStatus } from './health.service';
import { ApiResponse as ApiResponseInterface } from 'src/common/interfaces/api-response.interface';
import { StatusCodes } from 'src/common/constants/status-codes.constant';
import { ResponseUtil } from 'src/common/utils/response.util';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check overall system health' })
  @ApiResponse({
    status: 200,
    description: 'All systems are healthy',
    schema: {
      example: {
        success: true,
        data: {
          status: 'healthy',
          checks: {
            database: { status: 'up', message: 'PostgreSQL connected' },
            redis: { status: 'up', message: 'Redis connected via Upstash' },
            server: { status: 'up', message: 'Server running' },
            memory: { status: 'up', usage: '256MB / 512MB' },
          },
        },
        message: 'All systems operational',
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'One or more systems are down',
    schema: {
      example: {
        success: false,
        data: null,
        message: 'One or more systems are experiencing issues',
      },
    },
  })
  async checkHealth(): Promise<ApiResponseInterface<HealthStatus>> {
    const healthStatus = await this.healthService.checkHealth();

    const statusCode =
      healthStatus.status === 'healthy'
        ? StatusCodes.OK
        : StatusCodes.SERVICE_UNAVAILABLE;

    return ResponseUtil.success(
      healthStatus,
      healthStatus.status === 'healthy'
        ? 'All systems operational'
        : 'One or more systems are experiencing issues',
      statusCode,
    );
  }

  @Get('last')
  @ApiOperation({ summary: 'Get last health check results' })
  @ApiResponse({
    status: 200,
    description: 'Last health check status retrieved',
    schema: {
      example: {
        success: true,
        data: {
          timestamp: '2025-02-04T10:30:45.123Z',
          status: 'healthy',
          checks: {
            database: { status: 'up', message: 'PostgreSQL connected', responseTime: '12ms' },
            redis: { status: 'up', message: 'Redis connected via Upstash', responseTime: '45ms' },
            server: { status: 'up', message: 'Server running', uptime: '2h 30m' },
            memory: { status: 'up', usage: '256MB / 512MB', percentage: 50 },
          },
        },
        message: 'Last health check status retrieved',
      },
    },
  })
  getLastHealthStatus() {
    const lastStatus = this.healthService.getLastHealthStatus();

    if (!lastStatus) {
      return ResponseUtil.success(
        null,
        'No health check has been performed yet',
        StatusCodes.OK,
      );
    }

    return ResponseUtil.success(
      lastStatus,
      'Last health check status retrieved',
      StatusCodes.OK,
    );
  }

  @Get('database')
  @ApiOperation({ summary: 'Check database health' })
  @ApiResponse({
    status: 200,
    description: 'Database status checked',
    schema: {
      example: {
        success: true,
        data: { status: 'up', message: 'PostgreSQL connected', responseTime: '12ms' },
        message: 'Database status checked',
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Database is down',
    schema: {
      example: {
        success: false,
        data: { status: 'down', message: 'Connection timeout' },
        message: 'Database status checked',
      },
    },
  })
  async checkDatabase(): Promise<
    ApiResponseInterface<HealthStatus['checks']['database']>
  > {
    const healthStatus = await this.healthService.checkHealth();

    const statusCode =
      healthStatus.checks.database.status === 'up'
        ? StatusCodes.OK
        : StatusCodes.SERVICE_UNAVAILABLE;

    return ResponseUtil.success(
      healthStatus.checks.database,
      healthStatus.checks.database.message ?? 'Database status checked',
      statusCode,
    );
  }

  @Get('server')
  @ApiOperation({ summary: 'Check server health' })
  @ApiResponse({
    status: 200,
    description: 'Server status checked',
    schema: {
      example: {
        success: true,
        data: { status: 'up', message: 'Server running', uptime: '2h 30m', version: '1.0.0' },
        message: 'Server status checked',
      },
    },
  })
  async checkServer(): Promise<
    ApiResponseInterface<HealthStatus['checks']['server']>
  > {
    const healthStatus = await this.healthService.checkHealth();

    return ResponseUtil.success(
      healthStatus.checks.server,
      healthStatus.checks.server.message ?? 'Server status checked',
      StatusCodes.OK,
    );
  }

  @Get('memory')
  @ApiOperation({ summary: 'Check memory usage' })
  @ApiResponse({
    status: 200,
    description: 'Memory status checked',
    schema: {
      example: {
        success: true,
        data: { status: 'up', message: 'Memory usage normal', usage: '256MB / 512MB', percentage: 50 },
        message: 'Memory status checked',
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Memory usage critical',
    schema: {
      example: {
        success: false,
        data: { status: 'down', message: 'Memory usage critical', usage: '490MB / 512MB', percentage: 95 },
        message: 'Memory status checked',
      },
    },
  })
  async checkMemory(): Promise<
    ApiResponseInterface<HealthStatus['checks']['memory']>
  > {
    const healthStatus = await this.healthService.checkHealth();

    const statusCode =
      healthStatus.checks.memory.status === 'up'
        ? StatusCodes.OK
        : StatusCodes.SERVICE_UNAVAILABLE;

    return ResponseUtil.success(
      healthStatus.checks.memory,
      healthStatus.checks.memory.message ?? 'Memory status checked',
      statusCode,
    );
  }
}
