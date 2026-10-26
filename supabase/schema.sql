-- Rode no Supabase: SQL Editor > New query > Run

create table if not exists public.atividades (
  id           uuid primary key default gen_random_uuid(),  -- código gerado pelo banco
  titulo       text not null check (char_length(trim(titulo)) > 0),
  descricao    text not null,
  data_termino date not null,
  created_at   timestamptz not null default now()
);

-- RLS: com ela ligada, ninguém acessa a tabela sem uma policy explícita.
alter table public.atividades enable row level security;

-- Desafio sem login: libera a chave anon para ler e inserir.
-- (Em produção real, você amarraria isso a auth.uid().)
create policy "anon pode ler"    on public.atividades for select to anon using (true);
create policy "anon pode inserir" on public.atividades for insert to anon with check (true);
