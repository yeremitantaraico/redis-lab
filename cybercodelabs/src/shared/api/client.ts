import { API_BASE_URL } from './config';
import type { ApiResponse, Message, RedisHealth } from './types';

async function parseJson<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T;
  if (!response.ok) {
    const error = body as { message?: string };
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }
  return body;
}

export async function fetchRedisHealth(): Promise<RedisHealth> {
  const response = await fetch(`${API_BASE_URL}/health/redis`);
  const body = await parseJson<ApiResponse<RedisHealth>>(response);
  return body.data;
}

export async function fetchMessages(): Promise<Message[]> {
  const response = await fetch(`${API_BASE_URL}/messages`);
  const body = await parseJson<ApiResponse<Message[]>>(response);
  return body.data;
}

export async function createMessage(
  user: string,
  text: string,
): Promise<Message> {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, text }),
  });
  const body = await parseJson<ApiResponse<Message>>(response);
  return body.data;
}
