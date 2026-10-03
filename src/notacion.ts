// Notación V/F o 1/0, global para toda la app.
import { useSyncExternalStore } from 'react';

export type Modo = 'VF' | '01';

const CLAVE = 'fdi-estudio:notacion';
let modo: Modo = (() => {
  try {
    const g = localStorage.getItem(CLAVE);
    return g === '01' ? '01' : 'VF';
  } catch {
    return 'VF';
  }
})();
const oyentes = new Set<() => void>();

export function cambiarNotacion(m: Modo) {
  modo = m;
  try { localStorage.setItem(CLAVE, m); } catch { /* da igual */ }
  oyentes.forEach((f) => f());
}

export function useNotacion() {
  const m = useSyncExternalStore(
    (f) => { oyentes.add(f); return () => oyentes.delete(f); },
    () => modo,
    () => modo,
  );
  return {
    modo: m,
    simbolo: (v: boolean) => (m === '01' ? (v ? '1' : '0') : v ? 'V' : 'F'),
  };
}
