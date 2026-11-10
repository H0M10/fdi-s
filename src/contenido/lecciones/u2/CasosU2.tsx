import { ComparadorAlgoritmos } from '../../../busqueda/ComparadorAlgoritmos';
import {
  Correccion,
  Ejemplo,
  Ojo,
  Profe,
  S,
  Seccion,
  Tabla,
} from '../../../componentes/Leccion';

export default function CasosU2() {
  return (
    <>
      <Seccion titulo="Cómo será realmente el examen impreso de la Unidad 2">
        <Profe>
          <p>
            El examen <strong>NO es de programar código desde cero</strong> ni te va a preguntar de memoria qué hiciste
            en el inciso F de una práctica. El examen impreso evalúa tres cosas muy concretas:
          </p>
          <ol>
            <li>
              <strong>Preguntas teóricas y diferencias conceptuales:</strong> ¿Qué es cada concepto?, ¿por qué se usa?,
              ¿cuál es la diferencia entre dos cosas (ej. Estado vs Nodo, Meta vs Solución, FIFO vs LIFO, Greedy vs A*,
              Óptimo local vs Global, Búsqueda local vs Algoritmo Genético)?
            </li>
            <li>
              <strong>Plantear y resolver problemas nuevos en papel:</strong> Te dan un caso nuevo (un robot, cruzar un
              río, una ruta, un horario) y tú debes identificar su <strong>Inicio, Estados, Acciones, Meta, Restricciones y Solución</strong>,
              o elegir qué algoritmo conviene usar y por qué.
            </li>
            <li>
              <strong>Preguntas básicas de Python («¿Para qué sirve tal cosa?»):</strong> ¿Para qué sirve una librería
              (<S>deque</S>, <S>heapq</S>, <S>networkx</S>, <S>random</S>, <S>math</S>)?, ¿para qué sirve el ciclo{' '}
              <S>while</S>?, ¿qué hace <S>popleft()</S> vs <S>pop()</S>?, ¿para qué sirve <S>visitados = set()</S> o{' '}
              <S>break</S>?
            </li>
          </ol>
        </Profe>
      </Seccion>

      <Seccion titulo="Comparador general: ¿Cuándo, dónde y por qué usar cada algoritmo?">
        <p>
          Aquí tienes en un solo lugar todos los algoritmos de la Unidad 2 (<strong>BFS, DFS, Greedy, A*, Hill
          Climbing, Simulated Annealing y Algoritmos Genéticos</strong>) para comparar qué necesita cada uno (solo
          grafo, solo heurística, heurística + peso real, 1 solución o población), cuál ocupa más recursos y cómo
          diferenciarlos en el examen:
        </p>
        <ComparadorAlgoritmos />
      </Seccion>

      <Seccion titulo="1. ¿Para qué sirve cada Librería de Python que usamos en la Unidad 2?">
        <p>
          Si en el examen viene una pregunta de opción múltiple o abierta sobre los <S>import</S> de Python, aquí tienes
          exactamente para qué sirve cada librería:
        </p>

        <Tabla
          cabeza={['Librería / import en Python', '¿En qué algoritmos se usa?', '¿Para qué sirve exactamente? (Respuesta de examen)']}
          filas={[
            [
              'from collections import deque',
              'BFS (Búsqueda en Anchura)',
              'Proporciona la estructura deque (cola de doble extremo). Sirve para crear una Cola FIFO rápida donde metemos nodos al final con append() y sacamos el primero que entró con popleft().',
            ],
            [
              'import heapq',
              'Greedy Best-First Search y A*',
              'Implementa una Cola de Prioridad (min-heap). Sirve para mantener los nodos ordenados automáticamente por su valor de prioridad y sacar siempre el de MENOR valor (menor h o menor f = g + h) con heapq.heappop().',
            ],
            [
              'import networkx as nx',
              'Espacio de búsqueda y Grafos',
              'Sirve para construir y manipular la estructura matemática del grafo en memoria: agregar nodos (G.add_node), agregar conexiones/aristas (G.add_edge) y definir si es no dirigido (nx.Graph) o dirigido con flechas (nx.DiGraph).',
            ],
            [
              'import matplotlib.pyplot as plt',
              'Todos los temas (visualización)',
              'Sirve únicamente para dibujar y mostrar en pantalla las gráficas: los diagramas de los grafos, la curva de la función f(x) o la gráfica de convergencia generación por generación.',
            ],
            [
              'import math',
              'Simulated Annealing y funciones objetivo',
              'Proporciona funciones matemáticas como math.sin() (para evaluar curvas con ondas) y sobre todo math.exp(delta / T), que calcula la probabilidad e^(Δ/T) de aceptar un vecino peor en Simulated Annealing.',
            ],
            [
              'import random',
              'Hill Climbing (horarios), Simulated Annealing y Algoritmos Genéticos',
              'Sirve para generar números y elecciones al azar en los algoritmos estocásticos: elegir un vecino aleatorio (random.choice), tirar un dado entre 0 y 1 (random.random), elegir competidores del torneo (random.sample) o fijar la semilla (random.seed).',
            ],
            [
              'import numpy as np',
              'Algoritmos Genéticos',
              'Sirve para manejar arreglos numéricos de poblaciones completas de forma rápida, ordenar índices de menor a mayor costo (np.argsort), recortar valores a los límites del dominio (np.clip) y generar ruido gaussiano (rng.normal).',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="2. ¿Para qué sirve cada Palabra Reservada y Estructura de Python en los algoritmos?">
        <p>
          Esta tabla conecta cada elemento básico de Python (<S>while</S>, <S>set</S>, <S>continue</S>, <S>break</S>,{' '}
          <S>popleft</S>, <S>pop</S>, diccionarios) con la función lógica que cumple dentro de la búsqueda:
        </p>

        <Tabla
          cabeza={['Elemento / Instrucción', '¿Qué es en Python?', '¿Para qué sirve dentro de nuestros algoritmos de búsqueda?']}
          filas={[
            [
              'while cola: / while pila:',
              'Ciclo condicional (mientras la estructura no esté vacía).',
              'Mantiene al algoritmo explorando paso a paso MIENTRAS todavía queden nodos pendientes por revisar. Si la cola/pila se queda vacía, el while termina porque ya no hay más caminos.',
            ],
            [
              'for vecino in grafo[nodo]:',
              'Ciclo para recorrer una lista.',
              'Sirve para revisar uno por uno a todos los nodos vecinos conectados directamente con el nodo actual.',
            ],
            [
              'visitados = set()',
              'Conjunto (colección sin elementos repetidos).',
              'Guarda los nodos que ya fueron explorados. Sirve para NO visitar dos veces el mismo estado y evitar que el algoritmo caiga en un ciclo infinito (bucle sin fin).',
            ],
            [
              'if nodo in visitados:\n    continue',
              'Palabra reservada continue (saltar iteración).',
              'Si el nodo que acabamos de sacar ya había sido visitado antes, continue ignora el resto del código de ese paso y salta directo al siguiente elemento del while.',
            ],
            [
              'if nodo == meta:\n    return camino',
              'Condición de éxito y retorno de función.',
              'Verifica si ya llegamos al estado objetivo; cuando se cumple, detiene toda la búsqueda y entrega la lista de pasos (camino) que llevó hasta ahí.',
            ],
            [
              'cola.popleft()',
              'Método de deque (Cola FIFO: First In, First Out).',
              'Saca y devuelve el PRIMER elemento que entró a la cola (el más antiguo). Es el corazón de BFS porque obliga a revisar el grafo nivel por nivel.',
            ],
            [
              'pila.pop()',
              'Método de lista (Pila LIFO: Last In, First Out).',
              'Saca y devuelve el ÚLTIMO elemento que se metió a la lista (el más reciente). Es el corazón de DFS porque obliga a irse hasta el fondo de una sola rama.',
            ],
            [
              'reversed(vecinos)',
              'Función que invierte el orden de una secuencia.',
              'En DFS, mete los vecinos en orden inverso a la pila para que el primer vecino de la lista quede hasta arriba (en el tope) y sea el primero en salir con pop().',
            ],
            [
              'Diccionario {clave: valor}',
              'Estructura de mapa clave → valor.',
              'Se usa para dos cosas: 1) Representar el grafo (cada nodo apunta a su lista de vecinos) y 2) Guardar la tabla de heurísticas h(n) o el mejor_costo g(n) de cada nodo.',
            ],
            [
              '"Nodo": [] (lista vacía)',
              'Nodo con cero vecinos en el diccionario.',
              'Representa una restricción o bloqueo: el lugar sigue existiendo en el mapa, pero está aislado (nadie puede salir de él).',
            ],
            [
              'len(camino) - 1 vs len(visitados)',
              'Función len() (longitud de una colección).',
              'len(visitados) dice cuántos nodos distintos abrimos en toda la búsqueda; len(camino) - 1 dice cuántos PASOS (aristas/saltos) tiene la ruta final desde el inicio hasta la meta.',
            ],
            [
              'if mejor == actual:\n    break',
              'Palabra reservada break (romper ciclo).',
              'En Hill Climbing, si después de revisar a todos los vecinos ninguno fue mejor que el estado actual, break detiene el ciclo porque ya llegamos a una cima (máximo local o global).',
            ],
            [
              'random.random() < prob',
              'Número aleatorio uniforme en [0, 1).',
              'Funciona como tirar un dado de probabilidad: en Simulated Annealing acepta un vecino peor con probabilidad P = exp(delta/T), y en Algoritmos Genéticos decide si se aplica cruce o mutación.',
            ],
            [
              'poblacion.sort(key=fitness, reverse=True)',
              'Ordenamiento de lista.',
              'En un Algoritmo Genético que maximiza, ordena a todos los individuos del mayor al menor fitness para dejar a los mejores al principio (poblacion[0]) y aplicar elitismo (poblacion[:n_elite]).',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="3. Tabla de diferencias clave entre todos los temas («¿Qué es y por qué se usa?») ">
        <Tabla
          cabeza={['Pregunta de examen', 'Concepto A', 'Concepto B', 'Diferencia clave en 1 renglón']}
          filas={[
            [
              'Tema 1: ¿Meta vs Solución?',
              'Meta: El estado final al que quieres llegar (ej. estar en P5).',
              'Solución: La secuencia de pasos desde el inicio hasta la meta (PB→P1→...→P5).',
              'La meta es el destino; la solución es todo el camino para llegar a él.',
            ],
            [
              'Tema 1 y 2: ¿Estado vs Nodo?',
              'Estado: La información de la situación actual (ej. [0, 3] litros).',
              'Nodo: El punto o vértice que representa a ese estado dentro del dibujo del grafo.',
              'El estado es la información lógica; el nodo es su representación gráfica en el mapa.',
            ],
            [
              'Tema 1 y 2: ¿Problema de búsqueda vs Espacio de búsqueda?',
              'Problema: Definir las reglas (inicio, estados, acciones, meta, restricciones).',
              'Espacio de búsqueda: El grafo completo con todas las posibilidades y caminos que generan esas reglas.',
              'El problema son las reglas; el espacio de búsqueda es el mapa de todas las posibilidades.',
            ],
            [
              'Tema 3: ¿Búsqueda Ciega vs Búsqueda Heurística (Tema 4)?',
              'Búsqueda Ciega (BFS/DFS): No tiene pistas ni costos; explora a ciegas solo con las conexiones.',
              'Búsqueda Heurística (Greedy/A*): Usa una estimación h(n) («corazonada») para guiar la búsqueda hacia la meta.',
              'La ciega explora sin saber qué tan cerca está la meta; la heurística usa pistas h(n) para orientarse.',
            ],
            [
              'Tema 3: ¿BFS (Anchura) vs DFS (Profundidad)?',
              'BFS: Usa Cola FIFO (popleft), explora por niveles y SÍ garantiza el camino con menos pasos.',
              'DFS: Usa Pila LIFO (pop), se hunde hasta el fondo de una rama y NO garantiza el camino más corto.',
              'BFS barre por capas (FIFO, óptimo en pasos); DFS se va hasta el fondo de un camino (LIFO).',
            ],
            [
              'Tema 4: ¿Greedy vs A*?',
              'Greedy: Usa solo f(n) = h(n) (lo que cree que falta); puede irse por un camino carísimo si h(n) lo engaña.',
              'A*: Usa f(n) = g(n) + h(n) (costo real acumulado + estimación); encuentra el camino de menor costo total.',
              'Greedy ignora el costo real de las aristas g(n); A* suma lo que ya costó g(n) más lo que falta h(n).',
            ],
            [
              'Tema 5: ¿Máximo Local vs Máximo Global?',
              'Máximo Local: Una solución mejor que sus vecinos inmediatos, pero más baja que otra cima del mapa.',
              'Máximo Global: La mejor solución absoluta de todo el espacio de búsqueda.',
              'El local es la cima de una colina pequeña (donde se atora Hill Climbing); el global es el pico más alto de todo el mapa.',
            ],
            [
              'Tema 5: ¿Hill Climbing vs Simulated Annealing?',
              'Hill Climbing: Solo acepta vecinos que mejoren estrictamente; se detiene en el primer máximo local.',
              'Simulated Annealing: Al inicio (temperatura T alta) acepta vecinos peores con probabilidad e^(Δ/T) para saltar valles.',
              'Hill Climbing nunca acepta bajar; Simulated Annealing acepta bajadas controladas por T para escapar de máximos locales.',
            ],
            [
              'Tema 5 vs Tema 6: ¿Búsqueda Local vs Algoritmo Genético?',
              'Búsqueda Local (HC/SA): Trabaja con UNA sola solución y camina a sus vecinos.',
              'Algoritmo Genético: Trabaja con una POBLACIÓN de muchas soluciones a la vez que se seleccionan, cruzan y mutan.',
              'La búsqueda local mueve 1 sola solución en su vecindad; el genético evoluciona muchas soluciones en todo el mapa.',
            ],
            [
              'Tema 6: ¿Cruzamiento vs Mutación vs Elitismo?',
              'Cruzamiento: Combina dos padres para crear un hijo con partes de ambos.',
              'Mutación: Altera al azar un hijo para meter diversidad nueva. Elitismo: Pasa intacto al mejor individuo.',
              'Cruzar combina lo bueno que ya existe; mutar inventa cambios nuevos; elitismo protege al mejor para no perderlo.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="4. Cómo elegir qué algoritmo usar cuando te ponen un caso nuevo en el examen">
        <Ejemplo titulo="Guía rápida de decisión para casos prácticos">
          <ul>
            <li>
              <strong>¿Te piden solo plantear el problema sin buscar todavía?</strong> → Es <strong>Tema 1</strong>:
              escribe su <em>Inicio, Estados, Acciones, Meta, Restricciones y Solución</em>.
            </li>
            <li>
              <strong>¿Te piden representar el mapa de conexiones o quitar un lugar bloqueado?</strong> → Es{' '}
              <strong>Tema 2 (Espacio de búsqueda / Grafo)</strong>: cada estado es un nodo y cada acción permitida es
              una arista.
            </li>
            <li>
              <strong>¿El mapa NO tiene costos ni pistas y quieres el menor número de pasos/saltos?</strong> → Usa{' '}
              <strong>BFS (Búsqueda en Anchura)</strong> con su cola <strong>FIFO</strong>.
            </li>
            <li>
              <strong>¿Quieres explorar una rama hasta el fondo gastando poca memoria o haciendo backtracking en un laberinto?</strong>{' '}
              → Usa <strong>DFS (Búsqueda en Profundidad)</strong> con su pila <strong>LIFO</strong>.
            </li>
            <li>
              <strong>¿Solo tienes una estimación rápida $h(n)$ de cercanía a la meta y quieres decidir rápido sin importar el costo acumulado?</strong>{' '}
              → Es <strong>Greedy Best-First Search</strong> ($f(n) = h(n)$).
            </li>
            <li>
              <strong>¿El mapa tiene costos reales (km, minutos, ms) y también una estimación $h(n)$, y necesitas garantizar el camino más barato total?</strong>{' '}
              → Usa <strong>A* (A Estrella)</strong> ($f(n) = g(n) + h(n)$).
            </li>
            <li>
              <strong>¿Ya tienes una solución armada (ej. una ruta en Maps o un horario) y solo quieres ajustarla rápido con cambios pequeños sin que haya trampas locales?</strong>{' '}
              → Usa <strong>Hill Climbing</strong>.
            </li>
            <li>
              <strong>¿Partes de una sola solución pero el problema tiene muchos picos/trampas locales y necesitas saltar valles?</strong>{' '}
              → Usa <strong>Simulated Annealing (Recocido Simulado)</strong>.
            </li>
            <li>
              <strong>¿El problema es muy grande o complejo y quieres proponer muchas soluciones al mismo tiempo para buscar el óptimo global evolucionándolas?</strong>{' '}
              → Usa un <strong>Algoritmo Genético (Evolutivo)</strong>.
            </li>
          </ul>
        </Ejemplo>

        <Ojo titulo="Nota sobre el proyecto de 3 fases (apunte del 9/10)">
          <p>
            Recuerda también los 3 pasos del proyecto integrador que mencionó el profesor el 9/10 (como el clasificador
            inteligente de residuos de vidrio/metal):
            <br />
            <strong>Fase 1 (1/3):</strong> Interfaz gráfica en Python (botones y probar subir/mostrar imagen). ·{' '}
            <strong>Fase 2 (2/3):</strong> Buscar y depurar la base de datos en <strong>Kaggle.com</strong>. ·{' '}
            <strong>Fase 3 (3/3):</strong> Integrar los algoritmos con el equipo.
          </p>
        </Ojo>

        <Correccion>
          <p>
            En el mensaje de WhatsApp del 9/10 quedó escrito <em>«Kendde.com»</em> para buscar los datasets: el nombre
            correcto es <strong>Kaggle.com</strong>.
          </p>
        </Correccion>
      </Seccion>
    </>
  );
}
