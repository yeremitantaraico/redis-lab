import { useCallback, useEffect, useState } from 'react';
import { createMessage, fetchMessages } from '../../../shared/api/client';
import type { Message } from '../../../shared/api/types';

const REFRESH_MS = 4_000;

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<number>(Date.now());

  const load = useCallback(async () => {
    try {
      const data = await fetchMessages();
      setMessages(data);
      setLastSyncAt(Date.now());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar mensajes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), REFRESH_MS);
    return () => window.clearInterval(id);
  }, [load]);

  const send = useCallback(
    async (user: string, text: string) => {
      setSubmitting(true);
      try {
        await createMessage(user, text);
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al enviar');
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [load],
  );

  return {
    messages,
    loading,
    error,
    submitting,
    send,
    refresh: load,
    lastSyncAt,
  };
}
