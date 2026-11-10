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

function FormulaAEstrella() {
  return (
    <div
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 'clamp(14px, 3.6vw, 18px)',
        background: 'var(--superficie)',
        border: '1px solid var(--linea)',
        borderRadius: 8,
        padding: '16px 14px',
        margin: '0 0 18px',
        textAlign: 'center',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <strong>f(n)</strong> = <span style={{ color: 'var(--examen)' }}>g(n) · costo real acumulado</span>
      {' + '}
      <span style={{ color: 'var(--acento)' }}>h(n) · estimación restante</span>
    </div>
  );
}

export default function Heuristica() {
  return (
    <>
      <Seccion titulo="¿Qué es una búsqueda heurística o informada?">
        <Profe cita>
          Dos restaurantes, uno lleno y otro no: ¿de qué va a depender cuál escojamos? Heurístico es decidir en caliente
          porque fue una corazonada.
        </Profe>
        <p>
          A diferencia de la búsqueda ciega (que explora sin pistas), la{' '}
          <strong>búsqueda heurística o informada</strong> sí recibe información extra del problema: una función{' '}
          <strong><S>h(n)</S> (heurística)</strong> que estima <strong>qué tan cerca parece estar cada estado <S>n</S> de la meta</strong>.
        </p>
        <Correccion>
          <p>
            En las notas rápidas de WhatsApp quedó escrito <em>«huerosticos»</em>. El término correcto es{' '}
            <strong>heurística</strong> (y a los algoritmos que la usan se les llama de{' '}
            <strong>búsqueda heurística o informada</strong>).
          </p>
        </Correccion>

        <h3>Las 3 reglas de la heurística h(n) en todos los Colabs</h3>
        <ul>
          <li>
            <strong>Menor <S>h(n)</S> = más prometedor:</strong> un número pequeño indica que el lugar parece estar{' '}
            <strong>más cerca</strong> de la meta.
          </li>
          <li>
            <strong>Mayor <S>h(n)</S> = menos prometedor:</strong> un número grande indica que parece estar{' '}
            <strong>más lejos</strong> (sirve para desalentar al algoritmo de meterse por esa rama).
          </li>
          <li>
            <strong>En la meta siempre vale cero:</strong> <S>h(meta) = 0</S> (por ejemplo,{' '}
            <S>h("Hospital") = 0</S> o <S>h("Servidor-Objetivo") = 0</S>), porque estando ya en la meta falta 0 por
            recorrer.
          </li>
        </ul>
      </Seccion>

      <Seccion titulo="Cola de Prioridad (heapq) vs. FIFO vs. LIFO">
        <p>
          En el Tema 3 vimos que BFS usa una <strong>Cola FIFO</strong> (<S>deque.popleft</S>) y DFS usa una{' '}
          <strong>Pila LIFO</strong> (<S>list.pop</S>). En cambio, tanto <strong>Greedy</strong> como{' '}
          <strong>A*</strong> usan una <strong>Cola de Prioridad</strong> implementada con la librería{' '}
          <S>heapq</S> de Python:
        </p>

        <Tabla
          cabeza={['Estructura', 'Quién la usa', 'En qué orden saca los elementos']}
          filas={[
            ['Cola FIFO (deque)', 'BFS', 'Saca al más antiguo (el primero que entró).'],
            ['Pila LIFO (list)', 'DFS', 'Saca al más reciente (el último que entró).'],
            [
              'Cola de Prioridad (heapq)',
              'Greedy y A*',
              'Saca siempre a la tupla que tenga el MENOR número en su PRIMERA posición: en Greedy es h(n), y en A* es f(n) = g(n) + h(n).',
            ],
          ]}
        />

        <FormulaAEstrella />

        <Tabla
          cabeza={['Criterio', 'Greedy Best-First Search (Codicioso / Voraz)', 'Algoritmo A* (A Estrella)']}
          filas={[
            ['Fórmula de prioridad', 'f(n) = h(n)', 'f(n) = g(n) + h(n)'],
            [
              '¿Qué mira para decidir?',
              'ÚNICAMENTE la heurística h(n) (la adivinanza de lo que falta). Ignora por completo cuánto costó llegar ahí.',
              'Suma el costo real ya gastado desde el inicio g(n) más la estimación de lo que falta h(n).',
            ],
            [
              '¿Cómo representa el grafo en Python?',
              'En Colab 9 y 10 (sin pesos): "Terminal": ["Centro", "Mercado"].\nEn Práctica 2 (con pesos): "Cliente": [("Gateway-A", 2), ("Gateway-B", 1)] (acumula el costo solo para reportarlo al final, pero NO lo usa para elegir).',
              'Siempre grafo con pesos (tuplas vecino, costo): "Cliente": [("Gateway-A", 2), ("Gateway-B", 1)].',
            ],
            [
              '¿Qué pasa si cambias SOLO los costos reales de las conexiones (Parte F de Práctica 2)?',
              'Greedy NO se entera: sigue eligiendo exactamente la misma ruta cara porque su tupla se ordena solo por h(n).',
              'A* SÍ cambia de ruta de inmediato si una conexión se vuelve más barata, porque cambia g(n) y por tanto cambia f(n).',
            ],
            [
              '¿Qué pasa si cambias SOLO las heurísticas h(n) (Colab 10 y Parte E de Práctica 2)?',
              'Greedy cambia radicalmente de camino sin haber tocado ni una sola conexión del mapa.',
              'A* puede cambiar el orden en que revisa los primeros nodos, pero mientras la heurística sea razonable sigue encontrando la ruta óptima.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Radiografía del código de Greedy y A* (Práctica 2 y Colabs 9, 10 y 12)">
        <p>
          Revisa con lupa cómo están escritas las funciones <S>greedy</S> y <S>a_estrella</S> en tu cuaderno{' '}
          <S>Olvera_Mata_Hanniel_Practica23_Busqueda_Heuristica.ipynb</S> y qué hace cada línea:
        </p>

        <Codigo titulo="Greedy Best-First Search (Práctica 2 · con cálculo de costo real al final)">{`import heapq

def greedy(grafo, heuristica, inicio, meta, mostrar=True):
    # Tupla: (h, contador, nodo, camino, costo_acumulado)
    # ¡OJO! El PRIMER elemento es heuristica[inicio], así que heapq ordena SOLO por h
    cola = [(heuristica[inicio], 0, inicio, [inicio], 0)]
    contador = 1
    visitados = set()
    orden = []

    while cola:
        h, _, nodo, camino, costo_acumulado = heapq.heappop(cola)

        if nodo in visitados:
            continue

        visitados.add(nodo)
        orden.append(nodo)

        if nodo == meta:
            return orden, camino, costo_acumulado

        for vecino, costo in grafo.get(nodo, []):
            if vecino not in visitados:
                heapq.heappush(
                    cola,
                    (
                        heuristica[vecino],          # 1º: ordena SOLO por h(vecino)
                        contador,                    # 2º: desempate FIFO
                        vecino,                      # 3º: nombre del nodo
                        camino + [vecino],           # 4º: ruta hasta aquí
                        costo_acumulado + costo      # 5º: suma el costo real pero NO ordena por él
                    )
                )
                contador += 1

    return orden, None, None`}</Codigo>

        <Codigo titulo="Algoritmo A* (Colab 12 y Práctica 2)">{`def a_estrella(grafo, heuristica, inicio, meta, mostrar=True):
    # Tupla: (f, g, contador, nodo, camino)
    # El PRIMER elemento es f = g + h (en el inicio g=0, así que f = h(inicio))
    cola = [(heuristica[inicio], 0, 0, inicio, [inicio])]
    contador = 1
    mejor_costo = {inicio: 0}
    orden = []

    while cola:
        f, g, _, nodo, camino = heapq.heappop(cola)

        if g != mejor_costo.get(nodo):
            continue

        orden.append(nodo)

        if nodo == meta:
            return orden, camino, g

        for vecino, costo in grafo.get(nodo, []):
            nuevo_g = g + costo
            if vecino not in mejor_costo or nuevo_g < mejor_costo[vecino]:
                mejor_costo[vecino] = nuevo_g
                nuevo_f = nuevo_g + heuristica[vecino]
                heapq.heappush(
                    cola,
                    (nuevo_f, nuevo_g, contador, vecino, camino + [vecino])
                )
                contador += 1

    return orden, None, None`}</Codigo>

        <Tabla
          cabeza={['Línea / Variable del código', '¿Qué hace y por qué se escribe así? (Pregunta de examen)']}
          filas={[
            [
              'import heapq',
              'Importa el módulo de colas de prioridad (montículos mínimos / min-heaps) de Python.',
            ],
            [
              'heapq.heappush(cola, tupla)',
              'Inserta una nueva tupla candidata dentro de la cola de prioridad acomodándola según su primer valor.',
            ],
            [
              'heapq.heappop(cola)',
              'Extrae y devuelve la tupla que tenga el MENOR primer elemento en toda la cola (menor h en Greedy; menor f en A*).',
            ],
            [
              'contador = 1 y contador += 1',
              'Número entero que sube de 1 en 1 en cada inserción. Se pone antes de nodo y camino dentro de la tupla para que, si dos candidatos empatan en h o en (f, g), Python desempate eligiendo al que entró primero sin comparar listas.',
            ],
            [
              'costo_acumulado + costo (en Greedy)',
              'Va sumando cuánto cuesta realmente el camino que eligió Greedy para poder imprimir al final que gastó 10, pero como va en la 5ª posición de la tupla, Greedy lo ignora al decidir.',
            ],
            [
              'mejor_costo = {inicio: 0} (en A*)',
              'Diccionario que guarda el menor costo real acumulado g(n) que hemos encontrado hasta ahora para llegar a cada nodo.',
            ],
            [
              'nuevo_g = g + costo',
              'Calcula el costo real acumulado desde el inicio hasta vecino pasando por el nodo actual.',
            ],
            [
              'if vecino not in mejor_costo or nuevo_g < mejor_costo[vecino]:',
              'Solo acepta meter a vecino en la cola si nunca habíamos llegado a él o si acabamos de descubrir un camino MÁS BARATO (nuevo_g menor) que el registrado antes.',
            ],
            [
              'nuevo_f = nuevo_g + heuristica[vecino]',
              'Aplica la fórmula maestra de A*: f(n) = g(n) + h(n) y lo coloca en la 1ª posición de la tupla para que heapq ordene por nuevo_f.',
            ],
            [
              'if g != mejor_costo.get(nodo): continue',
              'Cuando encontramos un camino más barato a un nodo, metemos una tupla nueva a heapq pero la tupla vieja (más cara) sigue adentro. Cuando esa tupla vieja sale algún día, su g ya no coincide con mejor_costo[nodo] y este if la descarta.',
            ],
            [
              'etiquetas = {nodo: f"{nodo}\\nh={heuristica[nodo]}" for nodo in grafo}',
              'En la visualización con NetworkX: crea el texto de dos renglones para que cada círculo muestre su nombre arriba y su valor h abajo.',
            ],
            [
              'costos = nx.get_edge_attributes(G, "weight")',
              'Extrae los pesos weight=costo de todas las aristas del grafo G para dibujarlos encima de las líneas con nx.draw_networkx_edge_labels.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Todas las preguntas de los Colabs 9, 10, 12 y Práctica 2 (listas para examen impreso)">
        <Ejemplo titulo="1. Preguntas de Sesión 19 y Ejercicio 10 (Greedy en la Ciudad: Terminal a Hospital)">
          <ul>
            <li>
              <strong>¿Por qué en el Caso 1 (heurística original) Greedy eligió <S>Mercado</S> después de <S>Terminal</S>?</strong>
              <br />
              Porque entre los vecinos de <S>Terminal</S> (<S>Centro: h=8</S>, <S>Mercado: h=6</S>,{' '}
              <S>Universidad: h=10</S>), <S>Mercado</S> tenía el <strong>menor valor heurístico (<S>h=6</S>)</strong>. El
              camino fue <S>Terminal → Mercado → Estadio (4) → Avenida (3) → Hospital (0)</S>.
            </li>
            <li>
              <strong>¿Qué pasó en el Caso 2 al cambiar únicamente <S>Centro: 8 → 4</S> y <S>Mercado: 6 → 11</S> sin tocar el grafo?</strong>
              <br />
              Greedy cambió por completo de ruta (se fue por <S>Centro → Parque → Clínica → Hospital</S>). Esto demuestra
              que <strong>la heurística guía la toma de decisiones</strong>: cambiar solo las estimaciones subjetivas{' '}
              <S>h(n)</S> altera el recorrido sin modificar ninguna conexión física del mapa.
            </li>
            <li>
              <strong>En el Caso 4, ¿por qué NO basta con bajar únicamente <S>h(Centro)</S> para controlar todo el recorrido hasta el Hospital?</strong>
              <br />
              Porque Greedy toma decisiones locales paso a paso. Bajar <S>h(Centro)</S> solo logra que el primer paso
              vaya a <S>Centro</S>, pero una vez ahí evaluará a sus vecinos (<S>Museo</S> y <S>Parque</S>); si{' '}
              <S>Museo</S> no tiene menor heurística que <S>Parque</S>, el algoritmo se desviará. Para forzar una ruta
              hay que poner valores descendentes en toda esa rama y valores altos en las ramas alternativas.
            </li>
            <li>
              <strong>¿Qué pasa si por error dejas todas las heurísticas en <S>0</S>?</strong>
              <br />
              Todos los nodos empatan con prioridad <S>0</S>, por lo que la cola de prioridad ya no tiene guía hacia la
              meta y desempata únicamente por el orden de inserción (<S>contador</S>), explorando casi todo el grafo a
              ciegas.
            </li>
            <li>
              <strong>¿La cola de prioridad (<S>Pendientes</S>) contiene solamente a los vecinos del nodo actual?</strong>
              <br />
              <strong>No.</strong> Contiene a todos los nodos descubiertos en cualquier paso anterior que aún no han
              sido visitados (los caminos alternativos con <S>h(n)</S> alto se quedan esperando al fondo de la cola).
            </li>
          </ul>
        </Ejemplo>

        <Ejemplo titulo="2. Preguntas del Ejercicio 12 y Práctica 2 (Servicios en la Nube: Cliente a Servidor-Objetivo)">
          <Tabla
            cabeza={['Experimento de la Práctica 2', 'Qué hace Greedy', 'Qué hace A*', 'Explicación con g(n), h(n) y f(n)']}
            filas={[
              [
                'Parte D · Valores originales\nGateway-A (g=2, h=5)\nGateway-B (g=1, h=3)\nAPI-B (arista 7, h=1)',
                'Ruta: Cliente → Gateway-B → API-B → Servidor-Objetivo.\nCosto real = 10.',
                'Orden: Cliente, Gateway-B, Gateway-A, API-A, Servidor-Objetivo.\nRuta: Cliente → Gateway-A → API-A → Servidor-Objetivo.\nCosto real = 7 (ÓPTIMO).',
                'A* explora primero Gateway-B porque f = 1+3 = 4 < 7. Pero al ver que de Gateway-B a API-B cuesta 7 (g=8, h=1 → f=9) y a Cache da f=8, frena esa rama y regresa por Gateway-A (f=7) → API-A (g=4, h=3 → f=7) logrando costo 7. Greedy ignora el 7 de la arista y se va por h(API-B)=1 gastando 10.',
              ],
              [
                'Parte E · Cambio de heurísticas\nGateway-A: 5→2, Gateway-B: 3→6, API-A: 3→1, API-B: 1→5',
                'Cambia de ruta y ahora sí toma Cliente → Gateway-A → API-A → Servidor-Objetivo (Costo = 7).',
                'Mantiene la misma ruta óptima de costo 7, pero ahora explora Gateway-A desde el principio sin pasar por Gateway-B.',
                'Como Greedy solo obedece a h(n), al darle pistas que apuntan al camino barato por fin acierta. A* es robusto: ya daba costo 7 antes y sigue dando costo 7 ahora.',
              ],
              [
                'Parte F · Cambio de costos reales\nGateway-B ↔ Cache: 2→1\nCache ↔ Servidor-Objetivo: 8→2',
                'NO cambia nada: sigue yéndose por Gateway-B → API-B y gastando 10.',
                'Detecta la bajada de costos y cambia a Cliente → Gateway-B → Cache → Servidor-Objetivo con Costo = 4.',
                'Modificar los costos de las aristas cambia g(n). Como A* usa f(n) = g(n) + h(n), en Cache ahora g=2 y al llegar a la meta g=4. Greedy no usa g(n) en su regla de selección, así que desperdicia la oferta del Cache.',
              ],
            ]}
          />
          <ul>
            <li>
              <strong>Pregunta clave del Caso 1 de A*: ¿El primer nodo seleccionado después de <S>Cliente</S> (<S>Gateway-B</S>) quedó finalmente en el camino solución?</strong>
              <br />
              <strong>No.</strong> A* exploró primero <S>Gateway-B</S> porque prometía <S>f = 4</S>, pero cuando vio que
              sus conexiones siguientes elevaban el costo total a <S>f = 8</S> y <S>f = 9</S>, dejó esa rama pendiente y
              construyó el camino ganador por <S>Gateway-A</S> (<S>costo = 7</S>).
            </li>
            <li>
              <strong>En el Caso 4 del Ejercicio 12 (forzar la ruta <S>Cliente → Gateway-A → API-B → Servidor-Objetivo</S>), ¿por qué no bastó con cambiar solo la heurística en A*?</strong>
              <br />
              Porque en A* no manda solo <S>h(n)</S>, sino la suma <S>f(n) = g(n) + h(n)</S>. Como el enlace original{' '}
              <S>Gateway-A ↔ API-B</S> tenía un costo real muy caro (<S>5</S>), su <S>g(n)</S> acumulado era mayor que
              ir por <S>API-A</S>; por eso hubo que bajar también el costo real de esa arista de <S>5</S> a <S>2</S>.
            </li>
          </ul>
        </Ejemplo>

        <Ojo titulo="Pruébalo en vivo en el simulador (Servicios en la Nube y Ciudad)">
          <p>
            Aquí está cargado el escenario exacto de tu <strong>Práctica 2 (Servicios en la Nube)</strong>. Alterna
            entre <strong>Greedy</strong> (costo 10) y <strong>A*</strong> (costo 7), o cambia al mapa de{' '}
            <strong>Ciudad (Terminal → Hospital)</strong>:
          </p>
        </Ojo>
        <SimuladorGrafo escenarioInicial="nube" algoritmoInicial="a_estrella" />
      </Seccion>
    </>
  );
}
