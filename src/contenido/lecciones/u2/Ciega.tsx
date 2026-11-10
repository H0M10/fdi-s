import {
  Codigo,
  Correccion,
  Ejemplo,
  Ojo,
  Profe,
  S,
  Seccion,
  Tabla,
} from '../../../componentes/Leccion';
import { SimuladorGrafo } from '../../../componentes/SimuladorGrafo';

export default function Ciega() {
  return (
    <>
      <Seccion titulo="¿Por qué se llama búsqueda ciega o no informada?">
        <Profe cita>
          Nosotros no le vamos a dar información de absolutamente nada: tenemos el inicio, tenemos la meta y busca con
          base en nuestras restricciones, sin contemplar el más costoso o el más barato. Por eso es búsqueda ciega o no
          informada.
        </Profe>
        <p>
          Una vez que el espacio de búsqueda ya está representado como un grafo, la computadora necesita una regla
          sistemática para decidir <strong>qué nodo explorar primero</strong>. Los algoritmos de{' '}
          <strong>búsqueda ciega (no informada)</strong> recorren el grafo usando únicamente su estructura de conexiones,
          sin ninguna pista ni estimación (<S>h(n)</S>) sobre qué tan cerca está la meta ni cuánto cuesta cada arista.
        </p>
        <Correccion>
          <p>
            En el mensaje de WhatsApp quedó <em>«búsqueda ciega o o informada»</em> por un error de dedo. El término
            correcto es <strong>búsqueda ciega o NO informada</strong> (la informada es el Tema 4, con heurísticas).
          </p>
        </Correccion>
      </Seccion>

      <Seccion titulo="Entender a fondo FIFO (Cola en BFS) vs. LIFO (Pila en DFS)">
        <p>
          En el examen impreso te pueden preguntar qué significa <strong>FIFO</strong>, qué significa{' '}
          <strong>LIFO</strong> y cómo eso cambia por completo el recorrido aunque el resto del código sea igual:
        </p>

        <Tabla
          cabeza={['Concepto', 'Cola FIFO (usada por BFS)', 'Pila LIFO (usada por DFS)']}
          filas={[
            [
              'Siglas en inglés y español',
              'First In, First Out → «El primero en entrar es el primero en salir».',
              'Last In, First Out → «El último en entrar es el primero en salir».',
            ],
            [
              'Analogía de la vida real',
              'Una fila de personas en las tortillas o el banco: atienden primero al que llegó primero (al frente de la fila) y los nuevos se forman atrás.',
              'Una pila de platos o libros: pones un plato nuevo hasta arriba, y cuando necesitas sacar uno, tomas el último que pusiste arriba.',
            ],
            [
              'Efecto en el recorrido del grafo',
              'Obliga a explorar POR NIVELES (horizontal / radial): no pasa a los nodos de distancia 2 hasta haber terminado todos los de distancia 1.',
              'Obliga a explorar EN PROFUNDIDAD (vertical): apenas descubre un vecino, lo pone hasta arriba y se mete por esa rama hasta topar con pared antes de regresar (backtracking).',
            ],
            [
              'Instrucción en Python para crearla',
              'from collections import deque\ncola = deque([(inicio, [inicio])])',
              'Usa una lista normal de Python:\npila = [(inicio, [inicio])]',
            ],
            [
              'Instrucción en Python para meter y sacar',
              'Mete al final con cola.append(...) y saca del FRENTE (izquierda) con cola.popleft().',
              'Mete al final con pila.append(...) y saca del FINAL (tope derecho) con pila.pop().',
            ],
            [
              '¿Garantiza el camino con menos pasos?',
              'SÍ, siempre encuentra la ruta con menor número de aristas (saltos) desde el inicio.',
              'NO. Puede irse por una rama larga de muchos pasos aunque al lado hubiera un camino directo.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Radiografía del código de BFS y DFS: ¿para qué sirve cada línea?">
        <p>
          Aquí tienes el código completo de <strong>BFS</strong> y <strong>DFS</strong> (incluyendo las modificaciones
          que hiciste en la Parte 3 de los Colabs <S>5_Ejercicio_BFS</S> y <S>7_Ejercicio_DFS</S>) y debajo una tabla
          que explica pieza por pieza para qué sirve cada instrucción:
        </p>

        <Codigo titulo="BFS · Búsqueda en Anchura (Colab 4, Colab 5 y Práctica 1)">{`from collections import deque

def bfs(grafo, inicio, meta, mostrar=True):
    cola = deque([(inicio, [inicio])])
    visitados = set()
    orden = []

    while cola:
        if mostrar:
            print("Cola:", [n for n, _ in cola])

        nodo, camino = cola.popleft()

        if nodo in visitados:
            continue

        visitados.add(nodo)
        orden.append(nodo)

        if mostrar:
            print("Visitando:", nodo, "| Total visitados:", len(visitados))

        if nodo == meta:
            return orden, camino

        for vecino in grafo.get(nodo, []):
            if vecino not in visitados:
                cola.append((vecino, camino + [vecino]))

    return orden, None`}</Codigo>

        <Codigo titulo="DFS · Búsqueda en Profundidad (Colab 7 y Práctica 1)">{`def dfs(grafo, inicio, meta, mostrar=True):
    pila = [(inicio, [inicio])]
    visitados = set()
    orden = []

    while pila:
        if mostrar:
            print("Pila:", [n for n, _ in pila])

        nodo, camino = pila.pop()

        if nodo in visitados:
            continue

        visitados.add(nodo)
        orden.append(nodo)

        if mostrar:
            print(f"Visitando: {nodo} | Profundidad: {len(camino) - 1}")

        if nodo == meta:
            return orden, camino

        for vecino in reversed(grafo.get(nodo, [])):
            if vecino not in visitados:
                pila.append((vecino, camino + [vecino]))

    return orden, None`}</Codigo>

        <Tabla
          cabeza={['Línea / Expresión en el código', '¿Qué hace y para qué sirve en el examen?']}
          filas={[
            [
              'from collections import deque',
              'Importa la estructura deque (cola de doble extremo), que permite sacar el primer elemento con popleft() de manera inmediata y eficiente.',
            ],
            [
              '[(inicio, [inicio])]',
              'Cada elemento guardado dentro de la cola o pila es una TUPLA de 2 cosas: (1) el nodo que toca visitar y (2) la lista camino con todos los nodos recorridos desde el inicio hasta él.',
            ],
            [
              'visitados = set()',
              'Conjunto vacío donde se registran los estados ya explorados. Evita volver a visitar el mismo nodo y previene caer en bucles infinitos cuando hay conexiones de ida y vuelta (↔).',
            ],
            [
              'orden = []',
              'Lista que guarda el historial cronológico de TODOS los nodos que el algoritmo fue visitando durante la búsqueda.',
            ],
            [
              'while cola: / while pila:',
              'Repite el proceso mientras todavía existan nodos pendientes por explorar. Si se vacía sin haber llegado a la meta, el ciclo termina.',
            ],
            [
              '[n for n, _ in cola]',
              'List comprehension que extrae solamente el nombre del nodo n de cada tupla (nodo, camino) para imprimir en pantalla quiénes están formados en la cola/pila sin imprimir todas las listas de caminos.',
            ],
            [
              'nodo, camino = cola.popleft()',
              'En BFS: saca el PRIMER par (nodo, camino) que entró a la cola (comportamiento FIFO).',
            ],
            [
              'nodo, camino = pila.pop()',
              'En DFS: saca el ÚLTIMO par (nodo, camino) que se metió a la pila (comportamiento LIFO).',
            ],
            [
              'if nodo in visitados: continue',
              'Si ese nodo ya fue visitado antes (porque pudo haber entrado dos veces a la cola/pila desde dos vecinos distintos antes de ser explorado), lo ignora y pasa a la siguiente iteración.',
            ],
            [
              'visitados.add(nodo) y orden.append(nodo)',
              'Marca oficialmente el nodo como ya explorado en el conjunto visitados y lo agrega al final del historial orden.',
            ],
            [
              'len(visitados)',
              'Modificación de la Parte 3 del Colab 5 (BFS): cuenta cuántos estados distintos se han visitado hasta ese momento.',
            ],
            [
              'len(camino) - 1',
              'Modificación de la Parte 3 del Colab 7 (DFS) y Práctica 1: calcula la PROFUNDIDAD actual o el NÚMERO DE PASOS (aristas/saltos). Se resta 1 porque el nodo inicial tiene 1 nodo en la lista pero 0 pasos dados.',
            ],
            [
              'if nodo == meta: return orden, camino',
              'Condición de éxito: si el nodo actual es la meta, detiene inmediatamente la búsqueda y devuelve el historial orden y la ruta ganadora camino.',
            ],
            [
              'grafo.get(nodo, [])',
              'Obtiene la lista de vecinos del nodo actual en el diccionario; si el nodo no existiera como llave, devuelve lista vacía [] sin lanzar error.',
            ],
            [
              'reversed(grafo.get(nodo, []))',
              'Exclusivo de DFS: recorre los vecinos al revés al meterlos a la pila. Así, el primer vecino de la lista (ej. "Bosque" en ["Bosque", "Río"]) entra al final, queda en el tope de la pila y sale primero con pop().',
            ],
            [
              'camino + [vecino]',
              'Crea una NUEVA lista concatenando la ruta que llevábamos (camino) con el nuevo vecino al que vamos a dar el paso, sin alterar el camino de las demás ramas.',
            ],
            [
              'return orden, None',
              'Fuera del while: si la cola o pila se quedó vacía y nunca se cumplió nodo == meta, devuelve los nodos que sí alcanzó a visitar (orden) y None para avisar que NO existe camino hacia la meta.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Todas las preguntas de los Colabs y de la Práctica 1 (listas para examen impreso)">
        <Ejemplo titulo="Preguntas de 5_Ejercicio_BFS_HANNIEL.ipynb (Robot de mensajería: Entrada a Archivo)">
          <ul>
            <li>
              <strong>1. ¿Por qué BFS visita primero ciertos nodos y qué significa que explore por niveles?</strong>
              <br />
              Visita primero los nodos que están a menor distancia (menos pasos) del estado inicial. Explorar por
              niveles significa que realiza una búsqueda horizontal/radial: revisa todos los nodos a 1 salto del inicio,
              luego todos los que están a 2 saltos, luego los de 3 saltos, y así sucesivamente.
            </li>
            <li>
              <strong>2. ¿Qué función cumple la cola en BFS y qué significa FIFO?</strong>
              <br />
              La cola almacena de manera ordenada los nodos descubiertos que aún están pendientes de explorarse.{' '}
              <strong>FIFO</strong> significa <em>First In, First Out</em> (el primero en entrar es el primero en
              salir), asegurando que los nodos se procesen estrictamente en el orden en que fueron descubiertos.
            </li>
            <li>
              <strong>3. ¿Por qué BFS se considera búsqueda ciega y qué ventaja tiene para hallar rutas con pocos pasos?</strong>
              <br />
              Es búsqueda ciega porque no usa heurísticas ni estimaciones de distancia a la meta; solo sigue las
              conexiones del grafo. Su gran ventaja es que, al ir nivel por nivel,{' '}
              <strong>garantiza encontrar siempre el camino con el menor número de pasos (aristas)</strong>.
            </li>
          </ul>
        </Ejemplo>

        <Ejemplo titulo="Preguntas de 7_Ejercicio_DFS_Hanniel.ipynb (Explorador: Campamento a Templo / Mirador)">
          <ul>
            <li>
              <strong>1. Al cambiar la meta a <S>Mirador</S>, ¿DFS encontró el camino con menos pasos?</strong>
              <br />
              <strong>No.</strong> Existía un camino directo de solo <strong>2 pasos</strong> (<S>Campamento → Río → Mirador</S>), pero como DFS se fue primero por la rama profunda de <S>Bosque</S>, dio toda la vuelta de{' '}
              <strong>5 pasos</strong> (<S>Campamento → Bosque → Cueva → Ruinas → Templo → Mirador</S>).
            </li>
            <li>
              <strong>2. En el reto corto, al intercambiar <S>"Campamento": ["Bosque", "Río"]</S> por <S>["Río", "Bosque"]</S>, ¿por qué cambió el camino de DFS?</strong>
              <br />
              Porque el orden de los vecinos en la lista determina en qué orden se insertan en la pila. Al usar{' '}
              <S>reversed()</S> y sacar con <S>pila.pop()</S> (LIFO), ahora <S>"Río"</S> quedó en el tope de la pila,
              se exploró primero esa rama y encontró directo <S>Campamento → Río → Mirador → Templo</S>.
            </li>
            <li>
              <strong>3. ¿Qué función cumple la pila en DFS y por qué no garantiza el camino más corto?</strong>
              <br />
              La pila guarda los nodos pendientes bajo el principio <strong>LIFO</strong> (<em>Last In, First Out</em>), permitiendo avanzar hasta el fondo de una rama y regresar (<em>backtracking</em>) solo cuando ya no hay salida. Como se compromete con la primera rama hasta el fondo sin comparar niveles cercanos, no garantiza el menor número de saltos.
            </li>
          </ul>
        </Ejemplo>

        <Ejemplo titulo="Preguntas de Práctica 1 (Olvera_Hanniel_Practica13_busqueda_ciega.ipynb · Pipeline CI/CD)">
          <ul>
            <li>
              <strong>1. ¿Por qué BFS y DFS visitan los estados en diferente orden sobre el mismo grafo?</strong>
              <br />
              Porque gestionan los nodos pendientes con estructuras opuestas: BFS usa una cola FIFO que expande en
              abanico por niveles completos (<S>Analizador-Calidad</S> y luego <S>Compilador</S>), mientras que DFS usa
              una pila LIFO que se hunde por toda la rama de <S>Analizador-Calidad → Gestor-Pipeline → Entorno-Producción</S>{' '}
              antes de tocar <S>Compilador</S>.
            </li>
            <li>
              <strong>2. ¿Por qué en el grafo inicial de la Práctica 1 ambos encontraron un camino de 5 pasos, pero DFS visitó solo 6 nodos y BFS visitó 9?</strong>
              <br />
              Porque por la topología del grafo y el orden de la lista de vecinos, la primera rama profunda que tomó DFS
              (<S>Analizador-Calidad → Gestor-Pipeline → Entorno-Producción</S>) coincidió con la ruta más corta de 5
              pasos, llegando directo sin abrir las ramas laterales (<S>Compilador</S>, <S>Servicio-Pruebas</S>,{' '}
              <S>Registro-Contenedores</S>) que BFS sí tuvo que explorar por ir nivel por nivel.
            </li>
            <li>
              <strong>3. ¿Qué pasó cuando falló <S>Analizador-Calidad</S> (Parte E) y luego cuando la meta cambió a <S>Servicio-Pruebas</S> (Parte F)?</strong>
              <br />
              Al aislar <S>Analizador-Calidad</S>, ambos algoritmos redirigieron automáticamente la ruta hacia{' '}
              <S>Entorno-Producción</S> a través de <S>Compilador</S>. Pero cuando la meta se cambió a{' '}
              <S>Servicio-Pruebas</S> (que solo se conectaba con <S>Analizador-Calidad</S>), la meta quedó inalcanzable:
              ambos algoritmos exploraron los 7 nodos accesibles sin ciclarse gracias a <S>visitados</S> y devolvieron{' '}
              <S>camino = None</S> (<em>«No existe solución»</em>).
            </li>
          </ul>
        </Ejemplo>

        <Ojo titulo="Pruébalo paso a paso en el simulador">
          <p>
            Alterna entre <strong>BFS</strong> y <strong>DFS</strong> en el escenario de <strong>Pipeline CI/CD</strong>{' '}
            o <strong>Red Wi-Fi</strong> y observa cómo se llenan y vacían la Cola FIFO y la Pila LIFO en cada paso:
          </p>
        </Ojo>
        <SimuladorGrafo escenarioInicial="cicd" algoritmoInicial="bfs" />
      </Seccion>
    </>
  );
}
