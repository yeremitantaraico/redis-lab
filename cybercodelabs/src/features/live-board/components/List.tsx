import { useEffect, useState } from 'react';
import type { Message } from '../../../shared/api/types';

interface ListProps {
  messages: Message[];
  loading: boolean;
  lastSyncAt: number;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function List({ messages, loading, lastSyncAt }: ListProps) {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const elapsedSeconds = Math.floor((now - lastSyncAt) / 1000);

  if (loading && messages.length === 0) {
    return (
      <p className="message-list__empty message-list__empty--loading">
        Cargando mensajes…
      </p>
    );
  }

  if (messages.length === 0) {
    return (
      <p className="message-list__empty">
        No hay mensajes activos.
        <br />
        Los mensajes expiran solos tras el TTL en Redis.
      </p>
    );
  }

  return (
    <ul className="message-list">
      {messages.map((message) => (
        <li key={message.id} className="message-list__item">
          <header>
            <strong>{message.user}</strong>
            <time dateTime={message.at}>{formatTime(message.at)}</time>
          </header>
          <p>{message.text}</p>
          {message.ttlSeconds !== null ? (
            <span className="message-list__ttl">
              TTL ~{Math.max(0, message.ttlSeconds - elapsedSeconds)}s
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
