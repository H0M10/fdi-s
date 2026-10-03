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

function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/** Incisos sueltos, para armar casos. */
export const inciso = {
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

export const ENFOQUES = [
  'Reglas',
  'Búsqueda',
  'Optimización',
  'Machine learning',
  'Deep learning',
  'Híbrido',
] as const;

/** Elige opciones de una lista fija por nombre y devuelve el índice correcto. */
export function de<T extends readonly string[]>(_lista: T, nombres: T[number][], correcta: T[number]): [string[], number] {
  return [nombres as string[], nombres.indexOf(correcta)];
}
