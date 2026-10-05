// Cómo se contesta cada tipo de pregunta.
//
// Todas siguen el mismo contrato: se muestran, el alumno responde, se
// revela si estuvo bien con su explicación, y se avisa al padre con
// onListo(fraccion), donde 1 es todo bien y 0 todo mal. Un caso reporta
// la fracción de incisos acertados.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  analizar, aTexto, clasificar, equivalentes, ErrorFormula, evaluar, filas,
  justificar, NOMBRE_CLASE, opcionQueSeSigue, pasos, variables,
} from '../logica/motor';
import { useNotacion } from '../notacion';
import type {
  Clase, Inciso, PCaso, PClasificar, PConclusion, PMulti, POpcion,
  Pregunta as TPregunta, PSimbolizar, PTabla, PVF,
} from '../tipos';
import { TablaVerdad } from './TablaVerdad';
import { Texto } from './Texto';

type AlTerminar = (fraccion: number) => void;
const LETRAS_OP = 'ABCDEFGH';

/** Baraja una vez por pregunta. Las opciones nulas («ninguna») van al final. */
function useOrden(n: number, semilla: string, fijarUltimo = false): number[] {
  return useMemo(() => {
    const idx = Array.from({ length: n }, (_, i) => i);
    const movibles = fijarUltimo ? idx.slice(0, -1) : idx;
    let h = 0;
    for (const c of semilla) h = (h * 31 + c.charCodeAt(0)) | 0;
    h ^= Date.now() & 0xffff;
    for (let i = movibles.length - 1; i > 0; i--) {
      h = (h * 1103515245 + 12345) | 0;
      const j = Math.abs(h) % (i + 1);
      [movibles[i], movibles[j]] = [movibles[j], movibles[i]];
    }
    return fijarUltimo ? [...movibles, idx[idx.length - 1]] : movibles;
  }, [n, semilla, fijarUltimo]);
}

function Retro({ bien, children }: { bien: boolean; children: React.ReactNode }) {
  return (
    <div className={`retro ${bien ? 'bien' : 'mal'}`} role="status">
      <span className="veredicto">{bien ? 'Correcto' : 'Incorrecto'}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Opción múltiple                                                    */
/* ------------------------------------------------------------------ */
function Opcion({ p, onListo, semilla }: { p: POpcion; onListo: AlTerminar; semilla: string }) {
  const [elegida, setElegida] = useState<number | null>(null);
  const orden = useOrden(p.opciones.length, semilla);
  const listo = elegida !== null;

  return (
    <>
      <p className="enunciado"><Texto>{p.enunciado}</Texto></p>
      <div className="opciones">
        {orden.map((i, pos) => {
          let clase = 'opcion';
          if (listo && i === p.correcta) clase += ' bien';
          else if (listo && i === elegida) clase += ' mal';
          return (
            <button key={i} className={clase} disabled={listo}
              onClick={() => { setElegida(i); onListo(i === p.correcta ? 1 : 0); }}>
              <span className="letra-op">{LETRAS_OP[pos]}</span>
              <span><Texto>{p.opciones[i]}</Texto></span>
            </button>
          );
        })}
      </div>
      {listo && (
        <Retro bien={elegida === p.correcta}>
          {elegida !== p.correcta && <p>La respuesta es: <strong>{p.opciones[p.correcta]}</strong></p>}
          <p><Texto>{p.explicacion}</Texto></p>
        </Retro>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Selección múltiple                                                 */
/* ------------------------------------------------------------------ */
function Multi({ p, onListo, semilla }: { p: PMulti; onListo: AlTerminar; semilla: string }) {
  const [marcadas, setMarcadas] = useState<Set<number>>(new Set());
  const [listo, setListo] = useState(false);
  const barajado = useOrden(p.opciones.length, semilla);
  const orden = p.fijo ? p.opciones.map((_, i) => i) : barajado;
  const correctas = new Set(p.correctas);
  const exacto = listo && marcadas.size === correctas.size && [...marcadas].every((i) => correctas.has(i));

  const alternar = (i: number) => {
    const s = new Set(marcadas);
    if (s.has(i)) s.delete(i); else s.add(i);
    setMarcadas(s);
  };

  return (
    <>
      <p className="enunciado"><Texto>{p.enunciado}</Texto></p>
      <div className="opciones">
        {orden.map((i) => {
          let clase = 'opcion multi';
          if (listo && correctas.has(i)) clase += ' bien';
          else if (listo && marcadas.has(i)) clase += ' mal';
          return (
            <button key={i} className={clase} disabled={listo} aria-pressed={!listo && marcadas.has(i)}
              onClick={() => alternar(i)}>
              <span className="letra-op">{listo ? (correctas.has(i) ? '✓' : marcadas.has(i) ? '✕' : '') : marcadas.has(i) ? '✓' : ''}</span>
              <span><Texto>{p.opciones[i]}</Texto></span>
            </button>
          );
        })}
      </div>
      {!listo && (
        <div className="fila" style={{ marginTop: 12 }}>
          <button className="boton" disabled={marcadas.size === 0}
            onClick={() => {
              setListo(true);
              const ok = marcadas.size === correctas.size && [...marcadas].every((i) => correctas.has(i));
              onListo(ok ? 1 : 0);
            }}>
            Revisar
          </button>
          <span style={{ fontSize: 13, color: 'var(--tinta-3)' }}>
            <Texto>{p.pista ?? 'Marca todas las que apliquen: puede ser una sola o varias.'}</Texto>
          </span>
        </div>
      )}
      {listo && (
        <Retro bien={exacto}>
          {!exacto && <p>Las correctas están marcadas en verde.</p>}
          <p><Texto>{p.explicacion}</Texto></p>
        </Retro>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Verdadero o falso                                                  */
/* ------------------------------------------------------------------ */
function VF({ p, onListo }: { p: PVF; onListo: AlTerminar }) {
  const [elegida, setElegida] = useState<boolean | null>(null);
  const listo = elegida !== null;
  return (
    <>
      <p className="enunciado"><Texto>{p.enunciado}</Texto></p>
      <div className="fila">
        {[true, false].map((v) => {
          let clase = 'boton sec';
          if (listo && v === p.verdadera) clase = 'boton';
          return (
            <button key={String(v)} className={clase} disabled={listo}
              style={listo && v === elegida && v !== p.verdadera ? { background: 'var(--mal-fondo)', color: 'var(--mal)', borderColor: 'var(--mal)', opacity: 1 } : listo ? { opacity: 1 } : undefined}
              onClick={() => { setElegida(v); onListo(v === p.verdadera ? 1 : 0); }}>
              {v ? 'Verdadero' : 'Falso'}
            </button>
          );
        })}
      </div>
      {listo && (
        <Retro bien={elegida === p.verdadera}>
          {elegida !== p.verdadera && <p>Es <strong>{p.verdadera ? 'verdadero' : 'falso'}</strong>.</p>}
          <p><Texto>{p.explicacion}</Texto></p>
        </Retro>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Simbolizar                                                         */
/* ------------------------------------------------------------------ */
const TECLAS: [string, string][] = [['¬', 'no'], ['∧', 'y'], ['∨', 'o'], ['→', 'si… entonces'], ['↔', 'si y solo si'], ['(', ''], [')', '']];

export function Teclado({ alInsertar, letras }: { alInsertar: (s: string) => void; letras: string[] }) {
  return (
    <div className="teclado" aria-label="Insertar símbolo">
      {[...TECLAS, ...letras.map((l): [string, string] => [l, ''])].map(([s, t]) => (
        <button key={s} type="button" title={t || undefined} onClick={() => alInsertar(s)}>{s}</button>
      ))}
    </div>
  );
}

function Props({ props }: { props: [string, string][] }) {
  return (
    <div className="props">
      {props.map(([l, s]) => <div key={l}><b>{l}:</b> {s}</div>)}
    </div>
  );
}

function Simbolizar({ p, onListo }: { p: PSimbolizar; onListo: AlTerminar }) {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState<null | { bien: boolean; mio: string }>(null);
  const [pista, setPista] = useState(false);

  const revisar = () => {
    try {
      const mio = analizar(texto);
      const bien = equivalentes(mio, analizar(p.respuesta));
      setResultado({ bien, mio: aTexto(mio) });
      setError('');
      onListo(bien ? 1 : 0);
    } catch (e) {
      setError(e instanceof ErrorFormula ? e.message : 'No se pudo leer la fórmula.');
    }
  };

  const rendirse = () => {
    setResultado({ bien: false, mio: '' });
    onListo(0);
  };

  return (
    <>
      <p className="enunciado">«<Texto>{p.enunciado}</Texto>»</p>
      <Props props={p.props} />
      {!resultado && (
        <>
          <input className="campo" value={texto} placeholder="Escribe la fórmula" spellCheck={false}
            autoCapitalize="off" autoComplete="off" aria-label="Fórmula"
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') revisar(); }} />
          <Teclado letras={p.props.map(([l]) => l)} alInsertar={(s) => setTexto((t) => t + s)} />
          {error && <p className="aviso error">{error}</p>}
          {pista && p.pista && <p className="aviso info"><Texto>{p.pista}</Texto></p>}
          <div className="fila">
            <button className="boton" disabled={!texto.trim()} onClick={revisar}>Revisar</button>
            {p.pista && !pista && <button className="boton fant" onClick={() => setPista(true)}>Pista</button>}
            <button className="boton fant" onClick={rendirse}>Ver respuesta</button>
          </div>
        </>
      )}
      {resultado && (
        <Retro bien={resultado.bien}>
          {resultado.bien && resultado.mio !== aTexto(analizar(p.respuesta)) ? (
            <p>Escribiste <code className="simb">{resultado.mio}</code>, que no es idéntica a <code className="simb">{aTexto(analizar(p.respuesta))}</code> pero da exactamente la misma tabla, así que también es correcta.</p>
          ) : (
            <p>La respuesta es <code className="simb">{aTexto(analizar(p.respuesta))}</code>.</p>
          )}
          {!resultado.bien && resultado.mio && <p>Tu fórmula, <code className="simb">{resultado.mio}</code>, da una tabla distinta.</p>}
          {p.pista && <p><Texto>{p.pista}</Texto></p>}
        </Retro>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Llenar la columna final                                            */
/* ------------------------------------------------------------------ */
function Tabla({ p, onListo }: { p: PTabla; onListo: AlTerminar }) {
  const { simbolo } = useNotacion();
  const arbol = useMemo(() => analizar(p.formula), [p.formula]);
  const vars = variables(arbol);
  const previas = pasos(arbol).slice(0, -1);
  const renglones = filas(vars);
  const correcto = renglones.map((env) => evaluar(arbol, env));
  const [valores, setValores] = useState<(boolean | null)[]>(() => renglones.map(() => null));
  const [listo, setListo] = useState(false);
  const faltan = valores.filter((v) => v === null).length;
  const errores = valores.filter((v, i) => v !== correcto[i]).length;

  const alternar = (i: number) => {
    const s = [...valores];
    s[i] = s[i] === null ? true : s[i] === true ? false : null;
    setValores(s);
  };

  return (
    <>
      <p className="enunciado">
        Completa la columna final de <code className="simb">{aTexto(arbol)}</code>.
        {p.enunciado && <> <Texto>{p.enunciado}</Texto></>}
      </p>
      <p style={{ fontSize: 13, color: 'var(--tinta-3)', margin: '-8px 0 12px' }}>
        Toca cada celda para cambiarla. Las columnas intermedias ya están resueltas.
      </p>
      <div className="marco">
        <table className="tv">
          <thead>
            <tr>
              {vars.map((v) => <th key={v} className="letra">{v}</th>)}
              {previas.map((c, k) => <th key={c.texto} className={k === 0 ? 'sep' : ''}>{c.texto}</th>)}
              <th className={`final ${previas.length === 0 ? 'sep' : ''}`}>{aTexto(arbol)}</th>
            </tr>
          </thead>
          <tbody>
            {renglones.map((env, i) => (
              <tr key={i}>
                {vars.map((v) => <td key={v} className={`letra ${env[v] ? 'v' : 'f'}`} style={{ fontWeight: 400 }}>{simbolo(env[v])}</td>)}
                {previas.map((c, k) => {
                  const val = evaluar(c.nodo, env);
                  return <td key={c.texto} className={`${val ? 'v' : 'f'} ${k === 0 ? 'sep' : ''}`}>{simbolo(val)}</td>;
                })}
                <td className={`final ${previas.length === 0 ? 'sep' : ''}`}>
                  <button className="celda" disabled={listo}
                    data-v={valores[i] === null ? undefined : valores[i] ? '1' : '0'}
                    data-estado={listo && valores[i] !== correcto[i] ? 'mal' : undefined}
                    aria-label={`Renglón ${i + 1}`}
                    onClick={() => alternar(i)}>
                    {listo && valores[i] !== correcto[i] ? simbolo(correcto[i]) : valores[i] === null ? '·' : simbolo(valores[i] as boolean)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!listo && (
        <div className="fila">
          <button className="boton" disabled={faltan > 0} onClick={() => { setListo(true); onListo(errores === 0 ? 1 : 0); }}>
            Revisar
          </button>
          {faltan > 0 && <span style={{ fontSize: 13, color: 'var(--tinta-3)' }}>Faltan {faltan} {faltan === 1 ? 'celda' : 'celdas'}.</span>}
        </div>
      )}
      {listo && (
        <Retro bien={errores === 0}>
          {errores === 0 ? <p>Toda la columna está bien.</p>
            : <p>{errores === 1 ? 'Un renglón estaba mal' : `${errores} renglones estaban mal`}. Ya aparecen con el valor correcto y marcados en rojo.</p>}
          <p>{justificar(arbol)}</p>
        </Retro>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tautología, contradicción o contingencia                           */
/* ------------------------------------------------------------------ */
function Clasificar({ p, onListo }: { p: PClasificar; onListo: AlTerminar }) {
  const arbol = useMemo(() => analizar(p.formula), [p.formula]);
  const correcta = clasificar(arbol);
  const [elegida, setElegida] = useState<Clase | null>(null);
  const [verTabla, setVerTabla] = useState(false);
  const listo = elegida !== null;
  const clases: Clase[] = ['tautologia', 'contradiccion', 'contingencia'];

  return (
    <>
      <p className="enunciado">
        ¿<code className="simb">{aTexto(arbol)}</code> es tautología, contradicción o contingencia?
        {p.enunciado && <> <Texto>{p.enunciado}</Texto></>}
      </p>
      <div className="opciones">
        {clases.map((c, pos) => {
          let clase = 'opcion';
          if (listo && c === correcta) clase += ' bien';
          else if (listo && c === elegida) clase += ' mal';
          return (
            <button key={c} className={clase} disabled={listo}
              onClick={() => { setElegida(c); onListo(c === correcta ? 1 : 0); setVerTabla(true); }}>
              <span className="letra-op">{LETRAS_OP[pos]}</span>
              <span>{NOMBRE_CLASE[c]}</span>
            </button>
          );
        })}
      </div>
      {!listo && (
        <p style={{ fontSize: 13, color: 'var(--tinta-3)', margin: '12px 0 0' }}>
          Haz la tabla en tu cuaderno antes de contestar: en el examen te piden justificarlo.
        </p>
      )}
      {listo && (
        <Retro bien={elegida === correcta}>
          <p><strong>Justificación:</strong> {justificar(arbol)}</p>
        </Retro>
      )}
      {listo && verTabla && <div style={{ marginTop: 12 }}><TablaVerdad formula={p.formula} /></div>}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sacar conclusiones                                                 */
/* ------------------------------------------------------------------ */
function Conclusion({ p, onListo, semilla }: { p: PConclusion; onListo: AlTerminar; semilla: string }) {
  const correcta = useMemo(() => opcionQueSeSigue(p.premisas, p.opciones)[0], [p]);
  const tieneNula = p.opciones[p.opciones.length - 1]?.formula === null;
  const orden = useOrden(p.opciones.length, semilla, tieneNula);
  const [elegida, setElegida] = useState<number | null>(null);
  const listo = elegida !== null;

  return (
    <>
      <p className="enunciado"><Texto>{p.enunciado}</Texto></p>
      <Props props={p.props} />
      <p style={{ fontSize: 13.5, margin: '-4px 0 14px', color: 'var(--tinta-2)' }}>
        Premisas: {p.premisas.map((f, i) => (
          <span key={i}>{i > 0 && ', '}<code className="simb">{aTexto(analizar(f))}</code></span>
        ))}
      </p>
      <div className="opciones">
        {orden.map((i, pos) => {
          let clase = 'opcion';
          if (listo && i === correcta) clase += ' bien';
          else if (listo && i === elegida) clase += ' mal';
          const o = p.opciones[i];
          return (
            <button key={i} className={clase} disabled={listo}
              onClick={() => { setElegida(i); onListo(i === correcta ? 1 : 0); }}>
              <span className="letra-op">{LETRAS_OP[pos]}</span>
              <span>
                {o.texto}
                {o.formula && <code className="simb" style={{ marginLeft: 8 }}>{aTexto(analizar(o.formula))}</code>}
              </span>
            </button>
          );
        })}
      </div>
      {listo && (
        <Retro bien={elegida === correcta}>
          {elegida !== correcta && <p>La respuesta es: <strong>{p.opciones[correcta].texto}</strong></p>}
          <p><Texto>{p.explicacion}</Texto></p>
        </Retro>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Un inciso cualquiera                                               */
/* ------------------------------------------------------------------ */
export function UnInciso({ p, onListo, semilla }: { p: Inciso; onListo: AlTerminar; semilla: string }) {
  switch (p.tipo) {
    case 'opcion': return <Opcion p={p} onListo={onListo} semilla={semilla} />;
    case 'multi': return <Multi p={p} onListo={onListo} semilla={semilla} />;
    case 'vf': return <VF p={p} onListo={onListo} />;
    case 'simbolizar': return <Simbolizar p={p} onListo={onListo} />;
    case 'tabla': return <Tabla p={p} onListo={onListo} />;
    case 'clasificar': return <Clasificar p={p} onListo={onListo} />;
    case 'conclusion': return <Conclusion p={p} onListo={onListo} semilla={semilla} />;
  }
}

/* ------------------------------------------------------------------ */
/* Caso con incisos                                                   */
/* ------------------------------------------------------------------ */
function Caso({ p, onListo, id }: { p: PCaso; onListo: AlTerminar; id: string }) {
  const [resultados, setResultados] = useState<(number | null)[]>(() => p.incisos.map(() => null));
  const visibles = resultados.findIndex((r) => r === null);
  const hasta = visibles === -1 ? p.incisos.length : visibles + 1;

  // Cuando aparece el siguiente inciso, se lleva a la vista. Sin esto
  // quedaba abajo de la explicación del anterior y no se notaba.
  const refNuevo = useRef<HTMLDivElement>(null);
  const hastaPrevio = useRef(hasta);
  useEffect(() => {
    if (hasta > hastaPrevio.current) refNuevo.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    hastaPrevio.current = hasta;
  }, [hasta]);

  const alTerminarInciso = (k: number, f: number) => {
    const r = [...resultados];
    r[k] = f;
    setResultados(r);
    if (r.every((x) => x !== null)) {
      const total = r.reduce<number>((s, x) => s + (x ?? 0), 0);
      onListo(total / r.length);
    }
  };

  return (
    <>
      <h3 style={{ fontSize: 18, marginBottom: 10 }}>{p.titulo}</h3>
      <div className="escenario"><Texto>{p.escenario}</Texto></div>
      {p.incisos.slice(0, hasta).map((inc, k) => (
        <div className="inciso" key={k} ref={k === hasta - 1 ? refNuevo : undefined}>
          <div className="inciso-num">Inciso {String.fromCharCode(97 + k)}) · {k + 1} de {p.incisos.length}</div>
          <UnInciso p={inc} semilla={`${id}-${k}`} onListo={(f) => alTerminarInciso(k, f)} />
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Punto de entrada                                                   */
/* ------------------------------------------------------------------ */
const NOMBRE_TIPO: Record<string, string> = {
  opcion: 'Opción múltiple',
  multi: 'Selección múltiple',
  vf: 'Verdadero o falso',
  simbolizar: 'Simbolizar',
  tabla: 'Llenar la tabla',
  clasificar: 'Clasificar',
  conclusion: 'Conclusiones',
  caso: 'Caso con incisos',
};

export function Pregunta({ p, onListo, etiqueta }: { p: TPregunta; onListo: AlTerminar; etiqueta?: string }) {
  return (
    <article className="pregunta">
      <div className="pregunta-meta">
        <span className="tipo">{NOMBRE_TIPO[p.tipo]}</span>
        {etiqueta && <span>{etiqueta}</span>}
      </div>
      {p.tipo === 'caso'
        ? <Caso p={p} onListo={onListo} id={p.id} />
        : <UnInciso p={p} onListo={onListo} semilla={p.id} />}
    </article>
  );
}
