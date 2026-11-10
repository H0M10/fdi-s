import {
  Seccion,
  P,
  Lista,
  Nota,
  Alerta,
  Formula,
  Pasos,
  Tabla,
  Codigo,
} from '../../componentes';
import { LabLocal } from '../../../busqueda/LabLocal';

export function LeccionU2Local() {
  return (
    <>
      <Nota>
        <strong>Idea central del Tema 5:</strong> En la <strong>búsqueda local</strong> ya tenemos{' '}
        <strong>una solución completa</strong> (por ejemplo $x_0 = 2$ o un horario semanal ya armado) y buscamos{' '}
        <strong>mejorarla paso a paso</strong> revisando soluciones <strong>vecinas</strong>. Ya no guardamos todo
        el camino desde un inicio hasta una meta, sino que nos interesa <strong>qué tan buena es la solución final</strong>{' '}
        según una <strong>función objetivo $f(x)$</strong> o una <strong>función de costo</strong>.
      </Nota>

      <Seccion numero={1} titulo="¿Qué cambia respecto a BFS, DFS, Greedy y A*?">
        <Tabla
          encabezados={['Característica', 'Búsqueda en grafos (Temas 3 y 4)', 'Búsqueda local (Tema 5)']}
          filas={[
            [
              '¿Qué buscamos?',
              'Una secuencia de pasos (camino) desde el inicio hasta la meta.',
              'Una solución con el mejor valor posible (máximo de f(x) o mínimo de costo).',
            ],
            [
              '¿Con qué empezamos?',
              'En un nodo inicial vacío de trayectoria.',
              'Con UNA solución completa ya propuesta (x_0 o un horario inicial).',
            ],
            [
              '¿Cómo nos movemos?',
              'Expandiendo aristas del grafo y guardando fronteras.',
              'Generando vecinos con un pequeño cambio (x-1, x+1 o intercambiar 2 días).',
            ],
            [
              'Memoria que consume',
              'Alta (guarda cola/pila/heap, caminos y visitados).',
              'Muy baja (solo guarda la solución actual y la mejor encontrada).',
            ],
            [
              'Analogía de clase',
              'Planear desde cero todas las rutas posibles en un mapa.',
              'Google Maps cuando ya vas manejando y solo ajusta tu ruta alrededor de la que ya tenías.',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={2} titulo="Conceptos clave para examen escrito">
        <Lista
          items={[
            <>
              <strong>Solución actual ($x$):</strong> La propuesta que estamos evaluando en este momento.
            </>,
            <>
              <strong>Vecinos (N(x)):</strong> Soluciones muy parecidas a la actual obtenidas con un cambio mínimo:
              en funciones discretas son <code>x - 1</code> y <code>x + 1</code> (dentro del dominio <code>[X_MIN, X_MAX]</code>);
              en horarios es <strong>intercambiar las horas de 2 días de un grupo</strong>.
            </>,
            <>
              <strong>Función objetivo $f(x)$ o Costo:</strong> Fórmula que mide la calidad de una solución. Si queremos{' '}
              <strong>maximizar</strong> buscamos el pico más alto; si queremos <strong>minimizar costo</strong> (como en
              horarios) buscamos llegar a $0$.
            </>,
            <>
              <strong>Óptimo local (máximo/mínimo local):</strong> Una solución que es <strong>mejor que todos sus vecinos inmediatos</strong>,
              pero <strong>no es la mejor de todo el espacio</strong>. Es una "colina pequeña" donde Hill Climbing se detiene.
            </>,
            <>
              <strong>Óptimo global (máximo/mínimo global):</strong> La <strong>mejor solución de todo el dominio</strong>{' '}
              de búsqueda.
            </>,
          ]}
        />
      </Seccion>

      <Seccion numero={3} titulo="Algoritmo 1: Hill Climbing (Ascenso de Colinas) y su código línea por línea">
        <P>
          <strong>Hill Climbing</strong> es completamente <strong>codicioso (greedy local)</strong>: mira a sus vecinos
          inmediatos, se mueve al mejor vecino <strong>solo si mejora estrictamente</strong> a la solución actual y, si
          ningún vecino es mejor, <strong>se detiene inmediatamente</strong>.
        </P>
        <Pasos
          titulo="Flujo de Hill Climbing paso a paso"
          items={[
            <>Proponer un estado inicial <code>actual = inicio</code> y evaluar <code>f(actual)</code>.</>,
            <>Generar sus vecinos válidos <code>vecinos(actual)</code> (por ejemplo <code>x - 1</code> y <code>x + 1</code>).</>,
            <>Revisar todos los vecinos y buscar si alguno tiene <code>f(v) &gt; f(mejor)</code>.</>,
            <>Si el mejor vecino no supera al actual (<code>mejor == actual</code>), <strong>detenerse con <code>break</code></strong> (llegamos a un máximo local o global).</>,
            <>Si sí mejora, actualizar <code>actual = mejor</code> y repetir en la siguiente iteración.</>,
          ]}
        />
        <Codigo
          titulo="Colabs 13 y 14 (Ejercicio_Hill_Climbing_Han.ipynb) — Función con 2 picos"
          codigo={`# Dominio entero: x en [0, 12]
X_MIN = 0
X_MAX = 12

# Función con máximo local en x = 3 (f=3) y máximo global en x = 9 (f=9)
def f(x):
    return -((x - 3) ** 2) * ((x - 9) ** 2) + x

def vecinos(x):
    candidatos = []
    if x - 1 >= X_MIN:
        candidatos.append(x - 1)
    if x + 1 <= X_MAX:
        candidatos.append(x + 1)
    return candidatos

def hill_climbing(inicio, max_iter=20):
    actual = inicio
    historial = [actual]

    for paso in range(1, max_iter + 1):
        cand = vecinos(actual)
        mejor = actual

        for v in cand:
            if f(v) > f(mejor):
                mejor = v

        # Si ningún vecino mejora a 'actual', ya estamos en una cima y nos detenemos
        if mejor == actual:
            break

        actual = mejor
        historial.append(actual)

    return actual, f(actual), historial`}
        />
        <Tabla
          encabezados={['Línea / instrucción', '¿Qué hace?', '¿Para qué sirve y qué pasa si la cambias?']}
          filas={[
            [
              'if x - 1 >= X_MIN: candidatos.append(x - 1)',
              'Genera el vecino izquierdo sin salirse del límite inferior.',
              'Evita que el algoritmo evalúe valores fuera del dominio permitido [0, 12].',
            ],
            [
              'if x + 1 <= X_MAX: candidatos.append(x + 1)',
              'Genera el vecino derecho sin salirse del límite superior.',
              'Define qué tan lejos puede mirar el algoritmo en un paso (vecindario de radio 1).',
            ],
            [
              'mejor = actual',
              'Toma como referencia el valor actual antes de revisar a los vecinos.',
              'Garantiza que solo nos movamos si un vecino supera estrictamente a actual.',
            ],
            [
              'if f(v) > f(mejor): mejor = v',
              'Compara la altura f(v) de cada vecino contra el mejor hasta ahora.',
              'Para maximizar usamos >; si quisiéramos minimizar costos (como en horarios) usaríamos <.',
            ],
            [
              'if mejor == actual: break',
              'Condición de paro de Hill Climbing.',
              'Si ni x-1 ni x+1 superan a f(actual), estamos en una cima (local o global) y termina.',
            ],
            [
              'historial.append(actual)',
              'Guarda cada punto x por el que caminó.',
              'Permite graficar la trayectoria de ascenso sobre la curva.',
            ],
          ]}
        />

        <Tabla
          encabezados={['Punto inicial x_0', 'Trayectoria seguida', 'Dónde termina', '¿Local o Global?']}
          filas={[
            ['x_0 = 1', '1 → 2 → 3', 'x = 3, f(3) = 3', 'Máximo LOCAL (atrapado en la colina pequeña)'],
            ['x_0 = 2', '2 → 3', 'x = 3, f(3) = 3', 'Máximo LOCAL'],
            ['x_0 = 7', '7 → 8 → 9', 'x = 9, f(9) = 9', 'Máximo GLOBAL'],
            ['x_0 = 11', '11 → 10 → 9', 'x = 9, f(9) = 9', 'Máximo GLOBAL'],
          ]}
        />
      </Seccion>

      <Seccion numero={4} titulo="Caso práctico de clase: Hill Climbing para Horarios (Hill_Climbing_Horarios_IA.ipynb)">
        <P>
          En clase también aplicaron Hill Climbing a un problema combinatorio real: <strong>asignar horarios semanales</strong>{' '}
          a 4 grupos (<code>LITIID-001</code>, <code>LITIID-002</code>, <code>LITIID-003</code>, <code>LITIID-004</code>)
          de lunes a viernes.
        </P>
        <Lista
          items={[
            <>
              <strong>Restricción dura (ya integrada en la representación):</strong> Cada grupo debe tener exactamente{' '}
              <strong>6 horas por semana</strong> con la estructura <code>[2, 2, 1, 1, 0]</code> (dos días de 2 h, dos días
              de 1 h y un día libre de 0 h). Como la solución inicial se crea permutando <code>[2, 2, 1, 1, 0]</code> y los
              vecinos solo intercambian dos días del mismo grupo, <strong>la suma de 6 horas semanales nunca se rompe</strong>.
            </>,
            <>
              <strong>Penalización 1 — Violaciones de días pesados consecutivos:</strong> No se quiere que un grupo tenga{' '}
              <strong>2 horas en dos días seguidos</strong> (<code>horas[i] == 2 and horas[i+1] == 2</code>).
            </>,
            <>
              <strong>Penalización 2 — Desbalance de carga diaria del profesor:</strong> En total hay{' '}
              <code>4 grupos × 6 h = 24 horas semanales</code> repartidas en <code>5 días</code>, por lo que el{' '}
              <strong>promedio ideal por día es <code>24 / 5 = 4.8 h/día</code></strong>. El desbalance suma{' '}
              <code>(carga_dia - 4.8) ** 2</code> en los 5 días.
            </>,
            <>
              <strong>Función de costo (aquí se MINIMIZA):</strong>{' '}
              <code>costo = 100 * violaciones + desbalance</code>. Multiplicar <code>violaciones</code> por <code>100</code>{' '}
              sirve para darle <strong>mucha mayor prioridad a eliminar los días consecutivos de 2 horas</strong> antes que
              afinar el desbalance diario.
            </>,
          ]}
        />
        <Codigo
          titulo="Hill_Climbing_Horarios_IA.ipynb — Costo y generación de vecino"
          codigo={`GROUPS = ["LITIID-001", "LITIID-002", "LITIID-003", "LITIID-004"]
DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
BASE_PATTERN = [2, 2, 1, 1, 0]  # 6 horas por semana por grupo

def evaluar_horario(horario):
    violaciones = 0
    carga_diaria = [0] * 5

    for grupo, horas in horario.items():
        # 1. Contar si tiene dos días seguidos con 2 horas
        for i in range(4):
            if horas[i] == 2 and horas[i + 1] == 2:
                violaciones += 1
        # Acumular cuántas horas da el profesor cada día
        for d in range(5):
            carga_diaria[d] += horas[d]

    # 2. Medir qué tanto se aleja cada día del promedio ideal (24h / 5 días = 4.8)
    promedio_ideal = 24 / 5  # 4.8
    desbalance = sum((carga - promedio_ideal) ** 2 for carga in carga_diaria)

    # El peso 100 prioriza eliminar primero las violaciones de días consecutivos
    return 100 * violaciones + desbalance

def generar_vecino(horario):
    nuevo = {g: list(h) for g, h in horario.items()}
    grupo = random.choice(GROUPS)
    d1, d2 = random.sample(range(5), 2)  # elige 2 días distintos al azar
    nuevo[grupo][d1], nuevo[grupo][d2] = nuevo[grupo][d2], nuevo[grupo][d1]
    return nuevo`}
        />
      </Seccion>

      <Seccion numero={5} titulo="Algoritmo 2: Simulated Annealing (Recocido Simulado) y su código línea por línea">
        <P>
          Para escapar de los óptimos locales donde Hill Climbing se atora, <strong>Simulated Annealing (SA)</strong> se
          inspira en el templado de metales: al inicio la <strong>temperatura $T$ es alta</strong> y permite aceptar{' '}
          <strong>movimientos peores ($\Delta &lt; 0$) con cierta probabilidad</strong> para saltar valles y explorar otras
          regiones; conforme $T$ baja ($T \leftarrow \alpha \cdot T$), la probabilidad de aceptar empeoramientos disminuye
          hasta comportarse como Hill Climbing.
        </P>
        <Formula
          bloque
          tex="Δ = f(vecino) - f(actual)   |   P(aceptar si Δ < 0) = exp(Δ / T)   |   T = alpha * T"
        />
        <Alerta titulo="Reglas de oro de Simulated Annealing para el examen">
          1. Si <code>delta &gt;= 0</code> (el vecino es mejor o igual), <strong>se acepta SIEMPRE</strong> sin usar probabilidad.
          <br />
          2. Si <code>delta &lt; 0</code> (el vecino es peor), se calcula <code>P = math.exp(delta / T)</code>, se genera un
          número aleatorio <code>r = random.random()</code> en $[0, 1)$ y <strong>se acepta si <code>r &lt; P</code></strong>.
          <br />
          3. Como <code>actual</code> puede empeorar temporalmente para escapar de una trampa, el algoritmo guarda por
          separado <code>mejor_solucion</code> y <code>mejor_valor</code> (la mejor solución histórica vista en toda la corrida).
        </Alerta>

        <Codigo
          titulo="Colabs 15, 16 y Práctica 3 (Olvera_Mata_Hanniel_33_Busqueda_Heuristica.ipynb)"
          codigo={`import math
import random

X_MIN = 0
X_MAX = 20

# Función multimodal de la Práctica 3 y Colab 16
def f(x):
    return 0.6 * x + 8 * math.sin(1.3 * x) + 4 * math.sin(2.4 * x)

def vecinos(x):
    cand = []
    if x - 1 >= X_MIN:
        cand.append(x - 1)
    if x + 1 <= X_MAX:
        cand.append(x + 1)
    return cand

def simulated_annealing(inicio, T_inicial=15.0, alpha=0.92, pasos=60, T_min=0.01, semilla=42):
    random.seed(semilla)
    actual = inicio
    valor_actual = f(actual)

    # Guardamos el mejor histórico por separado porque 'actual' puede empeorar
    mejor_solucion = actual
    mejor_valor = valor_actual

    T = T_inicial
    peores_aceptados = 0
    rechazados = 0

    for paso in range(1, pasos + 1):
        if T < T_min:
            break

        vecino = random.choice(vecinos(actual))
        valor_vecino = f(vecino)
        delta = valor_vecino - valor_actual

        if delta >= 0:
            # Si el vecino mejora (o empata), se acepta siempre
            actual = vecino
            valor_actual = valor_vecino
        else:
            # Si el vecino es peor (delta < 0), se acepta con probabilidad exp(delta / T)
            prob = math.exp(delta / T)
            if random.random() < prob:
                actual = vecino
                valor_actual = valor_vecino
                peores_aceptados += 1
            else:
                rechazados += 1

        # Actualizar el récord histórico si superamos al mejor visto hasta ahora
        if valor_actual > mejor_valor:
            mejor_solucion = actual
            mejor_valor = valor_actual

        # Enfriamiento geométrico
        T = alpha * T

    return mejor_solucion, mejor_valor, actual, valor_actual, peores_aceptados, rechazados`}
        />

        <Tabla
          encabezados={['Línea / variable en SA', '¿Qué significa?', '¿Para qué sirve en el examen?']}
          filas={[
            [
              'random.seed(semilla)',
              'Fija la semilla del generador aleatorio.',
              'Permite reproducir exactamente la misma corrida; cambiar la semilla cambia qué vecinos se eligen y cuáles empeoramientos se aceptan.',
            ],
            [
              'mejor_solucion / mejor_valor',
              'Récord histórico de toda la ejecución.',
              'Como actual puede bajar a un valle al aceptar un empeoramiento, mejor_solucion garantiza no perder el máximo global si ya pasamos por él.',
            ],
            [
              'vecino = random.choice(vecinos(actual))',
              'Elige UN vecino al azar en cada paso (x-1 o x+1).',
              'A diferencia de Hill Climbing que revisa todos los vecinos y toma el mejor, SA prueba un vecino aleatorio por paso.',
            ],
            [
              'delta = valor_vecino - valor_actual',
              'Diferencia de calidad entre el vecino y el estado actual.',
              'Si delta >= 0 hay mejora; si delta < 0 el vecino es peor por |delta| unidades.',
            ],
            [
              'prob = math.exp(delta / T)',
              'Fórmula de Boltzmann / Metropolis.',
              'Si T es grande, delta/T es cercano a 0 y prob se acerca a 1 (acepta casi todo). Si T es pequeña, delta/T es muy negativo y prob se acerca a 0.',
            ],
            [
              'if random.random() < prob:',
              'Sorteo de aceptación del movimiento peor.',
              'random.random() da un número uniforme en [0, 1). Si cae por debajo de prob, aceptamos el empeoramiento.',
            ],
            [
              'peores_aceptados / rechazados',
              'Contadores de diagnóstico.',
              'Si T_0 o alpha suben, peores_aceptados aumenta y rechazados disminuye (explora más).',
            ],
            [
              'T = alpha * T',
              'Esquema de enfriamiento geométrico.',
              'Reduce la temperatura en cada paso. alpha cercano a 1 (ej. 0.99) enfría lento; alpha bajo (ej. 0.70) enfría muy rápido.',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={6} titulo="Preguntas de reflexión de los Colabs y Práctica 3 (listas para examen)">
        <Tabla
          encabezados={['Pregunta del Colab / Práctica 3', 'Respuesta modelo para escribir en el examen']}
          filas={[
            [
              'Colab 14 (Hill Climbing): ¿Por qué desde x=1 y x=2 llega a x=3 (f=3) y desde x=7 y x=11 llega a x=9 (f=9)?',
              'Porque la función f(x) = -((x-3)^2)((x-9)^2) + x tiene dos cimas: un máximo local en x=3 (f=3) y el máximo global en x=9 (f=9). Como Hill Climbing solo acepta vecinos que mejoran inmediatamente y en x=3 tanto f(2) como f(4) son menores que f(3), el algoritmo se detiene atrapado en el máximo local.',
            ],
            [
              'Horarios IA: ¿Por qué nunca se rompe la regla de 6 horas semanales por grupo al generar vecinos?',
              'Porque cada grupo inicia como una permutación de la lista [2, 2, 1, 1, 0] (cuya suma es 6) y la función generar_vecino solo intercambia de posición dos días dentro del mismo grupo, conservando exactamente los mismos números.',
            ],
            [
              'Colab 16 y Práctica 3 (Parte B): ¿Qué pasa al variar la temperatura inicial T_0 = [1, 5, 10, 30, 60]?',
              'Con T_0 muy baja (ej. T_0 = 1), exp(delta/T) es casi 0 desde el inicio, casi no acepta peores movimientos (peores_aceptados = 0 o muy bajo) y se queda atrapado cerca de x_0 = 2. Con T_0 alta (30 o 60), acepta más empeoramientos al principio, logra cruzar los valles y alcanza el máximo global en x = 19 (f ≈ 20.66).',
            ],
            [
              'Colab 16 y Práctica 3 (Parte C): ¿Qué pasa al variar alpha = [0.70, 0.85, 0.90, 0.97, 0.99]?',
              'Con alpha bajo (0.70 o 0.85), la temperatura cae tan rápido que el algoritmo se "congela" en pocos pasos antes de escapar de la zona inicial. Con alpha alto (0.97 o 0.99), el enfriamiento es lento, mantiene la exploración activa durante más iteraciones y aumenta los peores_aceptados.',
            ],
            [
              'Colab 16 y Práctica 3 (Parte D): ¿Por qué en Simulated Annealing se guarda tanto actual como mejor_solucion?',
              'Porque actual puede aceptar un vecino peor en los últimos pasos (si la temperatura aún no es cero) y terminar en un valle con valor más bajo; en cambio, mejor_solucion conserva la mejor solución histórica visitada en cualquier iteración.',
            ],
            [
              'Práctica 3 (Parte E): ¿Por qué al cambiar la semilla (semilla = 10, 20, 30, 40, 50) cambian los resultados aunque T_0, alpha y el inicio sean iguales?',
              'Porque Simulated Annealing es un algoritmo estocástico (aleatorio): depende de random.choice(vecinos) para elegir si camina a la izquierda o derecha y de random.random() < exp(delta/T) para decidir si acepta empeoramientos.',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={7} titulo="Laboratorio interactivo: Hill Climbing vs Simulated Annealing">
        <P>
          Prueba diferentes puntos iniciales $x_0$, temperaturas $T_0$ y tasas de enfriamiento $\alpha$ sobre paisajes con
          múltiples picos locales para ver cuándo Hill Climbing se atora y cómo Simulated Annealing escapa del valle:
        </P>
        <LabLocal />
      </Seccion>
    </>
  );
}

export default LeccionU2Local;

