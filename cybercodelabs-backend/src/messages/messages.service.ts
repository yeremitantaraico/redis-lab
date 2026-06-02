import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { RedisService } from '../redis/redis.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  MESSAGE_KEY_PREFIX,
  MessageResponse,
  StoredMessage,
} from './messages.types';

@Injectable()
export class MessagesService {
  private readonly ttlSeconds: number;

  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {
    const ttl = this.config.get<string>('MESSAGE_TTL_SECONDS', '60');
    this.ttlSeconds = Number.parseInt(ttl, 10) || 60;
  }

  async create(dto: CreateMessageDto): Promise<MessageResponse> {
    const id = randomUUID();
    const key = `${MESSAGE_KEY_PREFIX}${id}`;
    const stored: StoredMessage = {
      id,
      user: dto.user.trim(),
      text: dto.text.trim(),
      at: new Date().toISOString(),
    };

    await this.redis.set(key, JSON.stringify(stored), this.ttlSeconds);

    return { ...stored, ttlSeconds: this.ttlSeconds };
  }

  async findAll(): Promise<MessageResponse[]> {
    const keys = await this.redis.scanKeys(`${MESSAGE_KEY_PREFIX}*`);
    if (keys.length === 0) {
      return [];
    }

    const messages = await Promise.all(
      keys.map(async (key) => this.loadMessage(key)),
    );

    return messages
      .filter((message): message is MessageResponse => message !== null)
      .sort((a, b) => b.at.localeCompare(a.at));
  }

  private async loadMessage(key: string): Promise<MessageResponse | null> {
    const raw = await this.redis.get(key);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as StoredMessage;
      const remaining = await this.redis.ttl(key);
      const ttlSeconds = remaining > 0 ? remaining : null;
      return { ...parsed, ttlSeconds };
    } catch {
      return null;
    }
  }
}
