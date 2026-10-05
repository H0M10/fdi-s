// Resolver una tabla de verdad a mano, columna por columna.
//
// Es el proceso del examen: las letras ya están, y tú llenas cada
// subfórmula de adentro hacia afuera. Al revisar una columna se marcan los
// renglones mal, pero no se corrigen solos: hay que corregirlos con la
// regla del conector a la vista. Solo si lo pides se muestra la respuesta.
// Las respuestas las calcula el motor; aquí no hay nada escrito a mano.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  analizar, aTexto, clasificar, evaluar, filas, justificar, NOMBRE_CLASE, pasos, variables,
  type Asignacion, type Nodo,
} from '../logica/motor';
import { useNotacion } from '../notacion';
import type { Clase } from '../tipos';
import { TablaVerdad } from './TablaVerdad';

/** Qué se pregunta al terminar la tabla. */
export type Final = 'clasificar' | 'equivalencia' | 'ninguno';

const C = ({ children }: { children: ReactNode }) => <code className="simb">{children}</code>;

function hijos(n: Nodo): Nodo[] {
  if (n.t === 'var') return [];
  if (n.t === 'not') return [n.a];
  return [n.a, n.b];
}

/** La regla del conector de una columna, con los nombres de sus columnas. */
export function reglaDe(n: Nodo, V: string, F: string): ReactNode {
  if (n.t === 'var') return null;
  const A = aTexto(n.a);
  if (n.t === 'not') {
    return <>Es la negación de <C>{A}</C>: copia esa columna volteada. Donde hay {V} pon {F}, y donde hay {F} pon {V}.</>;
  }
  const B = aTexto(n.b);
  switch (n.t) {
    case 'and':
      return <>Es <C>{aTexto(n)}</C>. Solo es {V} en los renglones donde <C>{A}</C> y <C>{B}</C> son {V} las dos. Todo lo demás es {F}.</>;
    case 'or':
      return <>Es <C>{aTexto(n)}</C>. Solo es {F} en los renglones donde <C>{A}</C> y <C>{B}</C> son {F} las dos. Todo lo demás es {V}.</>;
    case 'imp':
      return <>Es <C>{aTexto(n)}</C>. Solo es {F} donde <C>{A}</C> (la de la izquierda) es {V} y <C>{B}</C> es {F}. Todo lo demás es {V}.</>;
    case 'iff':
      return <>Es <C>{aTexto(n)}</C>. Es {V} donde <C>{A}</C> y <C>{B}</C> valen lo mismo, y {F} donde son distintas.</>;
  }
}

/** El atajo para llenar rápido: empezar por el valor que más se repite. */
function trucoDe(n: Nodo, V: string, F: string): string | null {
  switch (n.t) {
    case 'and': return `Truco: pon todo en ${F} y cambia a ${V} solo donde las dos son ${V}.`;
    case 'or': return `Truco: pon todo en ${V} y cambia a ${F} solo donde las dos son ${F}.`;
    case 'imp': return `Truco: pon todo en ${V} y busca los renglones ${V} → ${F}: solo esos son ${F}.`;
    default: return null;
  }
}

export function describirRenglon(env: Asignacion, simbolo: (v: boolean) => string): string {
  return Object.keys(env).map((k) => `${k} = ${simbolo(env[k])}`).join(', ');
}

export function ResolverTabla({ formula, final = 'clasificar', alTerminar }: {
  formula: string;
  final?: Final;
  /** Se llama una vez, al contestar la pregunta final (o al llenar la tabla si no hay). */
  alTerminar?: (bienALaPrimera: number, columnas: number) => void;
}) {
  const { simbolo } = useNotacion();
  const V = simbolo(true), F = simbolo(false);
  const arbol = useMemo(() => analizar(formula), [formula]);
  const vars = useMemo(() => variables(arbol), [arbol]);
  const renglones = useMemo(() => filas(vars), [vars]);
  const cols = useMemo(() => pasos(arbol), [arbol]);
  const correctas = useMemo(() => cols.map((c) => renglones.map((env) => evaluar(c.nodo, env))), [cols, renglones]);
  const n = renglones.length;

  const [paso, setPaso] = useState(0);
  const [valores, setValores] = useState<(boolean | null)[]>(() => Array(n).fill(null));
  const [malas, setMalas] = useState<Set<number>>(new Set());
  const [intentos, setIntentos] = useState(0);
  const [vista, setVista] = useState(false);
  const [primera, setPrimera] = useState(0);
  const [ultimo, setUltimo] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const avisado = useRef(false);

  const terminada = paso >= cols.length;
  const activa = terminada ? -1 : paso;
  const nodoActivo = terminada ? null : cols[paso].nodo;
  const fuentes = new Set(nodoActivo ? hijos(nodoActivo).map(aTexto) : []);
  const faltan = valores.filter((v) => v === null).length;

  const avisar = () => {
    if (avisado.current) return;
    avisado.current = true;
    alTerminar?.(primera, cols.length);
  };
  useEffect(() => { if (terminada && final === 'ninguno') avisar(); });

  const poner = (i: number, v: boolean) => {
    const s = [...valores];
    s[i] = v;
    setValores(s);
    if (malas.has(i)) { const m = new Set(malas); m.delete(i); setMalas(m); }
  };
  const llenar = (v: boolean) => { setValores(Array(n).fill(v)); setMalas(new Set()); };

  const avanzar = (bien: boolean) => {
    setUltimo(bien ? `✓ ${cols[paso].texto}: bien a la primera.` : `✓ ${cols[paso].texto}: lista.`);
    if (bien) setPrimera((x) => x + 1);
    setPaso((k) => k + 1);
    setValores(Array(n).fill(null));
    setMalas(new Set());
    setIntentos(0);
    setVista(false);
  };

  const revisar = () => {
    const mal = new Set(valores.flatMap((v, i) => (v === correctas[paso][i] ? [] : [i])));
    if (mal.size === 0) avanzar(intentos === 0);
    else { setMalas(mal); setIntentos((x) => x + 1); setUltimo(null); }
  };

  const verRespuesta = () => { setValores([...correctas[paso]]); setMalas(new Set()); setVista(true); };

  const claseCol = (k: number, texto: string) => [
    k === 0 ? 'sep' : '',
    k === cols.length - 1 ? 'final' : '',
    k === activa ? 'activa' : '',
    activa >= 0 && k > activa ? 'futura' : '',
    fuentes.has(texto) ? 'fuente' : '',
  ].join(' ');

  return (
    <div className="resolver">
      {paso === 0 && !terminada && (
        <p className="resolver-plan">
          {vars.length} {vars.length === 1 ? 'letra' : 'letras'} → 2<sup>{vars.length}</sup> = {n} renglones. Las letras ya
          están puestas. Vas a llenar {cols.length} {cols.length === 1 ? 'columna' : 'columnas'}, de adentro hacia afuera.
        </p>
      )}
      {ultimo && <p className="resolver-ok" role="status">{ultimo}</p>}

      {nodoActivo && (
        <div className="pista-col">
          <span className="etiqueta">Columna {paso + 1} de {cols.length}</span>
          <p className="pista-formula"><C>{cols[paso].texto}</C></p>
          <p>{reglaDe(nodoActivo, V, F)}</p>
          {fuentes.size > 0 && (
            <p className="pista-fuentes">
              Usa {fuentes.size === 1 ? 'la columna marcada' : 'las dos columnas marcadas'} en gris:{' '}
              {[...fuentes].map((f, i) => <span key={f}>{i > 0 && ' y '}<C>{f}</C></span>)}.
            </p>
          )}
          {trucoDe(nodoActivo, V, F) && <p className="pista-truco">{trucoDe(nodoActivo, V, F)}</p>}
        </div>
      )}

      <div className="marco">
        <table className="tv">
          <thead>
            <tr>
              {vars.map((v) => <th key={v} className={`letra ${fuentes.has(v) ? 'fuente' : ''}`}>{v}</th>)}
              {cols.map((c, k) => <th key={c.texto} className={claseCol(k, c.texto)}>{c.texto}</th>)}
            </tr>
          </thead>
          <tbody>
            {renglones.map((env, i) => (
              <tr key={i}>
                {vars.map((v) => (
                  <td key={v} className={`letra ${env[v] ? 'v' : 'f'} ${fuentes.has(v) ? 'fuente' : ''}`} style={{ fontWeight: 400 }}>
                    {simbolo(env[v])}
                  </td>
                ))}
                {cols.map((c, k) => {
                  if (k < paso) {
                    const val = correctas[k][i];
                    return <td key={c.texto} className={`${val ? 'v' : 'f'} ${claseCol(k, c.texto)}`}>{simbolo(val)}</td>;
                  }
                  if (k === paso) {
                    const val = valores[i];
                    return (
                      <td key={c.texto} className={claseCol(k, c.texto)}>
                        <button className="celda" disabled={vista}
                          data-v={val === null ? undefined : val ? '1' : '0'}
                          data-estado={malas.has(i) ? 'mal' : undefined}
                          aria-label={`Renglón ${i + 1} de ${c.texto}`}
                          onClick={() => poner(i, val === null ? true : !val)}>
                          {val === null ? '·' : simbolo(val)}
                        </button>
                      </td>
                    );
                  }
                  return <td key={c.texto} className={claseCol(k, c.texto)} />;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!terminada && (
        <>
          {malas.size > 0 && (
            <p className="aviso error" role="status">
              {malas.size === 1 ? 'Un renglón está mal' : `${malas.size} renglones están mal`} (con borde rojo). Vuelve a
              leer la regla y corrígelos.
            </p>
          )}
          <div className="fila">
            {vista ? (
              <button className="boton" onClick={() => avanzar(false)}>Siguiente columna →</button>
            ) : (
              <button className="boton" disabled={faltan > 0} onClick={revisar}>Revisar columna</button>
            )}
            {!vista && <button className="boton fant chico" onClick={() => llenar(true)}>Todo {V}</button>}
            {!vista && <button className="boton fant chico" onClick={() => llenar(false)}>Todo {F}</button>}
            {intentos > 0 && !vista && <button className="boton fant chico" onClick={verRespuesta}>Ver la respuesta</button>}
            {faltan > 0 && !vista && (
              <span style={{ fontSize: 13, color: 'var(--tinta-3)' }}>
                Toca cada celda para poner {V} o {F}. Faltan {faltan}.
              </span>
            )}
          </div>
        </>
      )}

      {terminada && (
        <>
          <p className="aviso info" role="status">
            Tabla completa. Columnas bien a la primera: {primera} de {cols.length}.
          </p>
          {final === 'clasificar' && (
            <PreguntaClase arbol={arbol} respuesta={respuesta} alResponder={(r) => { setRespuesta(r); avisar(); }} />
          )}
          {final === 'equivalencia' && arbol.t === 'iff' && (
            <PreguntaEquivalencia arbol={arbol} renglones={renglones} respuesta={respuesta}
              alResponder={(r) => { setRespuesta(r); avisar(); }} />
          )}
        </>
      )}
    </div>
  );
}

/** Cómo se clasifica: solo se mira la última columna. */
export function ReglaClase() {
  const { simbolo } = useNotacion();
  const V = simbolo(true), F = simbolo(false);
  return (
    <div className="regla-clase" role="note">
      <span>Mira solo la <strong>última columna</strong>:</span>
      <span>toda {V} → <strong>tautología</strong></span>
      <span>toda {F} → <strong>contradicción</strong></span>
      <span>{V} y {F} → <strong>contingencia</strong></span>
    </div>
  );
}

function Veredicto({ bien, children }: { bien: boolean; children: ReactNode }) {
  return (
    <div className={`retro ${bien ? 'bien' : 'mal'}`} role="status">
      <span className="veredicto">{bien ? 'Correcto' : 'Incorrecto'}</span>
      {children}
    </div>
  );
}

function PreguntaClase({ arbol, respuesta, alResponder }: {
  arbol: Nodo; respuesta: string | null; alResponder: (r: string) => void;
}) {
  const correcta = clasificar(arbol);
  const clases: Clase[] = ['tautologia', 'contradiccion', 'contingencia'];
  return (
    <div className="resolver-final">
      <p className="enunciado" style={{ marginBottom: 6 }}>¿Qué es <C>{aTexto(arbol)}</C>?</p>
      <ReglaClase />
      <div className="opciones">
        {clases.map((c) => {
          let clase = 'opcion';
          if (respuesta && c === correcta) clase += ' bien';
          else if (respuesta === c) clase += ' mal';
          return (
            <button key={c} className={clase} disabled={respuesta !== null} onClick={() => alResponder(c)}>
              <span>{NOMBRE_CLASE[c]}</span>
            </button>
          );
        })}
      </div>
      {respuesta && (
        <Veredicto bien={respuesta === correcta}>
          <p><strong>Justificación para el examen:</strong> {justificar(arbol)}</p>
        </Veredicto>
      )}
    </div>
  );
}

function PreguntaEquivalencia({ arbol, renglones, respuesta, alResponder }: {
  arbol: Exclude<Nodo, { t: 'var' } | { t: 'not' }>; renglones: Asignacion[]; respuesta: string | null; alResponder: (r: string) => void;
}) {
  const { simbolo } = useNotacion();
  const V = simbolo(true);
  const A = aTexto(arbol.a), B = aTexto(arbol.b);
  const distinto = renglones.findIndex((env) => evaluar(arbol.a, env) !== evaluar(arbol.b, env));
  const son = distinto < 0;
  const elegida = respuesta === 'si';
  return (
    <div className="resolver-final">
      <p className="enunciado" style={{ marginBottom: 12 }}>¿<C>{A}</C> y <C>{B}</C> son equivalentes?</p>
      <div className="fila">
        {(['si', 'no'] as const).map((r) => {
          let clase = 'opcion';
          if (respuesta && (r === 'si') === son) clase += ' bien';
          else if (respuesta === r) clase += ' mal';
          return (
            <button key={r} className={clase} disabled={respuesta !== null} onClick={() => alResponder(r)}>
              <span>{r === 'si' ? 'Sí, son equivalentes' : 'No lo son'}</span>
            </button>
          );
        })}
      </div>
      {respuesta && (
        <Veredicto bien={elegida === son}>
          {son ? (
            <p>
              Sí. La última columna, <C>{aTexto(arbol)}</C>, es {V} en los {renglones.length} renglones: es tautología.
              Eso quiere decir que <C>{A}</C> y <C>{B}</C> valen lo mismo en todos los casos, así que{' '}
              <C>{A} ≡ {B}</C>.
            </p>
          ) : (
            <p>
              No. En el renglón {distinto + 1} ({describirRenglon(renglones[distinto], simbolo)}),{' '}
              <C>{A}</C> vale {simbolo(evaluar(arbol.a, renglones[distinto]))} y <C>{B}</C> vale{' '}
              {simbolo(evaluar(arbol.b, renglones[distinto]))}. Con un solo renglón distinto ya no son equivalentes: la
              última columna no es tautología.
            </p>
          )}
        </Veredicto>
      )}
    </div>
  );
}

/**
 * Para las lecciones: en lugar de solo mostrar la tabla resuelta, deja
 * hacerla primero.
 */
export function HazlaTu({ formula, final = 'clasificar' }: { formula: string; final?: Final }) {
  const [modo, setModo] = useState<'nada' | 'resolver' | 'ver'>('nada');
  const [vuelta, setVuelta] = useState(0);
  return (
    <div className="hazla">
      <div className="fila" style={{ marginBottom: 12 }}>
        <button className={`boton ${modo === 'resolver' ? '' : 'sec'}`}
          onClick={() => { setModo('resolver'); setVuelta((x) => x + 1); }}>
          {modo === 'resolver' ? 'Empezar de nuevo' : 'Hazla tú, paso a paso'}
        </button>
        <button className="boton fant chico" onClick={() => setModo(modo === 'ver' ? 'nada' : 'ver')}>
          {modo === 'ver' ? 'Ocultar la tabla resuelta' : 'Ver la tabla resuelta'}
        </button>
      </div>
      {modo === 'resolver' && <ResolverTabla key={vuelta} formula={formula} final={final} />}
      {modo === 'ver' && <TablaVerdad formula={formula} />}
    </div>
  );
}
