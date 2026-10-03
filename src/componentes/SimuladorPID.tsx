import { useMemo, useState } from 'react';
import { DURACION, INICIO_RAFAGA, PRESETS, simular, type Ganancias } from '../logica/pid';
import { Texto } from './Texto';

// Escala fija en los dos ejes, para que al cambiar de preset se vea la
// diferencia real entre uno y otro, no una gráfica que se reacomoda sola.
const ANCHO = 640;
const ALTO = 260;
const M = { izq: 44, der: 14, arr: 14, aba: 34 };
const Y_MIN = 0.9;
const Y_MAX = 1.6;

const x = (t: number) => M.izq + (t / DURACION) * (ANCHO - M.izq - M.der);
const y = (v: number) => M.arr + (1 - (Math.min(Y_MAX, Math.max(Y_MIN, v)) - Y_MIN) / (Y_MAX - Y_MIN)) * (ALTO - M.arr - M.aba);

function camino(t: number[], v: number[]) {
  return t.map((ti, i) => `${i === 0 ? 'M' : 'L'}${x(ti).toFixed(1)},${y(v[i]).toFixed(1)}`).join('');
}

function Control({ id, etiqueta, valor, min, max, paso, alCambiar }: {
  id: string; etiqueta: string; valor: number; min: number; max: number; paso: number; alCambiar: (v: number) => void;
}) {
  return (
    <label htmlFor={id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 44px', gap: 10, alignItems: 'center', fontSize: 13.5 }}>
      <span>{etiqueta}</span>
      <input id={id} type="range" min={min} max={max} step={paso} value={valor} onChange={(e) => alCambiar(Number(e.target.value))} />
      <span style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>{valor.toFixed(2)}</span>
    </label>
  );
}

export function SimuladorPID() {
  const [g, setG] = useState<Ganancias>(PRESETS[3].g);
  const [preset, setPreset] = useState(3);
  const r = useMemo(() => simular(g), [g]);
  const base = useMemo(() => simular(PRESETS[0].g), []);

  const cambiar = (campo: keyof Ganancias) => (v: number) => { setG({ ...g, [campo]: v }); setPreset(-1); };

  return (
    <div className="pregunta" style={{ margin: '0 0 18px' }}>
      <div className="filtros" role="group" aria-label="Configuraciones">
        {PRESETS.map((p, i) => (
          <button key={p.nombre} className="chip" aria-pressed={preset === i} onClick={() => { setG(p.g); setPreset(i); }}>
            {p.nombre}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} width="100%" style={{ minWidth: 460, display: 'block' }}
          role="img" aria-label={`Velocidad del rotor en el tiempo. Desviación máxima ${r.desviacionMaxima.toFixed(2)}.`}>
          {[0.9, 1.0, 1.2, 1.4, 1.6].map((v) => (
            <g key={v}>
              <line x1={M.izq} x2={ANCHO - M.der} y1={y(v)} y2={y(v)} stroke="var(--linea)" strokeWidth={v === 1 ? 0 : 1} />
              <text x={M.izq - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--tinta-3)" fontFamily="var(--mono)">{v.toFixed(1)}</text>
            </g>
          ))}
          {[0, 2, 4, 6, 8, 10, 12].map((t) => (
            <text key={t} x={x(t)} y={ALTO - M.aba + 18} textAnchor="middle" fontSize="11" fill="var(--tinta-3)" fontFamily="var(--mono)">{t} s</text>
          ))}

          <line x1={x(INICIO_RAFAGA)} x2={x(INICIO_RAFAGA)} y1={M.arr} y2={ALTO - M.aba} stroke="var(--examen)" strokeDasharray="4 4" />
          <text x={x(INICIO_RAFAGA) + 6} y={M.arr + 12} fontSize="11.5" fill="var(--examen)" fontWeight="600">llega la ráfaga</text>

          <line x1={M.izq} x2={ANCHO - M.der} y1={y(1)} y2={y(1)} stroke="var(--bien)" strokeWidth={1.5} strokeDasharray="6 3" />
          <text x={ANCHO - M.der - 4} y={y(1) - 6} textAnchor="end" fontSize="11.5" fill="var(--bien)" fontWeight="600">velocidad deseada</text>

          {preset !== 0 && (
            <path d={camino(base.t, base.velocidad)} fill="none" stroke="var(--tinta-3)" strokeWidth={1.5} opacity={0.4} />
          )}
          <path d={camino(r.t, r.velocidad)} fill="none" stroke="var(--acento)" strokeWidth={2.5} strokeLinejoin="round" />
        </svg>
      </div>

      <div className="fila" style={{ gap: 18, margin: '8px 0 14px', fontSize: 13 }}>
        <span><span style={{ display: 'inline-block', width: 16, height: 3, background: 'var(--acento)', verticalAlign: 'middle', marginRight: 6 }} />Velocidad con este control</span>
        {preset !== 0 && <span style={{ color: 'var(--tinta-3)' }}><span style={{ display: 'inline-block', width: 16, height: 2, background: 'var(--tinta-3)', opacity: 0.5, verticalAlign: 'middle', marginRight: 6 }} />Sin control, para comparar</span>}
      </div>

      <div className="marcador" style={{ margin: '0 0 14px' }}>
        <div className="marcador-celda">
          <div className="num">{r.desviacionMaxima.toFixed(3)}</div>
          <div className="que">Lo más que se alejó de la velocidad deseada</div>
        </div>
        <div className="marcador-celda">
          <div className="num" style={{ color: r.errorFinal < 0.01 ? 'var(--bien)' : 'var(--mal)' }}>{r.errorFinal.toFixed(3)}</div>
          <div className="que">Error que queda al final</div>
        </div>
      </div>

      {preset >= 0 && (
        <p className="aviso info" style={{ marginBottom: 14 }}><Texto>{PRESETS[preset].idea}</Texto></p>
      )}

      <div className="pila" style={{ gap: 8 }}>
        <Control id="kp" etiqueta="P · proporcional" valor={g.kp} min={0} max={5} paso={0.1} alCambiar={cambiar('kp')} />
        <Control id="ki" etiqueta="I · integral" valor={g.ki} min={0} max={6} paso={0.1} alCambiar={cambiar('ki')} />
        <Control id="kd" etiqueta="D · derivativo" valor={g.kd} min={0} max={1} paso={0.05} alCambiar={cambiar('kd')} />
        <Control id="ant" etiqueta="Anticipación (s)" valor={g.anticipacion} min={0} max={1} paso={0.05} alCambiar={cambiar('anticipacion')} />
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--tinta-3)', margin: '12px 0 0' }}>
        Simulación simplificada para ver la idea, no un modelo real de aerogenerador.
      </p>
    </div>
  );
}
