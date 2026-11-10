// Pruebas del motor de búsqueda y optimización (Unidad 2).
//
// Verifica que cada algoritmo en TypeScript devuelva exactamente los mismos
// recorridos, caminos, costos y óptimos que los cuadernos de Colab de clase.

import { describe, expect, it } from 'vitest';
import {
  aEstrella,
  aislarNodo,
  aSimple,
  bfs,
  dfs,
  ejecutarAG,
  ESCENARIOS_GRAFO,
  fnDosPicos,
  fnPractica3,
  fnPractica4AG,
  greedy,
  hillClimbing,
  simulatedAnnealing,
} from './motor';

describe('búsqueda ciega: BFS y DFS', () => {
  const cicd = aSimple(ESCENARIOS_GRAFO.find((e) => e.id === 'cicd')!.grafo);

  it('Práctica 1 (CI/CD): BFS explora por niveles y DFS por profundidad', () => {
    const resBfs = bfs(cicd, 'Repositorio-Local', 'Entorno-Producción');
    const resDfs = dfs(cicd, 'Repositorio-Local', 'Entorno-Producción');

    expect(resBfs.camino).toEqual([
      'Repositorio-Local',
      'Servidor-Git',
      'Orquestador-CI',
      'Analizador-Calidad',
      'Gestor-Pipeline',
      'Entorno-Producción',
    ]);
    expect(resDfs.camino).toEqual([
      'Repositorio-Local',
      'Servidor-Git',
      'Orquestador-CI',
      'Analizador-Calidad',
      'Gestor-Pipeline',
      'Compilador',
      'Registro-Contenedores',
      'Entorno-Producción',
    ]);
    // BFS garantiza el menor número de saltos (5); DFS se mete por Compilador (7 saltos)
    expect(resBfs.camino!.length - 1).toBe(5);
    expect(resDfs.camino!.length - 1).toBe(7);
  });

  it('aislar Analizador-Calidad conserva la llave en el grafo pero redirige por Compilador', () => {
    const conFalla = aislarNodo(cicd, 'Analizador-Calidad');
    expect(Object.keys(conFalla)).toContain('Analizador-Calidad');
    expect(conFalla['Analizador-Calidad']).toEqual([]);

    const resBfs = bfs(conFalla, 'Repositorio-Local', 'Entorno-Producción');
    expect(resBfs.camino).toContain('Compilador');
    expect(resBfs.camino).not.toContain('Analizador-Calidad');

    // Y Servicio-Pruebas queda inalcanzable (devuelve null sin ciclarse)
    const sinRuta = bfs(conFalla, 'Repositorio-Local', 'Servicio-Pruebas');
    expect(sinRuta.camino).toBeNull();
  });

  it('Ejercicio 7 (Explorador DFS): DFS toma un camino más largo que BFS y depende del orden de vecinos', () => {
    const mapa = {
      'Campamento': ['Bosque', 'Río'],
      'Bosque': ['Campamento', 'Cueva', 'Colina'],
      'Río': ['Campamento', 'Mirador', 'Pantano'],
      'Cueva': ['Bosque', 'Ruinas'],
      'Colina': ['Bosque', 'Ruinas'],
      'Ruinas': ['Cueva', 'Colina', 'Templo', 'Pantano'],
      'Mirador': ['Río', 'Templo'],
      'Templo': ['Ruinas', 'Mirador'],
      'Pantano': ['Río', 'Ruinas'],
    };
    const rDfs = dfs(mapa, 'Campamento', 'Mirador');
    const rBfs = bfs(mapa, 'Campamento', 'Mirador');
    // BFS llega en 2 pasos (Campamento -> Río -> Mirador); DFS da toda la vuelta por Bosque
    expect(rBfs.camino!.length - 1).toBe(2);
    expect(rDfs.camino!.length - 1).toBeGreaterThan(2);
  });
});

describe('búsqueda heurística: Greedy vs A*', () => {
  const nube = ESCENARIOS_GRAFO.find((e) => e.id === 'nube')!;

  it('Práctica 2 (Servicios en la nube): Greedy gasta 10 engañado por h(API-B)=1, pero A* encuentra la óptima de costo 7', () => {
    const rGreedy = greedy(nube.grafo, nube.heuristica, nube.inicio, nube.meta);
    const rA = aEstrella(nube.grafo, nube.heuristica, nube.inicio, nube.meta);

    expect(rGreedy.camino).toEqual(['Cliente', 'Gateway-B', 'API-B', 'Servidor-Objetivo']);
    expect(rGreedy.costo).toBe(10);

    // A* explora primero Gateway-B (f=4 < f=7), pero rectifica hacia Gateway-A -> API-A
    expect(rA.orden[1]).toBe('Gateway-B');
    expect(rA.camino).toEqual(['Cliente', 'Gateway-A', 'API-A', 'Servidor-Objetivo']);
    expect(rA.costo).toBe(7);
  });

  it('Ejercicio 10 (Ciudad): Greedy con heurística original va por Mercado -> Estadio -> Avenida -> Hospital', () => {
    const ciudad = ESCENARIOS_GRAFO.find((e) => e.id === 'ciudad')!;
    const r = greedy(ciudad.grafo, ciudad.heuristica, ciudad.inicio, ciudad.meta);
    expect(r.orden).toEqual(['Terminal', 'Mercado', 'Estadio', 'Avenida', 'Hospital']);
    expect(r.camino).toEqual(['Terminal', 'Mercado', 'Estadio', 'Avenida', 'Hospital']);
  });
});

describe('búsqueda local: Hill Climbing vs Simulated Annealing', () => {
  it('Ejercicio Hill Climbing (dos picos): desde x=1 se atora en el máximo local x=3, y desde x=7 llega al global x=9', () => {
    const desde1 = hillClimbing(fnDosPicos, 1, 0, 12);
    const desde7 = hillClimbing(fnDosPicos, 7, 0, 12);
    expect(desde1.mejorX).toBe(3);
    expect(desde1.mejorF).toBe(3);
    expect(desde7.mejorX).toBe(9);
    expect(desde7.mejorF).toBe(9);
  });

  it('Práctica 3: Hill Climbing desde x=2 se atora en un máximo local menor que Simulated Annealing', () => {
    const hc = hillClimbing(fnPractica3, 2, 0, 20);
    const sa = simulatedAnnealing(fnPractica3, 2, 30, 0.97, 100, 0, 20, 25);
    expect(hc.mejorX).toBe(1);
    expect(sa.mejorF).toBeGreaterThan(hc.mejorF);
    expect(sa.peoresAceptados).toBeGreaterThan(0);
  });
});

describe('algoritmos genéticos', () => {
  it('Práctica 4: con elitismo >= 1 el mejor fitness nunca disminuye y calcula bien las evaluaciones', () => {
    const res = ejecutarAG(fnPractica4AG, {
      tamanoPoblacion: 18,
      generaciones: 40,
      probMutacion: 0.08,
      seleccion: 'torneo',
      elitismo: 1,
      semilla: 33,
    });
    expect(res.evaluaciones).toBe(18 * 41);
    expect(res.mejorFitness).toBeGreaterThan(25);
    for (let i = 1; i < res.historial.length; i++) {
      expect(res.historial[i]).toBeGreaterThanOrEqual(res.historial[i - 1] - 1e-9);
    }
  });
});
