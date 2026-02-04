import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthService, HealthStatus } from './health.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  async checkHealth(): Promise<ApiResponse<HealthStatus>> {
    const healthStatus = await this.healthService.checkHealth();

    const statusCode =
      healthStatus.status === 'healthy'
        ? HttpStatus.OK
        : HttpStatus.SERVICE_UNAVAILABLE;

    return createResponse(
      statusCode,
      healthStatus.status === 'healthy'
        ? 'All systems operational'
        : 'One or more systems are experiencing issues',
      healthStatus,
    );
  }

  @Get('last')
  getLastHealthStatus(): ApiResponse<HealthStatus | null> {
    const lastStatus = this.healthService.getLastHealthStatus();

    if (!lastStatus) {
      return createResponse(
        HttpStatus.OK,
        'No health check has been performed yet',
        null,
      );
    }

    return createResponse(
      HttpStatus.OK,
      'Last health check status retrieved',
      lastStatus,
    );
  }

  @Get('database')
  async checkDatabase(): Promise<ApiResponse<HealthStatus['checks']['database']>> {
    const healthStatus = await this.healthService.checkHealth();

    const statusCode =
      healthStatus.checks.database.status === 'up'
        ? HttpStatus.OK
        : HttpStatus.SERVICE_UNAVAILABLE;

    return createResponse(
      statusCode,
      healthStatus.checks.database.message || 'Database status checked',
      healthStatus.checks.database,
    );
  }

  @Get('server')
  async checkServer(): Promise<ApiResponse<HealthStatus['checks']['server']>> {
    const healthStatus = await this.healthService.checkHealth();

    return createResponse(
      HttpStatus.OK,
      healthStatus.checks.server.message || 'Server status checked',
      healthStatus.checks.server,
    );
  }

  @Get('memory')
  async checkMemory(): Promise<ApiResponse<HealthStatus['checks']['memory']>> {
    const healthStatus = await this.healthService.checkHealth();

    const statusCode =
      healthStatus.checks.memory.status === 'up'
        ? HttpStatus.OK
        : HttpStatus.SERVICE_UNAVAILABLE;

    return createResponse(
      statusCode,
      healthStatus.checks.memory.message || 'Memory status checked',
      healthStatus.checks.memory,
    );
  }
}
