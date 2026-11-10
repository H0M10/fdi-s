// Inicio, página de tema, laboratorio interactivo de Unidad 2 y repaso.

import { useState } from 'react';
import { ComparadorAlgoritmos } from '../busqueda/ComparadorAlgoritmos';
import { SimuladorGrafo } from '../componentes/SimuladorGrafo';
import { SimuladorGenetico, SimuladorLocal } from '../componentes/SimuladorOptimizacion';
import { LECCIONES } from '../contenido/lecciones';
import { deTema, porId, TODAS } from '../contenido/preguntas';
import {
  anterior, BLOQUES, BLOQUES_U2, esDeU2, listaDeUnidad, numero, siguiente, tema, TEMAS, TEMAS_U2,
} from '../contenido/temas';
import { reiniciar, resumen, useProgreso } from '../progreso';
import { ir } from '../rutas';
import type { IdTema } from '../tipos';
import { Practica } from './Practica';

/* ------------------------------------------------------------------ */
/* Inicio                                                             */
/* ------------------------------------------------------------------ */
export function Inicio({ unidadInicial = 2 }: { unidadInicial?: 1 | 2 }) {
  const [unidad, setUnidad] = useState<1 | 2>(unidadInicial);
  const progreso = useProgreso();
  const preguntasUnidad = TODAS.filter((p) => (unidad === 2 ? esDeU2(p.tema) : !esDeU2(p.tema)));
  const global = resumen(preguntasUnidad.map((p) => p.id), progreso);
  const fallidas = TODAS.filter((p) => progreso[p.id] && progreso[p.id].ultimo < 1).length;

  const bloques = unidad === 2 ? BLOQUES_U2 : BLOQUES;
  const temas = unidad === 2 ? TEMAS_U2 : TEMAS;

  return (
    <div className="pagina">
      <p className="rotulo">Fundamentos de Inteligencia Artificial</p>
      <h1>Todo lo del examen, tema por tema</h1>
      <p className="entrada">
        Explicaciones con los apuntes de clase, simuladores interactivos de los 20 Colabs, {TODAS.length} preguntas
        para practicar y simulacros con el formato del examen.
      </p>

      <div className="pestanas" role="tablist" style={{ marginTop: 18, marginBottom: 6 }}>
        <button role="tab" aria-selected={unidad === 2} onClick={() => setUnidad(2)}>
          Unidad 2 · Algoritmos de búsqueda ({TEMAS_U2.length} temas)
        </button>
        <button role="tab" aria-selected={unidad === 1} onClick={() => setUnidad(1)}>
          Unidad 1 · Fundamentos y Lógica ({TEMAS.length} temas)
        </button>
      </div>

      {unidad === 2 ? (
        <section className="examen-tarjeta" aria-labelledby="examen-titulo-u2">
          <p className="rotulo">Cómo es el examen de la Unidad 2</p>
          <h2 id="examen-titulo-u2">Teórico, de casos y de interpretar código Python (sin programar desde cero)</h2>
          <div className="examen-bloques">
            <div className="examen-bloque">
              <div className="num">6</div>
              <div className="que">Temas oficiales</div>
              <p>1. Problemas · 2. Espacio/Grafos · 3. Ciega (BFS/DFS) · 4. Heurística (Greedy/A*) · 5. Local (HC/SA) · 6. Genéticos.</p>
            </div>
            <div className="examen-bloque">
              <div className="num">20</div>
              <div className="que">Colabs explicados</div>
              <p>Para qué sirve cada línea clave (`deque.popleft`, `aislar_nodo`, `heapq`, `exp(delta/T)`, `argsort`, `cruza_ox`) y qué pasa al mover parámetros.</p>
            </div>
            <div className="examen-bloque">
              <div className="num">18</div>
              <div className="que">Preguntas en el simulacro</div>
              <p>8 preguntas rápidas de casos/código y 10 casos integradores con 4 incisos de modelado, traza, Python y fallos.</p>
            </div>
          </div>
          <div className="fila">
            <button className="boton examen" onClick={() => ir('simulacro-u2')}>Hacer simulacro Unidad 2</button>
            <button className="boton sec" onClick={() => ir('comparar')}>Comparar todos los algoritmos (cuándo usar cada uno)</button>
            <button className="boton sec" onClick={() => ir('lab')}>Abrir laboratorio interactivo (Grafos / Local / AG)</button>
            {fallidas > 0 && <button className="boton sec" onClick={() => ir('repaso')}>Repasar {fallidas} falladas</button>}
          </div>
        </section>
      ) : (
        <section className="examen-tarjeta" aria-labelledby="examen-titulo-u1">
          <p className="rotulo">Cómo es el examen de la Unidad 1</p>
          <h2 id="examen-titulo-u1">18 preguntas, según los que ya lo presentaron</h2>
          <div className="examen-bloques">
            <div className="examen-bloque">
              <div className="num">8</div>
              <div className="que">Opción múltiple</div>
              <p>Generales: ramas, enfoques, leyes. «Esas están fáciles.»</p>
            </div>
            <div className="examen-bloque">
              <div className="num">10</div>
              <div className="que">Casos con 4 incisos</div>
              <p>Te dan un caso de IA y te piden la rama, el enfoque y los problemas éticos.</p>
            </div>
            <div className="examen-bloque">
              <div className="num">2+</div>
              <div className="que">Tablas de verdad</div>
              <p>Simbolizar y hacer la tabla, sacar conclusiones, y clasificar justificando.</p>
            </div>
          </div>
          <div className="fila">
            <button className="boton examen" onClick={() => ir('simulacro-u1')}>Hacer simulacro Unidad 1</button>
            <button className="boton sec" onClick={() => ir('tablas')}>Practicar tablas a mano</button>
            {fallidas > 0 && <button className="boton sec" onClick={() => ir('repaso')}>Repasar {fallidas} falladas</button>}
          </div>
        </section>
      )}

      <div className="fila" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2>Temas de la Unidad {unidad}, en orden de estudio</h2>
        {global.vistas > 0 && (
          <span className="medidor-texto">{global.dominadas} de {global.total} dominadas</span>
        )}
      </div>
      <p style={{ fontSize: 14, color: 'var(--tinta-2)', margin: '6px 0 0', maxWidth: '62ch' }}>
        Van en el orden en que se dieron en clase, que también es el orden en que se necesitan: cada uno usa lo
        del anterior.
      </p>
      {bloques.map((b) => (
        <section key={b.id} className="bloque-temas" aria-labelledby={`bloque-${b.id}`}>
          <div className="bloque-temas-cabeza">
            <h3 id={`bloque-${b.id}`}>{b.titulo}</h3>
            <p>{b.idea}</p>
          </div>
          <div className="temas-rejilla">
            {temas.filter((t) => t.bloque === b.id).map((t) => {
              const r = resumen(deTema(t.id).map((p) => p.id), progreso);
              return (
                <button key={t.id} className="tema-tarjeta" onClick={() => ir(`tema-${t.id}`)}>
                  <span className="tema-num">U{unidad} · {numero(t.id)}</span>
                  <h3>{t.titulo}</h3>
                  <p>{t.resumen}</p>
                  <span className="en-examen">{t.enExamen}</span>
                  <div className="medidor">
                    <div className="medidor-barra"><div className="medidor-relleno" style={{ width: `${(r.dominadas / r.total) * 100}%` }} /></div>
                    <span className="medidor-texto">{r.dominadas}/{r.total}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <footer className="pie">
        <p>
          Construido sobre los apuntes de clase y los 20 notebooks de Google Colab. Los bloques azules son lo que dijo
          el profesor; los rojos, correcciones de errores del apunte; los morados, explicaciones línea por línea del código Python;
          y los amarillos, puntos pendientes por confirmar.
        </p>
        <p>
          Las respuestas de lógica (U1) y las trazas de BFS, DFS, Greedy, A*, Hill Climbing, Simulated Annealing y
          Algoritmos Genéticos (U2) las calculan motores verificados con pruebas automáticas.
        </p>
        {global.vistas > 0 && (
          <p><button className="boton fant chico" onClick={() => reiniciar()}>Borrar mi progreso</button></p>
        )}
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página de un tema                                                  */
/* ------------------------------------------------------------------ */
export function PaginaTema({ id, practicar }: { id: IdTema; practicar: boolean }) {
  const t = tema(id);
  const Leccion = LECCIONES[id];
  const preguntas = deTema(id);
  const progreso = useProgreso();
  const r = resumen(preguntas.map((p) => p.id), progreso);
  const ant = anterior(id);
  const sig = siguiente(id);
  const u2 = esDeU2(id);
  const lista = listaDeUnidad(id);
  const todosBloques = [...BLOQUES, ...BLOQUES_U2];
  const bloque = todosBloques.find((b) => b.id === t.bloque)!;

  return (
    <div className="pagina angosta">
      <div className="tema-cabecera">
        <p className="rotulo">
          Unidad {u2 ? 2 : 1} · Tema {numero(id)} de {lista.length} · {bloque.titulo}
        </p>
        <h1>{t.titulo}</h1>
        <p className="entrada">{t.resumen}</p>
        <div className="bloque ojo" style={{ marginTop: 16, marginBottom: 0 }}>
          <span className="etiqueta">En el examen</span>
          <p>{t.enExamen}</p>
        </div>
      </div>

      <div className="pestanas" role="tablist">
        <button role="tab" aria-selected={!practicar} onClick={() => ir(`tema-${id}`)}>Aprender</button>
        <button role="tab" aria-selected={practicar} onClick={() => ir(`practica-${id}`)}>
          Practicar · {preguntas.length}
        </button>
        <span style={{ marginLeft: 'auto', alignSelf: 'center' }} className="medidor-texto">{r.dominadas}/{r.total}</span>
      </div>

      {practicar ? (
        <Practica
          preguntas={preguntas}
          siguienteTema={sig ? { numero: numero(sig.id), titulo: sig.titulo, ir: () => ir(`tema-${sig.id}`) } : undefined}
          alVolverLeccion={() => ir(`tema-${id}`)}
        />
      ) : (
        <>
          <article className="leccion"><Leccion /></article>
          <div className="fila" style={{ marginTop: 10 }}>
            <button className="boton" onClick={() => { ir(`practica-${id}`); window.scrollTo({ top: 0 }); }}>
              Practicar con {preguntas.length} preguntas →
            </button>
          </div>
        </>
      )}

      <nav className="vecinos" aria-label="Orden de estudio">
        {ant ? (
          <button className="vecino" onClick={() => ir(`tema-${ant.id}`)}>
            <span className="vecino-rotulo">← Anterior</span>
            <span className="vecino-titulo">{numero(ant.id)}. {ant.titulo}</span>
          </button>
        ) : <span />}
        {sig ? (
          <button className="vecino siguiente" onClick={() => ir(`tema-${sig.id}`)}>
            <span className="vecino-rotulo">Siguiente →</span>
            <span className="vecino-titulo">{numero(sig.id)}. {sig.titulo}</span>
          </button>
        ) : (
          <button className="vecino siguiente" onClick={() => ir(u2 ? 'simulacro-u2' : 'simulacro-u1')}>
            <span className="vecino-rotulo">Terminaste los temas →</span>
            <span className="vecino-titulo">Haz un simulacro de Unidad {u2 ? 2 : 1}</span>
          </button>
        )}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comparador general de todos los algoritmos de la Unidad 2          */
/* ------------------------------------------------------------------ */
export function ComparadorU2() {
  const [temaPractica, setTemaPractica] = useState<'todos' | IdTema>('todos');
  const preguntasU2 = TODAS.filter((p) =>
    temaPractica === 'todos' ? esDeU2(p.tema) : p.tema === temaPractica,
  );

  return (
    <div className="pagina">
      <p className="rotulo">Unidad 2 · Todo en un solo lugar (Temas 1 al 6 en orden + Gráficos + Práctica)</p>
      <h1>Guía Completa de Estudio para el Examen de la Unidad 2</h1>
      <p className="entrada">
        Aquí tienes absolutamente todo en orden del Tema 1 al Tema 6 sin salir de esta página: qué es cada concepto,
        representaciones gráficas de cómo se mueven BFS, DFS, Greedy, A*, Hill Climbing, Simulated Annealing y
        Algoritmos Genéticos, qué es $g(n)$ y $h(n)$, óptimos locales vs globales, qué pasa al mover cada parámetro y
        todas las preguntas de práctica abajo.
      </p>
      <div style={{ marginTop: 18 }}>
        <ComparadorAlgoritmos />
      </div>

      {/* BANCO DE PRÁCTICA INTEGRADO EN LA MISMA PÁGINA */}
      <section className="tarjeta" style={{ marginTop: 28, border: '2px solid var(--acento)' }}>
        <p className="rotulo">Practicar aquí mismo sin cambiar de página</p>
        <h2 style={{ margin: '4px 0 8px' }}>
          Autoevaluación de todos los temas ({preguntasU2.length} preguntas y casos)
        </h2>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--tinta-2)' }}>
          Filtra por tema o contéstalas todas aquí mismo para comprobar que ya dominas la teoría, los grafos escritos y
          la interpretación de parámetros:
        </p>
        <div className="fila" style={{ gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <button
            type="button"
            className={temaPractica === 'todos' ? 'boton chico' : 'boton sec chico'}
            onClick={() => setTemaPractica('todos')}
          >
            Todas las de Unidad 2 ({TODAS.filter((p) => esDeU2(p.tema)).length})
          </button>
          {TEMAS_U2.map((t) => (
            <button
              key={t.id}
              type="button"
              className={temaPractica === t.id ? 'boton chico' : 'boton sec chico'}
              onClick={() => setTemaPractica(t.id)}
            >
              {t.corto} ({deTema(t.id).length})
            </button>
          ))}
        </div>
        <Practica key={temaPractica} preguntas={preguntasU2} />
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Laboratorio interactivo de Unidad 2                                */
/* ------------------------------------------------------------------ */
export function LaboratorioU2() {
  const [vista, setVista] = useState<'comparar' | 'grafos' | 'local' | 'genetico'>('grafos');

  return (
    <div className="pagina">
      <p className="rotulo">Unidad 2 · Laboratorio interactivo</p>
      <h1>Experimenta con los algoritmos de los Colabs</h1>
      <p className="entrada">
        Prueba qué pasa cuando aíslas un nodo en el grafo, cambias de BFS a DFS o de Greedy a A*, o mueves el punto
        inicial $x_0$, la temperatura $T_0$, el enfriamiento $\alpha$, el tamaño de población y la probabilidad de mutación.
      </p>

      <div className="pestanas" role="tablist" style={{ marginTop: 18, marginBottom: 20 }}>
        <button role="tab" aria-selected={vista === 'comparar'} onClick={() => setVista('comparar')}>
          0. Comparar todos (¿Cuándo usar cada uno?)
        </button>
        <button role="tab" aria-selected={vista === 'grafos'} onClick={() => setVista('grafos')}>
          1. Grafos: BFS, DFS, Greedy y A*
        </button>
        <button role="tab" aria-selected={vista === 'local'} onClick={() => setVista('local')}>
          2. Búsqueda Local: Hill Climbing vs Simulated Annealing
        </button>
        <button role="tab" aria-selected={vista === 'genetico'} onClick={() => setVista('genetico')}>
          3. Algoritmos Genéticos (Práctica 4)
        </button>
      </div>

      {vista === 'comparar' && <ComparadorAlgoritmos />}
      {vista === 'grafos' && <SimuladorGrafo escenarioInicial="nube" algoritmoInicial="a_estrella" />}
      {vista === 'local' && <SimuladorLocal />}
      {vista === 'genetico' && <SimuladorGenetico />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Repaso de lo fallado                                               */
/* ------------------------------------------------------------------ */
export function Repaso() {
  const progreso = useProgreso();
  const [ids] = useState(() => Object.keys(progreso).filter((k) => progreso[k].ultimo < 1 && porId.has(k)));
  const preguntas = ids.map((k) => porId.get(k)!);

  return (
    <div className="pagina angosta">
      <p className="rotulo">Repaso</p>
      <h1>Lo que has fallado</h1>
      <p className="entrada">
        Cada pregunta que contestas mal se guarda aquí. Cuando la aciertes, sale de la lista la próxima vez que entres.
      </p>
      <div style={{ marginTop: 22 }}>
        {preguntas.length === 0 ? (
          <div className="vacio">
            <p style={{ margin: 0 }}>No tienes preguntas falladas pendientes.</p>
            <p style={{ margin: '10px 0 0' }}><button className="boton sec" onClick={() => ir('simulacro')}>Hacer un simulacro</button></p>
          </div>
        ) : (
          <Practica preguntas={preguntas} />
        )}
      </div>
    </div>
  );
}
