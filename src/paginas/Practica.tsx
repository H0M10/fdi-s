import { useMemo, useState } from 'react';
import { Pregunta } from '../componentes/Pregunta';
import { registrar, useProgreso } from '../progreso';
import type { Pregunta as TPregunta } from '../tipos';

type Filtro = 'todas' | 'casos' | 'opcion' | 'logica';

const FILTROS: { id: Filtro; nombre: string; acepta: (p: TPregunta) => boolean }[] = [
  { id: 'todas', nombre: 'Todas', acepta: () => true },
  { id: 'casos', nombre: 'Casos con incisos', acepta: (p) => p.tipo === 'caso' },
  { id: 'opcion', nombre: 'Opción múltiple y V/F', acepta: (p) => p.tipo === 'opcion' || p.tipo === 'vf' || p.tipo === 'multi' },
  { id: 'logica', nombre: 'Simbolizar, tablas y conclusiones', acepta: (p) => ['simbolizar', 'tabla', 'clasificar', 'conclusion'].includes(p.tipo) },
];

/**
 * Ordena la sesión: primero lo que nunca has contestado, luego lo que
 * fallaste, y al final lo que ya dominas. Dentro de cada grupo, al azar.
 */
function ordenar(ps: TPregunta[], progreso: ReturnType<typeof useProgreso>): TPregunta[] {
  const azar = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((x, y) => x[0] - y[0]).map(([, x]) => x);
  const nuevas = ps.filter((p) => !progreso[p.id]);
  const falladas = ps.filter((p) => progreso[p.id] && progreso[p.id].ultimo < 1);
  const dominadas = ps.filter((p) => progreso[p.id]?.ultimo === 1);
  return [...azar(nuevas), ...azar(falladas), ...azar(dominadas)];
}

export function Practica({ preguntas, titulo }: { preguntas: TPregunta[]; titulo?: string }) {
  const progreso = useProgreso();
  const disponibles = FILTROS.filter((f) => f.id === 'todas' || preguntas.some(f.acepta));
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [semilla, setSemilla] = useState(0);
  const [indice, setIndice] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [sesion, setSesion] = useState({ hechas: 0, puntos: 0 });

  // La cola se arma una vez por filtro y no se reordena mientras contestas.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cola = useMemo(() => ordenar(preguntas.filter(FILTROS.find((f) => f.id === filtro)!.acepta), progreso), [preguntas, filtro, semilla]);
  const actual = cola[indice];

  const cambiarFiltro = (f: Filtro) => {
    setFiltro(f);
    setIndice(0);
    setRespondida(false);
  };

  const siguiente = () => {
    if (indice + 1 >= cola.length) {
      setSemilla((s) => s + 1);
      setIndice(0);
    } else setIndice(indice + 1);
    setRespondida(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cola.length === 0) return <div className="vacio">No hay preguntas de este tipo en el tema.</div>;

  return (
    <div className="pila">
      {titulo && <h2>{titulo}</h2>}
      {disponibles.length > 1 && (
        <div className="filtros" role="group" aria-label="Tipo de pregunta">
          {disponibles.map((f) => (
            <button key={f.id} className="chip" aria-pressed={filtro === f.id} onClick={() => cambiarFiltro(f.id)}>
              {f.nombre}
            </button>
          ))}
        </div>
      )}

      <div className="sesion">
        <span style={{ fontFamily: 'var(--mono)', fontVariantNumeric: 'tabular-nums' }}>{indice + 1} / {cola.length}</span>
        <div className="medidor-barra" style={{ flex: 1 }}>
          <div className="medidor-relleno" style={{ width: `${((indice + (respondida ? 1 : 0)) / cola.length) * 100}%`, background: 'var(--acento)' }} />
        </div>
        {sesion.hechas > 0 && (
          <span>Esta sesión: <strong>{Math.round((sesion.puntos / sesion.hechas) * 100)} %</strong></span>
        )}
      </div>

      <Pregunta
        key={`${actual.id}-${semilla}-${indice}`}
        p={actual}
        etiqueta={progreso[actual.id] ? (progreso[actual.id].ultimo === 1 ? 'Ya la dominabas' : 'La habías fallado') : 'Nueva'}
        onListo={(f) => {
          registrar(actual.id, f);
          setRespondida(true);
          setSesion((s) => ({ hechas: s.hechas + 1, puntos: s.puntos + f }));
        }}
      />

      <div className="fila" style={{ justifyContent: 'flex-end' }}>
        {!respondida && <button className="boton fant" onClick={siguiente}>Saltar</button>}
        {respondida && <button className="boton" onClick={siguiente}>Siguiente →</button>}
      </div>
    </div>
  );
}
