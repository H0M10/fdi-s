// Motor de lógica proposicional.
//
// Es el mismo que el de la página de tablas de verdad, que se verificó con
// 53 comprobaciones, pasado a TypeScript y con dos funciones nuevas:
//   - seSigue(): decide si una conclusión se deduce de unas premisas
//   - justificar(): redacta la justificación de tautología/contradicción/
//     contingencia, que es lo que piden en el examen
//
// Precedencia, de la que más amarra a la que menos:
//   ¬   >   ∧   >   ∨   >   →   >   ↔
// La implicación asocia a la derecha: p → q → r es p → (q → r).

import type { Clase } from '../tipos';

export type Nodo =
  | { t: 'var'; n: string }
  | { t: 'not'; a: Nodo }
  | { t: 'and' | 'or' | 'imp' | 'iff'; a: Nodo; b: Nodo };

type Ficha =
  | { t: 'var'; n: string }
  | { t: 'not' | 'and' | 'or' | 'imp' | 'iff' | '(' | ')' };

export const LETRAS = ['p', 'q', 'r', 's', 't'];

export class ErrorFormula extends Error {}

function tokenizar(texto: string): Ficha[] {
  const src = texto.replace(/\s+/g, '');
  const f: Ficha[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (src.startsWith('<->', i) || src.startsWith('<=>', i)) { f.push({ t: 'iff' }); i += 3; continue; }
    if (src.startsWith('->', i) || src.startsWith('=>', i)) { f.push({ t: 'imp' }); i += 2; continue; }
    if (c === '↔' || c === '⇔') { f.push({ t: 'iff' }); i++; continue; }
    if (c === '→' || c === '⇒' || c === '⊃') { f.push({ t: 'imp' }); i++; continue; }
    if ('∧^&·*'.includes(c)) { f.push({ t: 'and' }); i++; continue; }
    if ('∨|+vV'.includes(c)) { f.push({ t: 'or' }); i++; continue; }
    if ("¬~!-'".includes(c)) { f.push({ t: 'not' }); i++; continue; }
    if (c === '(' || c === '[') { f.push({ t: '(' }); i++; continue; }
    if (c === ')' || c === ']') { f.push({ t: ')' }); i++; continue; }
    if (/[pqrstPQRST]/.test(c)) { f.push({ t: 'var', n: c.toLowerCase() }); i++; continue; }
    throw new ErrorFormula(`No reconozco el símbolo «${c}». Las letras válidas son p, q, r, s y t.`);
  }
  return f;
}

export function analizar(texto: string): Nodo {
  const f = tokenizar(texto);
  let i = 0;
  const ver = () => f[i];

  function bicondicional(): Nodo {
    let izq = implicacion();
    while (ver()?.t === 'iff') { i++; izq = { t: 'iff', a: izq, b: implicacion() }; }
    return izq;
  }
  function implicacion(): Nodo {
    const izq = disyuncion();
    if (ver()?.t === 'imp') { i++; return { t: 'imp', a: izq, b: implicacion() }; }
    return izq;
  }
  function disyuncion(): Nodo {
    let izq = conjuncion();
    while (ver()?.t === 'or') { i++; izq = { t: 'or', a: izq, b: conjuncion() }; }
    return izq;
  }
  function conjuncion(): Nodo {
    let izq = negacion();
    while (ver()?.t === 'and') { i++; izq = { t: 'and', a: izq, b: negacion() }; }
    return izq;
  }
  function negacion(): Nodo {
    if (ver()?.t === 'not') { i++; return { t: 'not', a: negacion() }; }
    return atomo();
  }
  function atomo(): Nodo {
    const v = ver();
    if (!v) throw new ErrorFormula('La fórmula se corta antes de tiempo. ¿Falta una letra al final?');
    if (v.t === 'var') { i++; return { t: 'var', n: v.n }; }
    if (v.t === '(') {
      i++;
      const dentro = bicondicional();
      if (ver()?.t !== ')') throw new ErrorFormula('Falta cerrar un paréntesis.');
      i++;
      return dentro;
    }
    if (v.t === ')') throw new ErrorFormula('Hay un paréntesis de cierre sin su pareja.');
    throw new ErrorFormula('Falta una letra donde va un conector. Revisa si hay dos conectores seguidos.');
  }

  if (f.length === 0) throw new ErrorFormula('Escribe una fórmula.');
  const arbol = bicondicional();
  if (i < f.length) throw new ErrorFormula('Sobra algo al final. ¿Falta un paréntesis de apertura?');
  return arbol;
}

const SIGNO = { and: '∧', or: '∨', imp: '→', iff: '↔' } as const;

/**
 * Imprime la fórmula con paréntesis alrededor de todo subgrupo binario,
 * aunque la precedencia los haga innecesarios. A propósito: los apuntes
 * dicen «lo ideal es que nos ayudemos de los paréntesis».
 */
export function aTexto(n: Nodo): string {
  if (n.t === 'var') return n.n;
  const suelto = (h: Nodo) => h.t === 'var' || h.t === 'not';
  if (n.t === 'not') return '¬' + (suelto(n.a) ? aTexto(n.a) : `(${aTexto(n.a)})`);
  const env = (h: Nodo) => (suelto(h) ? aTexto(h) : `(${aTexto(h)})`);
  return `${env(n.a)} ${SIGNO[n.t]} ${env(n.b)}`;
}

export type Asignacion = Record<string, boolean>;

export function evaluar(n: Nodo, env: Asignacion): boolean {
  switch (n.t) {
    case 'var': return env[n.n];
    case 'not': return !evaluar(n.a, env);
    case 'and': return evaluar(n.a, env) && evaluar(n.b, env);
    case 'or': return evaluar(n.a, env) || evaluar(n.b, env);
    case 'imp': return !evaluar(n.a, env) || evaluar(n.b, env);
    case 'iff': return evaluar(n.a, env) === evaluar(n.b, env);
  }
}

function juntarVariables(n: Nodo, acc: Set<string>): Set<string> {
  if (n.t === 'var') acc.add(n.n);
  else if (n.t === 'not') juntarVariables(n.a, acc);
  else { juntarVariables(n.a, acc); juntarVariables(n.b, acc); }
  return acc;
}

export function variables(...nodos: Nodo[]): string[] {
  const s = new Set<string>();
  nodos.forEach((n) => juntarVariables(n, s));
  return LETRAS.filter((l) => s.has(l));
}

/** Primer renglón todo verdadero; baja como contador binario invertido. */
export function filas(vars: string[]): Asignacion[] {
  const n = vars.length;
  const out: Asignacion[] = [];
  for (let i = 0; i < 1 << n; i++) {
    const env: Asignacion = {};
    vars.forEach((v, j) => { env[v] = !((i >> (n - 1 - j)) & 1); });
    out.push(env);
  }
  return out;
}

/** Subfórmulas en orden de resolución, de adentro hacia afuera. */
export function pasos(n: Nodo): { texto: string; nodo: Nodo }[] {
  const acc: { texto: string; nodo: Nodo }[] = [];
  const vistos = new Set<string>();
  (function rec(x: Nodo) {
    if (x.t === 'var') return;
    if (x.t === 'not') rec(x.a);
    else { rec(x.a); rec(x.b); }
    const s = aTexto(x);
    if (!vistos.has(s)) { vistos.add(s); acc.push({ texto: s, nodo: x }); }
  })(n);
  return acc;
}

export function columnaFinal(n: Nodo): boolean[] {
  return filas(variables(n)).map((env) => evaluar(n, env));
}

export function clasificar(n: Nodo): Clase {
  const col = columnaFinal(n);
  if (col.every(Boolean)) return 'tautologia';
  if (col.every((x) => !x)) return 'contradiccion';
  return 'contingencia';
}

export const NOMBRE_CLASE: Record<Clase, string> = {
  tautologia: 'Tautología',
  contradiccion: 'Contradicción',
  contingencia: 'Contingencia',
};

/** La justificación en el formato que se pide en el examen. */
export function justificar(n: Nodo): string {
  const col = columnaFinal(n);
  const total = col.length;
  const v = col.filter(Boolean).length;
  const clase = clasificar(n);
  if (clase === 'tautologia')
    return `Es tautología porque en los ${total} renglones de la tabla la columna final es verdadera: la fórmula es cierta sin importar los valores de las letras.`;
  if (clase === 'contradiccion')
    return `Es contradicción porque en los ${total} renglones de la tabla la columna final es falsa: no existe ningún caso en que la fórmula sea cierta.`;
  return `Es contingencia porque la columna final tiene ${v} renglones verdaderos y ${total - v} falsos: el resultado depende de los valores de las letras.`;
}

export function equivalentes(a: Nodo, b: Nodo): boolean {
  return filas(variables(a, b)).every((env) => evaluar(a, env) === evaluar(b, env));
}

/**
 * ¿La conclusión se sigue de las premisas? Se sigue si en todos los
 * renglones donde las premisas son verdaderas, la conclusión también lo es.
 */
export function seSigue(premisas: Nodo[], conclusion: Nodo): boolean {
  return filas(variables(...premisas, conclusion)).every(
    (env) => !premisas.every((p) => evaluar(p, env)) || evaluar(conclusion, env),
  );
}

/** Índice de la opción correcta de una pregunta de conclusión. */
export function opcionQueSeSigue(
  premisas: string[],
  opciones: { formula: string | null }[],
): number[] {
  const ps = premisas.map(analizar);
  const validas = opciones
    .map((o, i) => (o.formula !== null && seSigue(ps, analizar(o.formula)) ? i : -1))
    .filter((i) => i >= 0);
  if (validas.length > 0) return validas;
  const nula = opciones.findIndex((o) => o.formula === null);
  return nula >= 0 ? [nula] : [];
}
