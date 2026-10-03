// Navegación por el hash de la URL (#inicio, #tema-ramas, #simulacro…).
//
// Sin librería: son seis rutas. El hash funciona igual en GitHub Pages,
// en Vercel y abriendo el archivo directo, porque no le pide nada al
// servidor. Los nombres solo usan letras, números y guiones.

import { useSyncExternalStore } from 'react';
import type { IdTema } from './tipos';
import { TEMAS } from './contenido/temas';

export type Ruta =
  | { pagina: 'inicio' }
  | { pagina: 'tema'; tema: IdTema; practicar: boolean }
  | { pagina: 'simulacro' }
  | { pagina: 'repaso' }
  | { pagina: 'tablas' };

const IDS = new Set(TEMAS.map((t) => t.id));
let actual = location.hash.slice(1) || 'inicio';
const oyentes = new Set<() => void>();

window.addEventListener('hashchange', () => {
  actual = location.hash.slice(1) || 'inicio';
  oyentes.forEach((f) => f());
});

export function ir(destino: string) {
  if (location.hash.slice(1) === destino) return;
  location.hash = destino;
}

export function interpretar(h: string): Ruta {
  if (h.startsWith('tema-') && IDS.has(h.slice(5) as IdTema)) return { pagina: 'tema', tema: h.slice(5) as IdTema, practicar: false };
  if (h.startsWith('practica-') && IDS.has(h.slice(9) as IdTema)) return { pagina: 'tema', tema: h.slice(9) as IdTema, practicar: true };
  if (h === 'simulacro' || h === 'repaso' || h === 'tablas') return { pagina: h };
  return { pagina: 'inicio' };
}

export function useRuta(): Ruta {
  const h = useSyncExternalStore((f) => { oyentes.add(f); return () => oyentes.delete(f); }, () => actual);
  return interpretar(h);
}
