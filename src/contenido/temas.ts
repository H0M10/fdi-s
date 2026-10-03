import type { IdTema, Tema } from '../tipos';

// El orden es el de estudio recomendado: primero lo que se pregunta en los
// casos (enfoques, ramas, ética), luego lógica, y al final lo general.
export const TEMAS: Tema[] = [
  {
    id: 'enfoques',
    titulo: 'Enfoques de la IA',
    corto: 'Enfoques',
    resumen: 'Los cuatro cuadrantes y los enfoques técnicos: reglas, búsqueda, optimización, ML, DL e híbridos.',
    enExamen: 'En los casos: «¿cuál es su enfoque?». También en opción múltiple.',
  },
  {
    id: 'ramas',
    titulo: 'Ramas de la IA',
    corto: 'Ramas',
    resumen: 'Las once ramas, cada una con su definición y su flujo de flechas.',
    enExamen: 'En los casos: «¿a qué rama pertenece?». Es el inciso más repetido.',
  },
  {
    id: 'etica',
    titulo: 'Ética e implicaciones sociales',
    corto: 'Ética',
    resumen: 'Los 8 riesgos, el método PRDM, las leyes de datos personales y los derechos ARCO.',
    enExamen: 'En los casos: «¿qué problemas y daños éticos tiene?». Las leyes van en opción múltiple.',
  },
  {
    id: 'logica',
    titulo: 'Lógica y tablas de verdad',
    corto: 'Lógica',
    resumen: 'Simbolizar, tablas, tautología/contradicción/contingencia, De Morgan y conclusiones.',
    enExamen: 'Simbolizar y hacer dos tablas, sacar conclusiones de un enunciado, y clasificar justificando.',
  },
  {
    id: 'casos',
    titulo: 'Casos tipo examen',
    corto: 'Casos',
    resumen: 'Un caso real de IA con cuatro incisos: rama, enfoque, riesgo ético y mitigación.',
    enExamen: 'Son 10 de las 18 preguntas del examen.',
  },
  {
    id: 'conceptos',
    titulo: 'Conceptos base',
    corto: 'Conceptos',
    resumen: 'Datos, algoritmo, modelo, aprender, entrenamiento e inferencia.',
    enExamen: 'Opción múltiple. Sostienen todo lo demás.',
  },
  {
    id: 'que-es',
    titulo: '¿Qué es la IA?',
    corto: 'Qué es la IA',
    resumen: 'La inteligencia como conjunto de habilidades. IA débil e IA fuerte.',
    enExamen: 'Opción múltiple general.',
  },
  {
    id: 'historia',
    titulo: 'Antecedentes e historia',
    corto: 'Historia',
    resumen: 'De Hobbes y Boole a GPT-3: qué cambió en cada momento.',
    enExamen: 'Opción múltiple general.',
  },
  {
    id: 'aplicaciones',
    titulo: 'Aplicaciones y estado del arte',
    corto: 'Aplicaciones',
    resumen: 'Sistemas de control, aerogeneradores, PINN y frontera del conocimiento.',
    enExamen: 'Puede salir en opción múltiple.',
  },
];

export const tema = (id: IdTema): Tema => {
  const t = TEMAS.find((x) => x.id === id);
  if (!t) throw new Error(`Tema desconocido: ${id}`);
  return t;
};
