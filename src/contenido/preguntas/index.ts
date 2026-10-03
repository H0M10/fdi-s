import type { IdTema, Pregunta } from '../../tipos';
import { PREGUNTAS_CASOS } from './casos';
import { PREGUNTAS_ENFOQUES } from './enfoques';
import { PREGUNTAS_ETICA } from './etica';
import {
  PREGUNTAS_APLICACIONES, PREGUNTAS_CONCEPTOS, PREGUNTAS_HISTORIA, PREGUNTAS_QUE_ES,
} from './generales';
import { PREGUNTAS_LOGICA } from './logica';
import { PREGUNTAS_RAMAS } from './ramas';

export const TODAS: Pregunta[] = [
  ...PREGUNTAS_CASOS,
  ...PREGUNTAS_RAMAS,
  ...PREGUNTAS_ENFOQUES,
  ...PREGUNTAS_ETICA,
  ...PREGUNTAS_LOGICA,
  ...PREGUNTAS_CONCEPTOS,
  ...PREGUNTAS_QUE_ES,
  ...PREGUNTAS_HISTORIA,
  ...PREGUNTAS_APLICACIONES,
];

export const deTema = (t: IdTema): Pregunta[] => TODAS.filter((p) => p.tema === t);

export const porId = new Map(TODAS.map((p) => [p.id, p]));

/** Cuántos incisos cuenta una pregunta: un caso vale por todos los suyos. */
export const incisos = (p: Pregunta): number => (p.tipo === 'caso' ? p.incisos.length : 1);
