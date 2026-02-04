import { Controller, Get } from '@nestjs/common';
import { HealthService, HealthStatus } from './health.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { StatusCodes } from 'src/common/constants/status-codes.constant';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async checkHealth(): Promise<ApiResponse<HealthStatus>> {
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
  async checkDatabase(): Promise<
    ApiResponse<HealthStatus['checks']['database']>
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
  async checkServer(): Promise<
    ApiResponse<HealthStatus['checks']['server']>
  > {
    const healthStatus = await this.healthService.checkHealth();

    return ResponseUtil.success(
      healthStatus.checks.server,
      healthStatus.checks.server.message ?? 'Server status checked',
      StatusCodes.OK,
    );
  }

  @Get('memory')
  async checkMemory(): Promise<
    ApiResponse<HealthStatus['checks']['memory']>
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
