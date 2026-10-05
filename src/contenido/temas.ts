import type { IdTema, Tema } from '../tipos';

// Orden de estudio. Es el mismo orden en que se dieron en clase, y además
// respeta qué tema necesita a cuál: los enfoques usan los conceptos base,
// las aplicaciones juntan ramas y enfoques, la ética se aplica sobre casos
// de ramas, y los casos tipo examen van al final porque integran todo.
//
// Si se agrega un tema, va en el lugar que le toca en esta secuencia, no
// al final de la lista.

export const BLOQUES = [
  { id: 'bases', titulo: 'Las bases', idea: 'El vocabulario que usa todo lo demás.' },
  { id: 'resolver', titulo: 'Cómo se resuelve un problema con IA', idea: 'Las herramientas: enfoques y lógica.' },
  { id: 'ramas', titulo: 'Las ramas y sus aplicaciones', idea: 'Lo que más se pregunta en los casos del examen.' },
  { id: 'cierre', titulo: 'Ética y repaso final', idea: 'La ética se aplica sobre todo lo anterior, y los casos lo juntan.' },
] as const;

export type IdBloque = (typeof BLOQUES)[number]['id'];

export const TEMAS: (Tema & { bloque: IdBloque })[] = [
  {
    id: 'que-es',
    bloque: 'bases',
    titulo: '¿Qué es la IA?',
    corto: 'Qué es la IA',
    resumen: 'La inteligencia como conjunto de habilidades. IA débil e IA fuerte.',
    enExamen: 'Opción múltiple general.',
  },
  {
    id: 'historia',
    bloque: 'bases',
    titulo: 'Antecedentes e historia',
    corto: 'Historia',
    resumen: 'De Hobbes y Boole a GPT-3: qué cambió en cada momento.',
    enExamen: 'Opción múltiple general.',
  },
  {
    id: 'conceptos',
    bloque: 'bases',
    titulo: 'Conceptos base',
    corto: 'Conceptos',
    resumen: 'Datos, algoritmo, modelo, aprender, entrenamiento e inferencia.',
    enExamen: 'Opción múltiple. Sostienen todo lo demás.',
  },
  {
    id: 'enfoques',
    bloque: 'resolver',
    titulo: 'Enfoques de la IA',
    corto: 'Enfoques',
    resumen: 'Los cuatro cuadrantes y los enfoques técnicos: reglas, búsqueda, optimización, ML, DL e híbridos.',
    enExamen: 'Te dan un caso y dices qué enfoque o enfoques usa. También en opción múltiple.',
  },
  {
    id: 'logica',
    bloque: 'resolver',
    titulo: 'Lógica y tablas de verdad',
    corto: 'Lógica',
    resumen: 'Simbolizar, tablas, tautología/contradicción/contingencia, De Morgan y conclusiones.',
    enExamen: 'Simbolizar y hacer dos tablas, sacar conclusiones de un enunciado, y clasificar justificando.',
  },
  {
    id: 'ramas',
    bloque: 'ramas',
    titulo: 'Ramas de la IA',
    corto: 'Ramas',
    resumen: 'Las once ramas, cada una con su definición y su flujo de flechas.',
    enExamen: 'Te dan un ejemplo y dices qué rama o ramas son, todas las del caso. En las preguntas avanzadas, justificas cada una.',
  },
  {
    id: 'aplicaciones',
    bloque: 'ramas',
    titulo: 'Aplicaciones y estado del arte',
    corto: 'Aplicaciones',
    resumen: 'El controlador PID y el aerogenerador: cómo se juntan ramas y enfoques en un problema real.',
    enExamen: 'Puede salir en opción múltiple.',
  },
  {
    id: 'etica',
    bloque: 'cierre',
    titulo: 'Ética e implicaciones sociales',
    corto: 'Ética',
    resumen: 'Los 8 riesgos, el método PRDM, las leyes de datos personales y los derechos ARCO.',
    enExamen: 'En los casos: «¿qué problemas y daños éticos tiene?». Las leyes van en opción múltiple.',
  },
  {
    id: 'casos',
    bloque: 'cierre',
    titulo: 'Casos tipo examen',
    corto: 'Casos',
    resumen: 'Un caso real de IA con cuatro incisos: ramas, enfoques, riesgo ético y mitigación, cada uno justificado. Junta todo lo anterior.',
    enExamen: 'Son 10 de las 18 preguntas del examen.',
  },
];

export const tema = (id: IdTema) => {
  const t = TEMAS.find((x) => x.id === id);
  if (!t) throw new Error(`Tema desconocido: ${id}`);
  return t;
};

/** Posición del tema en el orden de estudio, empezando en 1. */
export const numero = (id: IdTema) => TEMAS.findIndex((t) => t.id === id) + 1;

export const anterior = (id: IdTema) => TEMAS[numero(id) - 2];
export const siguiente = (id: IdTema) => TEMAS[numero(id)];
