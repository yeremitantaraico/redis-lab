import type { RedisConnectionState } from '../hooks/use-redis-health';

interface StatusProps {
  state: RedisConnectionState;
  pong: string | null;
}

const labels: Record<RedisConnectionState, string> = {
  loading: 'Comprobando…',
  connected: 'Conectado',
  error: 'Error de conexión',
};

export function Status({ state, pong }: StatusProps) {
  return (
    <div className={`redis-status redis-status--${state}`} role="status">
      <span className="redis-status__dot" aria-hidden />
      <span>
        Redis: <strong>{labels[state]}</strong>
        {pong ? ` (${pong})` : null}
      </span>
    </div>
  );
}
