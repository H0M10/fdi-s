// Pruebas del motor de lógica. Son las mismas que se usaron para verificar
// la página de tablas de verdad, más las de conclusiones y justificaciones.
// Si alguna falla, la app estaría enseñando algo falso.

import { describe, expect, it } from 'vitest';
import {
  aTexto, analizar, clasificar, columnaFinal, equivalentes, filas,
  justificar, opcionQueSeSigue, pasos, seSigue, variables,
} from './motor';

const col = (f: string) => columnaFinal(analizar(f)).map((x) => (x ? 'V' : 'F')).join('');
const eq = (a: string, b: string) => equivalentes(analizar(a), analizar(b));
const tipo = (f: string) => clasificar(analizar(f));
const sigue = (ps: string[], c: string) => seSigue(ps.map(analizar), analizar(c));

describe('los cinco conectores', () => {
  it('negación', () => expect(col('¬p')).toBe('FV'));
  it('conjunción', () => expect(col('p ∧ q')).toBe('VFFF'));
  it('disyunción', () => expect(col('p ∨ q')).toBe('VVVF'));
  it('implicación: solo falla con V → F', () => expect(col('p → q')).toBe('VFVV'));
  it('bicondicional', () => expect(col('p ↔ q')).toBe('VFFV'));
});

describe('orden de renglones', () => {
  const f3 = filas(['p', 'q', 'r']);
  it('tres letras dan 8 renglones', () => expect(f3).toHaveLength(8));
  it('primer renglón todo verdadero', () => expect(f3[0]).toEqual({ p: true, q: true, r: true }));
  it('último renglón todo falso', () => expect(f3[7]).toEqual({ p: false, q: false, r: false }));
  it('la última letra alterna de uno en uno', () =>
    expect(f3.map((e) => (e.r ? 'V' : 'F')).join('')).toBe('VFVFVFVF'));
  it('la primera letra va en bloques de la mitad', () =>
    expect(f3.map((e) => (e.p ? 'V' : 'F')).join('')).toBe('VVVVFFFF'));
  it('cuatro letras dan 16', () => expect(filas(['p', 'q', 'r', 's'])).toHaveLength(16));
});

describe('ejemplos de clase', () => {
  it('motor: (p ∧ q) → r', () => expect(col('(p ∧ q) → r')).toBe('VFVVVVVV'));
  it('incendios tiene 4 letras', () =>
    expect(variables(analizar('((p ∨ q) ∧ ¬r) → s'))).toEqual(['p', 'q', 'r', 's']));
});

describe('clasificación', () => {
  it('p ∨ ¬p es tautología', () => expect(tipo('p ∨ ¬p')).toBe('tautologia'));
  it('p ∧ ¬p es contradicción', () => expect(tipo('p ∧ ¬p')).toBe('contradiccion'));
  it('p → q es contingencia', () => expect(tipo('p → q')).toBe('contingencia'));
  it('modus ponens es tautología', () => expect(tipo('((p → q) ∧ p) → q')).toBe('tautologia'));
  it('afirmar el consecuente NO es tautología', () =>
    expect(tipo('((p → q) ∧ q) → p')).toBe('contingencia'));
});

describe('leyes', () => {
  it('De Morgan 1', () => expect(tipo('¬(p ∧ q) ↔ (¬p ∨ ¬q)')).toBe('tautologia'));
  it('De Morgan 2', () => expect(tipo('¬(p ∨ q) ↔ (¬p ∧ ¬q)')).toBe('tautologia'));
  it('la versión mal recordada de De Morgan no es ley', () =>
    expect(tipo('¬(p ∧ q) ↔ (¬p ∧ ¬q)')).not.toBe('tautologia'));
  it('doble negación', () => expect(eq('¬¬p', 'p')).toBe(true));
  it('contrapositiva', () => expect(eq('p → q', '¬q → ¬p')).toBe(true));
  it('la recíproca NO es equivalente', () => expect(eq('p → q', 'q → p')).toBe(false));
  it('implicación como disyunción', () => expect(eq('p → q', '¬p ∨ q')).toBe(true));
});

describe('atajos de teclado', () => {
  it('~ es ¬', () => expect(col('~p')).toBe(col('¬p')));
  it('^ es ∧', () => expect(col('p ^ q')).toBe(col('p ∧ q')));
  it('v es ∨', () => expect(col('p v q')).toBe(col('p ∨ q')));
  it('-> es →', () => expect(col('p -> q')).toBe(col('p → q')));
  it('<-> es ↔', () => expect(col('p <-> q')).toBe(col('p ↔ q')));
});

describe('precedencia', () => {
  it('¬ amarra más que ∧', () => expect(eq('¬p ∧ q', '(¬p) ∧ q')).toBe(true));
  it('∧ amarra más que ∨', () => expect(eq('p ∧ q ∨ r', '(p ∧ q) ∨ r')).toBe(true));
  it('∨ amarra más que →', () => expect(eq('p ∨ q → r', '(p ∨ q) → r')).toBe(true));
  it('→ asocia a la derecha', () => expect(eq('p → q → r', 'p → (q → r)')).toBe(true));
});

describe('impresión con paréntesis', () => {
  it('motor', () => expect(aTexto(analizar('p^q->r'))).toBe('(p ∧ q) → r'));
  it('negación de grupo', () => expect(aTexto(analizar('~(p^q)'))).toBe('¬(p ∧ q)'));
  it('incendios', () => expect(aTexto(analizar('(pvq)^~r->s'))).toBe('((p ∨ q) ∧ ¬r) → s'));
});

describe('columnas intermedias', () => {
  const s = pasos(analizar('((p ∨ q) ∧ ¬r) → s')).map((x) => x.texto);
  it('empiezan por lo más interno', () => expect(s[0]).toBe('p ∨ q'));
  it('terminan en la fórmula completa', () => expect(s[s.length - 1]).toBe('((p ∨ q) ∧ ¬r) → s'));
  it('son cuatro', () => expect(s).toHaveLength(4));
});

describe('conclusiones', () => {
  it('modus ponens', () => expect(sigue(['p → q', 'p'], 'q')).toBe(true));
  it('modus tollens', () => expect(sigue(['p → q', '¬q'], '¬p')).toBe(true));
  it('silogismo hipotético', () => expect(sigue(['p → q', 'q → r'], 'p → r')).toBe(true));
  it('silogismo disyuntivo', () => expect(sigue(['p ∨ q', '¬p'], 'q')).toBe(true));
  it('falacia: afirmar el consecuente', () => expect(sigue(['p → q', 'q'], 'p')).toBe(false));
  it('falacia: negar el antecedente', () => expect(sigue(['p → q', '¬p'], '¬q')).toBe(false));
  it('elige la opción nula si nada se sigue', () =>
    expect(opcionQueSeSigue(['p → q', 'q'], [{ formula: 'p' }, { formula: '¬p' }, { formula: null }])).toEqual([2]));
});

describe('justificación', () => {
  it('menciona el número de renglones', () =>
    expect(justificar(analizar('p ∨ ¬p'))).toContain('2 renglones'));
  it('contingencia cuenta verdaderos y falsos', () =>
    expect(justificar(analizar('p → q'))).toContain('3 renglones verdaderos y 1 falsos'));
});

describe('errores', () => {
  const error = (f: string) => { try { analizar(f); return null; } catch (e) { return (e as Error).message; } };
  it('fórmula incompleta', () => expect(error('p ∧')).not.toBeNull());
  it('paréntesis sin cerrar', () => expect(error('(p ∧ q')).not.toBeNull());
  it('letra inválida', () => expect(error('p ∧ z')).not.toBeNull());
  it('vacío', () => expect(error('')).not.toBeNull());
  it('fórmula buena no da error', () => expect(error('p ∧ q')).toBeNull());
});
