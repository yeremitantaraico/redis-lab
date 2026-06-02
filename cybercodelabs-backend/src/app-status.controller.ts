import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis/redis.service';

interface ApiStatusData {
  name: string;
  description: string;
  version: string;
  uptimeSeconds: number;
  redis: 'up' | 'down';
}

@Controller()
export class AppStatusController {
  constructor(
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  async getRootStatus(): Promise<{ status: string; data: ApiStatusData }> {
    return this.buildStatusResponse();
  }

  @Get('health')
  async getHealth(): Promise<{ status: string; data: ApiStatusData }> {
    return this.buildStatusResponse();
  }

  private async buildStatusResponse(): Promise<{ status: string; data: ApiStatusData }> {
    try {
      await this.redis.ping();
      return {
        status: 'ok',
        data: {
          name: this.config.get<string>('NAME', 'cybercodelabs-backend'),
          description: this.config.get<string>(
            'DESCRIPTION',
            'API for the Cybercode Labs project',
          ),
          version: this.config.get<string>('VERSION', '1.0.0'),
          uptimeSeconds: Math.floor(process.uptime()),
          redis: 'up',
        },
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        data: {
          name: this.config.get<string>('NAME', 'cybercodelabs-backend'),
          description: this.config.get<string>(
            'DESCRIPTION',
            'API for the Cybercode Labs project',
          ),
          version: this.config.get<string>('VERSION', '1.0.0'),
          uptimeSeconds: Math.floor(process.uptime()),
          redis: 'down',
        },
      });
    }
  }
}
