import { useMemo, useState } from 'react';
import {
  ejecutarAG,
  fnDosPicos,
  fnPractica3,
  fnPractica4AG,
  hillClimbing,
  simulatedAnnealing,
} from '../busqueda/motor';

/* ------------------------------------------------------------------ */
/* Simulador de Búsqueda Local (Hill Climbing vs Simulated Annealing) */
/* ------------------------------------------------------------------ */

export function SimuladorLocal() {
  const [modoFn, setModoFn] = useState<'practica3' | 'dospicos'>('practica3');
  const [x0, setX0] = useState(2);
  const [T0, setT0] = useState(30);
  const [alpha, setAlpha] = useState(0.97);
  const [iteraciones, setIteraciones] = useState(100);
  const [semilla, setSemilla] = useState(25);

  const xMax = modoFn === 'practica3' ? 20 : 12;
  const fn = modoFn === 'practica3' ? fnPractica3 : fnDosPicos;
  const xInicial = Math.min(x0, xMax);

  const puntos = useMemo(() => {
    const xs = Array.from({ length: xMax + 1 }, (_, i) => i);
    return xs.map((x) => ({ x, y: fn(x) }));
  }, [fn, xMax]);

  const hc = useMemo(() => hillClimbing(fn, xInicial, 0, xMax), [fn, xInicial, xMax]);
  const sa = useMemo(
    () => simulatedAnnealing(fn, xInicial, T0, alpha, iteraciones, 0, xMax, semilla),
    [fn, xInicial, T0, alpha, iteraciones, xMax, semilla],
  );

  const globalMax = useMemo(
    () => puntos.reduce((m, p) => (p.y > m.y ? p : m), puntos[0]),
    [puntos],
  );

  // Dimensiones SVG
  const W = 640;
  const H = 230;
  const M = { izq: 44, der: 18, arr: 18, aba: 32 };
  const yMin = Math.min(...puntos.map((p) => p.y));
  const yMax = Math.max(...puntos.map((p) => p.y));
  const rangoY = Math.max(1, yMax - yMin);

  const px = (x: number) => M.izq + (x / xMax) * (W - M.izq - M.der);
  const py = (y: number) => M.arr + (1 - (y - yMin) / rangoY) * (H - M.arr - M.aba);

  const linea = puntos
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`)
    .join('');

  return (
    <div className="pregunta" style={{ margin: '0 0 18px' }}>
      <div className="filtros" role="group" aria-label="Función de búsqueda local">
        <button
          className="chip"
          aria-pressed={modoFn === 'practica3'}
          onClick={() => {
            setModoFn('practica3');
            setX0(2);
          }}
        >
          Práctica 3 · 0.6x + 8·sen(1.3x) + 4·sen(2.4x) [0..20]
        </button>
        <button
          className="chip"
          aria-pressed={modoFn === 'dospicos'}
          onClick={() => {
            setModoFn('dospicos');
            setX0(1);
          }}
        >
          Ejercicio HC · −(x−3)²(x−9)² + x [0..12]
        </button>
      </div>

      <div style={{ overflowX: 'auto', marginTop: 10 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 460, display: 'block' }}
          role="img"
          aria-label="Paisaje de la función f(x) con Hill Climbing y Simulated Annealing"
        >
          <path d={linea} fill="none" stroke="var(--linea-fuerte)" strokeWidth={2} />
          {puntos.map((p) => (
            <g key={p.x}>
              <circle cx={px(p.x)} cy={py(p.y)} r={3.5} fill="var(--tinta-3)" />
              <text
                x={px(p.x)}
                y={H - 8}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--mono)"
                fill="var(--tinta-3)"
              >
                {p.x}
              </text>
            </g>
          ))}

          {/* Punto inicial x0 */}
          <circle
            cx={px(xInicial)}
            cy={py(fn(xInicial))}
            r={7}
            fill="var(--superficie)"
            stroke="var(--acento)"
            strokeWidth={2.5}
          />
          <text
            x={px(xInicial)}
            y={py(fn(xInicial)) - 11}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--acento)"
          >
            x₀={xInicial}
          </text>

          {/* Resultado Hill Climbing */}
          <circle
            cx={px(hc.mejorX)}
            cy={py(hc.mejorF)}
            r={7.5}
            fill="var(--mal-fondo)"
            stroke="var(--mal)"
            strokeWidth={2.5}
          />
          <text
            x={px(hc.mejorX)}
            y={py(hc.mejorF) + 19}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--mal)"
          >
            HC: x={hc.mejorX}
          </text>

          {/* Resultado Simulated Annealing */}
          <circle
            cx={px(sa.mejorX)}
            cy={py(sa.mejorF)}
            r={8}
            fill="var(--bien-fondo)"
            stroke="var(--bien)"
            strokeWidth={2.5}
          />
          <text
            x={px(sa.mejorX)}
            y={py(sa.mejorF) - 12}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--bien)"
          >
            SA: x={sa.mejorX}
          </text>
        </svg>
      </div>

      <div className="marcador" style={{ margin: '10px 0 14px' }}>
        <div className="marcador-celda">
          <div className="num" style={{ color: hc.mejorX === globalMax.x ? 'var(--bien)' : 'var(--mal)' }}>
            x={hc.mejorX} ({hc.mejorF.toFixed(1)})
          </div>
          <div className="que">Hill Climbing · recorrido: [{hc.recorrido.join('→')}]</div>
        </div>
        <div className="marcador-celda">
          <div className="num" style={{ color: sa.mejorX === globalMax.x ? 'var(--bien)' : 'var(--examen)' }}>
            x={sa.mejorX} ({sa.mejorF.toFixed(1)})
          </div>
          <div className="que">Simulated Annealing · mejor guardado</div>
        </div>
        <div className="marcador-celda">
          <div className="num">{sa.peoresAceptados} / {sa.rechazados}</div>
          <div className="que">Peores aceptados (r &lt; e^(Δ/T)) / Rechazados</div>
        </div>
      </div>

      <div className="pila" style={{ gap: 8 }}>
        <label style={{ display: 'grid', gridTemplateColumns: '155px 1fr 48px', gap: 10, alignItems: 'center', fontSize: 13.5 }}>
          <span>Punto inicial x₀</span>
          <input type="range" min={0} max={xMax} step={1} value={xInicial} onChange={(e) => setX0(Number(e.target.value))} />
          <span style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>{xInicial}</span>
        </label>
        <label style={{ display: 'grid', gridTemplateColumns: '155px 1fr 48px', gap: 10, alignItems: 'center', fontSize: 13.5 }}>
          <span>Temperatura inicial T₀</span>
          <input type="range" min={1} max={60} step={1} value={T0} onChange={(e) => setT0(Number(e.target.value))} />
          <span style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>{T0}</span>
        </label>
        <label style={{ display: 'grid', gridTemplateColumns: '155px 1fr 48px', gap: 10, alignItems: 'center', fontSize: 13.5 }}>
          <span>Enfriamiento α (alpha)</span>
          <input type="range" min={0.7} max={0.99} step={0.01} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
          <span style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>{alpha.toFixed(2)}</span>
        </label>
        <label style={{ display: 'grid', gridTemplateColumns: '155px 1fr 48px', gap: 10, alignItems: 'center', fontSize: 13.5 }}>
          <span>Iteraciones / Semilla</span>
          <div className="fila" style={{ gap: 6 }}>
            {[40, 100].map((it) => (
              <button key={it} className="chip" aria-pressed={iteraciones === it} onClick={() => setIteraciones(it)}>
                {it} iter
              </button>
            ))}
            {[10, 25, 40].map((s) => (
              <button key={s} className="chip" aria-pressed={semilla === s} onClick={() => setSemilla(s)}>
                seed={s}
              </button>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>#{semilla}</span>
        </label>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Simulador de Algoritmo Genético (Práctica 4: Convergencia)         */
/* ------------------------------------------------------------------ */

export function SimuladorGenetico() {
  const [poblacion, setPoblacion] = useState(18);
  const [generaciones, setGeneraciones] = useState(40);
  const [mutacion, setMutacion] = useState(0.08);
  const [seleccion, setSeleccion] = useState<'torneo' | 'ruleta'>('torneo');
  const [elitismo, setElitismo] = useState(1);
  const [semilla, setSemilla] = useState(33);

  const res = useMemo(
    () =>
      ejecutarAG(fnPractica4AG, {
        tamanoPoblacion: poblacion,
        generaciones,
        probMutacion: mutacion,
        seleccion,
        elitismo,
        semilla,
      }),
    [poblacion, generaciones, mutacion, seleccion, elitismo, semilla],
  );

  const W = 640;
  const H = 210;
  const M = { izq: 44, der: 18, arr: 18, aba: 32 };
  const yMin = 15;
  const yMax = 32;

  const px = (g: number) =>
    M.izq + (g / Math.max(1, res.historial.length - 1)) * (W - M.izq - M.der);
  const py = (v: number) =>
    M.arr + (1 - (Math.min(yMax, Math.max(yMin, v)) - yMin) / (yMax - yMin)) * (H - M.arr - M.aba);

  const curva = res.historial
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`)
    .join('');

  return (
    <div className="pregunta" style={{ margin: '0 0 18px' }}>
      <p style={{ fontSize: 13.5, color: 'var(--tinta-2)', margin: '0 0 10px' }}>
        <strong>Práctica 4 · Algoritmo Genético:</strong> Maximizar{' '}
        <code className="simb">f(x) = 0.6x + 10·sen(1.4x) + 9</code> en{' '}
        <code className="simb">[0, 22]</code>. Observa cómo cambia la <strong>curva de convergencia</strong> y cuándo se
        aplana (<code className="simb">------</code>).
      </p>

      <div style={{ overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 460, display: 'block' }}
          role="img"
          aria-label="Curva de convergencia del Algoritmo Genético"
        >
          {[16, 20, 24, 28, 31.1].map((v) => (
            <g key={v}>
              <line
                x1={M.izq}
                x2={W - M.der}
                y1={py(v)}
                y2={py(v)}
                stroke={v > 31 ? 'var(--bien)' : 'var(--linea)'}
                strokeDasharray={v > 31 ? '5 3' : undefined}
              />
              <text
                x={M.izq - 6}
                y={py(v) + 4}
                textAnchor="end"
                fontSize="10"
                fontFamily="var(--mono)"
                fill={v > 31 ? 'var(--bien)' : 'var(--tinta-3)'}
              >
                {v.toFixed(1)}
              </text>
            </g>
          ))}
          <path d={curva} fill="none" stroke="var(--acento)" strokeWidth={2.5} />
          <text
            x={W / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--mono)"
            fill="var(--tinta-3)"
          >
            Generación (1 a {generaciones})
          </text>
        </svg>
      </div>

      <div className="marcador" style={{ margin: '10px 0 14px' }}>
        <div className="marcador-celda">
          <div className="num" style={{ color: 'var(--bien)' }}>
            {res.mejorFitness.toFixed(2)}
          </div>
          <div className="que">Mejor fitness (en x = {res.mejorX.toFixed(2)})</div>
        </div>
        <div className="marcador-celda">
          <div className="num">Gen {res.generacionMejor}</div>
          <div className="que">Generación donde apareció el mejor</div>
        </div>
        <div className="marcador-celda">
          <div className="num" style={{ color: 'var(--examen)' }}>
            {res.evaluaciones}
          </div>
          <div className="que">Evaluaciones: pob × (gen + 1)</div>
        </div>
      </div>

      <div className="pila" style={{ gap: 8 }}>
        <div className="fila" style={{ gap: 6 }}>
          <span style={{ fontSize: 13.5, minWidth: 115 }}>Población:</span>
          {[5, 18, 45, 90].map((p) => (
            <button key={p} className="chip" aria-pressed={poblacion === p} onClick={() => setPoblacion(p)}>
              {p} ind.
            </button>
          ))}
        </div>
        <div className="fila" style={{ gap: 6 }}>
          <span style={{ fontSize: 13.5, minWidth: 115 }}>Generaciones:</span>
          {[10, 40, 80, 120].map((g) => (
            <button key={g} className="chip" aria-pressed={generaciones === g} onClick={() => setGeneraciones(g)}>
              {g} gen.
            </button>
          ))}
        </div>
        <div className="fila" style={{ gap: 6 }}>
          <span style={{ fontSize: 13.5, minWidth: 115 }}>Mutación:</span>
          {[0.0, 0.04, 0.08, 0.25, 0.4].map((m) => (
            <button key={m} className="chip" aria-pressed={mutacion === m} onClick={() => setMutacion(m)}>
              {(m * 100).toFixed(0)} %
            </button>
          ))}
        </div>
        <div className="fila" style={{ gap: 6 }}>
          <span style={{ fontSize: 13.5, minWidth: 115 }}>Selección / Élite:</span>
          {(['torneo', 'ruleta'] as const).map((s) => (
            <button key={s} className="chip" aria-pressed={seleccion === s} onClick={() => setSeleccion(s)}>
              {s === 'torneo' ? 'Torneo' : 'Ruleta'}
            </button>
          ))}
          {[0, 1, 2, 4].map((el) => (
            <button key={el} className="chip" aria-pressed={elitismo === el} onClick={() => setElitismo(el)}>
              Elitismo={el}
            </button>
          ))}
          <button className="chip" onClick={() => setSemilla((k) => k + 7)}>
            Otra semilla ({semilla})
          </button>
        </div>
      </div>
    </div>
  );
}
