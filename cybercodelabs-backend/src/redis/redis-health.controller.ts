import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('health')
export class RedisHealthController {
  constructor(private readonly redis: RedisService) {}

  @Get('redis')
  async checkRedis(): Promise<{ status: string; data: { pong: string } }> {
    try {
      const pong = await this.redis.ping();
      return { status: 'ok', data: { pong } };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        data: { message: 'Redis connection failed' },
      });
    }
  }
}
