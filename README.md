# To-Do List — Expo SDK 54 + Supabase + ntfy

## 1. Supabase
1. Crie um projeto em https://supabase.com/dashboard.
2. SQL Editor > New query > cole `supabase/schema.sql` > Run.
3. Project Settings > API: copie a **Project URL** e a chave **anon** (ou *publishable*).

## 2. ntfy
1. Instale o app **ntfy** no celular (Play Store / App Store).
2. Inscreva-se (+) em um tópico com nome difícil de adivinhar, ex.: `todo-yago-x7k2q9m4`.
   O servidor padrão é o `ntfy.sh`. Tópico = "senha": quem souber o nome lê e envia.

## 3. Variáveis de ambiente
```
cp .env.example .env    # PowerShell: Copy-Item .env.example .env
```
Preencha `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_NTFY_TOPIC`.

## 4. Rodar
```
npm install
npx expo start -c
```
Escaneie o QR code com o Expo Go (SDK 54). Celular e PC na mesma rede (ou `--tunnel`).
Alterou o `.env`? Reinicie com `-c`.

## Fluxo
App -> `INSERT` no Supabase -> (sucesso) -> `POST` JSON em ntfy.sh -> push no celular.
