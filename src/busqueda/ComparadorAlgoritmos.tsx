import { useState } from 'react';

/* ========================================================================== */
/* VISUALIZADOR 1 (TEMA 3): CÓMO SE MUEVE BFS VS CÓMO SE MUEVE DFS PASO A PASO */
/* ========================================================================== */
const NODOS_GRAFO_VISUAL: Record<string, { x: number; y: number; nivel: string }> = {
  A: { x: 260, y: 40, nivel: 'Nivel 0 (Inicio)' },
  B: { x: 140, y: 120, nivel: 'Nivel 1' },
  C: { x: 380, y: 120, nivel: 'Nivel 1' },
  D: { x: 70, y: 210, nivel: 'Nivel 2' },
  E: { x: 210, y: 210, nivel: 'Nivel 2' },
  F: { x: 380, y: 210, nivel: 'Nivel 2 (Meta)' },
};

const ARISTAS_GRAFO_VISUAL: [string, string][] = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['B', 'E'],
  ['C', 'F'],
  ['E', 'F'],
];

const PASOS_VISUAL_BFS = [
  {
    actual: 'A',
    visitados: ['A'],
    enFila: ['B', 'C'],
    caminoFinal: [] as string[],
    texto: 'Paso 1 (Piso 0): Arranca en el Inicio A. Mete en la Cola FIFO a sus vecinos directos del Piso 1: primero B y luego C.',
  },
  {
    actual: 'B',
    visitados: ['A', 'B'],
    enFila: ['C', 'D', 'E'],
    caminoFinal: [] as string[],
    texto: 'Paso 2 (Piso 1): Saca al primero de la fila (B) y forma al final de la fila a sus hijos D y E (del Piso 2). En la fila quedan [C, D, E].',
  },
  {
    actual: 'C',
    visitados: ['A', 'B', 'C'],
    enFila: ['D', 'E', 'F'],
    caminoFinal: [] as string[],
    texto: 'Paso 3 (Piso 1): ¡Movimiento clave de BFS! Como C se formó antes que D y E, revisa C antes de bajar al Piso 2. Desde C descubre a F.',
  },
  {
    actual: 'D',
    visitados: ['A', 'B', 'C', 'D'],
    enFila: ['E', 'F'],
    caminoFinal: [] as string[],
    texto: 'Paso 4 (Piso 2): Ya terminado todo el Piso 1, baja al Piso 2 y revisa D (no tiene salida).',
  },
  {
    actual: 'E',
    visitados: ['A', 'B', 'C', 'D', 'E'],
    enFila: ['F'],
    caminoFinal: [] as string[],
    texto: 'Paso 5 (Piso 2): Revisa el siguiente del Piso 2, que es E.',
  },
  {
    actual: 'F',
    visitados: ['A', 'B', 'C', 'D', 'E', 'F'],
    enFila: [],
    caminoFinal: ['A', 'C', 'F'],
    texto: 'Paso 6 (¡Meta!): Saca a F (que había entrado desde C). Orden de recorrido: A → B → C → D → E → F. Camino resultado: A → C → F (2 pasos, el más corto).',
  },
];

const PASOS_VISUAL_DFS = [
  {
    actual: 'A',
    visitados: ['A'],
    enFila: ['B', 'C'],
    caminoFinal: [] as string[],
    texto: 'Paso 1: Arranca en A. Sus vecinos son B y C. Como DFS usa Pila LIFO, pone a B en el tope para hundirse primero por toda la rama de B.',
  },
  {
    actual: 'B',
    visitados: ['A', 'B'],
    enFila: ['D', 'E', 'C'],
    caminoFinal: [] as string[],
    texto: 'Paso 2: Entra a B. Ignora por completo a C y decide seguir bajando hacia el primer hijo de B, que es D.',
  },
  {
    actual: 'D',
    visitados: ['A', 'B', 'D'],
    enFila: ['E', 'C'],
    caminoFinal: [] as string[],
    texto: 'Paso 3: Se hunde hasta el fondo en D. Como D no tiene hijos (callejón sin salida), hace backtracking (retrocede a B) para tomar a E.',
  },
  {
    actual: 'E',
    visitados: ['A', 'B', 'D', 'E'],
    enFila: ['F', 'C'],
    caminoFinal: [] as string[],
    texto: 'Paso 4: Entra a E y ve que desde E puede seguir bajando hacia F.',
  },
  {
    actual: 'F',
    visitados: ['A', 'B', 'D', 'E', 'F'],
    enFila: ['C'],
    caminoFinal: ['A', 'B', 'E', 'F'],
    texto: 'Paso 5 (¡Meta!): Llega a F viniendo desde E ¡sin haber visitado nunca a C! Orden de recorrido: A → B → D → E → F. Camino resultado: A → B → E → F (3 pasos, más largo).',
  },
];

function VisualizadorMovimientoBFSvsDFS() {
  const [modo, setModo] = useState<'bfs' | 'dfs'>('bfs');
  const [pasoIdx, setPasoIdx] = useState<number>(5);

  const pasos = modo === 'bfs' ? PASOS_VISUAL_BFS : PASOS_VISUAL_DFS;
  const idxSeguro = Math.min(pasoIdx, pasos.length - 1);
  const estado = pasos[idxSeguro];

  const cambiarModo = (nuevo: 'bfs' | 'dfs') => {
    setModo(nuevo);
    setPasoIdx(0);
  };

  return (
    <div style={{ padding: 16, borderRadius: 10, background: 'var(--fondo-2)', border: '1px solid var(--linea)', marginTop: 12 }}>
      <div className="fila" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <div className="fila" style={{ gap: 8 }}>
          <button
            type="button"
            className={modo === 'bfs' ? 'boton chico' : 'boton sec chico'}
            onClick={() => cambiarModo('bfs')}
          >
            Animar BFS (Anchura · Por pisos)
          </button>
          <button
            type="button"
            className={modo === 'dfs' ? 'boton chico' : 'boton sec chico'}
            onClick={() => cambiarModo('dfs')}
          >
            Animar DFS (Profundidad · Por rama)
          </button>
        </div>
        <div className="fila" style={{ gap: 6 }}>
          <button
            type="button"
            className="boton sec chico"
            disabled={idxSeguro === 0}
            onClick={() => setPasoIdx((p) => Math.max(0, p - 1))}
          >
            ← Paso anterior
          </button>
          <span style={{ fontSize: 13, fontWeight: 700, padding: '0 6px' }}>
            Paso {idxSeguro + 1} de {pasos.length}
          </span>
          <button
            type="button"
            className="boton chico"
            disabled={idxSeguro === pasos.length - 1}
            onClick={() => setPasoIdx((p) => Math.min(pasos.length - 1, p + 1))}
          >
            Siguiente paso →
          </button>
          <button
            type="button"
            className="boton sec chico"
            onClick={() => setPasoIdx(pasos.length - 1)}
          >
            Ver final
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'center' }}>
        <svg viewBox="0 0 520 265" style={{ width: '100%', height: 'auto', background: 'var(--papel)', borderRadius: 8, border: '1px solid var(--linea)' }}>
          <line x1="20" y1="40" x2="500" y2="40" stroke="#e2e8f0" strokeDasharray="4 4" />
          <text x="26" y="33" fontSize="10" fill="#64748b">Piso / Nivel 0</text>
          <line x1="20" y1="120" x2="500" y2="120" stroke="#e2e8f0" strokeDasharray="4 4" />
          <text x="26" y="113" fontSize="10" fill="#64748b">Piso / Nivel 1</text>
          <line x1="20" y1="210" x2="500" y2="210" stroke="#e2e8f0" strokeDasharray="4 4" />
          <text x="26" y="203" fontSize="10" fill="#64748b">Piso / Nivel 2</text>

          {ARISTAS_GRAFO_VISUAL.map(([u, v]) => {
            const p1 = NODOS_GRAFO_VISUAL[u];
            const p2 = NODOS_GRAFO_VISUAL[v];
            const enCamino =
              estado.caminoFinal.includes(u) &&
              estado.caminoFinal.includes(v) &&
              estado.caminoFinal.indexOf(v) === estado.caminoFinal.indexOf(u) + 1;
            return (
              <line
                key={`${u}-${v}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={enCamino ? '#16a34a' : '#94a3b8'}
                strokeWidth={enCamino ? 4.5 : 2}
              />
            );
          })}

          {Object.entries(NODOS_GRAFO_VISUAL).map(([id, pos]) => {
            const esActual = estado.actual === id;
            const fueVisitado = estado.visitados.includes(id);
            const enCamino = estado.caminoFinal.includes(id);
            const ordenVisita = estado.visitados.indexOf(id) + 1;

            let fill = '#f8fafc';
            let stroke = '#64748b';
            if (enCamino) {
              fill = '#dcfce7';
              stroke = '#16a34a';
            } else if (esActual) {
              fill = '#fef3c7';
              stroke = '#d97706';
            } else if (fueVisitado) {
              fill = '#dbeafe';
              stroke = '#2563eb';
            }

            return (
              <g key={id} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle r={24} fill={fill} stroke={stroke} strokeWidth={esActual || enCamino ? 3.5 : 2} />
                <text textAnchor="middle" dy="5" fontWeight="700" fontSize="15" fill="#0f172a">
                  {id}
                </text>
                {ordenVisita > 0 && (
                  <g transform="translate(18, -18)">
                    <circle r={10} fill="#1e293b" />
                    <text textAnchor="middle" dy="3.5" fontSize="10" fontWeight="700" fill="#ffffff">
                      {ordenVisita}°
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', borderLeft: '4px solid var(--acento)', marginBottom: 10 }}>
            <strong>{modo === 'bfs' ? 'Cómo se va moviendo BFS (Anchura)' : 'Cómo se va moviendo DFS (Profundidad)'}:</strong>
            <p style={{ margin: '6px 0 0' }}>{estado.texto}</p>
          </div>
          <p style={{ margin: '0 0 6px' }}>
            <strong>Orden de visita hasta ahora:</strong> <code>{estado.visitados.join(' → ')}</code>
          </p>
          <p style={{ margin: '0 0 6px' }}>
            <strong>Estructura de espera ({modo === 'bfs' ? 'Cola FIFO' : 'Pila LIFO'}):</strong>{' '}
            <code>{estado.enFila.length > 0 ? estado.enFila.join(', ') : '(vacía)'}</code>
          </p>
          {estado.caminoFinal.length > 0 && (
            <p style={{ margin: 0, color: '#15803d', fontWeight: 700 }}>
              Camino resultado final: {estado.caminoFinal.join(' → ')} ({estado.caminoFinal.length - 1} pasos)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* VISUALIZADOR 2 (TEMA 4): CÓMO SE MUEVE GREEDY VS CÓMO SE MUEVE A*          */
/* ========================================================================== */
function VisualizadorGreedyVsAEstrella() {
  const [modo, setModo] = useState<'greedy' | 'a_estrella'>('greedy');
  const esGreedy = modo === 'greedy';

  return (
    <div style={{ padding: 16, borderRadius: 10, background: 'var(--fondo-2)', border: '1px solid var(--linea)', marginTop: 12 }}>
      <div className="fila" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button
          type="button"
          className={modo === 'greedy' ? 'boton chico' : 'boton sec chico'}
          onClick={() => setModo('greedy')}
        >
          1. Ver cómo se mueve Greedy · Solo mira f(n) = h(n)
        </button>
        <button
          type="button"
          className={modo === 'a_estrella' ? 'boton chico' : 'boton sec chico'}
          onClick={() => setModo('a_estrella')}
        >
          2. Ver cómo se mueve A* (Estrella) · Suma f(n) = g(n) + h(n)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16, alignItems: 'center' }}>
        <svg viewBox="0 0 520 240" style={{ width: '100%', height: 'auto', background: 'var(--papel)', borderRadius: 8, border: '1px solid var(--linea)' }}>
          <line x1="80" y1="120" x2="250" y2="55" stroke={esGreedy ? '#dc2626' : '#94a3b8'} strokeWidth={esGreedy ? 4.5 : 2} />
          <text x="150" y="72" fontSize="12" fontWeight="700" fill="#0f172a">peso g = 2</text>

          <line x1="250" y1="55" x2="430" y2="120" stroke={esGreedy ? '#dc2626' : '#94a3b8'} strokeWidth={esGreedy ? 4.5 : 2} />
          <text x="325" y="72" fontSize="12" fontWeight="700" fill="#dc2626">peso g = 15 (¡caro!)</text>

          <line x1="80" y1="120" x2="250" y2="185" stroke={!esGreedy ? '#16a34a' : '#94a3b8'} strokeWidth={!esGreedy ? 4.5 : 2} />
          <text x="150" y="172" fontSize="12" fontWeight="700" fill="#0f172a">peso g = 4</text>

          <line x1="250" y1="185" x2="430" y2="120" stroke={!esGreedy ? '#16a34a' : '#94a3b8'} strokeWidth={!esGreedy ? 4.5 : 2} />
          <text x="330" y="172" fontSize="12" fontWeight="700" fill="#15803d">peso g = 3</text>

          <g transform="translate(80, 120)">
            <circle r={30} fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
            <text textAnchor="middle" dy="-3" fontWeight="700" fontSize="15">A</text>
            <text textAnchor="middle" dy="14" fontSize="11" fill="#1e3a8a">h = 6</text>
          </g>

          <g transform="translate(250, 55)">
            <circle r={30} fill={esGreedy ? '#fee2e2' : '#f8fafc'} stroke={esGreedy ? '#dc2626' : '#64748b'} strokeWidth="3" />
            <text textAnchor="middle" dy="-3" fontWeight="700" fontSize="15">B</text>
            <text textAnchor="middle" dy="14" fontSize="11" fontWeight="700" fill="#b91c1c">h = 1</text>
          </g>

          <g transform="translate(250, 185)">
            <circle r={30} fill={!esGreedy ? '#dcfce7' : '#f8fafc'} stroke={!esGreedy ? '#16a34a' : '#64748b'} strokeWidth="3" />
            <text textAnchor="middle" dy="-3" fontWeight="700" fontSize="15">C</text>
            <text textAnchor="middle" dy="14" fontSize="11" fontWeight="700" fill="#15803d">h = 4</text>
          </g>

          <g transform="translate(430, 120)">
            <circle r={30} fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
            <text textAnchor="middle" dy="-3" fontWeight="700" fontSize="15">D (Meta)</text>
            <text textAnchor="middle" dy="14" fontSize="11" fill="#92400e">h = 0</text>
          </g>
        </svg>

        <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
          {esGreedy ? (
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', borderLeft: '4px solid #dc2626' }}>
              <strong>Traza de Greedy en este grafo (Usa SOLO f(n) = h(n)):</strong>
              <ol style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                <li>Desde <strong>A</strong>, sus vecinos son <strong>B</strong> (con <code>h=1</code>) y <strong>C</strong> (con <code>h=4</code>).</li>
                <li>Greedy ignora los pesos de las flechas y elige <strong>B</strong> porque <code>h(B) = 1</code> es menor que <code>h(C) = 4</code>.</li>
                <li>Desde <strong>B</strong> avanza a <strong>D</strong> y termina pagando el tramo caro de <strong>15</strong>.</li>
                <li><strong>Resultado de Greedy:</strong> Camino <strong>A → B → D</strong> (Costo real total = <strong>2 + 15 = 17</strong>).</li>
              </ol>
            </div>
          ) : (
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', borderLeft: '4px solid #16a34a' }}>
              <strong>Traza de A* en este grafo (Suma f(n) = g(n) + h(n)):</strong>
              <ol style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                <li>Desde <strong>A</strong> calcula la suma <code>f = g + h</code> para sus dos vecinos:
                  <br />• Para B: <code>f(B) = 2 + 1 = 3</code>
                  <br />• Para C: <code>f(C) = 4 + 4 = 8</code>
                </li>
                <li>Revisa primero B (porque <code>3 &lt; 8</code>), pero al ver la flecha B → D el costo acumulado sube a <code>g = 2 + 15 = 17</code>, dando <code>f(D por B) = 17 + 0 = 17</code>.</li>
                <li>Como <strong>C sigue esperando con f = 8</strong> (que es menor que 17), A* frena la rama de B, abre <strong>C</strong> y llega a D con <code>f(D por C) = (4 + 3) + 0 = 7</code>.</li>
                <li><strong>Resultado de A*:</strong> Camino óptimo <strong>A → C → D</strong> (Costo real total = <strong>4 + 3 = 7</strong>).</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* VISUALIZADOR 3 (TEMAS 5 Y 6): PAISAJE DE ÓPTIMO LOCAL VS ÓPTIMO GLOBAL     */
/* ========================================================================== */
function VisualizadorPaisajeOptimos() {
  const [algoritmo, setAlgoritmo] = useState<'hc' | 'sa' | 'ag'>('hc');

  return (
    <div style={{ padding: 16, borderRadius: 10, background: 'var(--fondo-2)', border: '1px solid var(--linea)', marginTop: 12 }}>
      <div className="fila" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button
          type="button"
          className={algoritmo === 'hc' ? 'boton chico' : 'boton sec chico'}
          onClick={() => setAlgoritmo('hc')}
        >
          1. Movimiento de Hill Climbing
        </button>
        <button
          type="button"
          className={algoritmo === 'sa' ? 'boton chico' : 'boton sec chico'}
          onClick={() => setAlgoritmo('sa')}
        >
          2. Movimiento de Simulated Annealing
        </button>
        <button
          type="button"
          className={algoritmo === 'ag' ? 'boton chico' : 'boton sec chico'}
          onClick={() => setAlgoritmo('ag')}
        >
          3. Movimiento del Algoritmo Genético
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16, alignItems: 'center' }}>
        <svg viewBox="0 0 520 230" style={{ width: '100%', height: 'auto', background: 'var(--papel)', borderRadius: 8, border: '1px solid var(--linea)' }}>
          <line x1="30" y1="200" x2="495" y2="200" stroke="#94a3b8" strokeWidth="2" />
          <line x1="30" y1="20" x2="30" y2="200" stroke="#94a3b8" strokeWidth="2" />
          <text x="260" y="220" textAnchor="middle" fontSize="11" fill="#475569">Soluciones posibles (x)</text>
          <text x="16" y="110" textAnchor="middle" fontSize="11" fill="#475569" transform="rotate(-90 16 110)">Calidad / Fitness f(x)</text>

          <path
            d="M 40 190 Q 90 180 120 130 Q 150 85 180 130 Q 220 185 260 155 Q 310 100 350 45 Q 380 15 410 55 Q 450 130 485 185"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
          />

          <circle cx="150" cy="107" r="6" fill="#dc2626" />
          <text x="150" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">
            Óptimo Local (Cerro pequeño)
          </text>

          <text x="225" y="182" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#64748b">
            Valle (bajada)
          </text>

          <circle cx="380" cy="37" r="7" fill="#16a34a" />
          <text x="380" y="22" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#15803d">
            ★ Óptimo Global (La mejor solución)
          </text>

          {algoritmo === 'hc' && (
            <g>
              <circle cx="80" cy="175" r="7" fill="#2563eb" />
              <text x="75" y="193" fontSize="10" fontWeight="700" fill="#1d4ed8">Inicio x0</text>
              <path d="M 85 170 L 115 135 L 145 112" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="5 3" />
              <circle cx="150" cy="107" r="10" fill="none" stroke="#dc2626" strokeWidth="3" />
              <text x="150" y="138" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">
                ¡Se atora aquí! (No acepta bajar)
              </text>
            </g>
          )}

          {algoritmo === 'sa' && (
            <g>
              <circle cx="80" cy="175" r="7" fill="#2563eb" />
              <text x="75" y="193" fontSize="10" fontWeight="700" fill="#1d4ed8">Inicio x0</text>
              <path
                d="M 85 170 Q 120 120 150 107 Q 190 150 225 165 Q 290 110 380 37"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="3.5"
                strokeDasharray="6 3"
              />
              <text x="235" y="142" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#6d28d9">
                Baja el valle con P = e^(Δ/T)
              </text>
              <circle cx="380" cy="37" r="11" fill="none" stroke="#16a34a" strokeWidth="3" />
            </g>
          )}

          {algoritmo === 'ag' && (
            <g>
              {[
                [65, 182],
                [115, 136],
                [150, 107],
                [215, 162],
                [285, 128],
                [335, 65],
                [378, 37],
                [425, 80],
                [465, 155],
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r="6.5" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
              ))}
              <circle cx="380" cy="37" r="12" fill="none" stroke="#16a34a" strokeWidth="3" />
              <text x="270" y="194" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b45309">
                Población de N individuos explorando todo el mapa a la vez
              </text>
            </g>
          )}
        </svg>

        <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
          {algoritmo === 'hc' && (
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', borderLeft: '4px solid #dc2626' }}>
              <strong>Hill Climbing (Ascenso de Colinas):</strong>
              <p style={{ margin: '6px 0 0' }}>
                Parte de <strong>1 sola solución (x0)</strong> y solo sube si el vecino inmediato es mejor. Al llegar al
                <strong> Óptimo Local</strong>, ve que a la izquierda y derecha la altura baja, así que se detiene creyendo
                que llegó a la cima más alta y jamás descubre el Óptimo Global.
              </p>
            </div>
          )}
          {algoritmo === 'sa' && (
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', borderLeft: '4px solid #7c3aed' }}>
              <strong>Simulated Annealing (Recocido Simulado):</strong>
              <p style={{ margin: '6px 0 0' }}>
                Parte de <strong>1 sola solución (x0)</strong>, pero cuando está en el cerro pequeño la{' '}
                <strong>Temperatura T es alta</strong> y le permite aceptar pasos hacia abajo con probabilidad{' '}
                <strong>P = e^(Δ / T)</strong>. Así logra bajar por el valle, salir de la trampa local y subir al{' '}
                <strong>Óptimo Global</strong>.
              </p>
            </div>
          )}
          {algoritmo === 'ag' && (
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', borderLeft: '4px solid #d97706' }}>
              <strong>Algoritmo Genético (Evolutivo):</strong>
              <p style={{ margin: '6px 0 0' }}>
                Trabaja con una <strong>Población de muchas soluciones al mismo tiempo</strong> (puntos naranjas) repartidas
                por todo el terreno. Selecciona a las más altas como padres, las <strong>cruza</strong>, las{' '}
                <strong>muta</strong> y aplica <strong>elitismo</strong> para converger al <strong>Óptimo Global</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* COMPONENTE PRINCIPAL: CADA TEMA CON TEORÍA INDIVIDUAL + LUEGO COMPARACIÓN  */
/* ========================================================================== */
export function ComparadorAlgoritmos() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* ÍNDICE RÁPIDO */}
      <nav
        aria-label="Índice de los 6 temas"
        style={{
          padding: 14,
          borderRadius: 10,
          background: 'var(--fondo-2)',
          border: '1px solid var(--linea)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <strong style={{ fontSize: 13, marginRight: 4 }}>Estudiar en orden:</strong>
        <a href="#guia-t1" className="boton sec chico" style={{ textDecoration: 'none' }}>Tema 1: Problemas de Búsqueda</a>
        <a href="#guia-t2" className="boton sec chico" style={{ textDecoration: 'none' }}>Tema 2: Espacio y Grafos</a>
        <a href="#guia-t3" className="boton sec chico" style={{ textDecoration: 'none' }}>Tema 3: Búsqueda Ciega (BFS y DFS)</a>
        <a href="#guia-t4" className="boton sec chico" style={{ textDecoration: 'none' }}>Tema 4: Heurística (Greedy y A*)</a>
        <a href="#guia-t5" className="boton sec chico" style={{ textDecoration: 'none' }}>Tema 5: Búsqueda Local (HC y SA)</a>
        <a href="#guia-t6" className="boton sec chico" style={{ textDecoration: 'none' }}>Tema 6: Algoritmos Genéticos</a>
        <a href="#guia-comparar" className="boton chico" style={{ textDecoration: 'none' }}>7. Comparación General de Todos</a>
      </nav>

      {/* ================================================================== */}
      {/* TEMA 1: PROBLEMAS DE BÚSQUEDA                                      */}
      {/* ================================================================== */}
      <section id="guia-t1" className="tarjeta" style={{ margin: 0, borderLeft: '5px solid var(--azul-borde)' }}>
        <p className="rotulo">Tema 1 de 6 · Problemas de Búsqueda</p>
        <h2 style={{ margin: '4px 0 10px' }}>Tema 1: ¿Qué es un Problema de Búsqueda y cuáles son sus partes?</h2>

        {/* 1A. QUÉ ES */}
        <div style={{ padding: 14, borderRadius: 8, background: 'var(--fondo-2)', marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
          <strong>¿Qué es un problema de búsqueda? (Definición de clase):</strong>
          <br />
          En Inteligencia Artificial, un problema de búsqueda se presenta cuando estamos en una situación inicial (por
          ejemplo, en <em>Querétaro</em> o en la <em>Planta Baja de un elevador</em>) y queremos encontrar <strong>cómo llegar</strong> a
          un objetivo (<em>Ciudad de México</em> o el <em>Piso 5</em>) a través de una serie de acciones permitidas y respetando ciertas
          restricciones.
        </div>

        {/* 1B. CADA ELEMENTO POR SEPARADO */}
        <h3 style={{ margin: '0 0 10px', fontSize: 16 }}>
          Primero: Cada uno de los 6 elementos explicado por separado
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>1. El Inicio (Estado Inicial)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Responde a la pregunta: <strong>«¿Dónde comienza el problema?»</strong>. Es la situación exacta con la que
              arrancamos antes de hacer cualquier movimiento (ej. estar en la Planta Baja <code>PB</code>, tener las dos
              jarras vacías <code>[0, 0]</code> o estar todos en la orilla izquierda <code>[0, 0, 0, 0]</code>).
            </p>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>2. Los Estados («Estado = Información»)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Responde a la pregunta: <strong>«¿Qué situaciones son posibles?»</strong>. Un estado guarda toda la
              <strong> información</strong> necesaria de un momento dado. El profesor recomendó <em>«pensar cómo programarlo»</em>:
              representar cada estado como una lista de ceros y unos <code>[0, 1, 0, 1]</code> (izquierda/derecha) o un par de
              números <code>[litros_A, litros_B]</code>.
            </p>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>3. Las Acciones</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Responde a la pregunta: <strong>«¿Qué puedo hacer?»</strong>. Son las operaciones o movimientos permitidos que
              hacen que el problema cambie de un estado a otro (ej. <em>subir o bajar pisos</em>, <em>cruzar la lancha con 1 o 2 personas</em>,
              <em> llenar o vaciar una jarra</em>).
            </p>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>4. Las Restricciones</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Responde a la pregunta: <strong>«¿Qué está prohibido o bloqueado?»</strong>. Son las condiciones que NO se
              pueden romper (ej. <em>«no quiero pasar por San Juan del Río»</em>, <em>«el sótano está cerrado»</em>, <em>«el lobo no puede quedarse solo con la cabra»</em>).
              Las restricciones reducen los caminos posibles, pero <strong>no cambian ni el Inicio ni la Meta</strong>.
            </p>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>5. La Meta</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Responde a la pregunta: <strong>«¿Qué quiero alcanzar?»</strong>. Es <strong>únicamente la condición o estado final</strong> al
              que queremos llegar (ej. estar en el Piso 5 <code>P5</code>, que todos estén en la orilla derecha <code>[1, 1, 1, 1]</code>).
            </p>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>6. La Solución</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Responde a la pregunta: <strong>«¿Cómo vamos a llegar?»</strong>. Es la <strong>secuencia completa y ordenada de pasos</strong> que
              nos lleva desde el Inicio hasta la Meta sin violar ninguna restricción.
            </p>
          </div>
        </div>

        {/* 1C. COMPARACIÓN DEL TEMA 1 + EJEMPLOS LÓGICOS */}
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          Segundo: Comparaciones del Tema 1 que preguntan en el examen
        </h3>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Comparación</th>
                <th>Concepto A</th>
                <th>Concepto B</th>
                <th>Cómo distinguirlos en el examen</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Meta vs Solución</strong></td>
                <td><strong>Meta:</strong> Es solo el destino final (ej. <code>P5</code> o <code>[2, 0]</code>).</td>
                <td><strong>Solución:</strong> Es toda la lista de pasos desde el inicio hasta la meta (<code>PB→P1→P2→P3→P4→P5</code>).</td>
                <td>La Meta es <em>qué quieres lograr</em>; la Solución es <em>cómo llegas paso a paso</em>.</td>
              </tr>
              <tr>
                <td><strong>Estado vs Acción</strong></td>
                <td><strong>Estado:</strong> Es una fotografía estática de la situación actual (la información).</td>
                <td><strong>Acción:</strong> Es el movimiento (verbo) que te transforma de un estado al siguiente.</td>
                <td>«Estar en P2» es un Estado; «Subir un piso» es una Acción.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          Tercero: Los problemas clásicos resueltos con lógica desde cero
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 12, fontSize: 13.5 }}>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--fondo-2)', border: '1px solid var(--linea)' }}>
            <strong>1. Parejas / Esposos Celosos (o Científicos y Robots):</strong>
            <br />• <strong>Estados:</strong> <code>[H1, M1, H2, M2, Balsa]</code> (<code>0</code>=Izq, <code>1</code>=Der).
            <br />• <strong>Inicio:</strong> <code>[0,0,0,0,0]</code> · <strong>Meta:</strong> <code>[1,1,1,1,1]</code>.
            <br />• <strong>Restricción:</strong> Ninguna esposa puede quedar con otro hombre sin su propio esposo presente; balsa de 1 o 2 personas.
            <br />• <strong>Solución (5 cruces):</strong> 1) Cruzan las 2 mujeres <code>[0,1,0,1,1]</code> → 2) Regresa M1 <code>[0,0,0,1,0]</code> → 3) Cruzan los 2 hombres <code>[1,0,1,1,1]</code> → 4) Regresa M2 <code>[1,0,1,0,0]</code> → 5) Cruzan las 2 mujeres <code>[1,1,1,1,1]</code>.
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--fondo-2)', border: '1px solid var(--linea)' }}>
            <strong>2. El Granjero, el Lobo, la Cabra y la Col:</strong>
            <br />• <strong>Estados:</strong> <code>[Granjero, Lobo, Cabra, Col]</code> (<code>0</code>=Izq, <code>1</code>=Der).
            <br />• <strong>Restricción:</strong> Sin el granjero, el Lobo se come a la Cabra y la Cabra se come la Col; solo cabe 1 acompañante.
            <br />• <strong>Solución (7 cruces):</strong> 1) Cruza Cabra <code>[1,0,1,0]</code> → 2) Regresa solo <code>[0,0,1,0]</code> → 3) Cruza Lobo <code>[1,1,1,0]</code> → 4) <strong>Regresa con la Cabra</strong> <code>[0,1,0,0]</code> → 5) Cruza Col <code>[1,1,0,1]</code> → 6) Regresa solo <code>[0,1,0,1]</code> → 7) Cruza Cabra <code>[1,1,1,1]</code>.
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'var(--fondo-2)', border: '1px solid var(--linea)' }}>
            <strong>3. Jarras de Agua (4L y 3L para medir 2L):</strong>
            <br />• <strong>Estados:</strong> <code>[x, y]</code> (litros en 4L y litros en 3L).
            <br />• <strong>Inicio:</strong> <code>[0, 0]</code> · <strong>Meta:</strong> <code>[2, 0]</code>.
            <br />• <strong>Solución (6 pasos):</strong> 1) Llenar 3L <code>[0,3]</code> → 2) Pasar a 4L <code>[3,0]</code> → 3) Llenar 3L <code>[3,3]</code> → 4) Llenar 4L con agua de 3L (sobran 2L en la de 3L: <code>[4,2]</code>) → 5) Vaciar 4L <code>[0,2]</code> → 6) Pasar los 2L a la de 4L <code>[2,0]</code>.
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TEMA 2: ESPACIO DE BÚSQUEDA Y GRAFOS                               */}
      {/* ================================================================== */}
      <section id="guia-t2" className="tarjeta" style={{ margin: 0, borderLeft: '5px solid var(--azul-borde)' }}>
        <p className="rotulo">Tema 2 de 6 · Espacio de Búsqueda y Grafos</p>
        <h2 style={{ margin: '4px 0 10px' }}>Tema 2: ¿Qué es el Espacio de Búsqueda y qué es un Grafo?</h2>

        {/* 2A. TEORÍA DEL TEMA 2 */}
        <div style={{ padding: 14, borderRadius: 8, background: 'var(--fondo-2)', marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
          <strong>¿Qué es el Espacio de Búsqueda? (Definición de clase):</strong>
          <br />
          Una vez que en el Tema 1 definimos las reglas (acciones y restricciones), el <strong>Espacio de Búsqueda</strong> son
          <strong> todas las posibilidades y caminos posibles</strong> que existen para movernos entre estados. En el Tema 2
          todavía no buscamos cuál es el mejor camino: primero representamos todo ese universo de posibilidades mediante un{' '}
          <strong>Grafo</strong> («un diagrama en el que pasamos de estado en estado»).
        </div>

        {/* 2B. CADA CONCEPTO DEL GRAFO POR SEPARADO */}
        <h3 style={{ margin: '0 0 10px', fontSize: 16 }}>
          Primero: Cada parte del Grafo explicada por separado
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>1. Nodo vs Estado</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Como dictó el profesor: <strong>«Nodo = lugar, Estado = información»</strong>. El <strong>Estado</strong> son los datos de la situación actual, y el <strong>Nodo</strong> es el círculo o punto en el dibujo del grafo que representa a ese estado.
            </p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>2. Aristas (Conexiones / Transiciones)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Son las líneas o flechas que unen un nodo con otro. Cada arista representa una <strong>Acción válida</strong>. Si puedes ir y regresar (como un pasillo) es un <strong>grafo no dirigido</strong>; si la acción solo va en un sentido con flecha es un <strong>grafo dirigido</strong>.
            </p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>3. Secuencia o Trayectoria</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Para ir de un nodo a otro seguimos una <strong>trayectoria</strong>. Lo que en el Tema 1 se llamaba <em>Solución</em> (los pasos para llegar a la meta), dentro del grafo del Tema 2 se llama <strong>Secuencia</strong>.
            </p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>4. Efecto de las Restricciones en el Grafo</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Si un lugar completo se clausura (ej. se inunda el Laboratorio), ese nodo pierde todas sus aristas y queda como <strong>nodo aislado</strong> en el mapa. Si solo se cierra una puerta entre A y B, ambos lugares siguen abiertos pero sin la línea directa entre ellos.
            </p>
          </div>
        </div>

        {/* 2C. COMPARACIÓN TEMA 1 VS TEMA 2 */}
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          Segundo: Comparación entre Definir el Problema (Tema 1) y Espacio de Búsqueda (Tema 2)
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Tema 1: Definir el Problema</th>
                <th>Tema 2: Espacio de Búsqueda</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>¿Qué hace cada uno?</strong></td>
                <td>Establece las <strong>reglas del juego</strong>: dónde empieza, qué acciones existen, qué está prohibido y cuál es la meta.</td>
                <td>Despliega el <strong>mapa completo (Grafo)</strong> con absolutamente todos los estados y caminos posibles que generan esas reglas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TEMA 3: BÚSQUEDA CIEGA (PRIMERO BFS, LUEGO DFS, LUEGO JUNTOS)      */}
      {/* ================================================================== */}
      <section id="guia-t3" className="tarjeta" style={{ margin: 0, borderLeft: '5px solid var(--azul-borde)' }}>
        <p className="rotulo">Tema 3 de 6 · Búsqueda Ciega o No Informada (BFS y DFS)</p>
        <h2 style={{ margin: '4px 0 10px' }}>
          Tema 3: Búsqueda Ciega — Primero BFS por separado, luego DFS por separado, y luego su comparación
        </h2>

        {/* 3A. QUÉ ES LA BÚSQUEDA CIEGA */}
        <div style={{ padding: 14, borderRadius: 8, background: 'var(--fondo-2)', marginBottom: 18, fontSize: 14, lineHeight: 1.6 }}>
          <strong>¿Qué es la Búsqueda Ciega o No Informada y por qué se llama así?</strong>
          <br />
          Como explicó el profesor: <em>«Nosotros no le vamos a dar información de absolutamente nada; tenemos el inicio, tenemos la meta y busca en base a nuestras restricciones, sin contemplar cuál es el más costoso o el más barato»</em>.
          Es decir, el algoritmo <strong>NO tiene pistas de hacia dónde queda la meta (no tiene heurística $h$) ni sabe cuánto cuesta cada tramo (no usa pesos $g$)</strong>.
          Además, tanto BFS como DFS usan una lista de <strong>nodos visitados</strong> para no repetir estados y no quedarse atrapados en un <strong>ciclo infinito</strong>.
        </div>

        {/* 3B. PRIMERO POR SEPARADO: BFS (BÚSQUEDA EN ANCHURA) */}
        <div style={{ padding: 16, borderRadius: 10, background: 'var(--papel)', border: '2px solid var(--azul-borde)', marginBottom: 16 }}>
          <p className="rotulo" style={{ margin: 0 }}>Algoritmo 1 del Tema 3 (Por separado)</p>
          <h3 style={{ margin: '4px 0 8px', fontSize: 17 }}>
            A) BFS · Búsqueda en Anchura (Breadth-First Search)
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65 }}>
            <li>
              <strong>¿Qué es BFS?:</strong> Es un algoritmo de búsqueda ciega que explora el grafo <strong>por niveles o pisos completos</strong> (como cuando tiras una piedra al agua y la onda se expande parejo hacia todos lados).
            </li>
            <li>
              <strong>¿Qué usa para determinar qué nodo seguir?:</strong> Usa una <strong>Cola FIFO</strong> (<em>First In, First Out</em>: <strong>el primero que entra a la fila es el primero que sale</strong>).
            </li>
            <li>
              <strong>¿Cómo se mueve paso a paso?:</strong>
              <br />1° Revisa el nodo <strong>Inicio (Nivel 0)</strong> y forma en la fila a todos sus vecinos directos.
              <br />2° Revisa <strong>TODOS los nodos a 1 paso de distancia (Nivel 1)</strong> de izquierda a derecha, formando al final de la fila a los hijos de cada uno.
              <br />3° Solo cuando ya terminó de revisar todo el Nivel 1 completo, pasa a revisar <strong>TODOS los nodos a 2 pasos de distancia (Nivel 2)</strong>, y así sucesivamente hasta tocar la Meta.
            </li>
            <li>
              <strong>¿Para qué sirve y cuándo se usa?:</strong> Se usa cuando todas las acciones valen lo mismo (1 paso) y necesitas <strong>garantizar el camino más corto en número de pasos o movimientos</strong>.
            </li>
            <li>
              <strong>Ventaja y Desventaja:</strong> Su gran ventaja es que <strong>SÍ garantiza encontrar la solución con el menor número de pasos</strong>. Su desventaja es que <strong>ocupa MUCHA MEMORIA</strong> porque tiene que guardar pisos enteros de nodos en la fila al mismo tiempo.
            </li>
          </ul>
        </div>

        {/* 3C. SEGUNDO POR SEPARADO: DFS (BÚSQUEDA EN PROFUNDIDAD) */}
        <div style={{ padding: 16, borderRadius: 10, background: 'var(--papel)', border: '2px solid var(--morado-borde)', marginBottom: 18 }}>
          <p className="rotulo" style={{ margin: 0 }}>Algoritmo 2 del Tema 3 (Por separado)</p>
          <h3 style={{ margin: '4px 0 8px', fontSize: 17 }}>
            B) DFS · Búsqueda en Profundidad (Depth-First Search)
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65 }}>
            <li>
              <strong>¿Qué es DFS?:</strong> Es un algoritmo de búsqueda ciega que, en lugar de ir por pisos, elige un camino y <strong>se clava hasta el fondo de esa sola rama</strong> hasta que ya no puede avanzar más.
            </li>
            <li>
              <strong>¿Qué usa para determinar qué nodo seguir?:</strong> Usa una <strong>Pila LIFO</strong> (<em>Last In, First Out</em>: <strong>el último nodo en entrar es el primero en salir</strong>, como una pila de platos).
            </li>
            <li>
              <strong>¿Cómo se mueve paso a paso?:</strong>
              <br />1° Desde el Inicio, toma el <strong>primer vecino</strong> disponible y deja a los demás hermanos esperando.
              <br />2° Desde ese vecino, vuelve a tomar a su <strong>primer hijo</strong> y sigue hundiéndose hacia abajo por esa misma rama.
              <br />3° Si llega a un callejón sin salida (un nodo sin vecinos nuevos), aplica <strong>retroceso (backtracking)</strong>: regresa un paso atrás al último cruce donde le quedaban opciones pendientes y baja por la siguiente rama.
            </li>
            <li>
              <strong>¿Para qué sirve y cuándo se usa?:</strong> Se usa cuando quieres explorar ramas completas hasta el fondo (como recorrer un laberinto profundo) o cuando tienes <strong>muy poca memoria</strong> disponible.
            </li>
            <li>
              <strong>Ventaja y Desventaja:</strong> Su ventaja es que <strong>gasta MUY POCA MEMORIA</strong> (solo guarda los nodos de la rama actual). Su gran desventaja es que <strong>NO garantiza el camino más corto</strong>: si la primera rama de la lista da una vuelta de 20 pasos y la segunda rama llegaba en 1 paso, DFS se va por la de 20 pasos. Además, <strong>si cambias el orden de los vecinos en el grafo, el camino de DFS cambia por completo</strong>.
            </li>
          </ul>
        </div>

        {/* 3D. AHORA SÍ JUNTOS: COMPARACIÓN DIRECTA BFS VS DFS + VISUALIZADOR */}
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          C) Ahora juntos: Tabla comparativa BFS vs DFS
        </h3>
        <div style={{ overflowX: 'auto', marginBottom: 14 }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Pregunta de examen</th>
                <th>BFS (Búsqueda en Anchura)</th>
                <th>DFS (Búsqueda en Profundidad)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>¿Cómo avanza sobre el grafo?</strong></td>
                <td>Avanza <strong>piso por piso (por niveles)</strong>: primero todos los hermanos de un nivel antes de bajar a los hijos.</td>
                <td>Avanza <strong>rama por rama hasta el fondo</strong>: baja del padre al hijo y al nieto antes de mirar a los hermanos.</td>
              </tr>
              <tr>
                <td><strong>¿Qué estructura usa?</strong></td>
                <td><strong>Cola FIFO</strong> (Primero en entrar, primero en salir).</td>
                <td><strong>Pila LIFO</strong> (Último en entrar, primero en salir).</td>
              </tr>
              <tr>
                <td><strong>¿Garantiza el menor número de pasos?</strong></td>
                <td><strong>SÍ</strong> (siempre da la ruta con menos pasos).</td>
                <td><strong>NO</strong> (puede dar un camino mucho más largo).</td>
              </tr>
              <tr>
                <td><strong>¿Qué ocupa más memoria?</strong></td>
                <td><strong>Mucha memoria</strong>.</td>
                <td><strong>Poca memoria</strong>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: '14px 0 4px', fontSize: 16 }}>
          D) Representación gráfica interactiva: Mira cómo se mueve BFS vs cómo se mueve DFS en un grafo escrito
        </h3>
        <VisualizadorMovimientoBFSvsDFS />
      </section>

      {/* ================================================================== */}
      {/* TEMA 4: BÚSQUEDA HEURÍSTICA (PRIMERO CONCEPTOS g,h, LUEGO GREEDY,  */}
      {/* LUEGO A*, LUEGO JUNTOS COMPARADOS)                                 */}
      {/* ================================================================== */}
      <section id="guia-t4" className="tarjeta" style={{ margin: 0, borderLeft: '5px solid var(--morado-borde)' }}>
        <p className="rotulo">Tema 4 de 6 · Búsqueda Heurística o Informada (Greedy y A*)</p>
        <h2 style={{ margin: '4px 0 10px' }}>
          Tema 4: Búsqueda Heurística — Qué son g(n) y h(n), primero Greedy por separado, luego A* por separado y luego su comparación
        </h2>

        {/* 4A. QUÉ ES LA BÚSQUEDA HEURÍSTICA Y QUÉ SON g(n), h(n), f(n) */}
        <div style={{ padding: 14, borderRadius: 8, background: 'var(--fondo-2)', marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
          <strong>¿Qué es la Búsqueda Heurística o Informada? (Ejemplo de los 2 restaurantes de clase):</strong>
          <br />
          El profesor puso el ejemplo de llegar a una calle con dos restaurantes: uno lleno y otro vacío. Sin revisar todo el
          menú, decides entrar a uno en caliente por una <strong>«corazonada» o pista</strong>. En IA, esa pista se llama{' '}
          <strong>Heurística</strong>: es darle información adicional al algoritmo para que sepa qué tan cerca parece estar
          de la meta en vez de buscar a ciegas.
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: 16 }}>
          Primero: Qué significan exactamente g(n), h(n) y f(n)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginBottom: 18 }}>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong style={{ color: '#1d4ed8' }}>1. ¿Qué es g(n)? (El Costo Real Acumulado)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Es lo que <strong>YA te costó en la realidad</strong> ir desde el nodo Inicio hasta el nodo actual <em>n</em>.
              Se calcula sumando los pesos de las flechas por las que ya pasaste (kilómetros reales, minutos reales, dinero). En el nodo Inicio siempre vale <code>g(Inicio) = 0</code>.
            </p>
          </div>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong style={{ color: '#7c3aed' }}>2. ¿Qué es h(n)? (La Heurística / Estimación)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Es la <strong>estimación o «corazonada»</strong> de cuánto crees que <strong>FALTA por recorrer</strong> desde el nodo actual <em>n</em> hasta llegar a la Meta (por ejemplo, la distancia en línea recta). En la Meta siempre debe valer <strong><code>h(Meta) = 0</code></strong>.
            </p>
          </div>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong style={{ color: '#15803d' }}>3. ¿Qué es f(n)? (El Valor de Decisión)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Es el número final que usa el algoritmo dentro de su <strong>Cola de Prioridad</strong> para decidir qué nodo seguir: entre todos los nodos disponibles, <strong>siempre elige seguir al que tenga el MENOR valor de f(n)</strong>.
            </p>
          </div>
        </div>

        {/* 4B. PRIMERO POR SEPARADO: GREEDY BEST-FIRST SEARCH */}
        <div style={{ padding: 16, borderRadius: 10, background: 'var(--papel)', border: '2px solid var(--azul-borde)', marginBottom: 16 }}>
          <p className="rotulo" style={{ margin: 0 }}>Algoritmo 1 del Tema 4 (Por separado)</p>
          <h3 style={{ margin: '4px 0 8px', fontSize: 17 }}>
            A) Greedy Best-First Search (Búsqueda Voraz / Heurística pura)
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65 }}>
            <li>
              <strong>¿Qué es Greedy?:</strong> Es un algoritmo de búsqueda informada «voraz» que quiere acercarse a la meta lo más rápido posible guiándose <strong>100% por la corazonada</strong>.
            </li>
            <li>
              <strong>¿Qué usa Greedy para determinar qué nodo seguir?:</strong> Usa <strong>ÚNICAMENTE el valor de la heurística h(n)</strong>. Su fórmula es:
              <br />
              <strong style={{ fontSize: 15 }}><code>f(n) = h(n)</code></strong>
            </li>
            <li>
              <strong>¿Qué datos necesita y qué ignora?:</strong> Necesita el grafo y la tabla de heurísticas <code>h(n)</code>. <strong>Ignora por completo los pesos o costos reales g(n)</strong> de las aristas (aunque el grafo tenga pesos en las flechas, Greedy no los voltea a ver).
            </li>
            <li>
              <strong>¿Cómo se mueve paso a paso?:</strong> Estando en un nodo, mira cuánto vale <code>h(n)</code> en cada uno de sus vecinos y se mueve inmediatamente al vecino que tenga el <strong>número h(n) más pequeño</strong> (el que «parece» estar más cerca de la meta).
            </li>
            <li>
              <strong>Ventaja y Desventaja (La trampa de Greedy):</strong> Su ventaja es que decide muy rápido y explora muy pocos nodos. Su gran desventaja es que <strong>NO garantiza el camino más barato</strong>: si un vecino tiene una heurística tentadora muy baja (ej. <code>h = 1</code>) pero pasar por ahí cuesta <code>15 horas</code> de tráfico real, Greedy se mete ahí sin darse cuenta del costo.
            </li>
          </ul>
        </div>

        {/* 4C. SEGUNDO POR SEPARADO: ALGORITMO A* (A ESTRELLA) */}
        <div style={{ padding: 16, borderRadius: 10, background: 'var(--papel)', border: '2px solid var(--morado-borde)', marginBottom: 18 }}>
          <p className="rotulo" style={{ margin: 0 }}>Algoritmo 2 del Tema 4 (Por separado)</p>
          <h3 style={{ margin: '4px 0 8px', fontSize: 17 }}>
            B) Algoritmo A* (A Estrella)
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65 }}>
            <li>
              <strong>¿Qué es A* (Estrella)?:</strong> Es el algoritmo de búsqueda informada óptimo porque <strong>une las dos cosas</strong>: toma en cuenta cuánto nos ha costado realmente el camino recorrido hasta ahora y también cuánto estimamos que falta para llegar.
            </li>
            <li>
              <strong>¿Qué usa A* para determinar qué nodo seguir?:</strong> Usa la <strong>SUMA del costo real acumulado g(n) MÁS la heurística h(n)</strong>. Su fórmula es:
              <br />
              <strong style={{ fontSize: 15 }}><code>f(n) = g(n) + h(n)</code></strong>
            </li>
            <li>
              <strong>¿Qué datos necesita?:</strong> Necesita obligatoriamente <strong>ambos datos</strong>: los pesos o costos reales de cada tramo <code>g(n)</code> y la tabla de heurísticas <code>h(n)</code>.
            </li>
            <li>
              <strong>¿Cómo se mueve y cómo calcula paso a paso?:</strong>
              <br />1° Para cada vecino calcula cuánto cuesta llegar hasta él desde el Inicio (eso es <code>g(n)</code>).
              <br />2° A ese costo le suma la heurística de ese vecino <code>h(n)</code> para obtener <code>f(n) = g(n) + h(n)</code>.
              <br />3° Elige siempre abrir el nodo que tenga la <strong>menor suma f(n)</strong>.
              <br />4° Si empieza a ir por un camino porque al principio parecía barato, pero en el siguiente paso su costo real <code>g(n)</code> sube mucho, A* <strong>deja ese camino en espera</strong> y se regresa a tomar otra ruta cuya suma <code>g(n) + h(n)</code> sea menor.
            </li>
            <li>
              <strong>Ventaja y Desventaja:</strong> Su gran ventaja es que <strong>SÍ garantiza encontrar el camino de menor costo total real</strong> (nunca cae en las trampas de Greedy). Su única desventaja frente a Greedy es que tiene que hacer más sumas y guardar más opciones abiertas en su cola de prioridad.
            </li>
          </ul>
        </div>

        {/* 4D. AHORA JUNTOS: COMPARACIÓN GREEDY VS A* + VISUALIZADOR */}
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          C) Ahora juntos: Tabla comparativa Greedy vs A* (Estrella)
        </h3>
        <div style={{ overflowX: 'auto', marginBottom: 14 }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Pregunta de examen</th>
                <th>Greedy Best-First (Voraz)</th>
                <th>A* (A Estrella)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>¿Qué determina qué nodo seguir?</strong></td>
                <td>Solo la heurística: <strong><code>f(n) = h(n)</code></strong>.</td>
                <td>La suma de peso acumulado + heurística: <strong><code>f(n) = g(n) + h(n)</code></strong>.</td>
              </tr>
              <tr>
                <td><strong>¿Toma en cuenta el peso real de las aristas g(n)?</strong></td>
                <td><strong>NO</strong> (lo ignora por completo).</td>
                <td><strong>SÍ</strong> (suma todo lo que va costando el camino desde el inicio).</td>
              </tr>
              <tr>
                <td><strong>¿Garantiza el camino más barato?</strong></td>
                <td><strong>NO</strong> (se deja engañar por atajos aparentes con <code>h</code> pequeña).</td>
                <td><strong>SÍ</strong> (encuentra siempre el camino de menor costo total).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: '14px 0 4px', fontSize: 16 }}>
          D) Representación gráfica interactiva: Mira cómo decide Greedy vs cómo decide A* en el mismo grafo
        </h3>
        <VisualizadorGreedyVsAEstrella />
      </section>

      {/* ================================================================== */}
      {/* TEMA 5: BÚSQUEDA LOCAL (CONCEPTOS, LUEGO HILL CLIMBING, LUEGO      */}
      {/* SIMULATED ANNEALING, LUEGO JUNTOS COMPARADOS)                      */}
      {/* ================================================================== */}
      <section id="guia-t5" className="tarjeta" style={{ margin: 0, borderLeft: '5px solid var(--morado-borde)' }}>
        <p className="rotulo">Tema 5 de 6 · Búsqueda Local (Hill Climbing y Simulated Annealing)</p>
        <h2 style={{ margin: '4px 0 10px' }}>
          Tema 5: Búsqueda Local — Qué son Óptimos Locales y Globales, primero Hill Climbing, luego Simulated Annealing y luego su comparación
        </h2>

        {/* 5A. QUÉ ES LA BÚSQUEDA LOCAL Y QUÉ SON ÓPTIMO LOCAL VS GLOBAL */}
        <div style={{ padding: 14, borderRadius: 8, background: 'var(--fondo-2)', marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
          <strong>¿Qué es la Búsqueda Local? (Ejemplo de Google Maps de clase):</strong>
          <br />
          Como explicó el profesor: <em>«Yo le doy una posible solución; ¿por qué como en Maps? Porque ya tenemos una solución y si cambiamos de trayectoria la actualiza alrededor de una que ya teníamos: está buscando la mejor solución a partir de una que ya teníamos»</em>.
          A diferencia de BFS o A* (que arman un camino desde cero), la Búsqueda Local <strong>empieza con 1 solución completa ya hecha</strong> y trata de mejorarla haciendo pequeños ajustes (mirando a sus <strong>vecinos</strong>).
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: 16 }}>
          Primero: Conceptos clave del Tema 5 (Óptimo Local vs Óptimo Global)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginBottom: 18 }}>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>1. Solución Inicial (x0) y Vecinos</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              La <strong>solución inicial</strong> es el punto donde arranca el algoritmo. Sus <strong>vecinos</strong> son las soluciones que obtienes haciéndole un cambio pequeñito (ej. moverte a <code>x - 1</code> o <code>x + 1</code>, o intercambiar dos días de un horario).
            </p>
          </div>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong style={{ color: '#dc2626' }}>2. ¿Qué es un Óptimo Local (Máximo o Mínimo Local)?</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Es la punta de un <strong>cerro pequeño</strong>: una solución que es mejor que todos sus vecinos inmediatos de al lado, pero <strong>NO es la mejor de todo el mapa</strong>. Es una trampa donde se quedan atorados los algoritmos simples.
            </p>
          </div>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong style={{ color: '#15803d' }}>3. ¿Qué es el Óptimo Global (Máximo o Mínimo Global)?</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55 }}>
              Es la <strong>mejor solución absoluta de todo el espacio de búsqueda</strong> (la montaña más alta de todo el terreno si maximizas, o el costo más bajo posible si minimizas).
            </p>
          </div>
        </div>

        {/* 5B. PRIMERO POR SEPARADO: HILL CLIMBING */}
        <div style={{ padding: 16, borderRadius: 10, background: 'var(--papel)', border: '2px solid var(--azul-borde)', marginBottom: 16 }}>
          <p className="rotulo" style={{ margin: 0 }}>Algoritmo 1 del Tema 5 (Por separado)</p>
          <h3 style={{ margin: '4px 0 8px', fontSize: 17 }}>
            A) Hill Climbing (Ascenso de Colinas / Búsqueda Local Simple)
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65 }}>
            <li>
              <strong>¿Qué es Hill Climbing?:</strong> Es un algoritmo de búsqueda local que funciona como un escalador en la niebla que solo da un paso si ese paso lo lleva <strong>hacia arriba</strong> (a una solución mejor).
            </li>
            <li>
              <strong>¿Cómo calcula y cómo se mueve paso a paso?:</strong>
              <br />1° Evalúa cuánto vale la solución <strong>actual</strong>.
              <br />2° Revisa cuánto valen sus <strong>vecinos inmediatos</strong> (por ejemplo, a la izquierda y a la derecha).
              <br />3° Si alguno de los vecinos es <strong>estrictamente mejor</strong> que el actual, se mueve al mejor vecino y repite.
              <br />4° Si <strong>ningún vecino es mejor</strong> que el punto donde está parado (porque a ambos lados la altura baja), <strong>se detiene inmediatamente</strong> y devuelve ese punto como resultado.
            </li>
            <li>
              <strong>¿Por qué se atora en los Óptimos Locales?:</strong> Porque <strong>jamás acepta dar un paso hacia un vecino peor</strong>. En cuanto sube a un cerrito pequeño (óptimo local), como para ir a la montaña grande tendría que bajar primero por un valle, se niega a bajar y se queda atrapado ahí.
            </li>
            <li>
              <strong>¿Cómo le afecta el punto de inicio x0?:</strong> Su resultado depende totalmente de dónde empiece (<code>x0</code>): si empieza cerca del cerro pequeño se atora en el cerro pequeño; solo llega al óptimo global si por suerte empezó en las faldas de la montaña más alta.
            </li>
          </ul>
        </div>

        {/* 5C. SEGUNDO POR SEPARADO: SIMULATED ANNEALING */}
        <div style={{ padding: 16, borderRadius: 10, background: 'var(--papel)', border: '2px solid var(--morado-borde)', marginBottom: 18 }}>
          <p className="rotulo" style={{ margin: 0 }}>Algoritmo 2 del Tema 5 (Por separado)</p>
          <h3 style={{ margin: '4px 0 8px', fontSize: 17 }}>
            B) Simulated Annealing (Recocido Simulado)
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65 }}>
            <li>
              <strong>¿Qué es Simulated Annealing?:</strong> Es un algoritmo de búsqueda local probabilístico diseñado específicamente para <strong>NO quedarse atrapado en los óptimos locales</strong>. Se inspira en cómo se enfrían los metales: cuando el metal está muy caliente sus átomos saltan libremente, y conforme se enfría se van acomodando en el punto óptimo.
            </li>
            <li>
              <strong>¿Qué usa para funcionar?:</strong> Además de 1 solución inicial y sus vecinos, utiliza una <strong>Temperatura inicial alta (T)</strong> y un <strong>factor de enfriamiento (α, ej. 0.95)</strong>.
            </li>
            <li>
              <strong>¿Cómo calcula y cómo se mueve paso a paso?:</strong>
              <br />1° En cada paso elige un vecino al azar y calcula el cambio de calidad: <strong><code>Δ = valor(vecino) − valor(actual)</code></strong>.
              <br />2° <strong>Si el vecino es MEJOR (Δ &gt; 0):</strong> lo acepta siempre y se mueve a él.
              <br />3° <strong>Si el vecino es PEOR (Δ &lt; 0):</strong> ¡NO lo descarta de golpe! Calcula la probabilidad <strong><code>P = e^(Δ / T)</code></strong>:
              <br />&nbsp;&nbsp;&nbsp;• Al principio, como la <strong>Temperatura T es alta</strong>, la probabilidad <code>P</code> es grande y el algoritmo <strong>acepta dar pasos hacia abajo (vecinos peores)</strong>, lo que le permite <strong>bajar a los valles y escapar de los óptimos locales</strong>.
              <br />&nbsp;&nbsp;&nbsp;• Al final de cada paso la temperatura se va enfriando: <strong><code>T_nueva = α × T</code></strong>. Cuando <code>T</code> ya es muy fría (cerca de 0), deja de aceptar bajadas y se estabiliza en la cima alta.
              <br />4° Como el punto <code>actual</code> puede bajar temporalmente a un valle, siempre guarda aparte una memoria con la <strong><code>mejor solución histórica</code></strong> que haya visto.
            </li>
          </ul>
        </div>

        {/* 5D. AHORA JUNTOS: COMPARACIÓN HILL CLIMBING VS SIMULATED ANNEALING + GRÁFICO */}
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          C) Ahora juntos: Tabla comparativa Hill Climbing vs Simulated Annealing
        </h3>
        <div style={{ overflowX: 'auto', marginBottom: 14 }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Pregunta de examen</th>
                <th>Hill Climbing (Ascenso de Colinas)</th>
                <th>Simulated Annealing (Recocido Simulado)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>¿Acepta moverse a un vecino peor?</strong></td>
                <td><strong>NUNCA</strong> (solo acepta mejoras estrictas).</td>
                <td><strong>SÍ, al principio</strong> cuando la Temperatura <code>T</code> es alta, con probabilidad <strong><code>P = e^(Δ / T)</code></strong>.</td>
              </tr>
              <tr>
                <td><strong>¿Qué le pasa si hay un Óptimo Local?</strong></td>
                <td><strong>Se queda atrapado</strong> en el óptimo local.</td>
                <td><strong>Escapa del óptimo local</strong> bajando el valle para buscar el Óptimo Global.</td>
              </tr>
              <tr>
                <td><strong>¿Qué pasa si pones Temperatura T casi en 0 en Simulated Annealing?</strong></td>
                <td colSpan={2}>
                  Si la temperatura <code>T</code> es casi 0 desde el inicio (o se enfría de golpe), la probabilidad <code>e^(Δ/T)</code> vale 0 y <strong>Simulated Annealing se comporta exactamente igual que Hill Climbing</strong> (se atora en el óptimo local).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: '14px 0 4px', fontSize: 16 }}>
          D) Representación gráfica interactiva: Mira cómo se mueven en la montaña con Óptimo Local y Global
        </h3>
        <VisualizadorPaisajeOptimos />
      </section>

      {/* ================================================================== */}
      {/* TEMA 6: ALGORITMOS GENÉTICOS (TEORÍA, CADA PARTE POR SEPARADO,     */}
      {/* EFECTO DE CADA PARÁMETRO Y COMPARACIÓN)                            */}
      {/* ================================================================== */}
      <section id="guia-t6" className="tarjeta" style={{ margin: 0, borderLeft: '5px solid var(--morado-borde)' }}>
        <p className="rotulo">Tema 6 de 6 · Algoritmos Genéticos (Evolutivos)</p>
        <h2 style={{ margin: '4px 0 10px' }}>
          Tema 6: Algoritmos Genéticos — Qué son, cada una de sus partes por separado y qué pasa si le mueves a sus valores
        </h2>

        {/* 6A. QUÉ SON LOS ALGORITMOS GENÉTICOS */}
        <div style={{ padding: 14, borderRadius: 8, background: 'var(--fondo-2)', marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
          <strong>¿Qué es un Algoritmo Genético? (Explicación del profesor en clase):</strong>
          <br />
          El profesor comentó que pertenecen a la familia de los <strong>Algoritmos Evolutivos</strong> y se inspiran en la
          evolución biológica (como la humanidad que en 500 años se adapta y sobrevive mejor). A diferencia de la Búsqueda
          Local (donde una sola solución camina sola), en un Algoritmo Genético <strong>proponemos desde el inicio una POBLACIÓN (un conjunto de muchas soluciones candidatas, ej. 10 o 20)</strong>, las calificamos, seleccionamos a las mejores, las cruzamos y las mutamos durante varias generaciones hasta quedarnos con la mejor solución global.
        </div>

        {/* 6B. CADA PARTE Y OPERADOR DEL ALGORITMO GENÉTICO EXPLICADO POR SEPARADO */}
        <h3 style={{ margin: '0 0 10px', fontSize: 16 }}>
          Primero: Cada parte del Algoritmo Genético explicada por separado (en el orden en que ocurren)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>Paso 1 · Individuo (Cromosoma) y Población Inicial</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.6 }}>
              • Un <strong>Individuo (o Cromosoma)</strong> es <strong>una posible solución</strong> al problema (por ejemplo, un valor de <code>x</code> o una ruta completa).
              <br />• La <strong>Población Inicial</strong> es el conjunto de <em>N</em> individuos generados al azar al arrancar el algoritmo (ej. proponer 20 soluciones iniciales repartidas por todo el mapa).
            </p>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>Paso 2 · Evaluación con la Función Fitness (Aptitud) y Ordenamiento</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.6 }}>
              • La <strong>Función Fitness (Aptitud)</strong> evalúa a cada individuo y le da una calificación numérica para saber qué tan buena solución es.
              <br />• Con esa calificación, el algoritmo <strong>ordena a toda la población de la mejor a la peor</strong>.
            </p>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>Paso 3 · El Elitismo (Proteger a los mejores)</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.6 }}>
              • <strong>¿Qué es el Elitismo?:</strong> Consiste en copiar intactos al mejor individuo (o a los 2 mejores) directamente a la siguiente generación sin cruzarlos ni mutarlos.
              <br />• <strong>¿Para qué sirve?:</strong> Sirve como seguro para que la mejor solución encontrada hasta ese momento <strong>jamás se pierda por accidente</strong>.
            </p>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>Paso 4 · Selección de Padres (Los 4 métodos explicados uno por uno)</strong>
            <p style={{ margin: '6px 0 8px', fontSize: 13.5, lineHeight: 1.6 }}>
              Después de evaluar, hay que elegir quiénes se van a reproducir. Existen <strong>4 métodos de selección</strong>:
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.6 }}>
              <li>
                <strong>1) Selección por Truncamiento:</strong> Ordenas la población de la mejor a la peor y simplemente haces un corte quedándote con los primeros (ej. si propusiste 20 te quedas con los 5 mejores y descartas a los otros 15). <em>Hace que converja muy rápido, pero mata la diversidad muy pronto.</em>
              </li>
              <li>
                <strong>2) Selección por Torneo:</strong> Escoges al azar un grupito pequeño de <em>k</em> individuos (ej. 3 candidatos) y los pones a competir entre ellos: el que tenga mejor fitness de esos 3 gana y se vuelve padre. <em>Es el más equilibrado; si subes el tamaño del torneo k se vuelve más estricto, y si bajas k conserva más diversidad.</em>
              </li>
              <li>
                <strong>3) Selección por Ruleta:</strong> A cada individuo se le asigna una rebanada de una ruleta proporcional a su fitness (los mejores tienen rebanada grande, pero hasta los peores tienen una rebanadita pequeña y pueden salir sorteados). <em>Mantiene mucha diversidad, pero si hay un «superindividuo» con calificación enorme, acapara casi toda la ruleta.</em>
              </li>
              <li>
                <strong>4) Selección por Ranking:</strong> Ordena a los individuos del peor al mejor y les asigna probabilidad según su puesto en la fila (1°, 2°, 3°…) y no por su calificación bruta. <em>Sirve para evitar que un solo superindividuo acapare el 99% de los hijos desde el inicio.</em>
              </li>
            </ul>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>Paso 5 · El Cruzamiento (Cruza / Crossover) y sus 5 Métodos vistos en clase</strong>
            <p style={{ margin: '6px 0 8px', fontSize: 13.5, lineHeight: 1.6 }}>
              • <strong>¿Qué es y para qué sirve?:</strong> Es tomar dos padres seleccionados (<code>Padre 1</code> y <code>Padre 2</code>) y combinar sus partes para crear un <strong>Hijo</strong> nuevo, juntando las buenas características de ambos. En clase (apunte del 3/11) el profesor dictó <strong>5 métodos de cruzamiento</strong> según cómo esté representada la solución:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Método de Cruzamiento</th>
                    <th>Representación usual</th>
                    <th>Idea / ¿Cómo funciona? (Apunte de clase)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1</strong></td>
                    <td><strong>De 1 punto</strong></td>
                    <td><strong>Bits (binario)</strong></td>
                    <td>Se marca <strong>1 punto de corte (frontera)</strong> en los bits y se cruzan las mitades: el hijo toma la primera parte del Padre 1 y la segunda parte del Padre 2 (ej. <code>101|0</code> con <code>010|1</code> → <code>1011</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>2</strong></td>
                    <td><strong>De 2 puntos</strong></td>
                    <td><strong>Bits (binario)</strong></td>
                    <td>Se marcan <strong>2 cortes</strong> y se <strong>intercambia un bloque intermedio</strong> de bits de un padre con el del otro (ej. en 16 bits intercambiar bloques de 2 en 2 o de 4 en 4).</td>
                  </tr>
                  <tr>
                    <td><strong>3</strong></td>
                    <td><strong>Uniforme</strong></td>
                    <td><strong>Bits o Vectores</strong></td>
                    <td>No corta por bloques, sino que recorre posición por posición y en cada posición elige al azar si hereda el valor del Padre 1 o del Padre 2 (intercambiar todo mezclando gen por gen).</td>
                  </tr>
                  <tr>
                    <td><strong>4</strong></td>
                    <td><strong>Aritmético (Ponderación)</strong></td>
                    <td><strong>Números reales</strong></td>
                    <td>Se multiplican o promedian los valores numéricos de los padres por un peso para obtener otro <strong>número real intermedio</strong> cuidando que quede dentro del rango permitido (ej. entre 0 y 10).</td>
                  </tr>
                  <tr>
                    <td><strong>5</strong></td>
                    <td><strong>Por rutas (Secuencias)</strong></td>
                    <td><strong>Permutaciones / Grafos</strong></td>
                    <td>Se usa cuando cada individuo es una <strong>secuencia de nodos en un grafo</strong> (una ruta): intercambia tramos de rutas entre dos padres cuidando que el camino siga siendo válido.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '2px solid var(--morado-borde)' }}>
            <strong>Paso 6 · La Mutación y los 5 Métodos de Mutación (para darle diversidad)</strong>
            <p style={{ margin: '6px 0 8px', fontSize: 13.5, lineHeight: 1.6 }}>
              • <strong>¿Qué es y para qué sirve?:</strong> Mientras que el cruzamiento solo combina lo que ya tenían los padres, la <strong>Mutación</strong> aplica un pequeño cambio aleatorio para <strong>meter diversidad nueva</strong> (no casarnos siempre con las mismas partes) y evitar que la población se estanque en un óptimo local. En clase (apunte del 3/11) el profesor dictó exactamente <strong>5 métodos de mutación</strong>:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Método de Mutación</th>
                    <th>Tipo usual</th>
                    <th>Efecto / ¿Qué hace exactamente? (Apunte de clase)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1</strong></td>
                    <td><strong>Cambio de bit (Bit Flip)</strong></td>
                    <td><strong>Binario (Bits)</strong></td>
                    <td>Efecto <strong><code>0 ↔ 1</code></strong>: no cambia de posición, sino que toma un bit y lo invierte (si era <code>0</code> lo pasa a <code>1</code>, y si era <code>1</code> lo pasa a <code>0</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>2</strong></td>
                    <td><strong>Uniforme (Reemplazar un valor)</strong></td>
                    <td><strong>Números reales (o enteros)</strong></td>
                    <td><strong>Reemplazar un valor por completo:</strong> quitas uno o dos valores/soluciones y pones en su lugar un valor nuevo elegido al azar dentro del rango válido (así ya no te casas con las mismas partes de los padres).</td>
                  </tr>
                  <tr>
                    <td><strong>3</strong></td>
                    <td><strong>Gaussiana (Campana de Gauss)</strong></td>
                    <td><strong>Números reales (añadir ruido)</strong></td>
                    <td><strong>Añadir ruido suave:</strong> usando la campana de Gauss (desviación estándar <code>±σ</code>), le sumas o le restas un número pequeño a una solución para moverla tantito alrededor de donde estaba.</td>
                  </tr>
                  <tr>
                    <td><strong>4</strong></td>
                    <td><strong>Swap (Intercambio de posiciones)</strong></td>
                    <td><strong>Permutación (secuencias / rutas)</strong></td>
                    <td><strong>Intercambio de 2 posiciones:</strong> escoges dos lugares dentro de una secuencia o ruta y los cambias de lugar entre sí (ej. <code>[A, B, C, D]</code> → <code>[A, D, C, B]</code>).</td>
                  </tr>
                  <tr>
                    <td><strong>5</strong></td>
                    <td><strong>Inversión (por segmento)</strong></td>
                    <td><strong>Permutación (secuencias / rutas)</strong></td>
                    <td><strong>Invertir un segmento:</strong> tomas un bloque o tramo de la secuencia y lo volteas al revés (ej. invertir el tramo <code>B-C-D</code> en <code>[A, B, C, D, E]</code> → <code>[A, D, C, B, E]</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--papel)', border: '1px solid var(--linea)' }}>
            <strong>Paso 7 · Nueva Población y Generaciones</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.6 }}>
              • Los hijos nacidos (más la élite) forman la <strong>Población Nueva</strong> y se vuelve a repetir todo el ciclo desde la evaluación.
              <br />• ¿Cuántas veces se repite? El número de <strong>Generaciones</strong> que nosotros definamos como parámetro.
              <br />• <strong>Cómo se calcula cuántas evaluaciones hace en total:</strong> Multiplica <strong><code>Población × (Generaciones + 1)</code></strong> (porque evalúa la población inicial + cada generación).
            </p>
          </div>
        </div>

        {/* 6C. QUÉ PASA SI LE MUEVES A CADA COSA EN EL ALGORITMO GENÉTICO */}
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
          Segundo: Tabla de Interpretación — «¿Qué pasa si le mueves a tal cosa en el Algoritmo Genético?»
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>¿A qué le mueves?</th>
                <th>¿Qué pasa si lo ACTIVAS o pones MUCHO?</th>
                <th>¿Qué pasa si lo QUITAS o pones POCO?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mover el Elitismo</strong></td>
                <td><strong>Con Elitismo activado:</strong> El mejor individuo pasa intacto a la siguiente generación; el mejor fitness <strong>nunca cae</strong>.</td>
                <td><strong>Sin Elitismo (en 0):</strong> El mejor individuo puede destruirse al cruzar o mutar; la calidad <strong>retrocede</strong> y la gráfica sube y baja.</td>
              </tr>
              <tr>
                <td><strong>Mover el Método de Selección</strong></td>
                <td><strong>Con Truncamiento o Torneo grande:</strong> Mucha presión hacia los mejores → <strong>converge muy rápido, pero pierde diversidad pronto</strong> (riesgo de atorarse en óptimo local).</td>
                <td><strong>Con Ruleta o Torneo chico:</strong> Da oportunidad a individuos regulares → <strong>mantiene más diversidad</strong> durante más generaciones y explora mejor.</td>
              </tr>
              <tr>
                <td><strong>Mover el Tamaño de la Población</strong><br /><small>(Mucha vs Poca población)</small></td>
                <td><strong>Con MUCHA población:</strong> Tienes mucha diversidad y exploras todo el mapa a la vez (más seguro hallar el óptimo global), pero <strong>consume muchos recursos y es más lento</strong>.</td>
                <td><strong>Con POCA población:</strong> Consume pocos recursos y es muy rápido, pero hay <strong>poca diversidad</strong> y se estanca fácil en un óptimo local.</td>
              </tr>
              <tr>
                <td><strong>Mover las Generaciones</strong><br /><small>(Muchas vs Pocas generaciones)</small></td>
                <td><strong>Con MUCHAS generaciones:</strong> Da tiempo de converger. Si la gráfica ya se ve como una <strong>línea plana horizontal</strong>, significa que <strong>ya convergió</strong> y poner más generaciones solo desperdicia cómputo.</td>
                <td><strong>Con POCAS generaciones:</strong> Cortas el algoritmo antes de que termine de evolucionar y te quedas con una solución inmadura.</td>
              </tr>
              <tr>
                <td><strong>Mover la Mutación</strong></td>
                <td><strong>Con Mutación MUY ALTA (ej. 90%):</strong> Destruyes las buenas soluciones de los padres y el algoritmo se vuelve <strong>puro azar que no converge</strong>.</td>
                <td><strong>Con Mutación en CERO (0%):</strong> No entran rasgos nuevos, todos se vuelven clones y se queda <strong>estancado</strong>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECCIÓN 7: COMPARACIÓN GENERAL DE LOS 7 ALGORITMOS JUNTOS          */}
      {/* ================================================================== */}
      <section id="guia-comparar" className="tarjeta" style={{ margin: 0, border: '2px solid var(--azul-borde)' }}>
        <p className="rotulo">Sección 7 · Ahora sí: Todos los algoritmos comparados juntos</p>
        <h2 style={{ margin: '4px 0 8px' }}>
          Comparación Final de los 7 Algoritmos: ¿Qué usa cada uno, cuándo elegirlo y qué gasta más?
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Algoritmo</th>
                <th>Tema</th>
                <th>¿Qué datos necesita?</th>
                <th>¿Qué determina qué nodo o paso seguir?</th>
                <th>¿Garantiza la mejor solución?</th>
                <th>¿Qué consume más y cuándo usarlo?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. BFS (Anchura)</strong></td>
                <td>Tema 3 (Ciega)</td>
                <td>Solo el grafo (sin pesos ni heurística)</td>
                <td><strong>Cola FIFO</strong>: avanza piso por piso (niveles)</td>
                <td><strong>SÍ</strong> (en menor número de pasos)</td>
                <td>Consume <strong>mucha memoria</strong>. Úsalo para hallar el camino con <strong>menos pasos</strong> sin pesos.</td>
              </tr>
              <tr>
                <td><strong>2. DFS (Profundidad)</strong></td>
                <td>Tema 3 (Ciega)</td>
                <td>Solo el grafo (sin pesos ni heurística)</td>
                <td><strong>Pila LIFO</strong>: se clava hasta el fondo de 1 sola rama</td>
                <td><strong>NO</strong> (depende del orden de los vecinos)</td>
                <td>Consume <strong>poca memoria</strong>. Úsalo para explorar ramas hasta el fondo haciendo <em>backtracking</em>.</td>
              </tr>
              <tr>
                <td><strong>3. Greedy (Voraz)</strong></td>
                <td>Tema 4 (Heurística)</td>
                <td>Grafo + <strong>SOLO Heurística h(n)</strong></td>
                <td>Fórmula <strong><code>f(n) = h(n)</code></strong> (elige el menor <code>h</code> e ignora pesos)</td>
                <td><strong>NO</strong> (cae en trampas si <code>h</code> es baja pero el tramo real es caro)</td>
                <td>Es <strong>muy rápido</strong>. Úsalo cuando solo tengas la corazonada <code>h(n)</code> hacia la meta.</td>
              </tr>
              <tr>
                <td><strong>4. A* (Estrella)</strong></td>
                <td>Tema 4 (Heurística)</td>
                <td>Grafo + <strong>Peso real g(n) + Heurística h(n)</strong></td>
                <td>Fórmula <strong><code>f(n) = g(n) + h(n)</code></strong> (elige la menor suma)</td>
                <td><strong>SÍ</strong> (garantiza el camino de menor costo total real)</td>
                <td>Más memoria que Greedy. Úsalo siempre que tengas <strong>costos reales + heurística</strong>.</td>
              </tr>
              <tr>
                <td><strong>5. Hill Climbing</strong></td>
                <td>Tema 5 (Local)</td>
                <td><strong>1 solución inicial</strong> + vecinos</td>
                <td>Solo se mueve si un vecino inmediato es <strong>estrictamente mejor</strong></td>
                <td><strong>NO</strong> (se queda atrapado en <strong>Óptimos Locales</strong>)</td>
                <td><strong>Ultrarrápido y casi 0 memoria</strong>. Úsalo para ajustar rápido 1 solución sin trampas locales.</td>
              </tr>
              <tr>
                <td><strong>6. Simulated Annealing</strong></td>
                <td>Tema 5 (Local)</td>
                <td><strong>1 solución inicial</strong> + vecinos + <strong>Temperatura T</strong></td>
                <td>Mejoras siempre; empeoramientos con <strong><code>P = e^(Δ / T)</code></strong></td>
                <td><strong>Escapa de óptimos locales</strong> bajando valles al inicio</td>
                <td>Más pasos mientras enfría <code>T</code>. Úsalo cuando partes de 1 solución y hay <strong>trampas locales</strong>.</td>
              </tr>
              <tr>
                <td><strong>7. Algoritmo Genético</strong></td>
                <td>Tema 6 (Evolutivo)</td>
                <td><strong>Población de N soluciones</strong> + Fitness</td>
                <td><strong>Selección + Cruza + Mutación + Elitismo</strong> por generaciones</td>
                <td><strong>El mejor para buscar el Óptimo Global</strong> en mapas complejos</td>
                <td><strong>El que consume MÁS recursos</strong> (<code>Pob × Gen</code>). Úsalo para explorar todo el mapa con un grupo de soluciones.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
