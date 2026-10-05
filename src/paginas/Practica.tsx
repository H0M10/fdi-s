// Práctica por rondas.
//
// Una ronda es el recorrido de una lista de preguntas de principio a fin.
// Al terminar se muestra el resultado y se ofrece repetir solo lo fallado,
// repetir todo o pasar al siguiente tema. Antes la práctica regresaba a la
// primera pregunta sin avisar, y no había forma de saber cuánto se sacó.

import { useState } from 'react';
import { Pregunta } from '../componentes/Pregunta';
import { Texto } from '../componentes/Texto';
import { registrar, useProgreso } from '../progreso';
import type { Pregunta as TPregunta } from '../tipos';

type Filtro = 'todas' | 'casos' | 'opcion' | 'logica';

const FILTROS: { id: Filtro; nombre: string; acepta: (p: TPregunta) => boolean }[] = [
  { id: 'todas', nombre: 'Todas', acepta: () => true },
  { id: 'casos', nombre: 'Casos con incisos', acepta: (p) => p.tipo === 'caso' },
  { id: 'opcion', nombre: 'Opción múltiple y V/F', acepta: (p) => p.tipo === 'opcion' || p.tipo === 'vf' || p.tipo === 'multi' },
  { id: 'logica', nombre: 'Simbolizar, tablas y conclusiones', acepta: (p) => ['simbolizar', 'tabla', 'clasificar', 'conclusion'].includes(p.tipo) },
];

type Progreso = ReturnType<typeof useProgreso>;

interface Ronda {
  cola: TPregunta[];
  /** Cómo estaba cada pregunta al empezar la ronda, para la etiqueta. */
  antes: Record<string, number | undefined>;
  /** Resultado de cada pregunta de la cola. null = saltada o pendiente. */
  resultados: (number | null)[];
}

const azar = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((x, y) => x[0] - y[0]).map(([, x]) => x);

/** Primero lo que nunca has contestado, luego lo fallado, al final lo dominado. */
function ordenar(ps: TPregunta[], p: Progreso): TPregunta[] {
  return [
    ...azar(ps.filter((x) => !p[x.id])),
    ...azar(ps.filter((x) => p[x.id] && p[x.id].ultimo < 1)),
    ...azar(ps.filter((x) => p[x.id]?.ultimo === 1)),
  ];
}

function crearRonda(cola: TPregunta[], p: Progreso): Ronda {
  return {
    cola,
    antes: Object.fromEntries(cola.map((x) => [x.id, p[x.id]?.ultimo])),
    resultados: cola.map(() => null),
  };
}

function etiqueta(antes: number | undefined) {
  if (antes === undefined) return 'Nueva';
  return antes === 1 ? 'Ya la habías acertado' : 'La habías fallado';
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function textoCorto(p: TPregunta): string {
  if (p.tipo === 'caso') return p.titulo;
  if ('enunciado' in p && p.enunciado) return p.enunciado.length > 95 ? p.enunciado.slice(0, 95) + '…' : p.enunciado;
  if ('formula' in p) return `Fórmula ${p.formula}`;
  return 'Pregunta';
}

interface Props {
  preguntas: TPregunta[];
  /** Si existe, al terminar se ofrece pasar a ese tema. */
  siguienteTema?: { numero: number; titulo: string; ir: () => void };
  alVolverLeccion?: () => void;
}

export function Practica({ preguntas, siguienteTema, alVolverLeccion }: Props) {
  const progreso = useProgreso();
  const disponibles = FILTROS.filter((f) => f.id === 'todas' || preguntas.some(f.acepta));
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const filtradas = (f: Filtro) => preguntas.filter(FILTROS.find((x) => x.id === f)!.acepta);
  const [ronda, setRonda] = useState<Ronda>(() => crearRonda(ordenar(filtradas('todas'), progreso), progreso));
  const [indice, setIndice] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [terminada, setTerminada] = useState(false);
  const [vuelta, setVuelta] = useState(0);

  const empezar = (cola: TPregunta[]) => {
    setRonda(crearRonda(cola, progreso));
    setIndice(0);
    setRespondida(false);
    setTerminada(false);
    setVuelta((v) => v + 1);
    window.scrollTo({ top: 0 });
  };

  const cambiarFiltro = (f: Filtro) => {
    setFiltro(f);
    empezar(ordenar(filtradas(f), progreso));
  };

  const avanzar = () => {
    if (indice + 1 >= ronda.cola.length) setTerminada(true);
    else setIndice(indice + 1);
    setRespondida(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (ronda.cola.length === 0) return <div className="vacio">No hay preguntas de este tipo en el tema.</div>;

  const total = ronda.cola.length;
  const contestadas = ronda.resultados.filter((r) => r !== null).length;
  const puntos = ronda.resultados.reduce<number>((s, r) => s + (r ?? 0), 0);
  const malas = ronda.resultados.filter((r) => r !== null && r < 1).length;

  /* ---------------------------------------------------------------- */
  /* Resultado de la ronda                                            */
  /* ---------------------------------------------------------------- */
  if (terminada) {
    const pct = Math.round((puntos / total) * 100);
    const saltadas = total - contestadas;
    const porRepetir = ronda.cola.filter((_, i) => ronda.resultados[i] === null || (ronda.resultados[i] as number) < 1);
    const mensaje =
      pct >= 90 ? 'Dominas este tema.'
        : pct >= 70 ? 'Vas bien. Repite las que fallaste para cerrarlo.'
          : 'Conviene volver a leer la lección antes de seguir.';

    return (
      <div className="pila">
        <div className="resultado-ronda">
          <p className="rotulo" style={{ marginBottom: 4 }}>Terminaste la ronda</p>
          <div className="resultado-pct" style={{ color: pct >= 70 ? 'var(--bien)' : 'var(--mal)' }}>{pct} %</div>
          <p className="resultado-detalle">
            {fmt(puntos)} de {total} bien
            {saltadas > 0 && <> · saltaste {saltadas}</>}
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 15 }}>{mensaje}</p>
        </div>

        <div className="fila">
          {porRepetir.length > 0 && (
            <button className="boton" onClick={() => empezar(azar(porRepetir))}>
              Repetir {porRepetir.length === 1 ? 'la que fallé' : `las ${porRepetir.length} que fallé`}
            </button>
          )}
          {siguienteTema && (
            <button className={porRepetir.length > 0 ? 'boton sec' : 'boton'} onClick={siguienteTema.ir}>
              Siguiente tema: {siguienteTema.numero}. {siguienteTema.titulo} →
            </button>
          )}
          <button className="boton fant" onClick={() => empezar(ordenar(filtradas(filtro), progreso))}>Repetir todas</button>
          {alVolverLeccion && pct < 70 && (
            <button className="boton fant" onClick={alVolverLeccion}>Volver a la lección</button>
          )}
        </div>

        <h3 style={{ marginTop: 10 }}>Pregunta por pregunta</h3>
        <div className="marco">
          <table className="datos">
            <tbody>
              {ronda.cola.map((p, i) => {
                const r = ronda.resultados[i];
                const color = r === null ? 'var(--tinta-3)' : r === 1 ? 'var(--bien)' : r === 0 ? 'var(--mal)' : 'var(--examen)';
                const texto = r === null ? 'Saltada' : r === 1 ? 'Bien' : r === 0 ? 'Mal' : `${Math.round(r * 100)} %`;
                return (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'var(--mono)', width: 36, color: 'var(--tinta-3)' }}>{i + 1}</td>
                    <td style={{ fontWeight: 400 }}><Texto>{textoCorto(p)}</Texto></td>
                    <td style={{ color, fontFamily: 'var(--mono)', whiteSpace: 'nowrap', textAlign: 'right' }}>{texto}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Pregunta en curso                                                */
  /* ---------------------------------------------------------------- */
  const actual = ronda.cola[indice];
  const esUltima = indice === total - 1;

  return (
    <div className="pila">
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
        <span style={{ fontWeight: 600 }}>Pregunta {indice + 1} de {total}</span>
        <div className="medidor-barra" style={{ flex: 1 }}>
          <div className="medidor-relleno" style={{ width: `${((indice + (respondida ? 1 : 0)) / total) * 100}%`, background: 'var(--acento)' }} />
        </div>
        {contestadas > 0 && (
          <span style={{ fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--bien)' }}>{fmt(puntos)} bien</span>
            {malas > 0 && <> · <span style={{ color: 'var(--mal)' }}>{malas} mal</span></>}
          </span>
        )}
      </div>

      <Pregunta
        key={`${actual.id}-${vuelta}-${indice}`}
        p={actual}
        etiqueta={etiqueta(ronda.antes[actual.id])}
        onListo={(f) => {
          registrar(actual.id, f);
          setRonda((r) => {
            const resultados = [...r.resultados];
            resultados[indice] = f;
            return { ...r, resultados };
          });
          setRespondida(true);
        }}
      />

      <div className="accion-fija">
        {!respondida && (
          <button className="boton fant" onClick={avanzar}>{esUltima ? 'Saltar y terminar' : 'Saltar'}</button>
        )}
        {respondida && (
          <button className="boton" onClick={avanzar}>{esUltima ? 'Ver mi resultado' : 'Siguiente →'}</button>
        )}
      </div>
    </div>
  );
}
