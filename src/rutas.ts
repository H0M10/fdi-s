// Navegación por el hash de la URL (#inicio, #tema-u2-problemas, #simulacro, #lab, #tablas…).
//
// Sin librería: son pocas rutas. El hash funciona igual en GitHub Pages,
// en Vercel y abriendo el archivo directo, porque no le pide nada al
// servidor. Los nombres solo usan letras, números y guiones.

import { useSyncExternalStore } from 'react';
import type { IdTema } from './tipos';
import { TODOS_LOS_TEMAS } from './contenido/temas';

export type Ruta =
  | { pagina: 'inicio'; unidad?: 1 | 2 }
  | { pagina: 'tema'; tema: IdTema; practicar: boolean }
  | { pagina: 'simulacro'; unidad?: 1 | 2 }
  | { pagina: 'comparar' }
  | { pagina: 'lab' }
  | { pagina: 'repaso' }
  | { pagina: 'tablas'; vista: 'conectores' | 'resolver' | 'enunciado' | 'comprobar'; problema?: string };

const IDS = new Set(TODOS_LOS_TEMAS.map((t) => t.id));
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
  if (h === 'u1') return { pagina: 'inicio', unidad: 1 };
  if (h === 'u2') return { pagina: 'inicio', unidad: 2 };
  if (h.startsWith('tema-') && IDS.has(h.slice(5) as IdTema)) return { pagina: 'tema', tema: h.slice(5) as IdTema, practicar: false };
  if (h.startsWith('practica-') && IDS.has(h.slice(9) as IdTema)) return { pagina: 'tema', tema: h.slice(9) as IdTema, practicar: true };
  if (h === 'simulacro') return { pagina: 'simulacro' };
  if (h === 'simulacro-u1') return { pagina: 'simulacro', unidad: 1 };
  if (h === 'simulacro-u2') return { pagina: 'simulacro', unidad: 2 };
  if (h === 'comparar') return { pagina: 'comparar' };
  if (h === 'lab') return { pagina: 'lab' };
  if (h === 'repaso') return { pagina: 'repaso' };
  // Tablas: #tablas (conectores), #tablas-resolver, #tablas-resolver-<id>, #tablas-comprobar.
  if (h === 'tablas') return { pagina: 'tablas', vista: 'conectores' };
  if (h === 'tablas-comprobar') return { pagina: 'tablas', vista: 'comprobar' };
  if (h === 'tablas-resolver') return { pagina: 'tablas', vista: 'resolver' };
  if (h.startsWith('tablas-resolver-')) return { pagina: 'tablas', vista: 'resolver', problema: h.slice('tablas-resolver-'.length) };
  if (h === 'tablas-enunciado') return { pagina: 'tablas', vista: 'enunciado' };
  if (h.startsWith('tablas-enunciado-')) return { pagina: 'tablas', vista: 'enunciado', problema: h.slice('tablas-enunciado-'.length) };
  return { pagina: 'inicio' };
}

export function useRuta(): Ruta {
  const h = useSyncExternalStore((f) => { oyentes.add(f); return () => oyentes.delete(f); }, () => actual);
  return interpretar(h);
}
