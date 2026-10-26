import { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { paraBR, paraISO } from '../lib/datas';
import type { NovaAtividade } from '../types';

type Props = { onSalvar: (nova: NovaAtividade) => Promise<boolean>; salvando: boolean };

export default function FormAtividade({ onSalvar, salvando }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState<Date | null>(null);
  const [mostrarPicker, setMostrarPicker] = useState(false);

  function aoEscolherData(evento: DateTimePickerEvent, escolhida?: Date) {
    // No Android o picker é um diálogo: fecha sempre. No iOS ele fica inline.
    if (Platform.OS === 'android') setMostrarPicker(false);
    if (evento.type === 'set' && escolhida) setData(escolhida);
  }

  async function enviar() {
    if (!titulo.trim() || !descricao.trim() || !data) {
      Alert.alert('Campos obrigatórios', 'Preencha título, descrição e data de término.');
      return;
    }
    const ok = await onSalvar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      data_termino: paraISO(data),
    });
    if (ok) {
      setTitulo('');
      setDescricao('');
      setData(null);
    }
  }

  return (
    <View style={s.card}>
      <Text style={s.label}>Título</Text>
      <TextInput style={s.input} value={titulo} onChangeText={setTitulo} placeholder="Ex.: Entregar relatório" maxLength={100} />

      <Text style={s.label}>Descrição</Text>
      <TextInput
        style={[s.input, s.multilinha]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Detalhes da atividade"
        multiline
        textAlignVertical="top"
      />

      <Text style={s.label}>Data de término</Text>
      <Pressable style={s.input} onPress={() => setMostrarPicker(true)}>
        <Text style={data ? s.textoData : s.placeholder}>{data ? paraBR(paraISO(data)) : 'Toque para escolher'}</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker
          value={data ?? new Date()}
          mode="date"
          minimumDate={new Date()}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={aoEscolherData}
        />
      )}

      <Pressable style={[s.botao, salvando && s.botaoOff]} onPress={enviar} disabled={salvando}>
        <Text style={s.botaoTxt}>{salvando ? 'Salvando...' : 'Adicionar atividade'}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, gap: 6 },
  label: { fontWeight: '600', color: '#333', marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#d0d5dd', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#fafafa' },
  multilinha: { minHeight: 80 },
  textoData: { fontSize: 16, color: '#111' },
  placeholder: { fontSize: 16, color: '#9aa0a6' },
  botao: { backgroundColor: '#4f46e5', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 12 },
  botaoOff: { opacity: 0.6 },
  botaoTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
