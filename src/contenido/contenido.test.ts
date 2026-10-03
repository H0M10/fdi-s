// Revisión del banco de preguntas completo.
//
// Lo que se comprueba aquí es lo que, si fallara, te haría estudiar algo
// mal: una opción correcta fuera de rango, dos opciones iguales, una
// fórmula que no se puede leer, o una pregunta de conclusiones con dos
// respuestas válidas (o ninguna). Se corre con `npm test`.

import { describe, expect, it } from 'vitest';
import { analizar, opcionQueSeSigue, variables } from '../logica/motor';
import type { Inciso, Pregunta } from '../tipos';
import { TEMAS } from './temas';
import { TODAS, deTema } from './preguntas';

/** Cada pregunta suelta y cada inciso de cada caso, con una etiqueta legible. */
function todosLosIncisos(): [string, Inciso][] {
  const out: [string, Inciso][] = [];
  for (const p of TODAS) {
    if (p.tipo === 'caso') p.incisos.forEach((i, k) => out.push([`${p.id} (${p.titulo}) inciso ${k + 1}`, i]));
    else out.push([`${p.id}: ${(p as { enunciado?: string }).enunciado?.slice(0, 60) ?? (p as { formula: string }).formula}`, p as Inciso]);
  }
  return out;
}

const INCISOS = todosLosIncisos();

describe('estructura del banco', () => {
  it('no hay ids repetidos', () => {
    const ids = TODAS.map((p) => p.id);
    const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(repetidos).toEqual([]);
  });

  it('todos los temas tienen preguntas', () => {
    for (const t of TEMAS) expect(deTema(t.id).length, t.id).toBeGreaterThan(0);
  });

  it('todos los casos tienen al menos 3 incisos', () => {
    for (const p of TODAS) if (p.tipo === 'caso') expect(p.incisos.length, p.id).toBeGreaterThanOrEqual(3);
  });

  it('hay suficientes casos para un simulacro de 10', () => {
    expect(TODAS.filter((p) => p.tipo === 'caso').length).toBeGreaterThanOrEqual(10);
  });

  it('hay suficientes preguntas sueltas para las 8 de opción múltiple', () => {
    expect(TODAS.filter((p) => p.tipo === 'opcion' || p.tipo === 'vf').length).toBeGreaterThanOrEqual(8);
  });
});

describe('opción múltiple', () => {
  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'opcion') continue;
    it(nombre, () => {
      expect(i.opciones.length, 'al menos dos opciones').toBeGreaterThanOrEqual(2);
      expect(i.correcta, 'índice de la correcta en rango').toBeGreaterThanOrEqual(0);
      expect(i.correcta).toBeLessThan(i.opciones.length);
      expect(new Set(i.opciones).size, 'sin opciones repetidas').toBe(i.opciones.length);
      expect(i.explicacion.length, 'tiene explicación').toBeGreaterThan(0);
    });
  }
});

describe('selección múltiple', () => {
  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'multi') continue;
    it(nombre, () => {
      expect(i.correctas.length).toBeGreaterThan(0);
      expect(i.correctas.length, 'debe haber al menos una opción incorrecta').toBeLessThan(i.opciones.length);
      for (const c of i.correctas) expect(c).toBeLessThan(i.opciones.length);
      expect(new Set(i.opciones).size).toBe(i.opciones.length);
    });
  }
});

describe('simbolizar', () => {
  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'simbolizar') continue;
    it(nombre, () => {
      const arbol = analizar(i.respuesta);
      const letrasDadas = i.props.map(([l]) => l);
      for (const v of variables(arbol)) expect(letrasDadas, `la respuesta usa «${v}», que no está en las proposiciones`).toContain(v);
      for (const l of letrasDadas) expect(variables(arbol), `la proposición «${l}» no se usa en la respuesta`).toContain(l);
    });
  }
});

describe('tablas y clasificación', () => {
  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'tabla' && i.tipo !== 'clasificar') continue;
    it(nombre, () => {
      const vs = variables(analizar(i.formula));
      expect(vs.length).toBeGreaterThan(0);
      expect(vs.length, 'más de 4 letras no cabe en pantalla').toBeLessThanOrEqual(4);
    });
  }
});

describe('conclusiones: exactamente una opción se sigue de las premisas', () => {
  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'conclusion') continue;
    it(nombre, () => {
      const correctas = opcionQueSeSigue(i.premisas, i.opciones);
      expect(correctas, `opciones válidas: ${correctas.map((k) => i.opciones[k].texto).join(' | ')}`).toHaveLength(1);
      const letras = i.props.map(([l]) => l);
      for (const f of [...i.premisas, ...i.opciones.map((o) => o.formula).filter(Boolean) as string[]])
        for (const v of variables(analizar(f))) expect(letras).toContain(v);
    });
  }
});

describe('resumen del banco', () => {
  it('imprime cuántas preguntas hay por tema', () => {
    const filas = TEMAS.map((t) => {
      const ps = deTema(t.id);
      const n = ps.reduce((s, p: Pregunta) => s + (p.tipo === 'caso' ? p.incisos.length : 1), 0);
      return `${t.corto.padEnd(14)} ${String(ps.length).padStart(3)} preguntas · ${String(n).padStart(3)} incisos`;
    });
    console.log('\n' + filas.join('\n') + `\n${'TOTAL'.padEnd(14)} ${String(TODAS.length).padStart(3)} preguntas · ${INCISOS.length} incisos\n`);
    expect(TODAS.length).toBeGreaterThan(0);
  });
});
