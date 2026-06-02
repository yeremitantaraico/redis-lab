import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const redisUrl =
      this.config.get<string>('REDIS_URL') ?? 'redis://127.0.0.1:6379/0';

    this.client = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.client.on('error', (error: Error) => {
      this.logger.error(`Redis error: ${error.message}`);
    });
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
    }
  }

  private getClient(): Redis {
    if (!this.client) {
      throw new Error('Redis client is not initialized');
    }
    return this.client;
  }

  async ping(): Promise<string> {
    const client = this.getClient();
    if (client.status !== 'ready') {
      await client.connect();
    }
    return client.ping();
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    const client = this.getClient();
    if (client.status !== 'ready') {
      await client.connect();
    }
    await client.set(key, value, 'EX', ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    const client = this.getClient();
    if (client.status !== 'ready') {
      await client.connect();
    }
    return client.get(key);
  }

  async ttl(key: string): Promise<number> {
    const client = this.getClient();
    if (client.status !== 'ready') {
      await client.connect();
    }
    return client.ttl(key);
  }

  /** Busca claves con SCAN (evita KEYS en producción). */
  async scanKeys(pattern: string): Promise<string[]> {
    const client = this.getClient();
    if (client.status !== 'ready') {
      await client.connect();
    }

    const keys: string[] = [];
    let cursor = '0';

    do {
      const [nextCursor, batch] = await client.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        100,
      );
      cursor = nextCursor;
      keys.push(...batch);
    } while (cursor !== '0');

    return keys;
  }
}
