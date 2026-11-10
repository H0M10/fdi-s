import { useMemo, useState } from 'react';
import {
  aEstrella,
  aislarNodoPonderado,
  aSimple,
  bfs,
  dfs,
  ESCENARIOS_GRAFO,
  greedy,
} from '../busqueda/motor';

export type AlgoritmoGrafo = 'bfs' | 'dfs' | 'greedy' | 'a_estrella';

const NOMBRES_ALG: Record<AlgoritmoGrafo, string> = {
  bfs: 'BFS · Anchura (Cola FIFO)',
  dfs: 'DFS · Profundidad (Pila LIFO)',
  greedy: 'Greedy · Voraz (solo h)',
  a_estrella: 'A* · Costo + Heurística (g + h)',
};

export function SimuladorGrafo({
  escenarioInicial = 'cicd',
  algoritmoInicial = 'bfs',
}: {
  escenarioInicial?: string;
  algoritmoInicial?: AlgoritmoGrafo;
}) {
  const [idEscenario, setIdEscenario] = useState(escenarioInicial);
  const [algoritmo, setAlgoritmo] = useState<AlgoritmoGrafo>(algoritmoInicial);
  const [aislados, setAislados] = useState<string[]>([]);
  const [metaCustom, setMetaCustom] = useState<string | null>(null);
  const [pasoIdx, setPasoIdx] = useState<number>(-1); // -1 = resultado final

  const escenario = useMemo(
    () => ESCENARIOS_GRAFO.find((e) => e.id === idEscenario) ?? ESCENARIOS_GRAFO[0],
    [idEscenario],
  );

  const metaActual = metaCustom && escenario.grafo[metaCustom] ? metaCustom : escenario.meta;

  const grafoActual = useMemo(() => {
    let g = escenario.grafo;
    for (const n of aislados) {
      g = aislarNodoPonderado(g, n);
    }
    return g;
  }, [escenario, aislados]);

  const esCiega = algoritmo === 'bfs' || algoritmo === 'dfs';

  const resultadoCiega = useMemo(() => {
    if (!esCiega) return null;
    const simple = aSimple(grafoActual);
    return algoritmo === 'bfs'
      ? bfs(simple, escenario.inicio, metaActual)
      : dfs(simple, escenario.inicio, metaActual);
  }, [esCiega, algoritmo, grafoActual, escenario.inicio, metaActual]);

  const resultadoInformada = useMemo(() => {
    if (esCiega) return null;
    return algoritmo === 'greedy'
      ? greedy(grafoActual, escenario.heuristica, escenario.inicio, metaActual)
      : aEstrella(grafoActual, escenario.heuristica, escenario.inicio, metaActual);
  }, [esCiega, algoritmo, grafoActual, escenario.heuristica, escenario.inicio, metaActual]);

  const totalPasos = esCiega
    ? resultadoCiega!.pasos.length
    : resultadoInformada!.pasos.length;

  const idxEfectivo = pasoIdx < 0 || pasoIdx >= totalPasos ? totalPasos - 1 : pasoIdx;
  const viendoFinal = pasoIdx < 0 || pasoIdx >= totalPasos - 1;

  const ordenHastaAhora = esCiega
    ? resultadoCiega!.pasos.slice(0, idxEfectivo + 1).map((p) => p.visitando)
    : resultadoInformada!.pasos.slice(0, idxEfectivo + 1).map((p) => p.explorando);

  const nodoActual = ordenHastaAhora[ordenHastaAhora.length - 1];
  const caminoFinal = esCiega ? resultadoCiega!.camino : resultadoInformada!.camino;
  const caminoMostrado = viendoFinal
    ? caminoFinal
    : esCiega
      ? resultadoCiega!.pasos[idxEfectivo]?.camino ?? null
      : resultadoInformada!.pasos[idxEfectivo]?.camino ?? null;

  const alternarAislado = (nodo: string) => {
    if (nodo === escenario.inicio) return;
    setAislados((prev) =>
      prev.includes(nodo) ? prev.filter((x) => x !== nodo) : [...prev, nodo],
    );
    setPasoIdx(-1);
  };

  // Lista única de aristas para dibujar en SVG
  const aristas = useMemo(() => {
    const vistas = new Set<string>();
    const lista: { u: string; v: string; costo: number; enCamino: boolean }[] = [];
    const conjuntoCamino = new Set<string>();
    if (caminoMostrado) {
      for (let i = 0; i < caminoMostrado.length - 1; i++) {
        conjuntoCamino.add(`${caminoMostrado[i]}->${caminoMostrado[i + 1]}`);
        conjuntoCamino.add(`${caminoMostrado[i + 1]}->${caminoMostrado[i]}`);
      }
    }
    for (const [u, vecinos] of Object.entries(grafoActual)) {
      for (const [v, costo] of vecinos) {
        const clave = [u, v].sort().join('--');
        if (vistas.has(clave)) continue;
        vistas.add(clave);
        lista.push({
          u,
          v,
          costo,
          enCamino: conjuntoCamino.has(`${u}->${v}`),
        });
      }
    }
    return lista;
  }, [grafoActual, caminoMostrado]);

  const nodos = Object.keys(escenario.grafo);

  return (
    <div className="pregunta" style={{ margin: '0 0 18px' }}>
      <div className="filtros" role="group" aria-label="Escenario de práctica">
        {ESCENARIOS_GRAFO.map((e) => (
          <button
            key={e.id}
            className="chip"
            aria-pressed={e.id === escenario.id}
            onClick={() => {
              setIdEscenario(e.id);
              setAislados([]);
              setMetaCustom(null);
              setPasoIdx(-1);
            }}
          >
            {e.titulo.split('·')[1]?.trim() ?? e.titulo}
          </button>
        ))}
      </div>

      <div className="filtros" role="group" aria-label="Algoritmo de búsqueda" style={{ marginTop: 6 }}>
        {(Object.keys(NOMBRES_ALG) as AlgoritmoGrafo[]).map((alg) => (
          <button
            key={alg}
            className="chip"
            aria-pressed={algoritmo === alg}
            onClick={() => {
              setAlgoritmo(alg);
              setPasoIdx(-1);
            }}
          >
            {NOMBRES_ALG[alg]}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--tinta-2)', margin: '6px 0 10px' }}>
        {escenario.descripcion} <strong>Haz clic en cualquier nodo</strong> del dibujo (o usa el botón de abajo) para
        aislarlo como cuando ocurre una falla en la práctica.
      </p>

      <div className="fila" style={{ marginBottom: 10, gap: 8 }}>
        <button
          className="boton sec chico"
          onClick={() => alternarAislado(escenario.nodoFallaSugerido)}
        >
          {aislados.includes(escenario.nodoFallaSugerido)
            ? `Restaurar «${escenario.nodoFallaSugerido}»`
            : `Simular falla en «${escenario.nodoFallaSugerido}» (dejar en [])`}
        </button>
        {aislados.length > 0 && (
          <button className="boton fant chico" onClick={() => setAislados([])}>
            Restaurar todos ({aislados.length})
          </button>
        )}
        <label style={{ fontSize: 13, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Meta:</span>
          <select
            value={metaActual}
            onChange={(e) => {
              setMetaCustom(e.target.value);
              setPasoIdx(-1);
            }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12.5,
              padding: '4px 8px',
              borderRadius: 6,
              border: '1px solid var(--linea-fuerte)',
              background: 'var(--superficie)',
              color: 'var(--tinta)',
            }}
          >
            {nodos.filter((n) => n !== escenario.inicio).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--linea)', borderRadius: 8, background: 'var(--fondo)' }}>
        <svg
          viewBox="0 0 680 300"
          width="100%"
          style={{ minWidth: 500, display: 'block' }}
          role="img"
          aria-label={`Espacio de búsqueda: ${escenario.titulo}`}
        >
          {aristas.map(({ u, v, costo, enCamino }) => {
            const [xu, yu] = escenario.pos[u] ?? [50, 50];
            const [xv, yv] = escenario.pos[v] ?? [50, 50];
            const x1 = (xu / 100) * 680;
            const y1 = (yu / 100) * 300;
            const x2 = (xv / 100) * 680;
            const y2 = (yv / 100) * 300;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            return (
              <g key={`${u}--${v}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={enCamino ? 'var(--bien)' : 'var(--linea-fuerte)'}
                  strokeWidth={enCamino ? 3.5 : 1.6}
                />
                {(escenario.tienePesos || !esCiega) && (
                  <g>
                    <rect
                      x={mx - 10}
                      y={my - 9}
                      width={20}
                      height={16}
                      rx={4}
                      fill="var(--superficie)"
                      stroke="var(--linea)"
                    />
                    <text
                      x={mx}
                      y={my + 3}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontFamily="var(--mono)"
                      fontWeight="600"
                      fill="var(--examen)"
                    >
                      {costo}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {nodos.map((n) => {
            const [xp, yp] = escenario.pos[n] ?? [50, 50];
            const cx = (xp / 100) * 680;
            const cy = (yp / 100) * 300;
            const estaAislado = aislados.includes(n);
            const enCamino = caminoMostrado?.includes(n) ?? false;
            const fueVisitado = ordenHastaAhora.includes(n);
            const esActual = !viendoFinal && nodoActual === n;

            let relleno = 'var(--superficie)';
            let borde = 'var(--linea-fuerte)';
            if (estaAislado) {
              relleno = 'var(--mal-fondo)';
              borde = 'var(--mal)';
            } else if (esActual) {
              relleno = 'var(--examen-fondo)';
              borde = 'var(--examen)';
            } else if (enCamino) {
              relleno = 'var(--bien-fondo)';
              borde = 'var(--bien)';
            } else if (fueVisitado) {
              relleno = 'var(--acento-suave)';
              borde = 'var(--acento)';
            }

            const numVisita = ordenHastaAhora.indexOf(n);

            return (
              <g
                key={n}
                onClick={() => alternarAislado(n)}
                style={{ cursor: n === escenario.inicio ? 'default' : 'pointer' }}
              >
                <circle cx={cx} cy={cy} r={22} fill={relleno} stroke={borde} strokeWidth={2.5} />
                {numVisita >= 0 && (
                  <text
                    x={cx}
                    y={cy - 9}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="var(--mono)"
                    fontWeight="700"
                    fill="var(--acento)"
                  >
                    #{numVisita + 1}
                  </text>
                )}
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--tinta)"
                >
                  {n.length > 13 ? n.slice(0, 12) + '…' : n}
                </text>
                {!esCiega && (
                  <text
                    x={cx}
                    y={cy + 14}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="var(--mono)"
                    fill="var(--tinta-2)"
                  >
                    h={escenario.heuristica[n] ?? 0}
                  </text>
                )}
                {estaAislado && (
                  <text
                    x={cx}
                    y={cy + 34}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="700"
                    fill="var(--mal)"
                  >
                    AISLADO []
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controles paso a paso */}
      <div className="fila" style={{ marginTop: 12, justifyContent: 'space-between' }}>
        <div className="fila" style={{ gap: 6 }}>
          <button
            className="boton fant chico"
            disabled={idxEfectivo <= 0 && !viendoFinal}
            onClick={() => setPasoIdx(0)}
          >
            ⏮ Paso 1
          </button>
          <button
            className="boton fant chico"
            disabled={idxEfectivo <= 0 && !viendoFinal}
            onClick={() => setPasoIdx(Math.max(0, idxEfectivo - 1))}
          >
            ← Anterior
          </button>
          <button
            className="boton fant chico"
            disabled={viendoFinal}
            onClick={() =>
              setPasoIdx(idxEfectivo + 1 >= totalPasos - 1 ? -1 : idxEfectivo + 1)
            }
          >
            Siguiente →
          </button>
          <button
            className="boton sec chico"
            disabled={viendoFinal}
            onClick={() => setPasoIdx(-1)}
          >
            Resultado final ({totalPasos} pasos)
          </button>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--tinta-2)' }}>
          {viendoFinal ? `Resultado final (${totalPasos} visitados)` : `Paso ${idxEfectivo + 1} de ${totalPasos}`}
        </span>
      </div>

      {/* Estado de la Cola / Pila / Cola de Prioridad en el paso actual */}
      <div
        style={{
          marginTop: 12,
          padding: '10px 12px',
          borderRadius: 7,
          background: 'var(--superficie-2)',
          fontFamily: 'var(--mono)',
          fontSize: 12.5,
        }}
      >
        {esCiega ? (
          <>
            <div>
              <strong>{algoritmo === 'bfs' ? 'Cola FIFO (popleft):' : 'Pila LIFO (pop):'}</strong>{' '}
              [{resultadoCiega!.pasos[idxEfectivo]?.frontera.join(', ') || 'vacía'}]
            </div>
            <div style={{ marginTop: 4 }}>
              <strong>Visitando ahora:</strong> {resultadoCiega!.pasos[idxEfectivo]?.visitando} |{' '}
              <strong>Profundidad (len(camino)-1):</strong>{' '}
              {resultadoCiega!.pasos[idxEfectivo]?.profundidad}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>
                Cola de prioridad ({algoritmo === 'greedy' ? 'ordenada por h' : 'ordenada por f = g + h'}):
              </strong>{' '}
              {resultadoInformada!.pasos[idxEfectivo]?.pendientes
                .map((c) =>
                  algoritmo === 'greedy'
                    ? `${c.nodo}(h=${c.h})`
                    : `${c.nodo}(g=${c.g},h=${c.h},f=${c.f})`,
                )
                .join(' · ')}
            </div>
            <div style={{ marginTop: 4 }}>
              <strong>Explorando:</strong> {resultadoInformada!.pasos[idxEfectivo]?.explorando} |{' '}
              <strong>g = {resultadoInformada!.pasos[idxEfectivo]?.g}</strong> ·{' '}
              <strong>h = {resultadoInformada!.pasos[idxEfectivo]?.h}</strong> ·{' '}
              <strong>f = {resultadoInformada!.pasos[idxEfectivo]?.f}</strong>
            </div>
          </>
        )}
      </div>

      <div className="marcador" style={{ marginTop: 12 }}>
        <div className="marcador-celda">
          <div className="num">{ordenHastaAhora.length}</div>
          <div className="que">Estados visitados</div>
        </div>
        <div className="marcador-celda">
          <div
            className="num"
            style={{ color: caminoFinal ? 'var(--bien)' : 'var(--mal)' }}
          >
            {caminoFinal ? caminoFinal.length - 1 : 'None'}
          </div>
          <div className="que">Pasos (aristas) del camino</div>
        </div>
        {!esCiega && (
          <div className="marcador-celda">
            <div className="num" style={{ color: 'var(--examen)' }}>
              {resultadoInformada!.costo ?? '—'}
            </div>
            <div className="que">Costo real total g(meta)</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 13.5 }}>
        <div>
          <strong>Orden de visita:</strong>{' '}
          <code className="simb">{ordenHastaAhora.join(' → ')}</code>
        </div>
        <div style={{ marginTop: 4 }}>
          <strong>Camino encontrado:</strong>{' '}
          {caminoFinal ? (
            <code className="simb" style={{ color: 'var(--bien)' }}>
              {caminoFinal.join(' → ')}
            </code>
          ) : (
            <span style={{ color: 'var(--mal)', fontWeight: 600 }}>
              None (Meta inalcanzable: la {esCiega ? (algoritmo === 'bfs' ? 'cola' : 'pila') : 'cola de prioridad'} se vació sin encontrar «{metaActual}»)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

