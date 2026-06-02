import { useCallback, useEffect, useState } from 'react';
import { fetchRedisHealth } from '../../../shared/api/client';

export type RedisConnectionState = 'connected' | 'error' | 'loading';

export function useRedisHealth(pollMs = 10_000) {
  const [state, setState] = useState<RedisConnectionState>('loading');
  const [pong, setPong] = useState<string | null>(null);

  const check = useCallback(async () => {
    try {
      const data = await fetchRedisHealth();
      setPong(data.pong);
      setState('connected');
    } catch {
      setPong(null);
      setState('error');
    }
  }, []);

  useEffect(() => {
    void check();
    const id = window.setInterval(() => void check(), pollMs);
    return () => window.clearInterval(id);
  }, [check, pollMs]);

  return { state, pong, refresh: check };
}
