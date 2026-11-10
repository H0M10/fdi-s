import {
  Seccion,
  P,
  Nota,
  Alerta,
  Formula,
  Pasos,
  Tabla,
  Codigo,
} from '../../componentes';
import { LabGenetico } from '../../../busqueda/LabGenetico';

export function LeccionU2Geneticos() {
  return (
    <>
      <Nota>
        <strong>Idea central del Tema 6:</strong> A diferencia de Hill Climbing y Simulated Annealing (que trabajan con{' '}
        <strong>una sola solución</strong> y caminan alrededor de ella), los <strong>Algoritmos Genéticos (AG)</strong>{' '}
        (que pertenecen a la familia de los <strong>algoritmos evolutivos</strong>) trabajan con una{' '}
        <strong>población de muchas soluciones al mismo tiempo</strong> dispersas en todo el dominio para buscar el{' '}
        <strong>óptimo global</strong> mediante selección natural, cruzamiento (recombinación), mutación y elitismo.
      </Nota>

      <Seccion numero={1} titulo="Diccionario biológico → informático (pregunta clásica de examen)">
        <Tabla
          encabezados={['Concepto evolutivo', '¿Qué es en programación / IA?', 'Ejemplo en los Colabs y Práctica 4']}
          filas={[
            [
              'Individuo / Cromosoma',
              'UNA posible solución codificada al problema.',
              'Un número real x en [-10, 30] o en [0, 22] (o un arreglo como en las jarras/esposos).',
            ],
            [
              'Gen',
              'Cada variable o parte que compone al cromosoma.',
              'El valor de la coordenada x (o cada posición del arreglo de solución).',
            ],
            [
              'Población',
              'Conjunto de N soluciones candidatas que coexisten en una generación.',
              'Una lista o arreglo de tamaño tam_poblacion (ej. 6, 12, 20 o 60 individuos).',
            ],
            [
              'Fitness (Aptitud)',
              'Función matemática que califica qué tan bueno es cada individuo.',
              'f(x) = 0.6x + 10*sin(1.4x) + 9 (maximizar) o costo (x - a)^2 (minimizar).',
            ],
            [
              'Selección (Torneo / Ruleta)',
              'Regla para elegir quiénes serán padres de la siguiente generación.',
              'Torneo elige el mejor de k rivales al azar; Ruleta da probabilidad proporcional al fitness.',
            ],
            [
              'Cruzamiento (Crossover)',
              'Combinar la información de dos padres (padre1, padre2) para crear un hijo.',
              'Cruce aritmético: hijo = a * padre1 + (1 - a) * padre2.',
            ],
            [
              'Mutación',
              'Alteración aleatoria pequeña sobre el hijo con probabilidad prob_mutacion.',
              'Sumar ruido: x + random.uniform(-2, 2) o x + rng.normal(0, sigma).',
            ],
            [
              'Elitismo (n_elite)',
              'Copiar intactos a los mejores individuos directamente a la siguiente generación.',
              'Garantiza que la mejor solución encontrada jamás se pierda por cruce o mutación.',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={2} titulo="Flujo completo del Algoritmo Genético (los 7 pasos para escribir en examen)">
        <Pasos
          titulo="Ciclo evolutivo generación tras generación"
          items={[
            <>
              <strong>1. Definir el problema y codificar el cromosoma:</strong> Decidir cómo se representa cada solución y sus
              límites <code>[X_MIN, X_MAX]</code>.
            </>,
            <>
              <strong>2. Generar la población inicial (Generación 0):</strong> Crear <code>N</code> individuos aleatorios
              distribuidos en todo el dominio.
            </>,
            <>
              <strong>3. Evaluar la población (Fitness / Costo):</strong> Calcular qué tan bueno es cada individuo y
              ordenarlos del mejor al peor.
            </>,
            <>
              <strong>4. Aplicar Elitismo:</strong> Pasar los mejores <code>n_elite</code> individuos directamente a la
              nueva población sin modificarlos.
            </>,
            <>
              <strong>5. Selección de padres:</strong> Elegir parejas de padres usando <strong>Torneo</strong> o{' '}
              <strong>Ruleta</strong>.
            </>,
            <>
              <strong>6. Cruzamiento y Mutación:</strong> Combinar a los padres (con probabilidad <code>prob_cruce</code>) y
              aplicar una pequeña perturbación aleatoria (con probabilidad <code>prob_mutacion</code>), recortando al dominio{' '}
              <code>[X_MIN, X_MAX]</code>.
            </>,
            <>
              <strong>7. Reemplazo y repetición:</strong> La nueva población reemplaza a la anterior y se repite el ciclo
              durante <code>G</code> generaciones.
            </>,
          ]}
        />
        <Formula
          bloque
          tex="Evaluaciones totales de f(x) = tam_poblacion × (generaciones + 1)"
        />
        <P>
          <strong>¿Por qué es <code>generaciones + 1</code>?</strong> Porque primero se evalúa la{' '}
          <strong>población inicial (generación 0)</strong> y después se evalúa una vez más en cada una de las{' '}
          <code>generaciones</code> del ciclo. Por ejemplo, en el Colab 19: con <code>poblacion = 20</code> y{' '}
          <code>generaciones = 25</code>, se hacen <code>20 × (25 + 1) = 520</code> evaluaciones.
        </P>
      </Seccion>

      <Seccion numero={3} titulo="Código 1: Práctica 4 (Maximización con Torneo vs Ruleta) explicado línea por línea">
        <P>
          En la <strong>Práctica 4 (<code>Olvera_Mata_Hanniel_Practica_43_AG.ipynb</code>)</strong> se busca{' '}
          <strong>maximizar</strong> la función multimodal:
        </P>
        <Formula bloque tex="f(x) = 0.6x + 10·sin(1.4x) + 9   para x en [0, 22]" />
        <P>
          El pico global de esta función dentro de <code>[0, 22]</code> está alrededor de <strong>x ≈ 19.12</strong> con{' '}
          <strong>f(x) ≈ 30.47</strong>. Veamos cada función del código y qué hace exactamente cada línea:
        </P>
        <Codigo
          titulo="Práctica 4 (Olvera_Mata_Hanniel_Practica_43_AG.ipynb) — Operadores genéticos y ciclo principal"
          codigo={`import math
import random

X_MIN = 0.0
X_MAX = 22.0

def fitness(x):
    return 0.6 * x + 10 * math.sin(1.4 * x) + 9

def generar_poblacion(tam_poblacion):
    return [random.uniform(X_MIN, X_MAX) for _ in range(tam_poblacion)]

def seleccion_torneo(poblacion, k=3):
    candidatos = random.sample(poblacion, k)
    return max(candidatos, key=fitness)

def seleccion_ruleta(poblacion):
    valores = [fitness(ind) for ind in poblacion]
    minimo = min(valores)
    # Desplazamos para que todos los pesos sean estrictamente positivos (> 0)
    pesos = [(v - minimo) + 1e-6 for v in valores]
    return random.choices(poblacion, weights=pesos, k=1)[0]

def cruzamiento(padre1, padre2, prob_cruce=0.8):
    if random.random() < prob_cruce:
        a = random.random()
        return a * padre1 + (1 - a) * padre2
    return padre1

def mutar(individuo, prob_mutacion=0.2, escala=2.0):
    if random.random() < prob_mutacion:
        mutado = individuo + random.uniform(-escala, escala)
        # Recortar (clipping) para no salir del dominio [X_MIN, X_MAX]
        return max(X_MIN, min(X_MAX, mutado))
    return individuo

def algoritmo_genetico(tam_poblacion=12, generaciones=20, metodo_seleccion="torneo",
                       prob_cruce=0.8, prob_mutacion=0.2, n_elite=1, semilla=42):
    random.seed(semilla)
    poblacion = generar_poblacion(tam_poblacion)

    for gen in range(1, generaciones + 1):
        # Ordenar de MAYOR a MENOR fitness (porque queremos maximizar)
        poblacion.sort(key=fitness, reverse=True)

        # 1. Elitismo: copiar los mejores n_elite intactos
        nueva = poblacion[:n_elite]

        # 2. Llenar el resto de la población con hijos
        while len(nueva) < tam_poblacion:
            if metodo_seleccion == "torneo":
                p1 = seleccion_torneo(poblacion)
                p2 = seleccion_torneo(poblacion)
            else:
                p1 = seleccion_ruleta(poblacion)
                p2 = seleccion_ruleta(poblacion)

            hijo = cruzamiento(p1, p2, prob_cruce)
            hijo = mutar(hijo, prob_mutacion)
            nueva.append(hijo)

        poblacion = nueva

    poblacion.sort(key=fitness, reverse=True)
    mejor = poblacion[0]
    return mejor, fitness(mejor)`}
        />

        <Tabla
          encabezados={['Línea / expresión del código', '¿Qué hace?', '¿Por qué es importante en el examen?']}
          filas={[
            [
              '[random.uniform(X_MIN, X_MAX) for _ in range(tam_poblacion)]',
              'Crea la población inicial con números reales aleatorios en [0, 22].',
              'Asegura que al inicio haya individuos repartidos en distintas zonas del dominio.',
            ],
            [
              'candidatos = random.sample(poblacion, k); max(candidatos, key=fitness)',
              'Selección por Torneo de tamaño k=3.',
              'Toma 3 individuos al azar sin reemplazo y devuelve el de mayor fitness. Es rápida y ejerce presión selectiva firme.',
            ],
            [
              'pesos = [(v - minimo) + 1e-6 for v in valores]',
              'Calcula los pesos positivos para la Selección por Ruleta (maximización).',
              'Restar minimo evita pesos negativos si f(x) bajara de 0, y sumar 1e-6 evita que todos los pesos sean 0 (división por cero) cuando la población converge.',
            ],
            [
              'random.choices(poblacion, weights=pesos, k=1)[0]',
              'Gira la ruleta eligiendo 1 individuo con probabilidad proporcional a su peso.',
              'Los mejores tienen mayor tajada de la ruleta, pero hasta el peor tiene una pequeña probabilidad (1e-6) de ser elegido.',
            ],
            [
              'a * padre1 + (1 - a) * padre2',
              'Cruzamiento aritmético (combinación convexa).',
              'Como a está en [0, 1), el hijo siempre queda en un punto intermedio entre padre1 y padre2. Combina información de ambos padres.',
            ],
            [
              'if random.random() >= prob_cruce: return padre1',
              'Cuando no ocurre cruzamiento (probabilidad 1 - prob_cruce).',
              'El hijo pasa como copia directa de padre1 (antes de pasar por la etapa de mutación).',
            ],
            [
              'mutado = individuo + random.uniform(-escala, escala)',
              'Mutación uniforme en [-2.0, 2.0].',
              'Introduce diversidad genética nueva para saltar a regiones que ningún padre tenía.',
            ],
            [
              'max(X_MIN, min(X_MAX, mutado))',
              'Recorte de bordes (clipping).',
              'Si al mutar el hijo se pasa de 22.0 lo deja en 22.0, y si baja de 0.0 lo deja en 0.0.',
            ],
            [
              'poblacion.sort(key=fitness, reverse=True)',
              'Ordena la población de mayor a menor aptitud.',
              'Deja al mejor individuo en poblacion[0] y permite tomar la élite con poblacion[:n_elite].',
            ],
            [
              'nueva = poblacion[:n_elite]',
              'Elitismo: guarda los mejores n_elite individuos sin cruzarlos ni mutarlos.',
              'Con n_elite >= 1 la curva del mejor fitness NUNCA baja; con n_elite = 0 el mejor individuo puede perderse.',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={4} titulo="Código 2: Colabs 17, 18 y 19 (Minimización con NumPy y Ruleta inversa)">
        <P>
          En los <strong>Colabs 17, 18 y 19 (<code>19_Ejercicio_algoritmo_genetico.ipynb</code>)</strong> se resuelve un
          problema de <strong>minimización de costo</strong>: encontrar el mínimo de $f(x) = (x - a)^2$, cuyo óptimo global
          es $x = a$ con costo $0$.
        </P>
        <Codigo
          titulo="Colabs 17–19 — Diferencias clave cuando el AG MINIMIZA con NumPy"
          codigo={`# En minimización buscamos el MENOR costo (cercano a 0)
def seleccion_torneo_min(poblacion, costos, k, rng):
    idx = rng.choice(len(poblacion), size=k, replace=False)
    mejor = idx[np.argmin(costos[idx])]  # argmin porque menor costo es mejor
    return poblacion[mejor]

def seleccion_ruleta_min(poblacion, costos, rng):
    # Como costo=0 es el mejor, invertimos con 1 / (1 + costo)
    pesos = 1.0 / (1.0 + costos)
    probs = pesos / np.sum(pesos)
    idx = rng.choice(len(poblacion), p=probs)
    return poblacion[idx]

# Mutación gaussiana y recorte con np.clip:
hijo = hijo + rng.normal(0.0, sigma_mutacion)
hijo = float(np.clip(hijo, limites[0], limites[1]))

# Elitismo en minimización (ordena de menor a mayor costo):
orden_elite = np.argsort(costos)[:elite]`}
        />
        <Alerta titulo="Diferencia clave entre Ruleta de Minimización vs Maximización">
          • Si <strong>minimizas costo</strong> (Colab 18 y 19): el mejor tiene <code>costo = 0</code>, así que transformas
          con <code>pesos = 1.0 / (1.0 + costos)</code> para que costo <code>0</code> tenga el peso máximo (<code>1.0</code>)
          y costos grandes tengan peso cercano a <code>0</code>.
          <br />• Si <strong>maximizas fitness</strong> (Práctica 4): el mejor tiene el valor más grande, así que desplazas
          con <code>pesos = [(v - minimo) + 1e-6 for v in valores]</code>.
        </Alerta>
      </Seccion>

      <Seccion numero={5} titulo="Efecto de cada parámetro (Tabla resumen de experimentos de Colab 19 y Práctica 4)">
        <Tabla
          encabezados={['Parámetro', 'Si es muy BAJO', 'Si es muy ALTO', 'Balance recomendado en clase']}
          filas={[
            [
              'Tamaño de población (tam_poblacion)',
              'Poca diversidad inicial (ej. N=4 o 6); puede no caer ningún individuo cerca del pico global.',
              'Explora muy bien todo el dominio (ej. N=60), pero multiplica el costo computacional.',
              'N moderado (12 a 30) según el presupuesto de evaluaciones.',
            ],
            [
              'Número de generaciones (G)',
              'Pocas etapas de refinamiento (ej. G=5); los hijos no alcanzan a converger a la cima.',
              'Permite afinar la solución (ej. G=40–80), aunque después de converger ya no mejora.',
              'G entre 20 y 50.',
            ],
            [
              'Probabilidad de cruce (prob_cruce)',
              'Poca recombinación (con 0.0 no hay cruce, los padres pasan directo y solo actúa la mutación).',
              'Casi todos los hijos son promedios entre padres (0.8–0.9), acelerando la combinación de buenas zonas.',
              'Alta: 0.7 a 0.9 (en clase: 0.8).',
            ],
            [
              'Probabilidad de mutación (prob_mutacion)',
              'Con 0.0 no se introduce información nueva: la población queda limitada al rango de los padres iniciales (convergencia prematura).',
              'Con 0.8 o 0.9 destruye las buenas soluciones ya encontradas y se vuelve búsqueda casi aleatoria.',
              'Baja-moderada: 0.05 a 0.25 (en clase: 0.15–0.20).',
            ],
            [
              'Elitismo (n_elite)',
              'Con n_elite = 0 el mejor individuo puede destruirse al cruzar o mutar y la gráfica del mejor fitness sube y baja.',
              'Si n_elite es demasiado grande respecto a la población, reduce la diversidad de nuevos hijos.',
              'n_elite = 1 o 2 (garantiza que el mejor histórico nunca retroceda).',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={6} titulo="Todas las preguntas de reflexión de los Colabs 17–19 y Práctica 4 (con respuesta)">
        <Tabla
          encabezados={['Pregunta del Colab / Práctica 4', 'Respuesta modelo para examen escrito']}
          filas={[
            [
              'Colab 19 (Exp. 1): Si ambos casos hacen ~500 evaluaciones, ¿qué conviene más: 10 individuos × 50 generaciones o 50 individuos × 10 generaciones?',
              'En funciones suaves de una variable, 10 individuos × 50 generaciones permite más ciclos de cruce y mutación para refinar con mucha precisión el óptimo, mientras que 50 individuos × 10 generaciones explora mejor al inicio pero tiene pocas generaciones para afinar. En problemas con muchas trampas locales conviene asegurar primero suficiente población inicial.',
            ],
            [
              'Colab 19 (Exp. 2) y Práctica 4 (Parte B): ¿Qué diferencias observaste entre Selección por Torneo y Selección por Ruleta?',
              'Torneo ejerce una presión selectiva más fuerte y directa (siempre gana el mejor de los k candidatos), por lo que converge más rápido y de forma más estable hacia el pico global. Ruleta es más suave y probabilística (da oportunidad a individuos regulares), lo que mantiene más diversidad pero puede tardar más generaciones en afinar.',
            ],
            [
              'Práctica 4 (Parte D): ¿Qué ocurre cuando prob_mutacion = 0.0 vs prob_mutacion = 0.8?',
              'Con prob_mutacion = 0.0 no hay exploración fuera de los promedios de la población inicial (convergencia prematura en un óptimo local). Con prob_mutacion = 0.8 hay exceso de ruido aleatorio que altera constantemente a los hijos,Aunque el elitismo salva al mejor, cuesta más afinar con precisión.',
            ],
            [
              'Práctica 4 (Parte E): ¿Qué sucede con la curva del mejor fitness cuando n_elite = 0 vs n_elite = 1 o 2?',
              'Con n_elite = 0 la curva del mejor de cada generación puede bajar (retroceder) porque el mejor individuo puede perderse al cruzarse o mutar. Con n_elite >= 1 la curva es monótona creciente (nunca baja) porque el mejor pasa intacto.',
            ],
            [
              'Práctica 4 (Parte F): ¿Qué pasa cuando prob_cruce = 0.0?',
              'Los padres no combinan su información entre sí (cruzamiento devuelve directamente a padre1); la evolución depende únicamente de la selección, el elitismo y los saltos individuales de la mutación.',
            ],
            [
              'Práctica 4 (Parte H): ¿En qué se diferencia un Algoritmo Genético de Hill Climbing y Simulated Annealing?',
              'Hill Climbing y Simulated Annealing son búsquedas de trayectoria única (trabajan con una sola solución actual y caminan a un vecino). El Algoritmo Genético es poblacional: mantiene muchas soluciones simultáneas, combina pares mediante cruzamiento, introduce diversidad con mutación y protege al mejor con elitismo.',
            ],
          ]}
        />
      </Seccion>

      <Seccion numero={7} titulo="Laboratorio interactivo: Algoritmo Genético paso a paso">
        <P>
          Experimenta con el tamaño de población, método de selección (Torneo vs Ruleta), probabilidad de cruce,
          mutación y elitismo sobre la función multimodal de la Práctica 4:
        </P>
        <LabGenetico />
      </Seccion>
    </>
  );
}

export default LeccionU2Geneticos;

