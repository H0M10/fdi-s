// Progreso del estudio, guardado en el navegador.
//
// Solo es una comodidad: si el navegador bloquea el almacenamiento (modo
// incógnito, datos borrados), la app funciona igual y simplemente no
// recuerda nada. Por eso todo va envuelto en try/catch.

import { useSyncExternalStore } from 'react';

export interface Registro {
  intentos: number;
  aciertos: number;
  /** Fracción del último intento: 1 = todo bien, 0 = todo mal. */
  ultimo: number;
  fecha: number;
}

type Estado = Record<string, Registro>;

const CLAVE = 'fdi-estudio:progreso:v1';
let estado: Estado = leer();
const oyentes = new Set<() => void>();

function leer(): Estado {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? (JSON.parse(crudo) as Estado) : {};
  } catch {
    return {};
  }
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    /* sin almacenamiento: se queda en memoria */
  }
}

/** Registra el resultado de una pregunta. `fraccion` va de 0 a 1. */
export function registrar(id: string, fraccion: number) {
  const prev = estado[id] ?? { intentos: 0, aciertos: 0, ultimo: 0, fecha: 0 };
  estado = {
    ...estado,
    [id]: {
      intentos: prev.intentos + 1,
      aciertos: prev.aciertos + (fraccion === 1 ? 1 : 0),
      ultimo: fraccion,
      fecha: Date.now(),
    },
  };
  guardar();
  oyentes.forEach((f) => f());
}

export function reiniciar() {
  estado = {};
  guardar();
  oyentes.forEach((f) => f());
}

function suscribir(f: () => void) {
  oyentes.add(f);
  return () => oyentes.delete(f);
}

export function useProgreso(): Estado {
  return useSyncExternalStore(suscribir, () => estado, () => estado);
}

/** Resumen de un grupo de preguntas: cuántas se han contestado y qué tan bien. */
export function resumen(ids: string[], p: Estado) {
  const vistos = ids.filter((id) => p[id]);
  const dominadas = vistos.filter((id) => p[id].ultimo === 1).length;
  return { total: ids.length, vistas: vistos.length, dominadas };
}
