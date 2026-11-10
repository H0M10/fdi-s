// Simulacro con el formato que reportaron los compañeros:
// 18 preguntas, 8 de opción múltiple (de caso/código) y 10 casos con incisos.
// Soporta tanto la Unidad 2 (Algoritmos de búsqueda) como la Unidad 1 (Fundamentos de IA).

import { useState } from 'react';
import { Pregunta } from '../componentes/Pregunta';
import { Texto } from '../componentes/Texto';
import { TODAS } from '../contenido/preguntas';
import { esDeU2, tema } from '../contenido/temas';
import { registrar } from '../progreso';
import type { Pregunta as TPregunta } from '../tipos';

const azar = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((x, y) => x[0] - y[0]).map(([, x]) => x);

/**
 * Unidad 1: Las 8 de opción múltiple («ramas, enfoques, las leyes»), pero como las
 * hace el profesor: siempre a partir de un caso. Nada de definiciones ni
 * flujos («¿a qué rama corresponde el flujo…?»): eso no lo pregunta.
 * Tres de ramas, tres de enfoques y dos de ética o leyes, más 10 casos.
 */
export function armarExamen(): TPregunta[] {
  const deCaso = (t: string) => azar(TODAS.filter((p) => p.deCaso && p.tema === t));
  const generales = azar([...deCaso('ramas').slice(0, 3), ...deCaso('enfoques').slice(0, 3), ...deCaso('etica').slice(0, 2)]);
  // Los 10 casos con incisos: la mayoría de IA (ramas, enfoques, ética) y
  // algunos de lógica (simbolizar, tablas, conclusiones).
  const casosIA = azar(TODAS.filter((p) => p.tipo === 'caso' && p.tema === 'casos'));
  const casosLogica = azar(TODAS.filter((p) => p.tipo === 'caso' && p.tema === 'logica'));
  return [...generales, ...azar([...casosIA.slice(0, 7), ...casosLogica.slice(0, 3)])];
}

/**
 * Unidad 2: 18 preguntas con el formato indicado por el profesor:
 * - 8 preguntas aplicadas (deCaso) de los 6 temas (modelado/espacio, BFS/DFS, Greedy/A*,
 *   Hill Climbing/SA, Algoritmos Genéticos y lectura de código Python).
 * - 10 casos integradores con 4 incisos cada uno (u2-casos).
 */
export function armarExamenU2(): TPregunta[] {
  const deCasoU2 = (t: string) => azar(TODAS.filter((p) => p.deCaso && p.tema === t));
  const modelado = azar([...deCasoU2('u2-problemas'), ...deCasoU2('u2-espacio')]).slice(0, 2);
  const grafos = azar([...deCasoU2('u2-ciega'), ...deCasoU2('u2-heuristica')]).slice(0, 3);
  const opt = azar([...deCasoU2('u2-local'), ...deCasoU2('u2-geneticos')]).slice(0, 3);
  const generales = azar([...modelado, ...grafos, ...opt]);
  const casosU2 = azar(TODAS.filter((p) => p.tipo === 'caso' && p.tema === 'u2-casos')).slice(0, 10);
  return [...generales, ...casosU2];
}

export function Simulacro({ unidadInicial = 2 }: { unidadInicial?: 1 | 2 }) {
  const [unidad, setUnidad] = useState<1 | 2>(unidadInicial);
  const [examen, setExamen] = useState<TPregunta[] | null>(null);
  const [indice, setIndice] = useState(0);
  const [resultados, setResultados] = useState<number[]>([]);
  const [respondida, setRespondida] = useState(false);
  const [verResultados, setVerResultados] = useState(false);

  const empezar = (u: 1 | 2 = unidad) => {
    setUnidad(u);
    setExamen(u === 2 ? armarExamenU2() : armarExamen());
    setIndice(0);
    setResultados([]);
    setRespondida(false);
    setVerResultados(false);
  };

  if (!examen) {
    return (
      <div className="pagina angosta">
        <p className="rotulo">Simulacro</p>
        <h1>Examen de práctica</h1>
        <p className="entrada">
          Elige la unidad que quieres presentar. Cada simulacro arma 18 preguntas distintas (8 de opción múltiple basadas en casos/código y 10 casos completos con 4 incisos).
        </p>

        <div className="pestanas" role="tablist" style={{ marginTop: 18 }}>
          <button role="tab" aria-selected={unidad === 2} onClick={() => setUnidad(2)}>
            Unidad 2 · Algoritmos de búsqueda
          </button>
          <button role="tab" aria-selected={unidad === 1} onClick={() => setUnidad(1)}>
            Unidad 1 · Fundamentos de IA
          </button>
        </div>

        {unidad === 2 ? (
          <>
            <div className="examen-bloques" style={{ marginTop: 20 }}>
              <div className="examen-bloque">
                <div className="num">8</div>
                <div className="que">Casos cortos y lectura de código</div>
                <p>Problemas y grafos, BFS vs DFS, Greedy vs A*, Hill Climbing vs Simulated Annealing y Algoritmos Genéticos.</p>
              </div>
              <div className="examen-bloque">
                <div className="num">10</div>
                <div className="que">Casos integradores (4 incisos)</div>
                <p>Modelado del espacio, traza de algoritmos, qué hace cada línea de Python de los Colabs y qué pasa al aislar nodos o mover parámetros.</p>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--tinta-2)' }}>
              Recuerda lo que dijo el profesor: no tendrás que programar desde cero, pero sí interpretar fragmentos de código de las prácticas, explicar para qué sirve cada parte y analizar casos.
            </p>
            <button className="boton examen" onClick={() => empezar(2)}>Empezar simulacro de Unidad 2</button>
          </>
        ) : (
          <>
            <div className="examen-bloques" style={{ marginTop: 20 }}>
              <div className="examen-bloque">
                <div className="num">8</div>
                <div className="que">Opción múltiple</div>
                <p>Cada una parte de un caso: dices sus ramas, sus enfoques o su riesgo ético. Nada de definiciones.</p>
              </div>
              <div className="examen-bloque">
                <div className="num">10</div>
                <div className="que">Casos con incisos</div>
                <p>Siete de IA (rama, enfoque, ética) y tres de lógica (simbolizar, tablas, conclusiones).</p>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--tinta-2)' }}>
              Ten a la mano una hoja para hacer las tablas, como en el examen real.
            </p>
            <button className="boton examen" onClick={() => empezar(1)}>Empezar simulacro de Unidad 1</button>
          </>
        )}
      </div>
    );
  }

  if (verResultados) {
    const total = resultados.reduce((s, x) => s + x, 0);
    const pct = Math.round((total / examen.length) * 100);
    const om = resultados.slice(0, 8).reduce((s, x) => s + x, 0);
    const casos = resultados.slice(8).reduce((s, x) => s + x, 0);
    const porTema = new Map<string, { n: number; s: number }>();
    examen.forEach((p, i) => {
      const t = tema(p.tema).corto;
      const r = porTema.get(t) ?? { n: 0, s: 0 };
      porTema.set(t, { n: r.n + 1, s: r.s + resultados[i] });
    });
    const debiles = [...porTema.entries()].filter(([, r]) => r.s / r.n < 0.7).map(([t]) => t);

    return (
      <div className="pagina angosta">
        <p className="rotulo">Resultados · Unidad {esDeU2(examen[0].tema) ? 2 : 1}</p>
        <h1>{pct} %</h1>
        <div className="marcador">
          <div className="marcador-celda"><div className="num">{om.toFixed(1).replace('.0', '')}/8</div><div className="que">Opción múltiple</div></div>
          <div className="marcador-celda"><div className="num">{casos.toFixed(1).replace('.0', '')}/10</div><div className="que">Casos (por incisos acertados)</div></div>
          <div className="marcador-celda"><div className="num">{examen.length}</div><div className="que">Preguntas</div></div>
        </div>
        {debiles.length > 0 && (
          <div className="bloque ojo">
            <span className="etiqueta">Repasa antes del examen</span>
            <p>Bajaste de 70 % en: <strong>{debiles.join(', ')}</strong>. Lo que fallaste quedó guardado en Repaso.</p>
          </div>
        )}
        <h2 style={{ margin: '28px 0 12px' }}>Pregunta por pregunta</h2>
        <div className="marco">
          <table className="datos">
            <thead><tr><th>#</th><th>Pregunta</th><th>Tema</th><th>Resultado</th></tr></thead>
            <tbody>
              {examen.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--mono)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 400 }}>
                    <Texto>{p.tipo === 'caso' ? p.titulo : 'enunciado' in p && p.enunciado ? p.enunciado.slice(0, 90) + (p.enunciado.length > 90 ? '…' : '') : 'Pregunta de lógica'}</Texto>
                  </td>
                  <td style={{ fontWeight: 400 }}>{tema(p.tema).corto}</td>
                  <td style={{ color: resultados[i] === 1 ? 'var(--bien)' : resultados[i] === 0 ? 'var(--mal)' : 'var(--examen)', fontFamily: 'var(--mono)' }}>
                    {resultados[i] === 1 ? 'Bien' : resultados[i] === 0 ? 'Mal' : `${Math.round(resultados[i] * 100)} %`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fila" style={{ marginTop: 18 }}>
          <button className="boton examen" onClick={() => empezar(unidad)}>Otro simulacro (Unidad {unidad})</button>
          <button className="boton sec" onClick={() => setExamen(null)}>Cambiar de unidad</button>
        </div>
      </div>
    );
  }

  const actual = examen[indice];
  const esUltima = indice === examen.length - 1;

  return (
    <div className="pagina angosta pila">
      <div className="sesion">
        <span style={{ fontWeight: 600, color: 'var(--examen)' }}>Simulacro U{unidad}</span>
        <span style={{ fontFamily: 'var(--mono)' }}>{indice + 1} / {examen.length}</span>
        <div className="medidor-barra" style={{ flex: 1 }}>
          <div className="medidor-relleno" style={{ width: `${((indice + (respondida ? 1 : 0)) / examen.length) * 100}%`, background: 'var(--examen)' }} />
        </div>
        <span>{indice < 8 ? 'Opción múltiple' : 'Casos'}</span>
      </div>

      <Pregunta
        key={`${actual.id}-${indice}`}
        p={actual}
        etiqueta={tema(actual.tema).corto}
        onListo={(f) => {
          registrar(actual.id, f);
          setResultados((r) => { const c = [...r]; c[indice] = f; return c; });
          setRespondida(true);
        }}
      />

      <div className="accion-fija">
        {respondida && !esUltima && (
          <button className="boton" onClick={() => { setIndice(indice + 1); setRespondida(false); window.scrollTo({ top: 0 }); }}>
            Siguiente →
          </button>
        )}
        {respondida && esUltima && (
          <button className="boton examen" onClick={() => { setVerResultados(true); window.scrollTo({ top: 0 }); }}>
            Ver resultados
          </button>
        )}
      </div>
    </div>
  );
}
