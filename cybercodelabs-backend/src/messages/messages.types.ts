export const MESSAGE_KEY_PREFIX = 'lab:message:';

export interface StoredMessage {
  id: string;
  user: string;
  text: string;
  at: string;
}

export interface MessageResponse extends StoredMessage {
  ttlSeconds: number | null;
}
