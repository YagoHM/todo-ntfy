// Date -> 'YYYY-MM-DD' usando a data LOCAL do aparelho.
// (toISOString() converte para UTC e pode "voltar um dia" à noite no Brasil.)
export function paraISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dia}`;
}

// 'YYYY-MM-DD' -> 'DD/MM/YYYY' (sem passar por Date, evitando fuso horário)
export function paraBR(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
