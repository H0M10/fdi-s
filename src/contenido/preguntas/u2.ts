import type { Pregunta } from '../../tipos';
import { PREGUNTAS_U2_CASOS } from './u2_casos';
import { PREGUNTAS_U2_TEMAS } from './u2_temas';

export const PREGUNTAS_U2: Pregunta[] = [
  ...PREGUNTAS_U2_TEMAS,
  ...PREGUNTAS_U2_CASOS,
];

