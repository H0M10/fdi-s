// Revisión del banco de preguntas completo.
//
// Lo que se comprueba aquí es lo que, si fallara, te haría estudiar algo
// mal: una opción correcta fuera de rango, dos opciones iguales, una
// fórmula que no se puede leer, o una pregunta de conclusiones con dos
// respuestas válidas (o ninguna). Se corre con `npm test`.

import { describe, expect, it } from 'vitest';
import { analizar, opcionQueSeSigue, variables } from '../logica/motor';
import type { Inciso, Pregunta } from '../tipos';
import { COMPONENTES, conSigla, CRITERIOS, RAMAS } from './fabrica';
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

describe('orden de estudio', () => {
  const pos = (id: string) => TEMAS.findIndex((t) => t.id === id);
  // Cada par es [lo que se necesita antes, lo que lo usa].
  const dependencias: [string, string][] = [
    ['que-es', 'historia'],
    ['conceptos', 'enfoques'],
    ['enfoques', 'logica'],
    ['ramas', 'aplicaciones'],
    ['enfoques', 'aplicaciones'],
    ['ramas', 'etica'],
  ];
  for (const [antes, despues] of dependencias) {
    it(`${antes} va antes que ${despues}`, () => expect(pos(antes)).toBeLessThan(pos(despues)));
  }
  it('los casos tipo examen van al final, porque integran todo', () => {
    expect(TEMAS[TEMAS.length - 1].id).toBe('casos');
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

describe('identificar enfoques: siempre el mismo formato', () => {
  const nombres: readonly string[] = COMPONENTES;
  const esDeEnfoques = (opciones: string[]) => opciones.filter((o) => nombres.includes(o) || o === 'Híbrido').length >= 3;

  it('ninguna pregunta de enfoques es de una sola respuesta, porque eso delata que es uno solo', () => {
    const sueltas = INCISOS.filter(([, i]) => i.tipo === 'opcion' && esDeEnfoques(i.opciones)).map(([n]) => n);
    expect(sueltas).toEqual([]);
  });

  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'multi' || !esDeEnfoques(i.opciones)) continue;
    it(nombre, () => {
      expect(i.opciones, 'las mismas cinco opciones').toEqual([...COMPONENTES]);
      expect(i.fijo, 'en el mismo orden').toBe(true);
      expect(i.enunciado, 'la misma pregunta').toMatch(/enfoque o enfoques/);
      const dl = COMPONENTES.indexOf('Deep learning'), ml = COMPONENTES.indexOf('Machine learning');
      expect(i.correctas.includes(dl) && i.correctas.includes(ml), 'deep learning se marca sin machine learning').toBe(false);
    });
  }
});

describe('identificar ramas: siempre el mismo formato', () => {
  const nombres: readonly string[] = RAMAS;
  const sinSigla = (o: string) => o.replace(/ \([^)]*\)$/, '');
  const esDeRamas = (opciones: string[]) => opciones.filter((o) => nombres.includes(sinSigla(o))).length >= 3;

  it('ninguna pregunta de ramas es de una sola respuesta, porque eso delata que es una sola', () => {
    const sueltas = INCISOS.filter(([, i]) => i.tipo === 'opcion' && esDeRamas(i.opciones)).map(([n]) => n);
    expect(sueltas).toEqual([]);
  });

  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'multi' || !esDeRamas(i.opciones)) continue;
    it(nombre, () => {
      expect(i.opciones, 'las once ramas, con su sigla si la tiene').toEqual(RAMAS.map(conSigla));
      expect(i.fijo, 'en el mismo orden').toBe(true);
      expect(i.enunciado, 'la misma pregunta').toMatch(/rama o ramas/);
    });
  }
});

describe('«también se vale»', () => {
  for (const [nombre, i] of INCISOS) {
    if (i.tipo !== 'multi' || !i.aceptables) continue;
    it(nombre, () => {
      for (const k of i.aceptables!) {
        expect(k, 'dentro de las opciones').toBeGreaterThanOrEqual(0);
        expect(k).toBeLessThan(i.opciones.length);
        expect(i.correctas, 'una opción no puede ser correcta y opcional a la vez').not.toContain(k);
      }
      expect(i.explicacion, 'la explicación dice por qué también se vale').toMatch(/también se vale/);
    });
  }
});

describe('casos: justificar como en el examen', () => {
  const incisosDeCasos = TODAS.filter((p) => p.tema === 'casos' && p.tipo === 'caso')
    .flatMap((p) => (p.tipo === 'caso' ? p.incisos.map((i) => [p.titulo, i] as const) : []));

  it('cada inciso de rama, enfoque o riesgo pide justificar y trae qué debía decir', () => {
    const deIdentificar = (i: Inciso) =>
      i.tipo === 'opcion' ? !!CRITERIOS[i.opciones[i.correcta]]
        : i.tipo === 'multi' ? i.correctas.some((k) => CRITERIOS[i.opciones[k]]) : false;
    const pide = (i: Inciso) => (i.tipo === 'opcion' || i.tipo === 'multi') && !!i.justificar && !!i.guia?.length;
    const sinJustificar = incisosDeCasos
      .filter(([, i]) => deIdentificar(i) && !pide(i))
      .map(([t, i]) => `${t}: ${'enunciado' in i ? i.enunciado : ''}`);
    expect(sinJustificar).toEqual([]);
  });

  it('cada caso pregunta las ramas', () => {
    const casos = TODAS.filter((p) => p.tema === 'casos' && p.tipo === 'caso');
    const sinRamas = casos.filter((p) => p.tipo === 'caso' && !p.incisos.some((i) => i.tipo === 'multi' && i.opciones.length === RAMAS.length));
    expect(sinRamas.map((p) => p.id)).toEqual([]);
  });
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
