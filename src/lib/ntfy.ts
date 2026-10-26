import { paraBR } from './datas';

const NTFY_URL = process.env.EXPO_PUBLIC_NTFY_URL ?? 'https://ntfy.sh';
const NTFY_TOPIC = process.env.EXPO_PUBLIC_NTFY_TOPIC;

type Dados = { titulo: string; data_termino: string };

// Publica uma notificação no tópico do ntfy.
// Usamos o formato JSON (POST na raiz) em vez de headers HTTP porque headers
// com acento ("Atividade", "Término") podem quebrar dependendo do cliente.
export async function enviarNotificacao({ titulo, data_termino }: Dados): Promise<void> {
  if (!NTFY_TOPIC) throw new Error('EXPO_PUBLIC_NTFY_TOPIC não definido no .env');

  const resposta = await fetch(NTFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topic: NTFY_TOPIC,
      title: 'Nova atividade cadastrada',
      message: `${titulo}\nTérmino: ${paraBR(data_termino)}`,
      priority: 3, // 1 (min) a 5 (max); 3 = padrão
      tags: ['memo'], // vira o emoji 📝 na notificação
    }),
  });

  if (!resposta.ok) throw new Error(`ntfy respondeu HTTP ${resposta.status}`);
}
