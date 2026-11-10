# Análisis Completo — Unidad 2: Algoritmos de Búsqueda (FDI)

> **Propósito de este documento:** Concentrar y estructurar toda la información de la **Unidad 2** de *Fundamentos de Inteligencia Artificial* a partir de:
> 1. Los **apuntes de clase en WhatsApp** (`9/10`, `12/10`, `19/10`, `3/11`).
> 2. Los **enunciados y rúbricas de las prácticas y ejercicios** (Espacio de búsqueda en almacén, Integrador Wi-Fi, Práctica 1 CI/CD, Práctica 2 Nube Greedy/A*, Práctica 3 Búsqueda Local HC/SA, Práctica 4 Algoritmos Genéticos).
> 3. Los **20 cuadernos de Google Colab (`.ipynb`)** en la carpeta `U2/`.
> 4. Las indicaciones del profesor sobre el **examen de la Unidad 2**: **no será de escribir código desde cero**, sino teórico-práctico (casos, interpretación de resultados/gráficas y **lectura de código Python**: *¿para qué sirve tal línea?, ¿qué hace tal instrucción?, ¿qué pasa si se modifica un parámetro?*).

---

## 1. Mapa general de la Unidad 2 (Los 6 temas oficiales)

Según lo dictado por el profesor el `9/10`, la Unidad 2 se compone exactamente de **6 temas** en secuencia progresiva:

| # | Tema | Pregunta central que responde | Algoritmos / Conceptos clave |
|---|---|---|---|
| **1** | **Problemas de búsqueda** | ¿Qué quiero resolver y cómo lo abstraigo? | **Inicio, Estados, Acciones, Meta** (+ Restricciones y Solución). Codificación abstracta (ej. `[x, y]`). |
| **2** | **Espacio de búsqueda** | ¿Cuáles son todas las posibilidades disponibles? | **Grafo** (`networkx`), **Nodo** (lugar) vs **Estado** (información), **Transición/Arista**, **Secuencia/Trayectoria**, nodos aislados por restricciones. |
| **3** | **Búsqueda ciega (no informada)** | ¿Cómo recorro el grafo sin pistas ni costos? | **BFS** (Anchura, por niveles, cola **FIFO** `deque`) y **DFS** (Profundidad, por rama, pila **LIFO** `list`). Conjunto `visitados`. |
| **4** | **Búsqueda heurística (informada)** | ¿Cómo uso una estimación («corazonada») para guiar la búsqueda? | Heurística $h(n)$, costo acumulado $g(n)$, **Greedy Best-First Search** ($f(n)=h(n)$) y **A\*** ($f(n)=g(n)+h(n)$). Cola de prioridad (`heapq`). |
| **5** | **Búsqueda local** | ¿Cómo mejoro una solución que ya tengo mirando a sus vecinos? | Vecindad ($x\pm 1$ o *swap*), **Hill Climbing** (solo acepta mejoras, se atrapa en máximos locales) y **Simulated Annealing** (acepta empeoramientos con probabilidad $P = e^{\Delta/T}$). |
| **6** | **Algoritmos genéticos (evolutivos)** | ¿Cómo busco el **óptimo global** evolucionando una población de soluciones? | Población inicial, **Fitness**, **Selección** (Truncamiento, Torneo, Ruleta, Ranking), **Cruzamiento** (1 punto, 2 puntos, Uniforme, Aritmético, Rutas), **Mutación** (Bit, Uniforme, Gaussiana, Swap, Inversión), **Elitismo** y **Convergencia**. |

---

## 2. Correcciones y aclaraciones de las notas rápidas de WhatsApp

Al tomar nota rápida en el celular quedaron algunas palabras cortadas o con autocorrector. Aquí está la traducción exacta cruzada con los Colabs del profesor:

| En el mensaje de WhatsApp | Qué dijo realmente el profesor / Qué significa |
|---|---|
| *«Estado de informática»* (`9/10, 9:09 p.m.`) | **Estado = información**: cada estado guarda la información de la situación actual del problema. |
| *«busqueda ciega o o informada»* (`9/10, 9:15 p.m.`) | **Búsqueda ciega o NO informada** (no tiene información extra ni costos para saber qué camino conviene más). |
| *«huerosticos es decidir en caliente por que fue una corazonada»* (`9/10, 9:17 p.m.`) | **Heurística**: una regla práctica, estimación o «corazonada» para tomar decisiones rápidas sin evaluar exhaustivamente todo (ejemplo de los dos restaurantes: uno lleno y otro vacío). |
| *«A mi no me gusta creo que se debería llamar algoritmos evolutivos»* (`9/10, 9:22 p.m.`) | La familia general se llama **Algoritmos Evolutivos**; los **Algoritmos Genéticos (AG)** son un tipo dentro de ellos (el primero y el más conocido). |
| *«Kendde.com»* (`9/10, 9:36 p.m.`) | **Kaggle.com** (plataforma de bases de datos / datasets para la Fase 2 del proyecto integrador). |
| *«clasificador intlewgienge d eresiduis...»* (`9/10, 9:43 p.m.`) | **Proyecto integrador (en 3 fases):** Clasificador inteligente de residuos que identifica un residuo (vidrio, metal, etc.) a partir de una imagen y da una recomendación de cómo tratar ese objeto. |
| *«p5 = f(5) / sumatoriaf ... selecciona todas las que tienen el 50%»* (`3/11, 5:32 p.m.`) | En **Selección por Ruleta**, la probabilidad de elegir al individuo $i$ es proporcional a su aptitud: $P(i) = \frac{f(i)}{\sum f(j)}$. Quien tiene mayor fitness ocupa una rebanada mayor de la ruleta y tiene mayor probabilidad de ser elegido como padre. |

---

## 3. Desglose profundo tema por tema

### Tema 1: Problemas de búsqueda y formulación

#### A. Lo que dijo el profesor
- **¿Qué es un problema de búsqueda?** Buscar cómo llegar de un punto inicial a un objetivo (o buscar el mejor camino), por ejemplo, ir de **Querétaro a Ciudad de México** o subir en elevador de **Planta Baja (PB) al Piso 5**.
- **Los 4 elementos obligatorios de todo problema de búsqueda** (más Solución y Restricciones):
  1. **Inicio (Estado inicial):** *¿Dónde comienza el problema?*
     - Ejemplo elevador: `PB`.
     - Ejemplo viaje: `Querétaro`.
     - Ejemplo jarras: `(0, 0)` (ambas jarras vacías).
  2. **Estados:** *¿Qué situaciones o configuraciones son posibles?* Guardan toda la **información** relevante en un momento dado.
     - Ejemplo elevador: `PB`, `P1`, `P2`, `P3`, `P4`, `P5` (todos los pisos del edificio).
     - Ejemplo edificio: `Entrada`, `Pasillo`, `Aula`, `Laboratorio`.
  3. **Acciones (o transiciones):** *¿Qué puedo hacer para pasar de un estado a otro?*
     - Ejemplo elevador: `Subir` y `Bajar`.
     - Ejemplo numérico (`1_Ejemplos_Espacio_de_Busqueda.ipynb`): sumar `+1` o sumar `+2`.
     - Ejemplo jarras: llenar una jarra, vaciar una jarra o verter agua de una jarra a la otra.
  4. **Meta (Estado objetivo):** *¿Qué quiero alcanzar?*
     - Ejemplo elevador: `P5`.
     - Ejemplo jarras: cualquier estado donde alguna jarra tenga exactamente `2` litros, ej. `(2, 0)` o `(2, 3)`.
- **5. Solución:** *¿Cómo vamos a llegar?* Es la secuencia de pasos o acciones que lleva desde el inicio hasta la meta.
- **Restricciones:** Condiciones que prohíben ciertos estados o transiciones.
  - Ejemplo carretera: *«No quiero pasar por San Juan del Río porque ahí vive mi ex»*.
  - Ejemplo elevador: *«El estacionamiento subterráneo está bloqueado»*.
  - Ejemplo almacén: *«Hay una fuga en Almacén 1»*.

#### B. Abstracción y codificación de estados (Cuaderno `1_Ejemplos_Espacio_de_Busqueda.ipynb` + Apuntes)
El profesor dio el tip de **«pensar cómo programarlo»**: llevar un problema físico o verbal a una representación abstracta (números, cadenas, tuplas o arreglos) que la computadora pueda manipular:

| Problema de clase | Cómo se abstrae / codifica cada estado | Acciones válidas | Meta |
|---|---|---|---|
| **Robot en edificio** | Nombre del lugar (`"Entrada"`, `"Pasillo"`, `"Aula"`, `"Laboratorio"`) | Moverse a una zona conectada directamente | `"Laboratorio"` |
| **Estados numéricos** | Un número entero `0, 1, 2, 3, 4` | Sumar `+1` o sumar `+2` | Llegar a `4` |
| **Dos interruptores (A y B)** | Cadena de 2 bits: `"00"`, `"01"`, `"10"`, `"11"` (`0`=apagado, `1`=encendido). **Un nodo ya no es un lugar, es una configuración.** | Cambiar **solamente un interruptor** a la vez (estados que difieren en 1 solo bit) | Configuración objetivo (ej. `"11"`) |
| **Jarras de 4 L y 3 L** | Tupla o arreglo `[x, y]` / `(x, y)` donde `x` = litros en jarra de 4 L ($0\le x\le 4$) y `y` = litros en jarra de 3 L ($0\le y\le 3$). Inicio: `(0, 0)`. | 1. Llenar 4L `(4, y)` o 3L `(x, 3)`<br>2. Vaciar 4L `(0, y)` o 3L `(x, 0)`<br>3. Verter de 4L a 3L: `cant = min(x, 3 - y)`<br>4. Verter de 3L a 4L: `cant = min(y, 4 - x)` | Cualquier estado con `2` litros: `(2, 0)`, `(2, 1)`, `(2, 2)`, `(2, 3)`, `(0, 2)`, `(4, 2)` |
| **Esposos celosos (cruce del río)** | Representar quién está en cada orilla y dónde está la balsa (vector/arreglo de estado). | Cruzar 1 o 2 personas en la balsa de una orilla a otra. **Restricción:** ninguna mujer puede quedarse en una orilla o balsa en presencia de otro hombre si no está su propio esposo. | Todos cruzaron a la otra orilla sin violar la restricción. |

#### C. Cómo resolver paso a paso los Problemas Clásicos en Examen Impreso

1. **Problema 1: Parejas / Esposos Celosos (Cruce del Río)**
   - **Inicio:** `[0, 0, 0, 0, 0]` (`[H1, M1, H2, M2, Balsa]`, todos en la orilla izquierda `0`).
   - **Estados:** Arreglos binarios `[H1, M1, H2, M2, Balsa]` con valores `0` (izquierda) y `1` (derecha).
   - **Acciones:** Cruzar 1 o 2 personas en la balsa cambiando su bit y el de la balsa (`0 ↔ 1`).
   - **Meta:** `[1, 1, 1, 1, 1]` (todos en la orilla derecha).
   - **Restricciones:**
     1. La balsa solo lleva 1 o 2 personas y requiere al menos 1 persona para moverse.
     2. **Regla de celos:** Ninguna esposa puede quedar en una orilla con otro hombre si su propio esposo no está en esa misma orilla (`M1` no puede estar con `H2` sin `H1`; `M2` no puede estar con `H1` sin `H2`). Por ejemplo, `[1, 0, 0, 0, 1]` (cruzar solo `H1`) es **inválido** porque deja a `M1` con `H2` en la izquierda.
   - **Solución paso a paso (5 cruces para 2 parejas):**
     - Paso 0 (Inicio): `[0, 0, 0, 0, 0]` — Todos en la izquierda.
     - Paso 1: Cruzan las dos esposas (`M1` y `M2`) → **`[0, 1, 0, 1, 1]`** *(los esposos quedan solos en la izquierda)*.
     - Paso 2: Regresa `M1` con la balsa → **`[0, 0, 0, 1, 0]`** *(`M1` vuelve con `H1`; `M2` queda sola en la derecha)*.
     - Paso 3: Cruzan los dos esposos (`H1` y `H2`) → **`[1, 0, 1, 1, 1]`** *(`M1` queda sola en la izquierda; `M2` se reúne con `H2` en la derecha)*.
     - Paso 4: Regresa `M2` con la balsa → **`[1, 0, 1, 0, 0]`** *(`H1` y `H2` quedan solos en la derecha; `M1` y `M2` en la izquierda)*.
     - Paso 5 (Meta): Cruzan las dos esposas (`M1` y `M2`) → **`[1, 1, 1, 1, 1]`**.
     *(Nota: Con 3 parejas `[H1,M1,H2,M2,H3,M3,Balsa]` se resuelve con la misma lógica en 11 cruces).*

2. **Problema 2: Jarras de Agua de 4 L y 3 L (`1_Ejemplos_Espacio_de_Busqueda.ipynb`)**
   - **Inicio:** `(0, 0)` (ambas vacías).
   - **Estados:** Tuplas `(x, y)` con $0 \le x \le 4$ y $0 \le y \le 3$ (16 estados alcanzables).
   - **Acciones (las 6 reglas):** Llenar 4L `(4, y)`, Llenar 3L `(x, 3)`, Vaciar 4L `(0, y)`, Vaciar 3L `(x, 0)`, Pasar 4L→3L con `cant = min(x, 3 - y)` dando `(x - cant, y + cant)`, Pasar 3L→4L con `cant = min(y, 4 - x)` dando `(x + cant, y - cant)`.
   - **Meta:** Tener exactamente 2 litros (`(2, 0)` o `(4, 2)`).
   - **Solución paso a paso (6 acciones hasta `(2, 0)`):**
     `(0, 0)` → Llenar 3L **`(0, 3)`** → Pasar 3L a 4L **`(3, 0)`** → Llenar 3L **`(3, 3)`** → Pasar 3L a 4L hasta tope **`(4, 2)`** *(ya quedan 2L en la chica)* → Vaciar 4L **`(0, 2)`** → Pasar los 2L a la de 4L **`(2, 0)`**.

3. **Problema 3: Robot en Edificio / Centro de Trabajo (`Colab 1` y `Colab 2`)**
   - **Inicio:** `"Entrada"`.
   - **Estados:** `"Entrada"`, `"Recepción"`, `"Oficina"`, `"Cafetería"`, `"Laboratorio"`, `"Almacén"`, `"Salida"`.
   - **Acciones:** Desplazarse entre habitaciones conectadas directamente en el diccionario `grafo`.
   - **Meta:** `"Salida"` (o `"Laboratorio"` en el Ejemplo 1).
   - **Restricciones:** Si `"Laboratorio"` está cerrado por mantenimiento, se deja `"Laboratorio": []` y se quita de los vecinos de `"Oficina"` y `"Almacén"`.
   - **Solución:** `"Entrada" → "Recepción" → "Oficina" → "Almacén" → "Salida"` (o vía `"Cafetería"`).

4. **Problema 4: Dos Interruptores (`"00"` a `"11"`, `Colab 1`)**
   - **Inicio:** `"00"` | **Meta:** `"11"` | **Restricción:** Solo cambiar 1 interruptor por paso (`diferencias == 1` usando `zip(e1, e2)`).
   - **Solución (2 pasos):** `"00" → "01" → "11"` o bien `"00" → "10" → "11"`.

---

### Tema 2: Espacio de búsqueda y representación con grafos

#### A. Conceptos clave del profesor (`19/10` y `Ejer2.ipynb`)
1. **Diferencia entre Problema de Búsqueda (Tema 1) y Espacio de Búsqueda (Tema 2):**
   - **Definir el problema de búsqueda** es establecer las reglas del juego: cuál es el inicio, cuál es la meta, qué acciones existen y qué restricciones hay.
   - **Construir el espacio de búsqueda** es desplegar **todas las posibilidades disponibles** (el «mapa» completo de estados alcanzables y sus conexiones), incluyendo tanto los caminos que llegan a la meta como los callejones sin salida (ej. `Pasillo A` cuando falla `Almacén 1`).
   - *En el Tema 2 todavía no se busca ni se elige un camino*: solo se construye el mapa completo sobre el cual trabajarán los algoritmos del Tema 3 en adelante.
2. **Vocabulario de grafos en clase:**
   - **Grafo:** *«Un diagrama en el que pasamos de estado en estado»*.
   - **Estado vs. Nodo:** El **estado** es la **información** (o configuración), y en el grafo se representa como un **nodo** (el «lugar» o punto en el diagrama).
   - **Conexión / Arista / Transición:** Acción permitida que lleva directamente de un nodo a otro.
   - **Trayectoria / Secuencia:** Los pasos sucesivos de nodo en nodo para ir de un estado a otro (lo que en el Tema 1 llamábamos los pasos de la solución).
3. **¿Cómo alteran las restricciones al espacio de búsqueda?**
   - Las **acciones y restricciones delimitan el espacio de búsqueda**.
   - Si se agrega una restricción (ej. fuga en `Almacén 1`, caída de `Switch-Piso1`, falla en `Analizador-Calidad` o bloqueo entre `Ensamble` y `Calidad`), **desaparecen aristas (conexiones)**, se reducen las rutas posibles, algunos nodos quedan como callejones sin salida y otros pueden quedar **completamente inalcanzables** (como `Servicio-Pruebas` cuando falla `Analizador-Calidad`).
   - En el ejemplo de las **Jarras de 4 L y 3 L**, Python no recibe la lista de los 16 estados posibles de antemano: empieza en `(0, 0)` y al aplicar las acciones genera únicamente los **14 estados alcanzables** (por ejemplo, `(1, 1)` o `(2, 1)` nunca se pueden alcanzar porque las acciones solo llenan, vacían o vierten hasta el tope).

#### B. Regla de oro en Python: Nodo fuera de servicio (aislado) vs. Nodo eliminado
En **todas** las prácticas (`2_Ejercicio_Espacio_de_Busqueda`, `Ejer2`, `5_Ejercicio_BFS`, `7_Ejercicio_DFS`, `Practica13_busqueda_ciega`), el profesor evalúa esta distinción:
- Cuando un elemento sufre una **falla temporal, fuga o clausura** (ej. `Laboratorio` cerrado, fuga en `Almacén 1`, `Switch-Piso1` caído, `Analizador-Calidad` fuera de servicio):
  1. **NO se borra la llave del diccionario `grafo`**, porque el lugar/servidor sigue existiendo físicamente en la infraestructura real (permite auditoría visual y diagnóstico).
  2. Se deja su lista de vecinos vacía: `grafo["Analizador-Calidad"] = []`.
  3. **Se elimina de las listas de vecinos de todos los demás nodos** para que nadie pueda entrar a él:
     ```python
     grafo_falla["Analizador-Calidad"] = []
     for estado in grafo_falla:
         grafo_falla[estado] = [
             v for v in grafo_falla[estado] if v != "Analizador-Calidad"
         ]
     ```
  4. Al graficar con `NetworkX`, es obligatorio hacer `G.add_node(estado)` además del `for vecino in vecinos: G.add_edge(estado, vecino)`. **¿Por qué?** Porque si un nodo tiene lista vacía `[]`, el ciclo `for vecino in vecinos` no se ejecuta; si no se llamó a `G.add_node(estado)`, ¡el nodo aislado desaparece del dibujo!

---

### Tema 3: Búsqueda ciega (no informada) — BFS y DFS

#### A. ¿Por qué se llama «búsqueda ciega» o «no informada»?
Porque el algoritmo **no recibe ninguna pista, estimación ni costo** sobre qué tan cerca está de la meta ni qué camino es más barato o rápido. Solo conoce el estado inicial, la condición de meta y las conexiones permitidas por las restricciones. Explora el grafo de manera puramente sistemática.

#### B. Comparativa directa: BFS vs. DFS

| Característica | BFS (*Breadth-First Search* · Búsqueda en Anchura) | DFS (*Depth-First Search* · Búsqueda en Profundidad) |
|---|---|---|
| **Cómo explora** | **Por niveles (horizontal / en abanico):** visita primero todos los vecinos a 1 paso del inicio, luego todos los de 2 pasos, etc. | **Por rama profunda (vertical):** se mete por un camino hasta el fondo; solo cuando topa con pared retrocede (*backtracking*). |
| **Estructura de datos** | **Cola FIFO** (*First In, First Out*: el primero en entrar es el primero en salir). | **Pila LIFO** (*Last In, First Out*: el último en entrar es el primero en salir). |
| **Implementación en Python** | `cola = deque([(inicio, [inicio])])` y extrae con **`cola.popleft()`**. | `pila = [(inicio, [inicio])]` y extrae con **`pila.pop()`**. |
| **Inserción de vecinos** | `for vecino in grafo.get(nodo, []): cola.append(...)` | `for vecino in reversed(grafo.get(nodo, [])): pila.append(...)` *(se invierten para que el primer vecino de la lista quede arriba de la pila y salga primero)*. |
| **¿Garantiza el camino con menos pasos (aristas)?** | **SÍ, siempre** encuentra el camino con el **menor número de pasos/saltos** (en grafos sin pesos). | **NO.** Puede dar una vuelta larga de 5 pasos aunque existiera una ruta directa de 2 pasos en otra rama (como en `7_Ejercicio_DFS`: Campamento→Bosque→Cueva→Ruinas→Templo→Mirador en vez de Campamento→Río→Mirador). |
| **¿Afecta el orden en que se escriben los vecinos en el diccionario?** | Solo cambia qué nodo del mismo nivel revisa primero, pero **nunca empeora el número de pasos** de la ruta final. | **SÍ cambia drásticamente la ruta y los pasos** (en el reto de `7_Ejercicio_DFS`, cambiar `["Bosque", "Río"]` a `["Río", "Bosque"]` hizo que DFS fuera directo por `Río → Mirador → Templo`). |
| **¿Cuándo parece más eficiente DFS que BFS?** | BFS es mejor cuando la meta está cerca de la raíz o queremos la ruta con menos saltos. | Si por suerte la meta está al fondo de la **primera rama** que explora DFS, DFS visita menos estados que BFS (ej. en `Practica13_busqueda_ciega`, DFS visitó 6 estados y BFS visitó 9 para encontrar el mismo camino de 5 pasos). |

#### C. Preguntas clásicas de examen sobre el código de BFS y DFS
1. **¿Qué guarda cada elemento de la cola/pila `(nodo, camino)`?**
   Guarda una tupla con el estado actual que se va a visitar (`nodo`) y la lista completa de estados recorridos desde el inicio hasta él (`camino`, ej. `['Entrada', 'Recepción', 'Sala']`).
2. **¿Cómo se calcula la profundidad o el número de pasos de un `camino`?**
   Con **`len(camino) - 1`** (porque `camino` incluye el nodo inicial; un camino de 6 nodos tiene **5 pasos/aristas**).
3. **¿Para qué sirve `visitados = set()`?**
   Para registrar los nodos ya explorados y **evitar ciclos infinitos** (dar vueltas en círculo en grafos con conexiones bidireccionales `↔`) o explorar dos veces el mismo nodo.
4. **¿Qué diferencia hay entre `orden` y `camino`?**
   - `orden`: **todos** los nodos que el algoritmo fue abriendo/explorando durante su búsqueda (incluyendo ramas equivocadas).
   - `camino`: únicamente la secuencia limpia desde `inicio` hasta `meta` que resuelve el problema.
5. **¿Cómo detecta el programa que NO existe solución (ej. buscar `Servicio-Pruebas` cuando cayó `Analizador-Calidad`)?**
   Explora todos los nodos alcanzables sin caer en bucle gracias a `visitados`. Cuando ya no quedan vecinos nuevos por agregar, la `cola` o `pila` **se vacía**, el ciclo `while cola:` / `while pila:` termina normalmente y la función ejecuta `return orden, None`.

---

### Tema 4: Búsqueda heurística (informada) — Greedy Best-First Search y A*

#### A. ¿Qué es una heurística $h(n)$?
- **Explicación del profesor (`9/10`):** Es como llegar a una calle con dos restaurantes (uno lleno y otro vacío) y elegir «en caliente» por una **corazonada** o regla práctica basada en pistas del problema.
- Formalmente, **$h(n)$** es una **estimación** de qué tan cerca está el nodo $n$ de la meta (cuánto falta por recorrer):
  - **Menor $h(n)$** = el nodo parece **más cerca** de la meta (más prometedor).
  - **Mayor $h(n)$** = el nodo parece **más lejos** de la meta.
  - En la meta siempre se cumple **`h(meta) = 0`**.

#### B. Comparativa: Greedy Best-First Search vs. A* (`Practica23_Busqueda_Heuristica.ipynb`)

| Criterio | Greedy Best-First Search (Búsqueda Codiciosa / Voraz) | Algoritmo A* (A Estrella) |
|---|---|---|
| **Fórmula de prioridad** | **$f(n) = h(n)$** | **$f(n) = g(n) + h(n)$** |
| **¿Qué mira para decidir?** | **Solamente la heurística $h(n)$** (lo que cree que falta). Ignora por completo cuánto costó llegar hasta ahí. | **Suma dos cosas:**<br>• **$g(n)$**: costo **real acumulado** desde el inicio hasta $n$.<br>• **$h(n)$**: estimación heurística de $n$ a la meta. |
| **Ventaja / Fortaleza** | Muy rápido y directo cuando la heurística es buena guía. | Equilibra costo real y estimación; **no se deja engañar** fácilmente por un $h(n)$ pequeño si el camino real $g(n)$ es muy caro. Encuentra la ruta de menor costo total. |
| **Debilidad / Trampa** | **Es fácil de engañar:** si un nodo tiene $h(n)$ muy chico (ej. `API-B` con $h=1$), Greedy se va por ahí aunque la arista cueste muchísimo (`Gateway-B → API-B` cuesta `7`). | Requiere llevar registro de costos acumulados (`mejor_costo`) y puede explorar algún nodo extra para verificar que no haya una ruta más barata. |
| **¿Qué pasa si cambias solo los costos reales de las aristas (sin tocar $h$)?** | **Greedy NO cambia de ruta** (como en la Parte F de la Práctica 23: bajó el costo de `Cache`, pero Greedy ni se enteró porque no usa $g(n)$ en su cola de prioridad). | **A\* SÍ actualiza su ruta** porque los costos reales modifican $g(n)$ y por lo tanto cambian $f(n) = g(n) + h(n)$. |
| **¿Qué pasa si cambias solo las heurísticas $h(n)$ (sin tocar el grafo)?** | Cambia radicalmente qué rama explora y qué camino devuelve. | Puede cambiar el **orden de exploración** inicial (ej. revisar `Gateway-A` antes que `Gateway-B`), pero sigue encontrando el camino óptimo si la heurística es razonable. |

#### C. Traza numérica del caso de clase: Servicios en la Nube (`12_Ejercicio_A_Estrella` y `Practica23`)
Con el grafo original (`Cliente` → `Servidor-Objetivo`):
- Desde `Cliente`:
  - `Gateway-A`: costo $g = 2$, heurística $h = 5 \implies f = 2 + 5 = \mathbf{7}$.
  - `Gateway-B`: costo $g = 1$, heurística $h = 3 \implies f = 1 + 3 = \mathbf{4}$.
- **¿Qué pasa en el paso 1?** Tanto Greedy ($h=3 < 5$) como A* ($f=4 < 7$) exploran primero **`Gateway-B`**.
- **¿Qué pasa después de abrir `Gateway-B`?**
  - Vecinos desde `Gateway-B`:
    - `API-B`: tiene $h = 1$ (¡muy tentador!), pero llegar ahí cuesta $g = 1 + 7 = 8$, así que para A* vale $f = 8 + 1 = \mathbf{9}$.
    - `Cache`: $g = 1 + 2 = 3, h = 5 \implies f = \mathbf{8}$.
  - **Greedy** solo ve $h(\text{API-B}) = 1$, se va de frente por `Cliente → Gateway-B → API-B → Servidor-Objetivo` y paga un **costo real de 10** ($1 + 7 + 2$).
  - **A\*** ve que en su cola de pendientes quedó `Gateway-A` con **$f = 7$** (menor que $f=8$ de `Cache` y $f=9$ de `API-B`). ¡Se regresa a explorar `Gateway-A`!, luego `API-A` ($g=4, h=3, f=7$) y llega a `Servidor-Objetivo` por `Cliente → Gateway-A → API-A → Servidor-Objetivo` con **costo real óptimo de 7** ($2 + 2 + 3$).
  - **Lección clave de examen:** *El primer nodo que explora A\* (`Gateway-B`) NO necesariamente forma parte del camino solución final.*

#### D. Detalles de código en Greedy y A* (`heapq`)
- **`heapq.heappush(cola, tupla)` y `heapq.heappop(cola)`**: Implementan una **cola de prioridad de mínimos** (*min-heap*): siempre sacan la tupla cuyo **primer elemento** sea el menor (`h` en Greedy, `f` en A*).
- **¿Por qué la cola guarda la totalidad de candidatos pendientes y NO solo los vecinos del nodo actual?** Porque si la rama actual se vuelve muy cara (como en `Gateway-B`), el algoritmo puede retomar un candidato pendiente de otra rama anterior (como `Gateway-A`).
- **¿Para qué sirve la variable `contador` en `(nuevo_f, nuevo_g, contador, vecino, camino)`?** Para **desempatar** cuando dos nodos tienen exactamente el mismo `f` (y `g`), evitando que Python intente comparar diccionarios o listas y manteniendo el orden en que fueron descubiertos.
- **¿Para qué sirve `if g != mejor_costo.get(nodo): continue` en A\*?** Como `heapq` no borra entradas viejas cuando encontramos un camino más barato hacia un mismo nodo, esa línea descarta las tuplas «viejas/caras» que quedaron rezagadas en la cola.

---

### Tema 5: Búsqueda local — Hill Climbing y Simulated Annealing

#### A. ¿Qué es la búsqueda local y cuándo se usa?
- **Explicación del profesor (`9/10` y `3/11`):** En vez de construir un camino paso a paso desde cero en un grafo, **yo ya le doy una posible solución completa** y el algoritmo busca mejorarla revisando soluciones **vecinas** (haciendo pequeños cambios alrededor de la que ya teníamos).
- **Ejemplos de clase:**
  1. **Google Maps en ruta (`9/10`):** Ya tienes una trayectoria trazada y vas manejando; si cambia el tráfico, actualiza la ruta alrededor de la que ya tenías.
  2. **Generación de horarios de 4 grupos LITIID (`Hill_Climbing_Horarios_IA.ipynb`):**
     - Cada grupo (`LITIID-001` a `004`) debe llevar **6 horas semanales** repartidas como **`[2, 2, 1, 1, 0]`** de lunes a viernes (dos sesiones de 2h, dos de 1h y un día libre).
     - **Restricción:** No puede haber dos sesiones de 2 horas en días consecutivos (`horas[i] == 2 and horas[i+1] == 2`).
     - **Balance:** El total de los 4 grupos es $4 \times 6 = 24$ horas semanales $\implies$ promedio ideal de **$24 / 5 = 4.8$ horas por día**.
     - **Función de evaluación (minimización):**
       $$\text{Costo} = 100 \times \text{violaciones} + \text{desbalance}$$
       *(Se multiplica `violaciones` por `100` para darle mucha más prioridad a cumplir la restricción dura antes que afinar el balance diario).*
     - **¿Qué es un vecino aquí?** Tomar un grupo al azar e **intercambiar (*swap*) las horas de dos días distintos** (así nunca se rompe la suma de 6 horas `2+2+1+1+0`).
  3. **Optimización de funciones matemáticas con múltiples picos (`Ejercicio_Hill_Climbing_Han` y `Practica_33`):**
     - $f(x) = -((x-3)^2)((x-9)^2) + x$ en $x \in [0, 12]$ (tiene un **máximo local en $x=3$** con $f(3)=3$ y el **máximo global en $x=9$** con $f(9)=9$).
     - $f(x) = 0.6x + 8\sin(1.3x) + 4\sin(2.4x)$ en $x \in [0, 20]$ (función con múltiples subidas, bajadas y máximos locales).
     - **¿Qué es un vecino aquí?** Los enteros inmediatos **`x - 1` y `x + 1`** (respetando que no se salgan del dominio `[x_min, x_max]`).

#### B. Comparativa: Hill Climbing vs. Simulated Annealing (Recocido Simulado)

| Característica | Hill Climbing (Ascenso de Colinas) | Simulated Annealing (Recocido Simulado) |
|---|---|---|
| **Regla de movimiento** | **Estrictamente voraz:** evalúa a los vecinos y **solo se mueve si el vecino mejora** a la solución actual ($f(\text{vecino}) > f(\text{actual})$ al maximizar, o $\text{costo} < \text{costo\_actual}$ al minimizar). | Calcula $\Delta = f(\text{vecino}) - f(\text{actual})$:<br>• Si **$\Delta \ge 0$** (mejora o iguala): **se acepta siempre**.<br>• Si **$\Delta < 0$** (empeora): **se puede aceptar** con probabilidad **$P = e^{\Delta / T}$** si un número aleatorio $r \in [0, 1)$ cumple **`r < P`**. |
| **¿Cuándo se detiene?** | En cuanto llega a un punto donde **ningún vecino es mejor** que `actual` (`if mejor == actual: break`). | Después de un número fijo de iteraciones (mientras la temperatura $T$ se va enfriando en cada paso con **`T = alpha * T`**). |
| **Problema de los máximos locales** | **Queda atrapado siempre** en el primer máximo local que encuentra, porque para ir a un pico más alto tendría que bajar primero y su regla le prohíbe empeorar. | **Puede escapar de máximos locales** gracias a que al inicio (cuando $T$ es alta) acepta dar «pasos hacia abajo» para cruzar valles. |
| **Dependencia del punto inicial ($x_0$)** | **Totalmente dependiente y determinista:** en $-((x-3)^2)((x-9)^2)+x$, si inicia en $x_0=1$ o $2$ siempre se atora en $x=3$; si inicia en $x_0=7$ u $11$ llega a $x=9$. | Reduce la dependencia de $x_0$, aunque **no la elimina al 100%** (si el valle es muy profundo o hay pocas iteraciones, aún importa dónde inicia). |
| **Papel del azar (`random.seed`)** | En 1D ($x\pm 1$) es determinista; en horarios usa azar para muestrear 20 vecinos. | Es **estocástico**: usa azar para elegir vecino (`random.choice`) y para decidir si acepta empeoramientos (`random.random() < P`). Dos corridas sin la misma semilla dan recorridos distintos; por eso **una sola ejecución no basta** para evaluarlo. |
| **Variables `actual` vs. `mejor`** | `actual` siempre es la mejor vista hasta ese momento porque nunca empeora. | **Es obligatorio guardar `mejor` por separado de `actual`**, porque en las últimas iteraciones `actual` podría aceptar un salto hacia un vecino peor y perderíamos la cima más alta visitada. |

#### C. Efecto de los parámetros en Simulated Annealing (`16_HANNIEL_Ejercicio_SA` y `Practica_33`)
1. **Temperatura inicial ($T_0$, ej. `1, 5, 30, 60`):**
   - **$T_0$ muy baja ($T_0 = 1$):** $e^{\Delta/T}$ se vuelve casi $0$; casi nunca acepta empeoramientos y **se comporta igual que Hill Climbing** (se atora rápido).
   - **$T_0$ alta ($T_0 = 30, 60$):** $e^{\Delta/T}$ es cercana a $1$; acepta muchos movimientos peores al principio y **explora más el dominio**.
   - **¿Una $T_0$ altísima garantiza el máximo global?** **NO.** Si es excesivamente alta o no tiene suficientes iteraciones para enfriarse, salta casi al azar sin estabilizarse.
2. **Factor / velocidad de enfriamiento ($\alpha$, donde $T \leftarrow \alpha \cdot T$, ej. `0.70, 0.85, 0.90, 0.97, 0.99`):**
   - **$\alpha$ pequeño (`0.70`):** La temperatura cae en picada (enfriamiento rápido). Deja de explorar muy pronto y se congela en un máximo local.
   - **$\alpha$ cercano a 1 (`0.97` o `0.99`):** El enfriamiento es **lento y gradual**, permitiendo explorar durante más iteraciones antes de volverse estricto al final.

---

### Tema 6: Algoritmos Genéticos (Evolutivos)

#### A. Idea central del profesor (`9/10` y `3/11`)
- A diferencia de Hill Climbing y Simulated Annealing (que mueven **una sola solución** revisando su vecindario local), un **Algoritmo Genético (AG)** trabaja con una **población de muchas soluciones simultáneas** dispersas por todo el dominio para buscar el **óptimo global**.
- Es una **metaheurística probabilística (estocástica)** inspirada en la evolución biológica: **no garantiza al 100%** encontrar el óptimo matemático exacto (depende del azar), pero al evolucionar generaciones se acerca muchísimo a la mejor solución global.

#### B. Flujo completo de un Algoritmo Genético
1. **Definir el problema y la función *fitness* (aptitud):** Qué queremos maximizar (ej. $f(x) = 0.6x + 10\sin(1.4x) + 9$) o minimizar (ej. el error $f(x) = (x - a)^2$).
2. **Codificar la solución (Cromosoma / Individuo):** Cómo se representa cada solución candidata (un binario de bits, un número real $x$, un vector/arreglo o una permutación de nodos).
3. **Generar la Población Inicial (Generación 0):** Conjunto de $N$ individuos generados al azar dentro del dominio (ej. 6, 18, 20 soluciones).
4. **Evaluar el *fitness* de cada individuo.**
5. **Ciclo evolutivo por $G$ generaciones** (repite hasta cumplir el número de generaciones o converger):
   - **Paso 5.1 — Elitismo:** Copiar intactos los `elitismo` mejores individuos a la nueva generación para no perder la mejor solución.
   - **Paso 5.2 — Selección de padres:** Elegir qué individuos se reproducirán según su fitness.
   - **Paso 5.3 — Cruzamiento (*Crossover*):** Combinar dos padres para formar uno o más hijos.
   - **Paso 5.4 — Mutación:**Con probabilidad `prob_mutacion`, aplicar un pequeño cambio aleatorio al hijo para mantener la **diversidad genética**.
   - **Paso 5.5 — Reemplazo y nueva evaluación:** La nueva población reemplaza a la anterior y se vuelve a evaluar en la función *fitness*.
6. **Devolver el mejor individuo global encontrado.**

#### C. Los 4 métodos de Selección de Padres (dictados el `3/11`)

| Método | Cómo funciona (según clase y Colabs) | Ventajas y Desventajas |
|---|---|---|
| **1. Truncamiento** | Se ordenan todas las soluciones de la mejor a la peor (ej. de mayor a menor si maximizamos) y **se corta en las primeras $k$** (ej. las mejores 5 o 10). Esas son los padres y se desechan las demás. | Muy simple y rápido, pero **elimina de golpe toda la diversidad** de las soluciones medias/bajas. |
| **2. Torneo** | Se eligen al azar $k$ individuos de la población (en los Colabs $k=2$ o $k=3$) y **compiten entre sí: gana el que tenga mejor *fitness***. Se repite para elegir al segundo padre. | **Muy directo, selectivo y converge más rápido** que la ruleta. No requiere transformar fitness negativos. Con el tamaño $k$ se controla la *presión de selección*. |
| **3. Ruleta** | Cada individuo recibe una probabilidad proporcional a su fitness: $$P(i) = \frac{f(i)}{\sum f(j)}$$ *(En los Colabs: si hay valores negativos se desplaza con `(v - minimo) + 1e-6`, y si se **minimiza** un costo se transforma a aptitud positiva con `pesos = 1 / (1 + costos)`).* | Da oportunidad de reproducirse también a individuos no tan buenos (**mantiene mayor diversidad y exploración**), pero **converge más lento** y sufre si un «superindividuo» acapara casi toda la ruleta. |
| **4. Ranking** | Se ordenan los individuos por desempeño y se asigna la probabilidad **según su posición en el ranking** (1º, 2º, 3º…), no según el valor bruto de $f(x)$, aplicando reglas adicionales de porcentaje. | **Ventajas (del apunte):** 1) Reduce el efecto de diferencias enormes de fitness; 2) Muy fácil de programar; 3) Muy flexible.<br>**Desventajas:** 1) Puede reducir diversidad; 2) Hay que ajustar la presión de selección. |

#### D. Los 5 métodos de Cruzamiento (*Crossover*) y su representación (`3/11`)

| Método de cruzamiento | Representación que usa | Idea / Qué hace |
|---|---|---|
| **1. De 1 punto** | **Bits (binario)** | Se elige una frontera (punto de corte) en la cadena binaria: el hijo toma la primera parte del Padre 1 y la segunda parte del Padre 2. |
| **2. De 2 puntos** | **Bits (binario)** | Se eligen dos cortes y se **intercambia un bloque intermedio** de bits entre los dos padres (ej. en 16 bits, intercambiar bloques de 2 o 4 bits). |
| **3. Uniforme** | **Bits o vectores** | Se decide posición por posición (bit a bit o componente a componente) de cuál de los dos padres hereda cada valor. |
| **4. Aritmético (ponderación)** | **Números reales** | Combina numéricamente a los dos padres mediante un promedio ponderado con $\alpha \in [0, 1]$ aleatorio: $$\text{hijo} = \alpha \cdot p_1 + (1 - \alpha) \cdot p_2$$ *(Es el que usan los 3 Colabs de AG: `17`, `18`, `19` y `Practica_43`, cuidando con `clip` o `min/max` no salirse del dominio).* |
| **5. Por rutas (secuencias)** | **Permutaciones (grafos/nodos)** | Para problemas donde la solución es un recorrido de nodos en un grafo: intercambia sub-secuencias de nodos cuidando que la ruta siga siendo válida. |

#### E. Los 5 métodos de Mutación (`3/11`)

| Método de mutación | Tipo de representación usual | Efecto sobre la solución |
|---|---|---|
| **1. Cambio de bit (*Bit flip*)** | **Binario (bits)** | Invierte un bit directamente: **`0 ↔ 1`** (no intercambia posiciones, cambia el valor del bit). |
| **2. Uniforme / Reemplazar un valor** | **Reales / Individuos** | Suma un valor uniforme aleatorio (ej. `random.uniform(-2.0, 2.0)` en `Practica_43`) o quita 1–2 soluciones y mete valores aleatorios nuevos para no «casarse» con las mismas zonas. |
| **3. Gaussiano (añadir ruido)** | **Números reales** | Suma una perturbación sacada de una **campana de Gauss** (distribución normal con media $0$ y desviación estándar $\sigma$): `hijo + rng.normal(0, sigma)` (usado en los Colabs `17`, `18` y `19`). |
| **4. *Swap* (intercambio)** | **Permutaciones** | Elige dos posiciones del arreglo/secuencia y las intercambia de lugar. |
| **5. Inversión** | **Permutaciones** | Toma un segmento continuo de la permutación y lo invierte de orden. |

#### F. Efecto de los parámetros, Convergencia y Costo Computacional (`Practica_43` y `18_Ejemplo_AG_2`)

1. **¿Qué es la curva de convergencia y qué significa cuando se vuelve plana (`------`)?**
   - Eje horizontal ($X$): **Generación**. Eje vertical ($Y$): **Mejor fitness** de cada generación (si maximizamos, sube; si minimizamos error como en $(x-a)^2$, baja hacia $0$).
   - Cuando la gráfica se aplana (`------`), significa que el algoritmo **convergió (o se estancó)**: las nuevas generaciones ya no están produciendo individuos mejores.
   - **¡Ojo en el examen!** *Que la curva se vuelva horizontal NO demuestra por sí solo que se alcanzó el óptimo global*; pudo haberse estancado en un óptimo local.
2. **Tamaño de población (`poblacion`: `5, 18, 45, 90`):**
   - **Población muy pequeña (`5`):** Converge rápido porque pierde diversidad casi de inmediato, pero tiene alto riesgo de estancarse en un óptimo local.
   - **Población grande (`45, 90`):** Mayor diversidad genética y mayor exploración simultánea del espacio, pero **mayor costo computacional** por generación.
3. **Número de generaciones (`generaciones`: `10, 40, 80, 120`):**
   - Muy pocas (`10`) pueden cortar la evolución antes de llegar a la cima.
   - Demasiadas (`80, 120`) cuando el algoritmo ya convergió en la generación 15 o 20 solo desperdician tiempo de cómputo manteniendo una línea plana.
4. **Fórmula del costo computacional (en evaluaciones de la función objetivo, Colab `18`):**
   $$\text{Evaluaciones totales} = \text{población} \times (\text{generaciones} + 1)$$
   *(La población inicial cuenta como la evaluación $+1$, más una evaluación de toda la población por cada generación).*
5. **Probabilidad y tamaño de mutación (`prob_mutacion` y `desviacion_mutacion`):**
   - **Mutación `0.00` (o muy baja):** Sin mutación no se introducen genes nuevos; la población pierde diversidad rápidamente y se estanca en lo que alcancen a combinar los padres iniciales.
   - **Mutación moderada (`0.08` a `0.15`):** Mantiene viva la diversidad sin destruir el progreso.
   - **Mutación demasiado alta (`0.40` o `0.70`) o desviación muy grande (`1.20`):** Destruye las buenas soluciones heredadas de los padres y convierte al algoritmo en una **búsqueda casi aleatoria e inestable**.
6. **Elitismo (`0, 1, 2, 4`):**
   - **Sin elitismo (`0`):** El mejor fitness puede **caer/empeorar** de una generación a la siguiente porque los mejores padres pueden perderse al cruzarse y mutar.
   - **Elitismo bajo (`1` o `2`):** Garantiza que la curva del mejor fitness **nunca retroceda**.
   - **Elitismo demasiado alto (`4` o más en poblaciones chicas):** Las copias del individuo élite invaden rápidamente toda la población, **matan la diversidad** y provocan **convergencia prematura** en un óptimo local.
7. **Relación entre Diversidad y Convergencia:**
   - Son fuerzas opuestas en tensión (**Exploración vs. Explotación**): mucha diversidad favorece la **exploración** (pero retrasa la convergencia); una convergencia rápida favorece la **explotación** (pero destruye la diversidad).

---

## 4. Guía rápida de Código Python para el Examen

El profesor indicó que el examen **no será de programar**, pero sí puede incluir **fragmentos de código de las prácticas** para preguntar qué hacen o para qué sirven:

| Fragmento de código en los Colabs | ¿Qué hace y por qué es importante en el examen? |
|---|---|
| `G.add_node(estado)` antes de `for vecino in vecinos: G.add_edge(estado, vecino)` | Asegura que los **nodos aislados** (con lista de vecinos vacía `[]`, como un servidor caído o zona con fuga) sigan dibujándose en el grafo de NetworkX. |
| `grafo_falla["Nodo"] = []` + quitar `"Nodo"` de las listas de los demás estados | Aísla por completo un estado fuera de servicio conservándolo en el modelo de la infraestructura (quitar solo `grafo["Nodo"] = []` **no basta** en un grafo dirigido/diccionario si otros nodos siguen teniéndolo en su lista de vecinos). |
| `cola = deque([(inicio, [inicio])])` y `nodo, camino = cola.popleft()` | Estructura de **cola FIFO** en **BFS**: `popleft()` saca al elemento más antiguo (explora por niveles y garantiza el camino con menos pasos). |
| `pila = [(inicio, [inicio])]` y `nodo, camino = pila.pop()` | Estructura de **pila LIFO** en **DFS**: `pop()` saca al último elemento insertado (explora en profundidad hasta el fondo de una rama). |
| `for vecino in reversed(grafo.get(nodo, [])):` en DFS | Invierte la lista de vecinos al meterlos a la pila para que el primer vecino declarado quede en el tope de la pila y se visite primero. |
| `if nodo in visitados: continue` y `visitados.add(nodo)` | Evita **ciclos infinitos** y evita expandir más de una vez el mismo estado. |
| `len(camino) - 1` | Calcula el **número de pasos (aristas/saltos)** o la **profundidad** del camino (un camino de $k$ nodos tiene $k-1$ pasos). |
| `return orden, None` al terminar el `while` | Indica de forma segura que **la meta es inalcanzable** (la cola o pila se vació tras agotar todos los nodos alcanzables sin encontrar la meta). |
| `heapq.heappop(cola)` y `heapq.heappush(cola, ...)` | Manejan la **cola de prioridad**: extraen siempre el candidato con el **menor** valor del primer elemento de la tupla (`h` en Greedy, `f` en A*). |
| `nuevo_f = nuevo_g + heuristica[vecino]` | Fórmula central de **A\***: $f(n) = g(n) + h(n)$, sumando el costo real acumulado `nuevo_g` más la heurística del vecino. |
| `if vecino not in mejor_costo or nuevo_g < mejor_costo[vecino]:` | En **A\***, registra únicamente caminos que descubren un nodo por primera vez o que llegan a él con un **costo acumulado `g` menor** que cualquier ruta previa. |
| `costo = 100 * violaciones + desbalance` | En Hill Climbing de horarios: pondera con `100` las violaciones para obligar al algoritmo a eliminar primero horarios inválidos (2h en días seguidos) antes de optimizar el balance diario (`4.8 h/día`). |
| `delta = funcion(vecino) - funcion(actual)` y `P = math.exp(delta / T)` | En **Simulated Annealing**: mide cuánto cambia la función. Si `delta < 0` (empeora), calcula la probabilidad $P = e^{\Delta/T}$ de aceptar el empeoramiento según la temperatura $T$. |
| `T = alpha * T` | Enfriamiento geométrico en Simulated Annealing: reduce gradualmente la temperatura en cada iteración ($0 < \alpha < 1$). |
| `pesos = 1.0 / (1.0 + costos)` en Ruleta | Transforma un problema de **minimización de costo/error** en una aptitud positiva para que los individuos con menor error tengan mayor probabilidad en la ruleta. |
| `hijo = a * padre1 + (1 - a) * padre2` | **Cruzamiento aritmético** para números reales: genera un hijo en el segmento intermedio entre ambos padres. |
| `nueva = poblacion[:n_elite]` | **Elitismo**: copia directamente a los mejores individuos ordenados de la generación actual hacia la siguiente sin cruzarlos ni mutarlos. |

