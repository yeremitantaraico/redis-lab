import { Form } from './components/Form';
import { List } from './components/List';
import { Status } from './components/Status';
import { useMessages } from './hooks/use-messages';
import { useRedisHealth } from './hooks/use-redis-health';
import './live-board.css';

export function LiveBoardPage() {
  const { state, pong } = useRedisHealth();
  const { messages, loading, error, submitting, send, lastSyncAt } =
    useMessages();

  return (
    <main className="live-board">
      <header className="live-board__hero">
        <span className="live-board__badge">Redis Lab</span>
        <h1>Tablero en vivo</h1>
        <p className="live-board__subtitle">
          Mensajes temporales — escritura y lectura vía API
        </p>
        <Status state={state} pong={pong} />
      </header>

      <section className="live-board__card" aria-labelledby="form-heading">
        <h2 id="form-heading" className="live-board__card-title">
          Nuevo mensaje
        </h2>
        <Form submitting={submitting} onSubmit={send} />
        {error ? <p className="live-board__error">{error}</p> : null}
      </section>

      <section className="live-board__card" aria-labelledby="list-heading">
        <h2 id="list-heading" className="live-board__card-title">
          Mensajes activos
        </h2>
        <List messages={messages} loading={loading} lastSyncAt={lastSyncAt} />
      </section>
    </main>
  );
}
