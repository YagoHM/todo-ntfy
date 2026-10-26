import { StyleSheet, Text, View } from 'react-native';
import { paraBR } from '../lib/datas';
import type { Atividade } from '../types';

export default function ItemAtividade({ item }: { item: Atividade }) {
  return (
    <View style={s.item}>
      <Text style={s.titulo}>{item.titulo}</Text>
      <Text style={s.desc}>{item.descricao}</Text>
      <Text style={s.data}>Término: {paraBR(item.data_termino)}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  item: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#4f46e5' },
  titulo: { fontSize: 17, fontWeight: '700', color: '#111' },
  desc: { color: '#475467', marginTop: 4 },
  data: { color: '#4f46e5', fontWeight: '600', marginTop: 8 },
});
