import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormAtividade from './src/components/FormAtividade';
import ItemAtividade from './src/components/ItemAtividade';
import { cadastrarAtividade, listarAtividades } from './src/lib/atividades';
import type { Atividade, NovaAtividade } from './src/types';

export default function App() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setAtividades(await listarAtividades());
    } catch (e) {
      Alert.alert('Erro ao carregar', String((e as Error).message ?? e));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Retorna true se salvou (o formulário usa isso para se limpar).
  async function salvar(nova: NovaAtividade): Promise<boolean> {
    setSalvando(true);
    try {
      const { atividade, notificado } = await cadastrarAtividade(nova);
      setAtividades((atual) => [atividade, ...atual].sort((a, b) => a.data_termino.localeCompare(b.data_termino)));
      if (!notificado) Alert.alert('Atividade salva', 'Mas não foi possível enviar a notificação ntfy.');
      return true;
    } catch (e) {
      Alert.alert('Erro ao salvar', String((e as Error).message ?? e));
      return false;
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={s.tela}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={atividades}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <ItemAtividade item={item} />}
          contentContainerStyle={s.lista}
          keyboardShouldPersistTaps="handled"
          refreshing={carregando}
          onRefresh={carregar}
          ListHeaderComponent={
            <>
              <Text style={s.h1}>Minhas atividades</Text>
              <FormAtividade onSalvar={salvar} salvando={salvando} />
              <Text style={s.h2}>Cadastradas</Text>
            </>
          }
          ListEmptyComponent={carregando ? <ActivityIndicator /> : <Text style={s.vazio}>Nenhuma atividade ainda.</Text>}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f2f4f7' },
  lista: { padding: 16 },
  h1: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#111' },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#344054' },
  vazio: { textAlign: 'center', color: '#667085', marginTop: 20 },
});
