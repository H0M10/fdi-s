// Motor de algoritmos de búsqueda y optimización de la Unidad 2.
//
// Replica exactamente la lógica de los 20 cuadernos de Colab (BFS, DFS,
// Greedy Best-First Search, A*, Hill Climbing, Simulated Annealing y
// Algoritmos Genéticos) para que los simuladores, las trazas de las
// lecciones y las pruebas automáticas estén verificados matemáticamente.

export type GrafoSimple = Record<string, string[]>;
export type GrafoPonderado = Record<string, [string, number][]>;

export interface PasoCiega {
  frontera: string[]; // Cola (BFS) o Pila (DFS) antes de extraer
  visitando: string;
  camino: string[];
  profundidad: number;
  visitados: string[];
}

export interface ResultadoCiega {
  orden: string[];
  camino: string[] | null;
  pasos: PasoCiega[];
}

export interface CandidatoInformada {
  nodo: string;
  g: number;
  h: number;
  f: number;
}

export interface PasoInformada {
  pendientes: CandidatoInformada[];
  explorando: string;
  g: number;
  h: number;
  f: number;
  camino: string[];
}

export interface ResultadoInformada {
  orden: string[];
  camino: string[] | null;
  costo: number | null;
  pasos: PasoInformada[];
}

/**
 * Aísla un nodo fuera de servicio como piden las prácticas:
 * 1) Conserva la llave en el diccionario con lista vacía `[]`.
 * 2) Elimina toda referencia hacia ese nodo desde las listas de los demás.
 */
export function aislarNodo(grafo: GrafoSimple, nodoCaido: string): GrafoSimple {
  const copia: GrafoSimple = {};
  for (const [estado, vecinos] of Object.entries(grafo)) {
    if (estado === nodoCaido) {
      copia[estado] = [];
    } else {
      copia[estado] = vecinos.filter((v) => v !== nodoCaido);
    }
  }
  return copia;
}

export function aislarNodoPonderado(grafo: GrafoPonderado, nodoCaido: string): GrafoPonderado {
  const copia: GrafoPonderado = {};
  for (const [estado, vecinos] of Object.entries(grafo)) {
    if (estado === nodoCaido) {
      copia[estado] = [];
    } else {
      copia[estado] = vecinos.filter(([v]) => v !== nodoCaido);
    }
  }
  return copia;
}

/** Convierte un grafo simple (sin pesos) en grafo ponderado con costo 1 por arista. */
export function aPonderado(grafo: GrafoSimple): GrafoPonderado {
  const out: GrafoPonderado = {};
  for (const [u, vecinos] of Object.entries(grafo)) {
    out[u] = vecinos.map((v) => [v, 1]);
  }
  return out;
}

/** Convierte un grafo ponderado en grafo simple descartando los costos. */
export function aSimple(grafo: GrafoPonderado): GrafoSimple {
  const out: GrafoSimple = {};
  for (const [u, vecinos] of Object.entries(grafo)) {
    out[u] = vecinos.map(([v]) => v);
  }
  return out;
}

/**
 * Búsqueda en Anchura (BFS) — Cola FIFO (`popleft` / `shift`).
 * Explora por niveles y garantiza el camino con menor número de pasos.
 */
export function bfs(grafo: GrafoSimple, inicio: string, meta: string): ResultadoCiega {
  const cola: [string, string[]][] = [[inicio, [inicio]]];
  const visitados = new Set<string>();
  const orden: string[] = [];
  const pasos: PasoCiega[] = [];

  while (cola.length > 0) {
    const frontera = cola.map(([n]) => n);
    const [nodo, camino] = cola.shift()!;

    if (visitados.has(nodo)) continue;

    visitados.add(nodo);
    orden.push(nodo);
    pasos.push({
      frontera,
      visitando: nodo,
      camino,
      profundidad: camino.length - 1,
      visitados: [...visitados],
    });

    if (nodo === meta) {
      return { orden, camino, pasos };
    }

    for (const vecino of grafo[nodo] ?? []) {
      if (!visitados.has(vecino)) {
        cola.push([vecino, [...camino, vecino]]);
      }
    }
  }

  return { orden, camino: null, pasos };
}

/**
 * Búsqueda en Profundidad (DFS) — Pila LIFO (`pop`).
 * Inserta los vecinos en orden inverso (`reversed`) como en los Colabs de clase
 * para que el primer vecino declarado quede en el tope de la pila.
 */
export function dfs(grafo: GrafoSimple, inicio: string, meta: string): ResultadoCiega {
  const pila: [string, string[]][] = [[inicio, [inicio]]];
  const visitados = new Set<string>();
  const orden: string[] = [];
  const pasos: PasoCiega[] = [];

  while (pila.length > 0) {
    const frontera = pila.map(([n]) => n);
    const [nodo, camino] = pila.pop()!;

    if (visitados.has(nodo)) continue;

    visitados.add(nodo);
    orden.push(nodo);
    pasos.push({
      frontera,
      visitando: nodo,
      camino,
      profundidad: camino.length - 1,
      visitados: [...visitados],
    });

    if (nodo === meta) {
      return { orden, camino, pasos };
    }

    const vecinos = [...(grafo[nodo] ?? [])].reverse();
    for (const vecino of vecinos) {
      if (!visitados.has(vecino)) {
        pila.push([vecino, [...camino, vecino]]);
      }
    }
  }

  return { orden, camino: null, pasos };
}

/**
 * Greedy Best-First Search — Cola de prioridad ordenada solo por `h(n)`.
 * Calcula el costo acumulado real únicamente para reportarlo al final, pero
 * NO lo usa para decidir qué nodo explorar (f(n) = h(n)).
 */
export function greedy(
  grafo: GrafoPonderado,
  heuristica: Record<string, number>,
  inicio: string,
  meta: string,
): ResultadoInformada {
  // [h, contador, nodo, camino, costoAcumulado]
  const cola: [number, number, string, string[], number][] = [
    [heuristica[inicio] ?? 0, 0, inicio, [inicio], 0],
  ];
  let contador = 1;
  const visitados = new Set<string>();
  const orden: string[] = [];
  const pasos: PasoInformada[] = [];

  const ordenarCola = () => {
    cola.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
  };

  while (cola.length > 0) {
    ordenarCola();
    const pendientes: CandidatoInformada[] = cola.map(([h, , n, , g]) => ({
      nodo: n,
      g,
      h,
      f: h,
    }));

    const [h, , nodo, camino, costoAcumulado] = cola.shift()!;

    if (visitados.has(nodo)) continue;

    visitados.add(nodo);
    orden.push(nodo);
    pasos.push({
      pendientes,
      explorando: nodo,
      g: costoAcumulado,
      h,
      f: h,
      camino,
    });

    if (nodo === meta) {
      return { orden, camino, costo: costoAcumulado, pasos };
    }

    for (const [vecino, costo] of grafo[nodo] ?? []) {
      if (!visitados.has(vecino)) {
        cola.push([
          heuristica[vecino] ?? 0,
          contador++,
          vecino,
          [...camino, vecino],
          costoAcumulado + costo,
        ]);
      }
    }
  }

  return { orden, camino: null, costo: null, pasos };
}

/**
 * Algoritmo A* — Cola de prioridad ordenada por `f(n) = g(n) + h(n)`.
 * Lleva diccionario `mejorCosto` exactamente como en el Colab 12 y Práctica 23.
 */
export function aEstrella(
  grafo: GrafoPonderado,
  heuristica: Record<string, number>,
  inicio: string,
  meta: string,
): ResultadoInformada {
  // [f, g, contador, nodo, camino]
  const h0 = heuristica[inicio] ?? 0;
  const cola: [number, number, number, string, string[]][] = [
    [h0, 0, 0, inicio, [inicio]],
  ];
  let contador = 1;
  const mejorCosto: Record<string, number> = { [inicio]: 0 };
  const orden: string[] = [];
  const pasos: PasoInformada[] = [];

  const ordenarCola = () => {
    cola.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2]));
  };

  while (cola.length > 0) {
    ordenarCola();
    const pendientes: CandidatoInformada[] = cola.map(([f, g, , n]) => ({
      nodo: n,
      g,
      h: heuristica[n] ?? 0,
      f,
    }));

    const [f, g, , nodo, camino] = cola.shift()!;

    if (g !== mejorCosto[nodo]) continue;

    orden.push(nodo);
    pasos.push({
      pendientes,
      explorando: nodo,
      g,
      h: heuristica[nodo] ?? 0,
      f,
      camino,
    });

    if (nodo === meta) {
      return { orden, camino, costo: g, pasos };
    }

    for (const [vecino, costo] of grafo[nodo] ?? []) {
      const nuevoG = g + costo;
      if (mejorCosto[vecino] === undefined || nuevoG < mejorCosto[vecino]) {
        mejorCosto[vecino] = nuevoG;
        const nuevoF = nuevoG + (heuristica[vecino] ?? 0);
        cola.push([nuevoF, nuevoG, contador++, vecino, [...camino, vecino]]);
      }
    }
  }

  return { orden, camino: null, costo: null, pasos };
}

/* ------------------------------------------------------------------ */
/* Búsqueda Local: Hill Climbing y Simulated Annealing                */
/* ------------------------------------------------------------------ */

export interface PasoHC {
  actual: number;
  fActual: number;
  vecinos: { x: number; fx: number }[];
  mejorVecino: number;
  fMejorVecino: number;
  mejoro: boolean;
}

export interface ResultadoHC {
  recorrido: number[];
  mejorX: number;
  mejorF: number;
  pasos: PasoHC[];
}

export function hillClimbing(
  fn: (x: number) => number,
  inicio: number,
  xMin = 0,
  xMax = 20,
): ResultadoHC {
  let actual = inicio;
  const recorrido = [actual];
  const pasos: PasoHC[] = [];

  while (true) {
    const fActual = fn(actual);
    const candidatos: number[] = [];
    if (actual - 1 >= xMin) candidatos.push(actual - 1);
    if (actual + 1 <= xMax) candidatos.push(actual + 1);

    const vecinos = candidatos.map((x) => ({ x, fx: fn(x) }));
    let mejor = actual;
    let fMejor = fActual;
    for (const v of vecinos) {
      if (v.fx > fMejor) {
        mejor = v.x;
        fMejor = v.fx;
      }
    }

    const mejoro = mejor !== actual;
    pasos.push({
      actual,
      fActual,
      vecinos,
      mejorVecino: mejor,
      fMejorVecino: fMejor,
      mejoro,
    });

    if (!mejoro) break;
    actual = mejor;
    recorrido.push(actual);
  }

  return { recorrido, mejorX: actual, mejorF: fn(actual), pasos };
}

/** Generador pseudoaleatorio determinista con semilla para reproducir experimentos. */
export function crearRng(semilla: number): () => number {
  let s = (semilla >>> 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export interface PasoSA {
  iteracion: number;
  actual: number;
  vecino: number;
  fActual: number;
  fVecino: number;
  delta: number;
  T: number;
  P: number;
  r: number;
  aceptar: boolean;
  mejorHastaAhora: number;
}

export interface ResultadoSA {
  actualFinal: number;
  mejorX: number;
  mejorF: number;
  recorrido: number[];
  peoresAceptados: number;
  rechazados: number;
  historial: PasoSA[];
}

export function simulatedAnnealing(
  fn: (x: number) => number,
  inicio: number,
  T0 = 30,
  alpha = 0.97,
  iteraciones = 100,
  xMin = 0,
  xMax = 20,
  semilla = 25,
): ResultadoSA {
  const rng = crearRng(semilla);
  let actual = inicio;
  let mejor = actual;
  let T = T0;
  const recorrido = [actual];
  let peoresAceptados = 0;
  let rechazados = 0;
  const historial: PasoSA[] = [];

  for (let i = 1; i <= iteraciones; i++) {
    const vecinos: number[] = [];
    if (actual - 1 >= xMin) vecinos.push(actual - 1);
    if (actual + 1 <= xMax) vecinos.push(actual + 1);

    const vecino = vecinos[Math.floor(rng() * vecinos.length)];
    const fActual = fn(actual);
    const fVecino = fn(vecino);
    const delta = fVecino - fActual;

    let P = 1.0;
    const r = rng();
    let aceptar = true;

    if (delta < 0) {
      P = Math.exp(delta / Math.max(T, 1e-9));
      aceptar = r < P;
    }

    if (aceptar) {
      if (delta < 0) peoresAceptados++;
      actual = vecino;
      recorrido.push(actual);
      if (fn(actual) > fn(mejor)) {
        mejor = actual;
      }
    } else {
      rechazados++;
    }

    historial.push({
      iteracion: i,
      actual,
      vecino,
      fActual,
      fVecino,
      delta,
      T,
      P,
      r,
      aceptar,
      mejorHastaAhora: mejor,
    });

    T = alpha * T;
  }

  return {
    actualFinal: actual,
    mejorX: mejor,
    mejorF: fn(mejor),
    recorrido,
    peoresAceptados,
    rechazados,
    historial,
  };
}

/* ------------------------------------------------------------------ */
/* Algoritmo Genético (Práctica 4 y Ejemplos 17, 18 y 19)             */
/* ------------------------------------------------------------------ */

export interface ConfigAG {
  tamanoPoblacion: number;
  generaciones: number;
  probMutacion: number;
  seleccion: 'torneo' | 'ruleta';
  elitismo: number;
  semilla?: number;
}

export interface ResultadoAG {
  mejorX: number;
  mejorFitness: number;
  generacionMejor: number;
  historial: number[]; // Mejor fitness de cada generación
  poblacionInicial: number[];
  poblacionFinal: number[];
  evaluaciones: number;
}

export function ejecutarAG(
  fn: (x: number) => number,
  config: ConfigAG,
  xMin = 0,
  xMax = 22,
): ResultadoAG {
  const {
    tamanoPoblacion,
    generaciones,
    probMutacion,
    seleccion,
    elitismo,
    semilla = 33,
  } = config;
  const rng = crearRng(semilla);
  const uniforme = (a: number, b: number) => a + rng() * (b - a);

  let poblacion = Array.from({ length: tamanoPoblacion }, () => uniforme(xMin, xMax));
  const poblacionInicial = [...poblacion];
  const historial: number[] = [];

  let mejorGlobal = poblacion[0];
  for (const x of poblacion) {
    if (fn(x) > fn(mejorGlobal)) mejorGlobal = x;
  }
  let generacionMejor = 0;

  const elegirTorneo = (pob: number[], k = 3): number => {
    let mejor = pob[Math.floor(rng() * pob.length)];
    for (let i = 1; i < Math.min(k, pob.length); i++) {
      const cand = pob[Math.floor(rng() * pob.length)];
      if (fn(cand) > fn(mejor)) mejor = cand;
    }
    return mejor;
  };

  const elegirRuleta = (pob: number[]): number => {
    const valores = pob.map((x) => fn(x));
    const minVal = Math.min(...valores);
    const pesos = valores.map((v) => v - minVal + 1e-6);
    const suma = pesos.reduce((s, p) => s + p, 0);
    let giro = rng() * suma;
    for (let i = 0; i < pob.length; i++) {
      giro -= pesos[i];
      if (giro <= 0) return pob[i];
    }
    return pob[pob.length - 1];
  };

  const seleccionarPadre = (pob: number[]) =>
    seleccion === 'torneo' ? elegirTorneo(pob) : elegirRuleta(pob);

  for (let gen = 0; gen < generaciones; gen++) {
    poblacion.sort((a, b) => fn(b) - fn(a));
    const mejorGen = poblacion[0];
    const fMejorGen = fn(mejorGen);
    historial.push(fMejorGen);

    if (fMejorGen > fn(mejorGlobal) + 1e-9) {
      mejorGlobal = mejorGen;
      generacionMejor = gen;
    }

    const nElite = Math.max(0, Math.min(Math.floor(elitismo), tamanoPoblacion));
    const nueva = poblacion.slice(0, nElite);

    while (nueva.length < tamanoPoblacion) {
      const p1 = seleccionarPadre(poblacion);
      const p2 = seleccionarPadre(poblacion);
      const a = rng();
      let hijo = a * p1 + (1 - a) * p2;
      if (rng() < probMutacion) {
        hijo += uniforme(-2.0, 2.0);
      }
      hijo = Math.max(xMin, Math.min(xMax, hijo));
      nueva.push(hijo);
    }

    poblacion = nueva;
  }

  for (const x of poblacion) {
    if (fn(x) > fn(mejorGlobal) + 1e-9) {
      mejorGlobal = x;
      generacionMejor = generaciones;
    }
  }

  return {
    mejorX: mejorGlobal,
    mejorFitness: fn(mejorGlobal),
    generacionMejor,
    historial,
    poblacionInicial,
    poblacionFinal: poblacion,
    evaluaciones: tamanoPoblacion * (generaciones + 1),
  };
}

/* ------------------------------------------------------------------ */
/* Funciones y Grafos de las Prácticas de Clase                       */
/* ------------------------------------------------------------------ */

/** Práctica 3 y Ejercicio 16: f(x) = 0.6x + 8 sen(1.3x) + 4 sen(2.4x) en [0, 20] */
export const fnPractica3 = (x: number) =>
  0.6 * x + 8 * Math.sin(1.3 * x) + 4 * Math.sin(2.4 * x);

/** Ejercicio Hill Climbing: f(x) = -((x-3)^2)((x-9)^2) + x en [0, 12] */
export const fnDosPicos = (x: number) =>
  -Math.pow(x - 3, 2) * Math.pow(x - 9, 2) + x;

/** Práctica 4 (AG): f(x) = 0.6x + 10 sen(1.4x) + 9 en [0, 22] */
export const fnPractica4AG = (x: number) =>
  0.6 * x + 10 * Math.sin(1.4 * x) + 9;

export interface EscenarioGrafo {
  id: string;
  titulo: string;
  descripcion: string;
  grafo: GrafoPonderado;
  heuristica: Record<string, number>;
  inicio: string;
  meta: string;
  nodoFallaSugerido: string;
  pos: Record<string, [number, number]>; // Coordenadas [0..100, 0..100] para dibujar en SVG
  tienePesos: boolean;
}

export const ESCENARIOS_GRAFO: EscenarioGrafo[] = [
  {
    id: 'nube',
    titulo: 'Práctica 2 · Servicios en la Nube (Greedy vs A*)',
    descripcion: 'Enrutamiento de Cliente a Servidor-Objetivo con costos de latencia g(n) y heurística h(n).',
    inicio: 'Cliente',
    meta: 'Servidor-Objetivo',
    nodoFallaSugerido: 'API-A',
    tienePesos: true,
    grafo: {
      'Cliente': [['Gateway-A', 2], ['Gateway-B', 1]],
      'Gateway-A': [['Cliente', 2], ['API-A', 2], ['API-B', 5]],
      'Gateway-B': [['Cliente', 1], ['API-B', 7], ['Cache', 2]],
      'API-A': [['Gateway-A', 2], ['Servidor-Objetivo', 3]],
      'API-B': [['Gateway-A', 5], ['Gateway-B', 7], ['Servidor-Objetivo', 2]],
      'Cache': [['Gateway-B', 2], ['Servidor-Objetivo', 8]],
      'Servidor-Objetivo': [['API-A', 3], ['API-B', 2], ['Cache', 8]],
    },
    heuristica: {
      'Cliente': 7,
      'Gateway-A': 5,
      'Gateway-B': 3,
      'API-A': 3,
      'API-B': 1,
      'Cache': 5,
      'Servidor-Objetivo': 0,
    },
    pos: {
      'Cliente': [10, 50],
      'Gateway-A': [35, 22],
      'Gateway-B': [35, 78],
      'API-A': [63, 18],
      'API-B': [63, 50],
      'Cache': [63, 82],
      'Servidor-Objetivo': [90, 50],
    },
  },
  {
    id: 'cicd',
    titulo: 'Práctica 1 · Pipeline CI/CD (BFS vs DFS)',
    descripcion: 'Flujo desde Repositorio-Local hasta Entorno-Producción. Prueba aislar Analizador-Calidad.',
    inicio: 'Repositorio-Local',
    meta: 'Entorno-Producción',
    nodoFallaSugerido: 'Analizador-Calidad',
    tienePesos: false,
    grafo: aPonderado({
      'Repositorio-Local': ['Servidor-Git'],
      'Servidor-Git': ['Repositorio-Local', 'Orquestador-CI'],
      'Orquestador-CI': ['Servidor-Git', 'Analizador-Calidad', 'Compilador'],
      'Analizador-Calidad': ['Orquestador-CI', 'Gestor-Pipeline', 'Servicio-Pruebas'],
      'Compilador': ['Orquestador-CI', 'Registro-Contenedores', 'Gestor-Pipeline'],
      'Gestor-Pipeline': ['Analizador-Calidad', 'Compilador', 'Entorno-Producción'],
      'Servicio-Pruebas': ['Analizador-Calidad'],
      'Registro-Contenedores': ['Compilador', 'Entorno-Producción'],
      'Entorno-Producción': ['Gestor-Pipeline', 'Registro-Contenedores', 'Repositorio-Backups'],
      'Repositorio-Backups': ['Entorno-Producción'],
    }),
    heuristica: {
      'Repositorio-Local': 5,
      'Servidor-Git': 4,
      'Orquestador-CI': 3,
      'Analizador-Calidad': 2,
      'Compilador': 2,
      'Gestor-Pipeline': 1,
      'Servicio-Pruebas': 3,
      'Registro-Contenedores': 1,
      'Entorno-Producción': 0,
      'Repositorio-Backups': 2,
    },
    pos: {
      'Repositorio-Local': [8, 50],
      'Servidor-Git': [23, 50],
      'Orquestador-CI': [38, 50],
      'Analizador-Calidad': [54, 24],
      'Compilador': [54, 76],
      'Servicio-Pruebas': [72, 12],
      'Gestor-Pipeline': [72, 46],
      'Registro-Contenedores': [72, 82],
      'Entorno-Producción': [88, 60],
      'Repositorio-Backups': [94, 25],
    },
  },
  {
    id: 'wifi',
    titulo: 'Integrador · Infraestructura Wi-Fi (BFS vs DFS)',
    descripcion: 'Ruta desde Laptop hasta Servidor-Intranet. Prueba poner Switch-Piso1 fuera de servicio.',
    inicio: 'Laptop',
    meta: 'Servidor-Intranet',
    nodoFallaSugerido: 'Switch-Piso1',
    tienePesos: false,
    grafo: aPonderado({
      'Laptop': ['AP-Aula'],
      'AP-Aula': ['Laptop', 'Controlador-WiFi'],
      'AP-Laboratorio': ['Controlador-WiFi'],
      'Controlador-WiFi': ['AP-Aula', 'AP-Laboratorio', 'Switch-Piso1', 'Switch-Piso2'],
      'Switch-Piso1': ['Controlador-WiFi', 'Router-Principal'],
      'Switch-Piso2': ['Controlador-WiFi', 'Router-Principal', 'Servidor-Archivos'],
      'Router-Principal': ['Switch-Piso1', 'Switch-Piso2', 'Firewall'],
      'Firewall': ['Router-Principal', 'Servidor-Intranet'],
      'Servidor-Archivos': ['Switch-Piso2', 'Servidor-Intranet'],
      'Servidor-Intranet': ['Firewall', 'Servidor-Archivos'],
    }),
    heuristica: {
      'Laptop': 5,
      'AP-Aula': 4,
      'AP-Laboratorio': 4,
      'Controlador-WiFi': 3,
      'Switch-Piso1': 2,
      'Switch-Piso2': 2,
      'Router-Principal': 2,
      'Firewall': 1,
      'Servidor-Archivos': 1,
      'Servidor-Intranet': 0,
    },
    pos: {
      'Laptop': [8, 35],
      'AP-Aula': [22, 35],
      'AP-Laboratorio': [22, 75],
      'Controlador-WiFi': [38, 52],
      'Switch-Piso1': [56, 28],
      'Switch-Piso2': [56, 75],
      'Router-Principal': [73, 28],
      'Firewall': [86, 28],
      'Servidor-Archivos': [76, 75],
      'Servidor-Intranet': [92, 55],
    },
  },
  {
    id: 'almacen',
    titulo: 'Ejercicio 2 · Robot en Almacén (Espacio de búsqueda)',
    descripcion: 'De Recepción a Embarque. Prueba aislar Almacén 1 por fuga.',
    inicio: 'Recepción',
    meta: 'Embarque',
    nodoFallaSugerido: 'Almacén 1',
    tienePesos: false,
    grafo: aPonderado({
      'Recepción': ['Pasillo A', 'Pasillo B'],
      'Pasillo A': ['Recepción', 'Almacén 1'],
      'Pasillo B': ['Recepción', 'Almacén 1', 'Almacén 2'],
      'Almacén 1': ['Pasillo A', 'Pasillo B', 'Inspección'],
      'Almacén 2': ['Pasillo B', 'Ensamble'],
      'Inspección': ['Almacén 1', 'Ensamble', 'Calidad'],
      'Ensamble': ['Almacén 2', 'Inspección', 'Calidad'],
      'Calidad': ['Inspección', 'Ensamble', 'Empaque'],
      'Empaque': ['Calidad', 'Embarque'],
      'Embarque': ['Empaque'],
    }),
    heuristica: {
      'Recepción': 6,
      'Pasillo A': 5,
      'Pasillo B': 5,
      'Almacén 1': 4,
      'Almacén 2': 4,
      'Inspección': 3,
      'Ensamble': 3,
      'Calidad': 2,
      'Empaque': 1,
      'Embarque': 0,
    },
    pos: {
      'Recepción': [8, 50],
      'Pasillo A': [24, 25],
      'Pasillo B': [24, 75],
      'Almacén 1': [42, 25],
      'Almacén 2': [42, 75],
      'Inspección': [58, 25],
      'Ensamble': [58, 75],
      'Calidad': [74, 50],
      'Empaque': [86, 50],
      'Embarque': [95, 50],
    },
  },
  {
    id: 'ciudad',
    titulo: 'Ejercicio 10 · Mapa de la Ciudad (Greedy)',
    descripcion: 'Recorrido desde Terminal hasta Hospital guiado por heurística h(n).',
    inicio: 'Terminal',
    meta: 'Hospital',
    nodoFallaSugerido: 'Mercado',
    tienePesos: false,
    grafo: aPonderado({
      'Terminal': ['Centro', 'Mercado', 'Universidad'],
      'Centro': ['Terminal', 'Museo', 'Parque'],
      'Mercado': ['Terminal', 'Parque', 'Estadio'],
      'Universidad': ['Terminal', 'Biblioteca'],
      'Museo': ['Centro', 'Clínica'],
      'Parque': ['Centro', 'Mercado', 'Clínica'],
      'Estadio': ['Mercado', 'Avenida'],
      'Biblioteca': ['Universidad', 'Avenida'],
      'Clínica': ['Museo', 'Parque', 'Hospital'],
      'Avenida': ['Estadio', 'Biblioteca', 'Hospital'],
      'Hospital': ['Clínica', 'Avenida'],
    }),
    heuristica: {
      'Terminal': 12,
      'Centro': 8,
      'Mercado': 6,
      'Universidad': 10,
      'Museo': 7,
      'Parque': 5,
      'Estadio': 4,
      'Biblioteca': 6,
      'Clínica': 2,
      'Avenida': 3,
      'Hospital': 0,
    },
    pos: {
      'Terminal': [10, 50],
      'Centro': [32, 20],
      'Mercado': [32, 50],
      'Universidad': [32, 82],
      'Museo': [55, 15],
      'Parque': [55, 38],
      'Estadio': [55, 62],
      'Biblioteca': [55, 85],
      'Clínica': [76, 30],
      'Avenida': [76, 70],
      'Hospital': [92, 50],
    },
  },
];

