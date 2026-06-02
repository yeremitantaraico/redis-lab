export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface Message {
  id: string;
  user: string;
  text: string;
  at: string;
  ttlSeconds: number | null;
}

export interface RedisHealth {
  pong: string;
}
