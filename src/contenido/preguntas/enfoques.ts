import { de, ENFOQUES, preguntasDe } from '../fabrica';

const P = preguntasDe('enfoques');
const CUADRANTES = ['Pensar como humano', 'Actuar como humano', 'Pensar racionalmente', 'Actuar racionalmente'];

export const PREGUNTAS_ENFOQUES = [
  // ---------------------------------------------------------------
  // Enfoque clásico: los cuatro cuadrantes
  // ---------------------------------------------------------------
  P.opcion(
    '¿Qué cuadrante del enfoque clásico busca que el sistema elija la acción con el mejor resultado esperado según un criterio definido?',
    CUADRANTES, 3,
    '**Actuar racionalmente** es hacer lo óptimo según un criterio, no imitar a una persona. Según los apuntes, es por donde van la mayoría de los sistemas actuales.',
  ),
  P.opcion(
    '¿Qué cuadrante se asocia con la lógica formal, es decir, con deducir conclusiones correctas a partir de premisas?',
    CUADRANTES, 2,
    '**Pensar racionalmente** es razonar de forma correcta: deducir. Es el terreno de la lógica que vemos en tablas de verdad.',
  ),
  P.opcion(
    'El Test de Turing considera inteligente a una máquina si en una conversación no se distingue de una persona. ¿Qué cuadrante evalúa?',
    CUADRANTES, 1,
    'Lo que se juzga es el **comportamiento** (actuar) y el criterio es **parecerse a un humano**. No importa cómo piense por dentro.',
  ),
  P.opcion(
    'Un grupo de psicólogos programa un sistema que reproduce los pasos con los que una persona resuelve un problema, incluidos sus errores, para estudiar cómo funciona la mente. ¿Qué cuadrante es?',
    CUADRANTES, 0,
    'Se busca reproducir el **razonamiento** de una persona (pensar) tal como es, errores incluidos (como humano).',
  ),
  P.opcion(
    '¿Cuál es la diferencia de fondo entre los cuadrantes «como humano» y «racionalmente»?',
    [
      'Imitar a las personas, con sus errores, contra hacer lo óptimo según un criterio',
      'Usar redes neuronales contra usar reglas',
      'Trabajar con imágenes contra trabajar con texto',
      'Ser IA fuerte contra ser IA débil',
    ],
    0,
    'Imitar a la persona no es lo mismo que hacer lo mejor posible: una persona se equivoca. Esa es la distinción que separa las dos columnas.',
  ),
  P.vf(
    'Según lo visto en clase, la mayoría de los sistemas de IA actuales van por «actuar racionalmente».',
    true,
    'Se busca el resultado óptimo según un criterio, no reproducir el comportamiento humano.',
  ),

  // ---------------------------------------------------------------
  // Enfoques técnicos
  // ---------------------------------------------------------------
  P.opcion(
    '¿Cuándo conviene usar el enfoque de reglas?',
    [
      'Cuando las reglas se conocen y no cambian',
      'Cuando hay millones de imágenes',
      'Cuando nadie sabe cómo resolver el problema',
      'Cuando hay que buscar el mínimo de una función',
    ],
    0,
    'Si ya sabes la regla, aprenderla de los datos sería más lento, más caro y menos confiable que escribirla. Ejemplo: «si el día es inhábil, no se cocina».',
  ),
  P.opcion(
    'En el caso del comedor, ¿por qué no se puede usar solo reglas para decidir cuántas porciones cocinar?',
    [
      'Porque nadie puede escribir a mano la regla que convierte «martes + semana de exámenes + pozole» en un número',
      'Porque las reglas están prohibidas en sistemas de IA',
      'Porque las reglas solo sirven con imágenes',
      'Porque las reglas siempre son más lentas que el machine learning',
    ],
    0,
    'Ese patrón existe en los datos, pero no está en la cabeza de nadie de forma que se pueda redactar. Por eso esa parte va con machine learning.',
  ),
  P.opcion(
    '¿Qué algoritmo de búsqueda revisa todos los vecinos de un nivel antes de avanzar al siguiente, y así encuentra el camino con menos pasos?',
    ['BFS', 'DFS', 'UCS', 'Greedy'],
    0,
    '**BFS** es búsqueda en anchura: avanza nivel por nivel. Por eso el primer camino que encuentra es el de menos pasos.',
  ),
  P.opcion(
    '¿Qué algoritmo se va hasta el fondo de un camino y regresa solo si no sirve?',
    ['BFS', 'DFS', 'UCS', 'Greedy'],
    1,
    '**DFS** es búsqueda en profundidad. Gasta poca memoria, pero el camino que encuentra puede no ser el más corto.',
  ),
  P.opcion(
    'Los pasos de un problema cuestan distinto entre sí, y se quiere el camino de menor costo total. ¿Qué algoritmo conviene?',
    ['BFS', 'DFS', 'UCS', 'Greedy'],
    2,
    '**UCS** (costo uniforme) expande siempre el camino más barato acumulado. BFS minimiza el número de pasos, no su costo.',
  ),
  P.opcion(
    '¿Qué algoritmo avanza siempre hacia lo que parece más cerca de la meta, y por eso puede equivocarse?',
    ['BFS', 'DFS', 'UCS', 'Greedy'],
    3,
    '**Greedy** (el mejor primero) solo mira hacia adelante. Es rápido, pero puede meterse en un camino que parecía bueno y no lo era.',
  ),
  P.opcion(
    'Para ir de tu casa a la escuela quieres la ruta que tarde menos tiempo, aunque tenga más cuadras. ¿Qué algoritmo la encuentra?',
    ['BFS', 'DFS', 'UCS', 'Greedy'],
    2,
    'El criterio es el **costo** (el tiempo), no el número de cuadras. Eso es UCS. BFS te daría la de menos cuadras.',
  ),
  P.opcion(
    '¿Cuáles son las dos direcciones de la optimización?',
    ['Maximizar o minimizar', 'Clasificar o detectar', 'Entrenar o inferir', 'Buscar en anchura o en profundidad'],
    0,
    '**Maximizar** una ganancia o **minimizar** una pérdida, un costo o una distancia.',
  ),
  P.opcion(
    'En el algoritmo evolutivo que se vio en clase, para maximizar, ¿qué se hace en cada ronda?',
    [
      'Se descartan los peores, se generan nuevos y se repite',
      'Se elige un valor al azar y se termina',
      'Se recorren todos los valores posibles uno por uno',
      'Se le pide a un experto que escoja el mejor',
    ],
    0,
    'Con 6 datos: se descartan los 3 peores (los más chicos, si se maximiza), se rellena con nuevos y se repite. Para minimizar se hace al revés.',
  ),
  P.vf(
    'Según el profesor, la optimización es en el fondo una búsqueda: se busca el mínimo o el máximo.',
    true,
    'Por eso, al ver las ramas, la optimización entra dentro de **búsqueda y planificación**.',
  ),
  P.opcion(
    '¿Cuál es la diferencia real entre machine learning clásico y deep learning?',
    [
      'En ML las características las diseña una persona; en DL la red las aprende sola de los datos crudos',
      'ML usa datos etiquetados y DL no',
      'ML es más moderno que DL',
      'DL no necesita datos',
    ],
    0,
    'Ojo con la segunda opción: «etiquetado contra no etiquetado» es la diferencia entre **supervisado y no supervisado**, que aplica a los dos. Hay deep learning supervisado y machine learning no supervisado.',
  ),
  P.vf(
    'La diferencia entre machine learning y deep learning es que machine learning usa datos etiquetados y deep learning no.',
    false,
    'Esa confusión estaba en el apunte original. Etiquetado contra no etiquetado es **supervisado contra no supervisado**, y aplica tanto a ML como a DL.',
  ),
  P.vf(
    'El deep learning es un subconjunto del machine learning, no una alternativa a él.',
    true,
    'Toda red neuronal profunda aprende de datos, así que es machine learning. Lo que la distingue es que aprende sola las características.',
  ),
  P.opcion(
    'Comparado con el machine learning clásico, ¿qué necesita el deep learning?',
    ['Muchos más datos', 'Menos datos', 'Reglas escritas por un experto', 'Un estado inicial y una meta'],
    0,
    'Como aprende sola las características, necesita órdenes de magnitud más datos. Con pocos, memoriza el ruido.',
  ),
  P.opcion(
    '¿Por qué se dice que el deep learning es una «caja negra»?',
    [
      'Porque es difícil explicar por qué tomó una decisión',
      'Porque solo funciona de noche',
      'Porque no se puede entrenar',
      'Porque siempre se equivoca',
    ],
    0,
    'Con ML clásico se puede explicar qué variable pesó. Con una red profunda la respuesta suele ser «porque la red lo dijo». Esto conecta con el riesgo de **opacidad** en ética.',
  ),
  P.opcion(
    '¿Qué es un sistema híbrido?',
    [
      'La combinación de varios enfoques encadenados',
      'Un quinto enfoque, distinto de los demás',
      'Un sistema que usa electricidad y baterías',
      'Un sistema que es mitad IA débil y mitad IA fuerte',
    ],
    0,
    'No es un enfoque aparte: son varios trabajando juntos. En el comedor, ML predice, optimización decide y reglas acotan.',
  ),
  P.opcion(
    'En el caso del comedor universitario, machine learning estima cuánta gente va a venir. ¿Qué enfoque decide cuánto cocinar?',
    ENFOQUES.slice(0, 4), 2,
    'El modelo predice, pero no conoce los costos. Como que sobre y que falte cuestan distinto, el punto óptimo se mueve del promedio, y encontrarlo es **optimización**.',
  ),
  P.opcion(
    '¿Por qué se descartó el enfoque de búsqueda en el caso del comedor?',
    [
      'Porque no hay un estado inicial ni una meta: no hay un camino que encontrar',
      'Porque BFS y DFS son algoritmos viejos',
      'Porque no había suficientes datos',
      'Porque la búsqueda solo funciona con imágenes',
    ],
    0,
    'La búsqueda resuelve problemas de **camino**. Aquí hay una **cantidad que decidir**. Descartarla «porque es vieja» sería un error.',
  ),
  P.opcion(
    'Se tienen datos históricos donde cada renglón trae las condiciones del día y cuántas personas comieron. ¿Qué tipo de aprendizaje permite eso?',
    ['Supervisado', 'No supervisado', 'Por reglas', 'Por búsqueda'],
    0,
    'Cada renglón trae **la pregunta y la respuesta juntas**. Eso es lo que necesita un modelo supervisado para aprender la relación.',
  ),
  P.opcion(
    'Si lo que se quiere predecir es un **número**, como cuántas porciones, ¿qué tipo de modelo aplica?',
    ['Regresión', 'Clasificación', 'Segmentación', 'Búsqueda'],
    0,
    'Regresión predice números; clasificación predice categorías («sí/no», «perro/gato»).',
  ),
  P.vf(
    'El enfoque se elige por lo que se puede justificar, no por moda.',
    true,
    'Es la idea que dejó clara el profesor: si eliges deep learning con datos autogenerados, te van a preguntar de dónde vienen esos datos y qué tan fiables son.',
  ),

  // ---------------------------------------------------------------
  // ¿Qué enfoque técnico es? Escenarios cortos
  // ---------------------------------------------------------------
  P.opcion(
    'Un filtro de spam se entrena con 10,000 correos que ya estaban marcados como spam o no spam. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Reglas', 'Búsqueda', 'Machine learning', 'Optimización'], 'Machine learning'),
    'Se le dan datos con su respuesta y deduce los patrones. Con reglas tendrías que escribir tú «si contiene "premio" y "gratis", es spam».',
  ),
  P.opcion(
    'Un sistema escolar aplica el reglamento: si un alumno acumula 3 retardos, se registra una falta. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Reglas', 'Machine learning', 'Optimización', 'Deep learning'], 'Reglas'),
    'La regla ya existe, está escrita y no cambia. No hay nada que aprender.',
  ),
  P.opcion(
    'Una empresa quiere repartir su presupuesto de publicidad entre radio, redes y espectaculares para obtener la mayor cantidad de clientes posible. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Búsqueda', 'Optimización', 'Reglas', 'Deep learning'], 'Optimización'),
    'Se busca **el mejor valor** de algo (maximizar clientes), no un camino hacia una meta.',
  ),
  P.opcion(
    'Una red social identifica rostros en miles de millones de fotos sin que nadie le diga en qué rasgos fijarse. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Machine learning', 'Deep learning', 'Reglas', 'Búsqueda'], 'Deep learning'),
    'Muchísimos datos, imágenes crudas y la red aprende sola las características: deep learning.',
  ),
  P.opcion(
    'Un GPS encuentra cómo llegar de un punto A a un punto B en un mapa de calles. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Búsqueda', 'Machine learning', 'Reglas', 'Deep learning'], 'Búsqueda'),
    'Estado inicial (A), meta (B) y acciones (tomar una calle). Es el problema típico de búsqueda.',
  ),
];
