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

export const BLOQUES_U2 = [
  { id: 'u2-modelado', titulo: 'Modelar el problema y el mapa (Temas 1 y 2)', idea: 'Antes de buscar un camino hay que definir estados, acciones, restricciones y el grafo.' },
  { id: 'u2-grafos', titulo: 'Recorrer un grafo (Temas 3 y 4)', idea: 'Búsqueda ciega (BFS y DFS) frente a búsqueda informada con heurísticas (Greedy y A*).' },
  { id: 'u2-optimizacion', titulo: 'Mejorar soluciones y evolucionar poblaciones (Temas 5 y 6)', idea: 'Búsqueda local (Hill Climbing y Simulated Annealing) y Algoritmos Genéticos.' },
  { id: 'u2-cierre', titulo: 'Código Python y casos tipo examen', idea: 'Lectura de código de los Colabs y casos integradores como los del examen.' },
] as const;

export type IdBloqueU2 = (typeof BLOQUES_U2)[number]['id'];

export const TEMAS_U2: (Tema & { bloque: IdBloqueU2 })[] = [
  {
    id: 'u2-problemas',
    bloque: 'u2-modelado',
    titulo: '1. Problemas de búsqueda',
    corto: 'Problemas',
    resumen: 'Inicio, estados, acciones y meta (+ solución y restricciones). Cómo abstraer y codificar un problema (elevador, jarras, interruptores, esposos celosos).',
    enExamen: 'Identificar los 4 elementos, restricciones y cómo se codifica un estado.',
  },
  {
    id: 'u2-espacio',
    bloque: 'u2-modelado',
    titulo: '2. Espacio de búsqueda y grafos',
    corto: 'Espacio',
    resumen: 'Diferencia entre problema y espacio de búsqueda. Nodo (lugar) vs estado (información), trayectorias y nodos aislados por fallas en NetworkX.',
    enExamen: 'Efecto de una restricción o nodo fuera de servicio en el diccionario grafo.',
  },
  {
    id: 'u2-ciega',
    bloque: 'u2-grafos',
    titulo: '3. Búsqueda ciega: BFS y DFS',
    corto: 'BFS y DFS',
    resumen: 'Por qué es ciega. BFS por niveles con cola FIFO (deque.popleft) vs DFS por rama profunda con pila LIFO (pop y reversed). El conjunto visitados.',
    enExamen: 'Comparar orden, camino, pasos (len(camino)-1), cola vs pila y cuándo devuelve None.',
  },
  {
    id: 'u2-heuristica',
    bloque: 'u2-grafos',
    titulo: '4. Búsqueda heurística: Greedy y A*',
    corto: 'Greedy y A*',
    resumen: 'La heurística h(n) como estimación («corazonada»). Greedy solo mira h(n); A* equilibra f(n) = g(n) + h(n) con heapq y mejor_costo.',
    enExamen: 'Calcular f(n) = g(n) + h(n), predecir qué nodo explora cada uno y qué pasa al cambiar costos o heurísticas.',
  },
  {
    id: 'u2-local',
    bloque: 'u2-optimizacion',
    titulo: '5. Búsqueda local: Hill Climbing y Simulated Annealing',
    corto: 'Búsqueda local',
    resumen: 'Mejorar una solución revisando vecinos (Maps, horarios 2+2+1+1+0). Hill Climbing se atora en máximos locales; Simulated Annealing escapa con P = e^(Δ/T).',
    enExamen: 'Efecto del punto inicial x0, temperatura T0, enfriamiento alpha, semilla y por qué guardar mejor aparte de actual.',
  },
  {
    id: 'u2-geneticos',
    bloque: 'u2-optimizacion',
    titulo: '6. Algoritmos genéticos (evolutivos)',
    corto: 'Alg. genéticos',
    resumen: 'Población inicial, fitness, selección (Truncamiento, Torneo, Ruleta, Ranking), cruzamiento, mutación, elitismo y curvas de convergencia.',
    enExamen: 'Interpretar curvas de convergencia (línea plana), costo poblacion×(gen+1), métodos de selección/cruza/mutación y efecto del elitismo.',
  },
  {
    id: 'u2-casos',
    bloque: 'u2-cierre',
    titulo: 'Código Python y casos tipo examen (U2)',
    corto: 'Casos y código U2',
    resumen: 'Para qué sirve cada línea clave de los 20 Colabs y casos integradores con incisos de modelado, traza, parámetros y código.',
    enExamen: 'El profesor dijo que no será de programar desde cero, sino teórico, de casos y de explicar qué hace o para qué sirve el código.',
  },
];

export const TODOS_LOS_TEMAS = [...TEMAS, ...TEMAS_U2];

export const esDeU2 = (id: IdTema) => id.startsWith('u2-');

export const listaDeUnidad = (id: IdTema) => (esDeU2(id) ? TEMAS_U2 : TEMAS);

export const tema = (id: IdTema) => {
  const t = TODOS_LOS_TEMAS.find((x) => x.id === id);
  if (!t) throw new Error(`Tema desconocido: ${id}`);
  return t;
};

/** Posición del tema dentro de su unidad, empezando en 1. */
export const numero = (id: IdTema) => listaDeUnidad(id).findIndex((t) => t.id === id) + 1;

export const anterior = (id: IdTema) => listaDeUnidad(id)[numero(id) - 2];
export const siguiente = (id: IdTema) => listaDeUnidad(id)[numero(id)];
