import 'react-native-url-polyfill/auto'; // o supabase-js precisa de uma URL completa no React Native
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    'Faltam EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY no .env (reinicie com: npx expo start -c)'
  );
}

// Não usamos login, então desligamos sessão/refresh (evita precisar de AsyncStorage).
export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
