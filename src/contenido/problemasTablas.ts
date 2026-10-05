// Problemas para resolver tablas a mano, en la sección «Tablas».
//
// Salen de dos lados: todas las fórmulas de las preguntas de tabla y de
// clasificar del banco (así lo que practicas aquí es lo mismo que te
// pregunta la práctica), y las leyes de equivalencia de la lección, que se
// comprueban uniendo las dos fórmulas con ↔.

import { analizar, aTexto, pasos, variables } from '../logica/motor';
import type { Inciso } from '../tipos';
import { hash } from './fabrica';
import { TODAS } from './preguntas';

export interface Problema {
  id: string;
  formula: string;
  final: 'clasificar' | 'equivalencia';
  grupo: string;
  /** Para las leyes: su nombre. */
  nombre?: string;
  nota?: string;
}

const LEYES: [string, string, string, string, string?][] = [
  ['de-morgan-1', 'De Morgan, primera ley', '¬(p ∧ q)', '¬p ∨ ¬q'],
  ['de-morgan-2', 'De Morgan, segunda ley', '¬(p ∨ q)', '¬p ∧ ¬q'],
  ['de-morgan-mal', 'De Morgan mal recordada', '¬(p ∧ q)', '¬p ∧ ¬q', 'Negar las letras sin voltear el conector.'],
  ['doble-negacion', 'Doble negación', '¬¬p', 'p'],
  ['contrapositiva', 'Contrapositiva', 'p → q', '¬q → ¬p'],
  ['reciproca', 'Recíproca', 'p → q', 'q → p', 'Parece la contrapositiva, pero voltea sin negar.'],
  ['inversa', 'Inversa', 'p → q', '¬p → ¬q', 'Niega sin voltear.'],
  ['implicacion-disyuncion', 'Implicación como disyunción', 'p → q', '¬p ∨ q'],
  ['negar-implicacion', 'Negar una implicación', '¬(p → q)', 'p ∧ ¬q', '¿Cuándo es falsa una implicación?'],
];

function delBanco(): Problema[] {
  const vistos = new Map<string, Problema>();
  const agregar = (i: Inciso) => {
    if (i.tipo !== 'tabla' && i.tipo !== 'clasificar') return;
    const texto = aTexto(analizar(i.formula));
    if (vistos.has(texto)) return;
    const n = variables(analizar(texto)).length;
    vistos.set(texto, {
      id: 'f-' + hash(texto),
      formula: texto,
      final: 'clasificar',
      grupo: `Con ${n} ${n === 1 ? 'letra' : 'letras'} · ${2 ** n} renglones`,
      nota: i.enunciado,
    });
  };
  for (const p of TODAS) {
    if (p.tipo === 'caso') p.incisos.forEach(agregar);
    else agregar(p as Inciso);
  }
  const lista = [...vistos.values()];
  const tam = (p: Problema) => variables(analizar(p.formula)).length * 100 + pasos(analizar(p.formula)).length;
  return lista.sort((a, b) => tam(a) - tam(b));
}

const LEYES_PROBLEMAS: Problema[] = LEYES.map(([id, nombre, a, b, nota]) => ({
  id,
  formula: `(${a}) ↔ (${b})`,
  final: 'equivalencia',
  grupo: 'Leyes: ¿son equivalentes?',
  nombre,
  nota,
}));

/** En orden de estudio: lo más corto primero, y las leyes después de las de 2 letras. */
export const PROBLEMAS: Problema[] = (() => {
  const banco = delBanco();
  const hasta2 = banco.filter((p) => variables(analizar(p.formula)).length <= 2);
  const resto = banco.filter((p) => variables(analizar(p.formula)).length > 2);
  return [...hasta2, ...LEYES_PROBLEMAS, ...resto];
})();

export const GRUPOS: string[] = [...new Set(PROBLEMAS.map((p) => p.grupo))];
