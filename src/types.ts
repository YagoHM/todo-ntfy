export type Atividade = {
  id: string;
  titulo: string;
  descricao: string;
  data_termino: string; // 'YYYY-MM-DD' (coluna do tipo date)
  created_at: string; // ISO 8601
};

export type NovaAtividade = Pick<Atividade, 'titulo' | 'descricao' | 'data_termino'>;
