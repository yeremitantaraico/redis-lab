import { useState, type FormEvent } from 'react';

interface FormProps {
  submitting: boolean;
  onSubmit: (user: string, text: string) => Promise<void>;
}

export function Form({ submitting, onSubmit }: FormProps) {
  const [user, setUser] = useState('');
  const [text, setText] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedUser = user.trim();
    const trimmedText = text.trim();
    if (!trimmedUser || !trimmedText) {
      return;
    }
    await onSubmit(trimmedUser, trimmedText);
    setText('');
  }

  return (
    <form className="message-form" onSubmit={(e) => void handleSubmit(e)}>
      <label>
        Usuario
        <input
          type="text"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          maxLength={50}
          placeholder="tu nombre"
          autoComplete="username"
          required
        />
      </label>
      <label>
        Mensaje
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          placeholder="escribe algo…"
          required
        />
      </label>
      <div className="message-form__actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar mensaje'}
        </button>
      </div>
    </form>
  );
}
