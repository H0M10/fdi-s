// El simulacro tiene que preguntar como el profesor: siempre a partir de
// un caso. Hanniel lo reportó: salían preguntas de flujos y definiciones
// («¿a qué rama corresponde el flujo…?») que el profesor no hace.

import { describe, expect, it } from 'vitest';
import { PREGUNTAS_ENUNCIADOS, TODAS } from '../contenido/preguntas';
import { analizar, clasificar } from '../logica/motor';
import { armarExamen, armarExamenU2 } from './Simulacro';

describe('simulacro', () => {
  it('18 preguntas: 8 de opción múltiple y 10 casos', () => {
    for (let k = 0; k < 20; k++) {
      const e = armarExamen();
      expect(e).toHaveLength(18);
      expect(e.slice(0, 8).every((p) => p.tipo !== 'caso')).toBe(true);
      expect(e.slice(8).every((p) => p.tipo === 'caso')).toBe(true);
    }
  });

  it('las 8 de opción múltiple parten de un caso: 3 de ramas, 3 de enfoques y 2 de ética', () => {
    for (let k = 0; k < 20; k++) {
      const ocho = armarExamen().slice(0, 8);
      expect(ocho.every((p) => p.deCaso)).toBe(true);
      const cuenta = (t: string) => ocho.filter((p) => p.tema === t).length;
      expect([cuenta('ramas'), cuenta('enfoques'), cuenta('etica')]).toEqual([3, 3, 2]);
    }
  });

  it('nunca salen flujos ni definiciones', () => {
    const deCaso = TODAS.filter((p) => p.deCaso);
    const teoricas = deCaso.filter((p) => 'enunciado' in p && /flujo|definición|Según el profesor|Según lo visto/i.test(p.enunciado ?? ''));
    expect(teoricas.map((p) => p.id)).toEqual([]);
  });

  it('hay de dónde escoger en cada bloque', () => {
    for (const t of ['ramas', 'enfoques', 'etica']) {
      expect(TODAS.filter((p) => p.deCaso && p.tema === t).length, t).toBeGreaterThanOrEqual(8);
    }
  });

  it('simulacro de Unidad 2: 18 preguntas (8 deCaso y 10 casos integradores de u2-casos)', () => {
    for (let k = 0; k < 20; k++) {
      const e = armarExamenU2();
      expect(e).toHaveLength(18);
      expect(e.slice(0, 8).every((p) => p.tipo !== 'caso' && p.deCaso && p.tema.startsWith('u2-'))).toBe(true);
      expect(e.slice(8).every((p) => p.tipo === 'caso' && p.tema === 'u2-casos')).toBe(true);
    }
  });
});

describe('tablas desde la frase', () => {
  it('cada una tiene los cuatro pasos en orden: proposiciones, simbolizar, renglones, clasificar', () => {
    for (const p of PREGUNTAS_ENUNCIADOS) {
      if (p.tipo !== 'caso') throw new Error('debería ser caso');
      expect(p.incisos.map((i) => i.tipo)).toEqual(['multi', 'simbolizar', 'opcion', 'clasificar']);
    }
  });

  it('hay de los tres tipos: tautología, contradicción y contingencia', () => {
    const clases = PREGUNTAS_ENUNCIADOS.map((p) => (p.tipo === 'caso' && p.incisos[3].tipo === 'clasificar' ? clasificar(analizar(p.incisos[3].formula)) : null));
    for (const c of ['tautologia', 'contradiccion', 'contingencia'] as const) {
      expect(clases.filter((x) => x === c).length, c).toBeGreaterThanOrEqual(3);
    }
  });
});
