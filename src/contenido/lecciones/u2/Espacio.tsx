import {
  Codigo,
  Ejemplo,
  Ojo,
  Profe,
  S,
  Seccion,
  Tabla,
} from '../../../componentes/Leccion';
import { SimuladorGrafo } from '../../../componentes/SimuladorGrafo';

export default function Espacio() {
  return (
    <>
      <Seccion titulo="¿Qué es el espacio de búsqueda?">
        <Profe cita>
          Ahora espacio de búsqueda, ¿qué es? Ya definimos cómo es el problema; ahora el espacio de búsqueda son las
          posibilidades. Acciones y restricciones son lo que nos define nuestro espacio de búsqueda. Todavía no estamos
          haciendo nada de búsqueda: en el Tema 1 definimos estados y ahora en el Tema 2 esto sería un mapa.
        </Profe>
        <p>
          El <strong>espacio de búsqueda</strong> es el conjunto completo de <strong>todos los estados posibles</strong>{' '}
          y <strong>todas las transiciones (conexiones) válidas</strong> entre ellos. No representa una sola solución,
          sino el mapa entero de posibilidades: tanto las rutas que llegan a la meta como los caminos que dan vuelta o
          terminan en un callejón sin salida.
        </p>

        <Tabla
          cabeza={['Tema 1 · Definir el problema', 'Tema 2 · Construir el espacio de búsqueda']}
          filas={[
            [
              'Dice qué se quiere resolver: inicio, estados, acciones permitidas, restricciones y meta.',
              'Despliega todas las posibilidades disponibles como un grafo (el mapa completo de nodos y conexiones).',
            ],
            [
              'A la forma de llegar a la meta se le llama «solución» (los pasos).',
              'Al recorrido de nodo en nodo dentro del grafo se le llama «trayectoria» o «secuencia».',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="El vocabulario de grafos en clase">
        <Profe>
          <p>
            Los espacios de búsqueda los vamos a trabajar con <strong>grafos</strong>. Un grafo es{' '}
            <em>«un diagrama en el que pasamos de estado en estado»</em>.
          </p>
          <p>
            <strong>El estado es la información</strong>, pero en el grafo también es un <strong>nodo</strong>, y{' '}
            <strong>el nodo es el lugar</strong>. Para llegar a otro nodo vamos a necesitar{' '}
            <strong>trayectorias (secuencias)</strong>.
          </p>
        </Profe>

        <Tabla
          cabeza={['Concepto del problema', 'En el grafo', 'En el código de Python']}
          filas={[
            [
              'Estado (la información o situación)',
              'Nodo (el lugar o punto)',
              'Cada llave del diccionario grafo y cada G.add_node(estado)',
            ],
            [
              'Acción o transición permitida',
              'Conexión / Arista (línea)',
              'Cada vecino en la lista grafo[estado] y cada G.add_edge(u, v)',
            ],
            ['Estado inicial', 'Nodo de partida', 'Variable inicio = "Recepción"'],
            ['Meta', 'Nodo o condición objetivo', 'Variable meta = "Embarque"'],
            [
              'Solución',
              'Trayectoria o secuencia válida de inicio a meta',
              'Lista ordenada de nodos: ["Recepción", ..., "Embarque"]',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Radiografía del código Python (NetworkX y Matplotlib): ¿para qué sirve cada parte?">
        <p>
          En todos los cuadernos del Tema 2 (<S>1_Ejemplos_Espacio_de_Busqueda</S>,{' '}
          <S>2_Ejercicio_Espacio_de_Busqueda</S> y <S>Ejer2.ipynb</S>), el espacio de búsqueda se representa con un{' '}
          <strong>diccionario de listas de adyacencia</strong> y se dibuja con <S>networkx</S>. Aquí tienes el código
          completo y la tabla de qué hace exactamente cada instrucción:
        </p>

        <Codigo titulo="2_Ejercicio_Espacio_de_Busqueda.ipynb · Representación y dibujo del grafo">{`import networkx as nx
import matplotlib.pyplot as plt

grafo = {
    "Entrada": ["Recepción"],
    "Recepción": ["Entrada", "Oficina", "Laboratorio"],
    "Oficina": ["Recepción", "Almacén"],
    "Laboratorio": ["Recepción", "Almacén"],
    "Almacén": ["Oficina", "Laboratorio", "Salida"],
    "Salida": ["Almacén"]
}

inicio = "Entrada"
meta = "Salida"

print("Estados:", list(grafo.keys()))

G = nx.Graph()

for estado, vecinos in grafo.items():
    G.add_node(estado)
    for vecino in vecinos:
        G.add_edge(estado, vecino)

pos = nx.spring_layout(G, seed=8)
plt.figure(figsize=(8, 5))
nx.draw(G, pos, with_labels=True, node_size=2500, font_size=9)
plt.title("Espacio de búsqueda original")
plt.show()`}</Codigo>

        <Tabla
          cabeza={['Línea / Parte del código', '¿Qué es?', '¿Para qué sirve exactamente y qué pasa si la cambias?']}
          filas={[
            [
              'import networkx as nx',
              'Librería de grafos',
              'Permite crear estructuras de grafos (nodos y aristas), calcular grados y posiciones para dibujarlos.',
            ],
            [
              'import matplotlib.pyplot as plt',
              'Librería gráfica',
              'Permite abrir el lienzo (plt.figure), poner título (plt.title) y mostrar en pantalla el dibujo del grafo (plt.show).',
            ],
            [
              'grafo = { "Recepción": ["Entrada", "Oficina", "Laboratorio"], ... }',
              'Diccionario de adyacencia',
              'Representa el espacio de búsqueda en Python: cada LLAVE es un estado (nodo) y su VALOR es la lista de estados a los que se puede ir directamente en 1 paso.',
            ],
            [
              'list(grafo.keys())',
              'Método de diccionario',
              'Devuelve la lista con los nombres de todos los estados registrados en el diccionario grafo.',
            ],
            [
              'G = nx.Graph() vs G = nx.DiGraph()',
              'Constructor del grafo',
              'nx.Graph() crea un grafo NO dirigido (conexiones de doble sentido ↔, sin flechas). nx.DiGraph() crea un grafo DIRIGIDO (con flechas → de un solo sentido).',
            ],
            [
              'for estado, vecinos in grafo.items():',
              'Ciclo sobre diccionario',
              'Recorre cada pareja (llave, valor) del diccionario: en estado guarda el nombre del nodo actual y en vecinos su lista de conexiones.',
            ],
            [
              'G.add_node(estado)',
              'Registrar nodo',
              'Agrega el estado al grafo G aunque su lista vecinos esté vacía []. Si la quitas, cualquier nodo aislado (en falla/cerrado) desaparece del dibujo.',
            ],
            [
              'for vecino in vecinos: G.add_edge(estado, vecino)',
              'Registrar conexiones',
              'Recorre la lista de vecinos de estado y dibuja una línea (arista) entre estado y cada vecino.',
            ],
            [
              'G.number_of_nodes() y G.number_of_edges()',
              'Métodos de conteo',
              'Devuelven cuántos estados (nodos) y cuántas conexiones (aristas) tiene en total el grafo G.',
            ],
            [
              'pos = nx.spring_layout(G, seed=8)',
              'Acomodo visual',
              'Calcula automáticamente coordenadas (x, y) para que los nodos no se encimen; seed=8 fija el azar para que el dibujo salga siempre en la misma posición.',
            ],
            [
              'nx.draw(G, pos, with_labels=True, ...)',
              'Dibujar el grafo',
              'Pinta los círculos y líneas; with_labels=True escribe el nombre de cada estado dentro de su círculo.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Las 3 modificaciones que piden en las prácticas y en el examen">
        <p>
          En <S>2_Ejercicio_Espacio_de_Busqueda.ipynb</S> y <S>Ejer2.ipynb</S> te piden hacer tres tipos de cambios
          sobre el diccionario <S>grafo</S>. Asegúrate de distinguir cómo se hace cada uno:
        </p>

        <Tabla
          cabeza={['Modificación que pide el problema', 'Qué debes hacer en el diccionario grafo', 'Ejemplo de tus prácticas']}
          filas={[
            [
              '1. Agregar una nueva zona (ej. Cafetería conectada con Oficina y Salida)',
              '1) Creas la nueva llave "Cafetería": ["Oficina", "Salida"].\n2) Agregas "Cafetería" dentro de la lista de "Oficina" y dentro de la lista de "Salida" (porque es de doble sentido ↔).',
              'En el Colab 2 se pasó de 6 a 7 estados y se agregaron 2 conexiones nuevas.',
            ],
            [
              '2. Cerrar / aislar temporalmente un nodo por falla o fuga (ej. Laboratorio o Almacén 1)',
              '1) CONSERVAS la llave con lista vacía: "Laboratorio": [].\n2) Quitas "Laboratorio" de las listas de TODOS los demás estados para que nadie pueda entrar a él.',
              'El nodo sigue apareciendo dibujado en el grafo como un punto suelto (sin líneas), representando que la zona existe pero está fuera de servicio.',
            ],
            [
              '3. Bloquear SOLO una conexión directa entre dos zonas (ej. Ensamble ↔ Calidad en Ejer2)',
              'Ambos nodos siguen funcionando, pero quitas "Calidad" de la lista de "Ensamble" y quitas "Ensamble" de la lista de "Calidad".',
              'En Ejer2 Parte 3: al bloquear Ensamble ↔ Calidad, el robot sigue llegando a Embarque dando la vuelta por Ensamble → Inspección → Calidad.',
            ],
          ]}
        />

        <Codigo titulo="Cómo aislar un nodo por código (Práctica 1) vs manualmente (Ejer2)">{`# Opción A: Automáticamente con un ciclo y list comprehension (Práctica 1)
grafo_falla["Analizador-Calidad"] = []
for estado in grafo_falla:
    grafo_falla[estado] = [
        vecino for vecino in grafo_falla[estado]
        if vecino != "Analizador-Calidad"
    ]

# Opción B: Manualmente en el diccionario (Colab 2: Laboratorio cerrado)
grafo = {
    "Entrada": ["Recepción"],
    "Recepción": ["Entrada", "Oficina"],              # Se quitó "Laboratorio"
    "Oficina": ["Recepción", "Almacén", "Cafetería"],
    "Cafetería": ["Oficina", "Salida"],
    "Laboratorio": [],                                # Queda con lista vacía []
    "Almacén": ["Oficina", "Salida"],                 # Se quitó "Laboratorio"
    "Salida": ["Almacén", "Cafetería"]
}`}</Codigo>
      </Seccion>

      <Seccion titulo="Todas las preguntas de los Colabs del Tema 2 (listas para examen impreso)">
        <Ejemplo titulo="Preguntas de 2_Ejercicio_Espacio_de_Busqueda.ipynb (Robot en centro de trabajo)">
          <ul>
            <li>
              <strong>1. ¿Qué diferencia hay entre dejar <S>Laboratorio</S> como estado sin conexiones (<S>[]</S>) y eliminarlo completamente del diccionario?</strong>
              <br />
              Dejarlo con lista vacía <S>[]</S> conserva a <S>Laboratorio</S> como un nodo existente dentro del mapa (solo que incomunicado), mientras que eliminarlo del diccionario lo borra por completo del sistema como si ese lugar nunca hubiera existido.
            </li>
            <li>
              <strong>2. ¿Cuál de las dos opciones representa mejor que el <S>Laboratorio</S> está cerrado temporalmente?</strong>
              <br />
              Dejarlo como estado sin conexiones (<S>"Laboratorio": []</S>), porque físicamente la habitación sigue formando parte del edificio, solo que por el momento no se puede entrar ni salir de ella.
            </li>
            <li>
              <strong>3. ¿Qué representa un nodo, qué representa una conexión y qué sucede con el espacio de búsqueda cuando modificamos el problema?</strong>
              <br />
              Un <strong>nodo</strong> representa un estado o ubicación posible del entorno; una <strong>conexión</strong> representa una transición o acción válida para moverse directamente de un estado a otro. Cuando modificamos el problema (agregando zonas, cerrando áreas o bloqueando pasillos), el espacio de búsqueda cambia en su tamaño y estructura, alterando las trayectorias disponibles para ir del inicio a la meta.
            </li>
          </ul>
        </Ejemplo>

        <Ejemplo titulo="Preguntas de Ejer2.ipynb (Robot de reparto: Recepción a Embarque)">
          <ul>
            <li>
              <strong>1. ¿Qué cambió en el espacio de búsqueda al aislar <S>Almacén 1</S> y bloquear <S>Ensamble ↔ Calidad</S>?</strong>
              <br />
              Con las restricciones desaparecieron conexiones y caminos: al inicio había múltiples rutas posibles, pero tras ambos bloqueos <S>Pasillo A</S> quedó como un callejón sin salida (solo conecta con <S>Recepción</S>) y quedó un único camino válido que pasa obligatoriamente por <S>Inspección</S> (<S>Recepción → Pasillo B → Almacén 2 → Ensamble → Inspección → Calidad → Empaque → Embarque</S>).
            </li>
            <li>
              <strong>2. ¿Cuál es la diferencia entre definir un problema de búsqueda y construir su espacio de búsqueda?</strong>
              <br />
              <strong>Definir el problema</strong> es especificar qué se quiere resolver (cuál es el inicio, cuál es la meta y qué acciones y restricciones aplican). <strong>Construir el espacio de búsqueda</strong> es representar todas las zonas y conexiones resultantes como un grafo completo.
            </li>
            <li>
              <strong>3. ¿El espacio de búsqueda representa una solución o representa todas las posibilidades disponibles?</strong>
              <br />
              Representa <strong>todas las posibilidades disponibles</strong> (tanto los caminos que sí llegan a la meta como los desvíos o callejones sin salida como <S>Pasillo A</S>). La solución es solo un camino dentro de ese espacio.
            </li>
            <li>
              <strong>4. Si una persona observa el grafo, propone rápido un camino. ¿Qué necesita la computadora para recorrerlo de manera sistemática?</strong>
              <br />
              La computadora no «ve» el dibujo: necesita un <strong>algoritmo de búsqueda</strong> (como BFS o DFS), una estructura para guardar los <strong>estados pendientes por revisar</strong> (cola o pila) y un registro de <strong>estados ya visitados</strong> (<S>visitados</S>) para no dar vueltas en círculo.
            </li>
          </ul>
        </Ejemplo>

        <Ojo titulo="Pruébalo en vivo en el simulador">
          <p>
            Selecciona <strong>Robot en Almacén</strong> (o cualquiera de las prácticas) y haz clic en{' '}
            <strong>Simular falla</strong> para ver cómo el nodo queda aislado con <S>[]</S> y cómo cambia el espacio de
            búsqueda:
          </p>
        </Ojo>
        <SimuladorGrafo escenarioInicial="almacen" algoritmoInicial="bfs" />
      </Seccion>
    </>
  );
}
