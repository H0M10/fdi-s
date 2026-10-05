// Atajos para escribir preguntas sin repetir campos.
//
// El id de cada pregunta se deriva de su enunciado con un hash, no de su
// posición. Así se pueden reordenar o insertar preguntas sin que se pierda
// el progreso guardado de las demás. Corregir el texto de una pregunta sí
// le reinicia el progreso, y está bien que así sea.

import type {
  IdTema, Inciso, PCaso, PClasificar, PConclusion, PMulti, POpcion,
  Pregunta, Props, PSimbolizar, PTabla, PVF,
} from '../tipos';

export function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/** Opciones fijas que se repiten en muchas preguntas. */
export const RAMAS = [
  'Representación del conocimiento y razonamiento',
  'Búsqueda y planificación',
  'Aprendizaje automático',
  'Percepción computacional',
  'Visión por computadora',
  'Procesamiento de lenguaje natural',
  'Robótica y sistemas autónomos',
  'Sistemas multiagente',
  'IA generativa',
  'Computación afectiva',
  'Sistemas cognitivos',
] as const;
export type Rama = (typeof RAMAS)[number];

/**
 * Siglas de las ramas. El profesor dio siglas y pidió usarlas en el examen,
 * pero no quedaron en los apuntes: P.C. y SMA son como las recuerda
 * Hanniel, y PLN es la usual. Faltan confirmar y faltan las demás. No
 * inventar siglas que el profesor no dio.
 */
export const SIGLAS: Partial<Record<Rama, string>> = {
  'Percepción computacional': 'P.C.',
  'Procesamiento de lenguaje natural': 'PLN',
  'Sistemas multiagente': 'SMA',
};

/** «Sistemas multiagente (SMA)», como se muestra en las opciones. */
export const conSigla = (r: Rama) => (SIGLAS[r] ? `${r} (${SIGLAS[r]})` : r);

export const RIESGOS = [
  'Privacidad',
  'Sesgo y discriminación',
  'Error',
  'Opacidad y explicabilidad',
  'Seguridad',
  'Responsabilidad y gobernanza',
  'Uso indebido',
  'Dependencia y pérdida de juicio',
] as const;

/**
 * Los enfoques que pueden formar un sistema. «Híbrido» no va aquí: es el
 * nombre de la combinación, no una pieza.
 */
export const COMPONENTES = ['Reglas', 'Búsqueda', 'Optimización', 'Machine learning', 'Deep learning'] as const;
export type Componente = (typeof COMPONENTES)[number];

/**
 * Qué hay que señalar en el caso para justificar cada respuesta. Es la
 * mitad de «justificar»; la otra mitad es decir qué parte del caso lo
 * muestra, y eso va en la explicación de cada pregunta.
 */
export const CRITERIOS: Record<string, string> = {
  // Ramas: la palabra clave de cada una.
  'Representación del conocimiento y razonamiento': 'hay hechos y reglas «si… entonces» con las que se llega a una conclusión',
  'Búsqueda y planificación': 'hay un estado inicial y una meta (una ruta, un horario, un plan) o algo que optimizar',
  'Aprendizaje automático': 'aprende de datos o de ejemplos (históricos, de entrenamiento) para predecir o reconocer',
  'Percepción computacional': 'usa sensores para saber qué pasa en su entorno',
  'Visión por computadora': 'interpreta imágenes o video de cámaras',
  'Procesamiento de lenguaje natural': 'entiende o produce texto o voz',
  'Robótica y sistemas autónomos': 'se mueve o mueve cosas en el mundo físico',
  'Sistemas multiagente': 'hay varios agentes que se coordinan, cooperan o compiten',
  'IA generativa': 'crea contenido nuevo: texto, imágenes, audio',
  'Computación afectiva': 'reconoce emociones a partir de señales (rostro, tono de voz)',
  'Sistemas cognitivos': 'percibe, recuerda, razona y decide imitando a una persona',
  // Enfoques: la señal de cada uno.
  'Reglas': 'una condición que escribió una persona («si…», «nunca», «no más de…»)',
  'Búsqueda': 'hay un camino que encontrar, de un estado inicial a una meta',
  'Optimización': 'se busca el mejor valor: lo más o lo menos posible',
  'Machine learning': 'aprende de datos con su respuesta para predecir',
  'Deep learning': 'una red aprende sola de muchísimos datos crudos (imágenes, audio, texto)',
  // Riesgos: lo que dijo el profesor de cada uno.
  'Privacidad': 'se piden o se guardan datos que no son necesarios',
  'Sesgo y discriminación': 'los datos históricos reflejan una injusticia y el modelo perjudica a un grupo',
  'Error': 'el modelo se equivoca, porque ninguno es 100 % efectivo',
  'Opacidad y explicabilidad': 'no se puede explicar por qué decidió el modelo',
  'Seguridad': 'los datos no están protegidos',
  'Responsabilidad y gobernanza': 'nadie revisa la decisión ni responde por ella',
  'Uso indebido': 'los datos o la herramienta se usan para algo distinto de lo autorizado',
  'Dependencia y pérdida de juicio': 'se delega tanto que se deja de saber decidir sin la herramienta',
  // Principios de la ley.
  'Finalidad': 'los datos se usan para algo distinto de para lo que se pidieron',
  'Proporcionalidad o minimización': 'se piden más datos de los necesarios para el fin',
  'Información': 'no se avisa para qué se van a usar los datos',
};

/** «Visión por computadora → interpreta imágenes…», para cada respuesta que tenga criterio. */
function guiaDe(respuestas: readonly string[]): string[] | undefined {
  const g = respuestas
    .map((r) => r.replace(/ \([^)]*\)$/, '')) // sin la sigla, si la trae
    .filter((r) => CRITERIOS[r])
    .map((r) => `**${(RAMAS as readonly string[]).includes(r) ? conSigla(r as Rama) : r}** → ${CRITERIOS[r]}`);
  return g.length ? g : undefined;
}

/**
 * Pide justificar una pregunta de identificar (rama, enfoque, riesgo,
 * principio), como en las preguntas avanzadas del examen. Las demás
 * quedan igual.
 */
export function justificable(i: Inciso): Inciso {
  if (i.tipo === 'opcion') {
    const guia = guiaDe([i.opciones[i.correcta]]);
    return guia ? { ...i, justificar: true, guia } : i;
  }
  if (i.tipo === 'multi') {
    const guia = i.guia ?? guiaDe(i.correctas.map((k) => i.opciones[k]));
    return guia ? { ...i, justificar: true, guia } : i;
  }
  return i;
}

/** Las preguntas de siempre. Iguales si la respuesta es una o varias. */
export const QUE_ENFOQUES = '¿Qué enfoque o enfoques usa?';
export const QUE_RAMAS = '¿Qué rama o ramas intervienen?';

/**
 * Selección múltiple sobre una lista fija (las ramas o los enfoques). Siempre
 * las mismas opciones en el mismo orden, sea una o varias las correctas,
 * para que el formato no delate la respuesta. `tambien` son las que se valen
 * pero no son obligatorias: marcarlas o no, da igual.
 */
function sobreLista<T extends string>(
  lista: readonly T[], enunciado: string, correctas: T[], explicacion: string, tambien: T[], pista: string,
  etiqueta: (x: T) => string = (x) => x,
): PMulti {
  const idx = (xs: T[]) => xs.map((x) => lista.indexOf(x));
  return {
    tipo: 'multi',
    enunciado,
    opciones: lista.map(etiqueta),
    correctas: idx(correctas),
    ...(tambien.length ? { aceptables: idx(tambien) } : {}),
    explicacion,
    fijo: true,
    pista,
    guia: guiaDe(correctas),
  };
}

/**
 * Si la pregunta es por el sistema completo, al final de la explicación se
 * dice si es híbrido o no. Si es por una sola parte («¿con qué se decide
 * cuánto cocinar?»), no: esa parte puede ser un solo enfoque dentro de un
 * sistema híbrido.
 */
function preguntaDeEnfoques(enunciado: string, correctas: Componente[], explicacion: string, completo: boolean, tambien: Componente[] = []): PMulti {
  const cierre = !completo || /h[ií]brido/i.test(explicacion) ? ''
    : correctas.length === 1 ? ' Es un solo enfoque, así que **no es híbrido**.'
      : ` Son ${correctas.length} enfoques juntos, así que es **híbrido**.`;
  return sobreLista(COMPONENTES, enunciado, correctas, explicacion + cierre, tambien,
    'Puede ser uno o varios. Si es deep learning, no marques también machine learning.');
}

const PISTA_RAMAS = 'Puede ser una o varias. Marca cada rama que puedas señalar en el texto del caso.';

/**
 * Aprendizaje automático junto a visión, PLN, afectiva o generativa:
 * - Si el caso dice que aprendió («se entrenó con», «datos históricos»), es
 *   obligatoria: va en `correctas`.
 * - Si no lo dice, también se vale: reconocer un perro, entender una voz o
 *   generar una imagen se aprende de ejemplos (el profesor lo explicó con
 *   las fotos de perros y gatos). Esta función la agrega sola, para que
 *   todos los casos sigan la misma regla.
 * Solo aplica a la pregunta por el sistema completo, no a definiciones.
 */
const APRENDEN: Rama[] = ['Visión por computadora', 'Procesamiento de lenguaje natural', 'Computación afectiva', 'IA generativa'];
const AA: Rama = 'Aprendizaje automático';
function preguntaDeRamas(enunciado: string, correctas: Rama[], explicacion: string, completo: boolean, tambien: Rama[]): PMulti {
  if (completo && !correctas.includes(AA) && !tambien.includes(AA) && correctas.some((r) => APRENDEN.includes(r))) {
    tambien = [...tambien, AA];
    explicacion += ' Aprendizaje automático también se vale: el caso no dice que el sistema aprendió de datos, pero reconocer imágenes, entender voz o texto y generar contenido se aprende de ejemplos.';
  }
  return sobreLista(RAMAS, enunciado, correctas, explicacion, tambien, PISTA_RAMAS, conSigla);
}

/** Incisos sueltos, para armar casos. */
export const inciso = {
  /** Sin pregunta, usa «¿Qué enfoque o enfoques usa?». */
  enfoques: (correctas: Componente[], explicacion: string, pregunta = QUE_ENFOQUES, tambien: Componente[] = []): PMulti =>
    preguntaDeEnfoques(pregunta, correctas, explicacion, pregunta === QUE_ENFOQUES, tambien),
  /** Sin pregunta, usa «¿Qué rama o ramas intervienen?». */
  ramas: (correctas: Rama[], explicacion: string, pregunta = QUE_RAMAS, tambien: Rama[] = []): PMulti =>
    preguntaDeRamas(pregunta, correctas, explicacion, pregunta === QUE_RAMAS, tambien),
  opcion: (enunciado: string, opciones: string[], correcta: number, explicacion: string): POpcion =>
    ({ tipo: 'opcion', enunciado, opciones, correcta, explicacion }),
  multi: (enunciado: string, opciones: string[], correctas: number[], explicacion: string): PMulti =>
    ({ tipo: 'multi', enunciado, opciones, correctas, explicacion }),
  vf: (enunciado: string, verdadera: boolean, explicacion: string): PVF =>
    ({ tipo: 'vf', enunciado, verdadera, explicacion }),
  simbolizar: (enunciado: string, props: Props, respuesta: string, pista?: string): PSimbolizar =>
    ({ tipo: 'simbolizar', enunciado, props, respuesta, pista }),
  tabla: (formula: string, enunciado?: string): PTabla =>
    ({ tipo: 'tabla', formula, enunciado }),
  clasificar: (formula: string, enunciado?: string): PClasificar =>
    ({ tipo: 'clasificar', formula, enunciado }),
  conclusion: (
    enunciado: string, props: Props, premisas: string[],
    opciones: [string, string | null][], explicacion: string,
  ): PConclusion => ({
    tipo: 'conclusion', enunciado, props, premisas,
    opciones: opciones.map(([texto, formula]) => ({ texto, formula })),
    explicacion,
  }),
};

/** Preguntas completas de un tema. */
export function preguntasDe(tema: IdTema) {
  const con = <T extends Inciso | PCaso>(clave: string, p: T): Pregunta =>
    ({ id: `${tema}-${hash(clave)}`, tema, ...p }) as Pregunta;

  return {
    /** Escenario + «¿Qué enfoque o enfoques usa?», o la pregunta que se le pase. */
    enfoques: (escenario: string, correctas: Componente[], explicacion: string, pregunta = QUE_ENFOQUES, tambien: Componente[] = []) => {
      const enunciado = `${escenario} ${pregunta}`;
      return con(enunciado, preguntaDeEnfoques(enunciado, correctas, explicacion, pregunta === QUE_ENFOQUES, tambien));
    },
    /** Escenario + «¿Qué rama o ramas intervienen?», o la pregunta que se le pase. */
    ramas: (escenario: string, correctas: Rama[], explicacion: string, pregunta = QUE_RAMAS, tambien: Rama[] = []) => {
      const enunciado = `${escenario} ${pregunta}`;
      return con(enunciado, preguntaDeRamas(enunciado, correctas, explicacion, pregunta === QUE_RAMAS, tambien));
    },
    opcion: (...a: Parameters<typeof inciso.opcion>) => con(a[0], inciso.opcion(...a)),
    multi: (...a: Parameters<typeof inciso.multi>) => con(a[0], inciso.multi(...a)),
    vf: (...a: Parameters<typeof inciso.vf>) => con(a[0], inciso.vf(...a)),
    simbolizar: (...a: Parameters<typeof inciso.simbolizar>) => con(a[0], inciso.simbolizar(...a)),
    tabla: (...a: Parameters<typeof inciso.tabla>) => con('tabla:' + a[0], inciso.tabla(...a)),
    clasificar: (...a: Parameters<typeof inciso.clasificar>) => con('clasificar:' + a[0], inciso.clasificar(...a)),
    conclusion: (...a: Parameters<typeof inciso.conclusion>) => con(a[0], inciso.conclusion(...a)),
    caso: (titulo: string, escenario: string, incisos: Inciso[]) =>
      con(titulo, { tipo: 'caso', titulo, escenario, incisos } satisfies PCaso),
  };
}

/** Elige opciones de una lista fija por nombre y devuelve el índice correcto. */
export function de<T extends readonly string[]>(_lista: T, nombres: T[number][], correcta: T[number]): [string[], number] {
  return [nombres as string[], nombres.indexOf(correcta)];
}
