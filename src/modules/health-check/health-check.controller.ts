import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/shared/decorators/auth.decorator';

import { HealthCheckResponseDto } from './dto/health-check-response.dto';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
@ApiTags('HealthCheck')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Public()
  heathCheck(): HealthCheckResponseDto {
    const appName = this.configService.get('app.name', { infer: true });

    const status = this.healthCheckService.healthCheck();

    return {
      appName,
      status,
    };
  }
}
