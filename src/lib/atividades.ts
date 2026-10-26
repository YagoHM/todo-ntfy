import { supabase } from './supabase';
import { enviarNotificacao } from './ntfy';
import type { Atividade, NovaAtividade } from '../types';

export async function listarAtividades(): Promise<Atividade[]> {
  const { data, error } = await supabase
    .from('atividades')
    .select('*')
    .order('data_termino', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export type ResultadoCadastro = { atividade: Atividade; notificado: boolean };

// 1) INSERT no Supabase  2) só se deu certo, POST no ntfy.
// Falha do ntfy NÃO desfaz o cadastro: a tarefa já está salva.
export async function cadastrarAtividade(nova: NovaAtividade): Promise<ResultadoCadastro> {
  const { data, error } = await supabase
    .from('atividades')
    .insert(nova)
    .select() // devolve a linha criada (com id e created_at gerados pelo banco)
    .single();
  if (error) throw error;

  let notificado = true;
  try {
    await enviarNotificacao(data);
  } catch (e) {
    console.warn('Falha ao notificar via ntfy:', e);
    notificado = false;
  }
  return { atividade: data as Atividade, notificado };
}
