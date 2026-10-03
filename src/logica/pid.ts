// Simulación simplificada de un aerogenerador controlado por un PID.
//
// NO es un modelo real de aerogenerador. Es lo mínimo para ver lo que
// explicó el profesor: qué hace cada uno de los tres componentes, y por
// qué un PID solo no alcanza cuando el viento cambia rápido.
//
// El modelo:
//   - y es la velocidad del rotor; se quiere mantener en 1 (normalizada).
//   - Una ráfaga d(t) empuja la velocidad hacia arriba.
//   - El controlador mueve el ángulo de las aspas (pitch) para frenar.
//   - Las aspas tardan en girar: hay un retraso del actuador.
//
//   dy/dt = (1 + d(t) − pitch − y) / TAU_ROTOR
//   dpitch/dt = (orden − pitch) / TAU_ASPAS
//
// El controlador PID, con error e = y − 1 (cuánto se pasó de la velocidad):
//   orden = Kp·e + Ki·∫e dt + Kd·de/dt
//
// La anticipación suma a la orden la ráfaga que se predice, antes de que
// llegue. Es lo que el estado del arte hace con modelos de predicción.

export interface Ganancias {
  kp: number;
  ki: number;
  kd: number;
  /** Segundos de anticipación con que se predice la ráfaga. 0 = sin predicción. */
  anticipacion: number;
}

export interface Resultado {
  t: number[];
  velocidad: number[];
  pitch: number[];
  rafaga: number[];
  /** Lo más que se alejó la velocidad del valor deseado. */
  desviacionMaxima: number;
  /** Cuánto se alejaba al final de la simulación. */
  errorFinal: number;
}

export const DURACION = 12;
export const INICIO_RAFAGA = 3;
const TAU_ROTOR = 0.8;
const TAU_ASPAS = 0.35;
const DT = 0.005;

/** Una ráfaga que sube rápido y se queda: el viento aumentó y no regresa. */
export function rafaga(t: number): number {
  if (t < INICIO_RAFAGA) return 0;
  const s = t - INICIO_RAFAGA;
  return 0.5 * (1 - Math.exp(-s / 0.25));
}

export function simular(g: Ganancias): Resultado {
  const t: number[] = [];
  const velocidad: number[] = [];
  const pitch: number[] = [];
  const raf: number[] = [];
  let y = 1;
  let p = 0;
  let integral = 0;
  let errorPrevio = 0;
  let desviacionMaxima = 0;
  const pasos = Math.round(DURACION / DT);

  for (let i = 0; i <= pasos; i++) {
    const ti = i * DT;
    const d = rafaga(ti);
    const e = y - 1;
    integral += e * DT;
    const derivada = i === 0 ? 0 : (e - errorPrevio) / DT;
    errorPrevio = e;

    const prediccion = g.anticipacion > 0 ? rafaga(ti + g.anticipacion) : 0;
    const orden = g.kp * e + g.ki * integral + g.kd * derivada + prediccion;

    p += ((orden - p) / TAU_ASPAS) * DT;
    y += ((1 + d - p - y) / TAU_ROTOR) * DT;

    desviacionMaxima = Math.max(desviacionMaxima, Math.abs(y - 1));
    if (i % 8 === 0) {
      t.push(ti);
      velocidad.push(y);
      pitch.push(p);
      raf.push(d);
    }
  }
  return { t, velocidad, pitch, rafaga: raf, desviacionMaxima, errorFinal: Math.abs(y - 1) };
}

export const PRESETS: { nombre: string; g: Ganancias; idea: string }[] = [
  {
    nombre: 'Sin control',
    g: { kp: 0, ki: 0, kd: 0, anticipacion: 0 },
    idea: 'Nadie mueve las aspas. La ráfaga sube la velocidad y ahí se queda.',
  },
  {
    nombre: 'Solo P',
    g: { kp: 2, ki: 0, kd: 0, anticipacion: 0 },
    idea: 'Corrige en proporción al error de ahora. Ayuda, pero siempre queda un error que no alcanza a quitar.',
  },
  {
    nombre: 'PI',
    g: { kp: 2, ki: 3, kd: 0, anticipacion: 0 },
    idea: 'La integral acumula el error que va quedando y lo elimina. Pero corrige de más y oscila.',
  },
  {
    nombre: 'PID',
    g: { kp: 2, ki: 3, kd: 0.25, anticipacion: 0 },
    idea: 'La derivada ve qué tan rápido cambia el error y frena antes de pasarse. Llega más suave.',
  },
  {
    nombre: 'PID + predicción',
    g: { kp: 2, ki: 3, kd: 0.25, anticipacion: 0.4 },
    idea: 'Un modelo predice la ráfaga y las aspas empiezan a girar antes de que llegue. Es la idea del estado del arte: llegar a la inferencia antes que el tiempo real. Fíjate que la velocidad baja un poco antes de la ráfaga: las aspas frenan antes de tiempo. Por eso la predicción tiene que ser buena, no solo temprana.',
  },
];
