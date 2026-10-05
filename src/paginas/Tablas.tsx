// Sección «Tablas»: aparte de las preguntas, para trabajar las tablas a
// mano. Tres partes, en el orden en que se aprenden:
//   1. Conectores: memorizar las cinco tablas base y una ronda rápida.
//   2. Resolver: tablas completas columna por columna, con la regla a la vista.
//   3. Comprobar: escribir cualquier fórmula y ver su tabla resuelta.

import { useState, useSyncExternalStore, type ReactNode } from 'react';
import { Agregado } from '../componentes/Leccion';
import { Teclado } from '../componentes/Pregunta';
import { describirRenglon, reglaDe, ResolverTabla } from '../componentes/ResolverTabla';
import { TablaVerdad } from '../componentes/TablaVerdad';
import { GRUPOS, PROBLEMAS, type Problema } from '../contenido/problemasTablas';
import {
  analizar, aTexto, clasificar, ErrorFormula, evaluar, filas, justificar, NOMBRE_CLASE, pasos, variables,
  type Asignacion, type Nodo,
} from '../logica/motor';
import { useNotacion } from '../notacion';
import { ir } from '../rutas';

export type VistaTablas = 'conectores' | 'resolver' | 'comprobar';

const C = ({ children }: { children: ReactNode }) => <code className="simb">{children}</code>;

export function Tablas({ vista, problema }: { vista: VistaTablas; problema?: string }) {
  const pestanas: [VistaTablas, string][] = [
    ['conectores', '1. Memorizar conectores'],
    ['resolver', '2. Resolver paso a paso'],
    ['comprobar', '3. Comprobar'],
  ];
  return (
    <div className="pagina angosta">
      <p className="rotulo">Tablas de verdad</p>
      <h1>Tablas a mano, columna por columna</h1>
      <p className="entrada">
        Aparte de las preguntas. Primero memorizas los cinco conectores; con eso ya puedes razonar cualquier tabla.
        Luego resuelves tablas completas como en el examen, con la regla de cada columna a la vista.
      </p>
      <div className="pestanas" role="tablist">
        {pestanas.map(([id, nombre]) => (
          <button key={id} role="tab" aria-selected={vista === id}
            onClick={() => ir(id === 'conectores' ? 'tablas' : `tablas-${id}`)}>
            {nombre}
          </button>
        ))}
      </div>
      {vista === 'conectores' && <Conectores />}
      {vista === 'resolver' && <Resolver problema={problema} />}
      {vista === 'comprobar' && <Comprobar />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Conectores                                                      */
/* ------------------------------------------------------------------ */
interface Conector { formula: string; nombre: string; lee: string; raro: (V: string, F: string) => string }

const CONECTORES: Conector[] = [
  { formula: '¬p', nombre: 'Negación', lee: '«no p»', raro: () => 'Solo tiene 2 renglones: voltea el valor.' },
  { formula: 'p ∧ q', nombre: 'Conjunción', lee: '«p y q»', raro: (V) => `Un solo ${V}, en el primer renglón.` },
  { formula: 'p ∨ q', nombre: 'Disyunción', lee: '«p o q»', raro: (_V, F) => `Un solo ${F}, en el último renglón.` },
  { formula: 'p → q', nombre: 'Implicación', lee: '«si p, entonces q»', raro: (V, F) => `Un solo ${F}, en el segundo renglón (${V} → ${F}).` },
  { formula: 'p ↔ q', nombre: 'Bicondicional', lee: '«p si y solo si q»', raro: (V, F) => `${V} en los extremos, ${F} en medio.` },
];

function Conectores() {
  const [tapar, setTapar] = useState(false);
  return (
    <>
      <section className="seccion">
        <h2>Las cinco tablas base</h2>
        <p className="texto-seccion">
          Cada conector tiene <strong>un solo renglón raro</strong>. Si te aprendes cuál es, la tabla sale sola: el
          resto de los renglones vale lo contrario.
        </p>
        <div className="fila" style={{ marginBottom: 14 }}>
          <button className={`boton ${tapar ? '' : 'sec'}`} onClick={() => setTapar(!tapar)}>
            {tapar ? 'Destapar los resultados' : 'Tapar los resultados y llenarlos de memoria'}
          </button>
        </div>
        <div className="conectores">
          {CONECTORES.map((c) => <TarjetaConector key={c.formula + tapar} c={c} tapar={tapar} />)}
        </div>
      </section>

      <section className="seccion">
        <h2>Ronda rápida</h2>
        <p className="texto-seccion">Te doy valores, tú dices cuánto vale la fórmula. Sin tabla: de memoria.</p>
        <Ronda />
      </section>

      <section className="seccion">
        <h2>Columnas que conviene reconocer</h2>
        <p className="texto-seccion">
          Con dos letras, las columnas siempre salen en el mismo orden de renglones. Estas se repiten tanto que vale
          la pena reconocerlas de vista:
        </p>
        <TablaColumnas formulas={['¬p', '¬q', 'p ∧ q', 'p ∨ q', 'p → q', 'p ↔ q', '¬p ∧ ¬q', '¬p ∨ ¬q']} />
        <p className="texto-seccion">
          Compara <C>p ∨ q</C> con <C>¬p ∧ ¬q</C>: son <strong>exactamente opuestas</strong> renglón por renglón. Igual{' '}
          <C>p ∧ q</C> con <C>¬p ∨ ¬q</C>. Eso es De Morgan visto en columnas.
        </p>
      </section>

      <section className="seccion">
        <h2>Atajos para razonar sin hacer toda la tabla</h2>
        <Atajos />
      </section>
    </>
  );
}

function TarjetaConector({ c, tapar }: { c: Conector; tapar: boolean }) {
  const { simbolo } = useNotacion();
  const V = simbolo(true), F = simbolo(false);
  const arbol = analizar(c.formula);
  const vars = variables(arbol);
  const renglones = filas(vars);
  const correctas = renglones.map((env) => evaluar(arbol, env));
  const [vals, setVals] = useState<(boolean | null)[]>(() => renglones.map(() => null));
  const [revisado, setRevisado] = useState(false);
  const bien = revisado && vals.every((v, i) => v === correctas[i]);
  const simboloConector = arbol.t === 'not' ? '¬' : c.formula.split(' ')[1];

  return (
    <div className="conector">
      <div className="conector-cabeza">
        <span className="conector-simbolo">{simboloConector}</span>
        <div>
          <h3>{c.nombre}</h3>
          <span className="conector-lee">{c.lee}</span>
        </div>
      </div>
      <p className="conector-regla">{reglaDe(arbol, V, F)}</p>
      <table className="tv">
        <thead>
          <tr>
            {vars.map((v) => <th key={v} className="letra">{v}</th>)}
            <th className="sep final">{c.formula}</th>
          </tr>
        </thead>
        <tbody>
          {renglones.map((env, i) => (
            <tr key={i}>
              {vars.map((v) => <td key={v} className={`letra ${env[v] ? 'v' : 'f'}`} style={{ fontWeight: 400 }}>{simbolo(env[v])}</td>)}
              <td className="sep final">
                {tapar ? (
                  <button className="celda" disabled={revisado}
                    data-v={vals[i] === null ? undefined : vals[i] ? '1' : '0'}
                    data-estado={revisado && vals[i] !== correctas[i] ? 'mal' : undefined}
                    aria-label={`${c.nombre}, renglón ${i + 1}`}
                    onClick={() => { const s = [...vals]; s[i] = s[i] === null ? true : !s[i]; setVals(s); }}>
                    {revisado && vals[i] !== correctas[i] ? simbolo(correctas[i]) : vals[i] === null ? '·' : simbolo(vals[i] as boolean)}
                  </button>
                ) : (
                  <span className={correctas[i] ? 'v' : 'f'}>{simbolo(correctas[i])}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!tapar && <p className="conector-raro">{c.raro(V, F)}</p>}
      {tapar && !revisado && (
        <button className="boton chico" style={{ marginTop: 10 }} disabled={vals.some((v) => v === null)}
          onClick={() => setRevisado(true)}>Revisar</button>
      )}
      {tapar && revisado && (
        <p className={`conector-raro ${bien ? 'v' : 'f'}`}>
          {bien ? '✓ De memoria.' : 'Los de borde rojo estaban mal; ya tienen el valor correcto.'}{' '}
          <button className="boton fant chico" onClick={() => { setVals(renglones.map(() => null)); setRevisado(false); }}>Otra vez</button>
        </p>
      )}
    </div>
  );
}

/** Varias fórmulas como columnas de una misma tabla, para compararlas. */
function TablaColumnas({ formulas }: { formulas: string[] }) {
  const { simbolo } = useNotacion();
  const arboles = formulas.map(analizar);
  const vars = variables(...arboles);
  const renglones = filas(vars);
  return (
    <div className="marco">
      <table className="tv">
        <thead>
          <tr>
            {vars.map((v) => <th key={v} className="letra">{v}</th>)}
            {formulas.map((f, k) => <th key={f} className={k === 0 ? 'sep' : ''}>{f}</th>)}
          </tr>
        </thead>
        <tbody>
          {renglones.map((env, i) => (
            <tr key={i}>
              {vars.map((v) => <td key={v} className={`letra ${env[v] ? 'v' : 'f'}`} style={{ fontWeight: 400 }}>{simbolo(env[v])}</td>)}
              {arboles.map((a, k) => {
                const val = evaluar(a, env);
                return <td key={k} className={`${val ? 'v' : 'f'} ${k === 0 ? 'sep' : ''}`}>{simbolo(val)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const NIVELES = {
  solos: { nombre: 'Conectores solos', formulas: ['¬p', 'p ∧ q', 'p ∨ q', 'p → q', 'p ↔ q'] },
  negacion: {
    nombre: 'Con negaciones',
    formulas: ['¬p ∧ q', 'p ∨ ¬q', '¬p → q', 'p → ¬q', '¬(p ∧ q)', '¬(p ∨ q)', '¬p ↔ q', '¬p ∧ ¬q', '¬p ∨ ¬q', '¬(p → q)'],
  },
  tres: {
    nombre: 'Con 3 letras',
    formulas: ['(p ∧ q) → r', '(p ∨ q) ∧ ¬r', 'p → (q ∨ r)', '(p → q) ∧ r', '¬p ∨ (q ∧ r)', '(p ↔ q) ∨ r', '(p ∧ ¬q) → r'],
  },
} as const;
type Nivel = keyof typeof NIVELES;

function nuevaRonda(nivel: Nivel, anterior?: string): { formula: string; env: Asignacion } {
  const lista = NIVELES[nivel].formulas.filter((f) => f !== anterior);
  const formula = lista[Math.floor(Math.random() * lista.length)];
  const env: Asignacion = {};
  for (const v of variables(analizar(formula))) env[v] = Math.random() < 0.5;
  return { formula, env };
}

function Ronda() {
  const { simbolo } = useNotacion();
  const V = simbolo(true), F = simbolo(false);
  const [nivel, setNivel] = useState<Nivel>('solos');
  const [actual, setActual] = useState(() => nuevaRonda('solos'));
  const [elegido, setElegido] = useState<boolean | null>(null);
  const [cuenta, setCuenta] = useState({ bien: 0, total: 0, racha: 0 });

  const arbol = analizar(actual.formula);
  const correcto = evaluar(arbol, actual.env);
  const otra = (n: Nivel = nivel) => { setActual(nuevaRonda(n, actual.formula)); setElegido(null); };
  const contestar = (v: boolean) => {
    setElegido(v);
    const ok = v === correcto;
    setCuenta((c) => ({ bien: c.bien + (ok ? 1 : 0), total: c.total + 1, racha: ok ? c.racha + 1 : 0 }));
  };

  return (
    <div className="pregunta ronda">
      <div className="fila" style={{ marginBottom: 14 }}>
        {(Object.keys(NIVELES) as Nivel[]).map((n) => (
          <button key={n} className={`boton chico ${n === nivel ? '' : 'fant'}`}
            onClick={() => { setNivel(n); otra(n); }}>
            {NIVELES[n].nombre}
          </button>
        ))}
        {cuenta.total > 0 && (
          <span className="medidor-texto" style={{ marginLeft: 'auto' }}>
            {cuenta.bien} de {cuenta.total}{cuenta.racha >= 3 ? ` · racha de ${cuenta.racha}` : ''}
          </span>
        )}
      </div>
      <p className="enunciado">
        Con <strong>{describirRenglon(actual.env, simbolo)}</strong>, ¿cuánto vale <C>{aTexto(arbol)}</C>?
      </p>
      <div className="fila">
        {[true, false].map((v) => {
          let clase = 'boton ronda-boton';
          if (elegido !== null && v === correcto) clase += ' bien';
          else if (elegido === v) clase += ' mal';
          return (
            <button key={String(v)} className={clase} disabled={elegido !== null} onClick={() => contestar(v)}>
              {simbolo(v)}
            </button>
          );
        })}
      </div>
      {elegido !== null && (
        <div className={`retro ${elegido === correcto ? 'bien' : 'mal'}`} role="status">
          <span className="veredicto">{elegido === correcto ? 'Correcto' : 'Incorrecto'}</span>
          <p>
            {pasos(arbol).map((c, k) => (
              <span key={c.texto}>{k > 0 && ' → '}<C>{c.texto}</C> = {simbolo(evaluar(c.nodo, actual.env))}</span>
            ))}
          </p>
          <p>{reglaDe(arbol, V, F)}</p>
        </div>
      )}
      {elegido !== null && (
        <div className="fila" style={{ marginTop: 12 }}>
          <button className="boton" onClick={() => otra()} autoFocus>Otra →</button>
        </div>
      )}
    </div>
  );
}

function Atajos() {
  return (
    <>
      <ol className="atajos">
        <li>
          <strong>Un ∧ solo es verdadero donde las dos partes son verdaderas.</strong> Si sus dos partes nunca son
          verdaderas en el mismo renglón, todo el ∧ es <strong>contradicción</strong>.
        </li>
        <li>
          <strong>Un ∨ solo es falso donde las dos partes son falsas.</strong> Si nunca son falsas a la vez, es{' '}
          <strong>tautología</strong>.
        </li>
        <li>
          <strong>Un → solo es falso donde la izquierda es verdadera y la derecha falsa.</strong> Si eso no puede pasar
          en ningún renglón, es <strong>tautología</strong>.
        </li>
        <li>
          <strong>Algo ∧ su negación</strong> siempre es contradicción, y <strong>algo ∨ su negación</strong> siempre es
          tautología, aunque «algo» sea una fórmula larga.
        </li>
      </ol>
      <div className="bloque ejemplo">
        <span className="etiqueta">Ejemplo: (p ∨ q) ∧ (¬p ∧ ¬q)</span>
        <p>
          <C>p ∨ q</C> es falsa solo en el último renglón (las dos falsas). <C>¬p ∧ ¬q</C> es verdadera solo en ese
          mismo renglón. Son opuestas: donde una es verdadera, la otra es falsa. Por el atajo 1, el ∧ nunca puede ser
          verdadero: es <strong>contradicción</strong>.
        </p>
        <p>
          De hecho, <C>¬p ∧ ¬q</C> es <C>¬(p ∨ q)</C> por De Morgan. La fórmula es «algo ∧ su negación», el atajo 4.
        </p>
      </div>
      <Agregado>
        <p>
          Los atajos sirven para revisar, no para saltarte la tabla: en el examen piden la tabla y la justificación.
          Úsalos para saber qué te debe salir antes de llenarla.
        </p>
      </Agregado>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Resolver paso a paso                                            */
/* ------------------------------------------------------------------ */
const CLAVE_RESUELTOS = 'fdi-estudio:tablas-resueltas';
let resueltos: Set<string> = (() => {
  try { return new Set(JSON.parse(localStorage.getItem(CLAVE_RESUELTOS) ?? '[]') as string[]); } catch { return new Set(); }
})();
const oyentes = new Set<() => void>();
function marcarResuelto(id: string) {
  if (resueltos.has(id)) return;
  resueltos = new Set(resueltos).add(id);
  try { localStorage.setItem(CLAVE_RESUELTOS, JSON.stringify([...resueltos])); } catch { /* da igual */ }
  oyentes.forEach((f) => f());
}
function useResueltos() {
  return useSyncExternalStore((f) => { oyentes.add(f); return () => oyentes.delete(f); }, () => resueltos, () => resueltos);
}

/** La fórmula que escribió quien estudia. Vive en memoria: al recargar se pierde, y está bien. */
let libre: Problema | null = null;

function partes(p: Problema): [string, string] | null {
  const a = analizar(p.formula);
  return p.final === 'equivalencia' && a.t === 'iff' ? [aTexto(a.a), aTexto(a.b)] : null;
}

function Resolver({ problema }: { problema?: string }) {
  const hechos = useResueltos();
  const elegido = problema === 'libre' ? libre : PROBLEMAS.find((p) => p.id === problema);
  if (elegido) return <UnProblema key={elegido.id + elegido.formula} p={elegido} />;

  const total = PROBLEMAS.length;
  const listos = PROBLEMAS.filter((p) => hechos.has(p.id)).length;
  return (
    <>
      <p className="texto-seccion">
        Eliges una fórmula y llenas su tabla columna por columna. En cada columna ves la regla del conector y qué
        columnas usar. Al revisar se marcan los renglones mal para que los corrijas tú.
        {listos > 0 && <> Llevas <strong>{listos} de {total}</strong>.</>}
      </p>
      <EscribeLaTuya />
      {GRUPOS.map((g) => (
        <section key={g} className="seccion" style={{ marginBottom: 26 }}>
          <h3 className="grupo-problemas">{g}</h3>
          <div className="problemas">
            {PROBLEMAS.filter((p) => p.grupo === g).map((p) => {
              const ab = partes(p);
              return (
                <button key={p.id} className="problema" onClick={() => ir(`tablas-resolver-${p.id}`)}>
                  <span>
                    {p.nombre && <small>{p.nombre}</small>}
                    {ab ? <>{ab[0]} ≡ {ab[1]} ?</> : p.formula}
                  </span>
                  {hechos.has(p.id) && <span className="hecho" aria-label="Resuelto">✓</span>}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

function EscribeLaTuya() {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');
  const resolver = () => {
    try {
      const arbol = analizar(texto);
      if (variables(arbol).length > 4) { setError('Con más de 4 letras son más de 16 renglones. Usa hasta 4.'); return; }
      if (arbol.t === 'var') { setError('Una letra sola no tiene columnas que llenar.'); return; }
      libre = { id: 'libre', formula: aTexto(arbol), final: 'clasificar', grupo: 'Tuya' };
      ir('tablas-resolver-libre');
    } catch (e) {
      setError(e instanceof ErrorFormula ? e.message : 'No se pudo leer la fórmula.');
    }
  };
  return (
    <div className="pregunta" style={{ marginBottom: 26 }}>
      <label htmlFor="formula-propia" style={{ fontWeight: 600, fontSize: 14 }}>Escribe la tuya (la del cuaderno o la de un examen)</label>
      <div className="fila" style={{ marginTop: 8, flexWrap: 'nowrap' }}>
        <input id="formula-propia" className="campo" value={texto} placeholder="(p ∨ q) → r"
          onChange={(e) => { setTexto(e.target.value); setError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter' && texto.trim()) resolver(); }}
          spellCheck={false} autoCapitalize="off" autoComplete="off" />
        <button className="boton" disabled={!texto.trim()} onClick={resolver}>Resolver</button>
      </div>
      <Teclado letras={['p', 'q', 'r', 's']} alInsertar={(s) => { setTexto((t) => t + s); setError(''); }} />
      {error && <p className="aviso error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  );
}

function UnProblema({ p }: { p: Problema }) {
  const [vuelta, setVuelta] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const ab = partes(p);
  const i = PROBLEMAS.findIndex((x) => x.id === p.id);
  const sig = i >= 0 ? PROBLEMAS[i + 1] : undefined;

  return (
    <>
      <button className="boton fant chico" onClick={() => ir('tablas-resolver')}>← Todos los problemas</button>
      <div className="pregunta" style={{ marginTop: 14 }}>
        <div className="pregunta-meta">
          <span className="tipo">{ab ? 'Equivalencia' : 'Clasificar'}</span>
          <span>{p.nombre ?? p.grupo}</span>
        </div>
        <p className="enunciado">
          {ab
            ? <>Haz la tabla de <C>{aTexto(analizar(p.formula))}</C> para saber si <C>{ab[0]}</C> y <C>{ab[1]}</C> son equivalentes.</>
            : <>Haz la tabla de <C>{p.formula}</C> y clasifícala: tautología, contradicción o contingencia.</>}
          {p.nota && <> <span style={{ color: 'var(--tinta-2)' }}>{p.nota}</span></>}
        </p>
        <ResolverTabla key={vuelta} formula={p.formula} final={p.final}
          alTerminar={() => { setTerminado(true); if (p.id !== 'libre') marcarResuelto(p.id); }} />
        {terminado && (
          <div className="fila" style={{ marginTop: 16 }}>
            {sig && <button className="boton" onClick={() => ir(`tablas-resolver-${sig.id}`)}>Siguiente problema →</button>}
            <button className="boton sec" onClick={() => { setVuelta((x) => x + 1); setTerminado(false); }}>Hacerla otra vez</button>
            <button className="boton fant" onClick={() => ir('tablas-resolver')}>Todos los problemas</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Comprobar                                                       */
/* ------------------------------------------------------------------ */
const EJEMPLOS = [
  ['motor', '(p ∧ q) → r'],
  ['incendios', '((p ∨ q) ∧ ¬r) → s'],
  ['De Morgan', '¬(p ∧ q) ↔ (¬p ∨ ¬q)'],
  ['contrapositiva', '(p → q) ↔ (¬q → ¬p)'],
  ['modus ponens', '((p → q) ∧ p) → q'],
  ['tautología', 'p ∨ ¬p'],
  ['contradicción', 'p ∧ ¬p'],
];

function Comprobar() {
  const [texto, setTexto] = useState('(p ∧ q) → r');
  let error = '';
  let arbol: Nodo | null = null;
  try {
    if (texto.trim()) {
      arbol = analizar(texto);
      if (variables(arbol).length > 5) { error = 'Con más de 5 letras la tabla pasa de 32 renglones. Divídela en partes.'; arbol = null; }
    }
  } catch (e) {
    error = e instanceof ErrorFormula ? e.message : 'No se pudo leer la fórmula.';
  }

  return (
    <>
      <p className="texto-seccion">
        Escribe una fórmula y aparece resuelta con todas las columnas intermedias. Úsalo para revisar las tablas que
        hagas en tu cuaderno.
      </p>
      <div className="pregunta">
        <input className="campo" value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Fórmula"
          spellCheck={false} autoCapitalize="off" autoComplete="off" />
        <Teclado letras={['p', 'q', 'r', 's']} alInsertar={(s) => setTexto((t) => t + s)} />
        <div className="fila" style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: 'var(--tinta-3)' }}>Ejemplos:</span>
          {EJEMPLOS.map(([n, f]) => <button key={n} className="boton fant chico" onClick={() => setTexto(f)}>{n}</button>)}
          <button className="boton fant chico" onClick={() => setTexto('')}>borrar</button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--tinta-3)', margin: '0 0 14px' }}>
          Atajos: <code className="simb">~</code> o <code className="simb">!</code> para ¬,
          <code className="simb">^</code> para ∧, <code className="simb">v</code> para ∨,
          <code className="simb">-&gt;</code> para →, <code className="simb">&lt;-&gt;</code> para ↔.
        </p>
        {error && <p className="aviso error">{error}</p>}
        {arbol && (
          <>
            <p className="aviso info">Leída así: <strong>{aTexto(arbol)}</strong> · {NOMBRE_CLASE[clasificar(arbol)]}</p>
            <TablaVerdad formula={texto} />
            <p style={{ fontSize: 14.5 }}><strong>Justificación:</strong> {justificar(arbol)}</p>
          </>
        )}
      </div>
      <Agregado>
        <p>
          Para comprobar si dos fórmulas son equivalentes, únelas con ↔. Si sale tautología, lo son. Para comprobar una
          conclusión, escribe <code className="simb">(premisa1 ∧ premisa2) → conclusión</code>: si es tautología, la
          conclusión es válida.
        </p>
      </Agregado>
    </>
  );
}
