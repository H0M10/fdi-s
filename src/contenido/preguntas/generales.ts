// Preguntas de los temas generales: conceptos base, qué es la IA,
// historia y aplicaciones. En el examen son la parte de opción múltiple.

import { preguntasDe } from '../fabrica';

const C = preguntasDe('conceptos');
const Q = preguntasDe('que-es');
const H = preguntasDe('historia');
const A = preguntasDe('aplicaciones');

export const PREGUNTAS_CONCEPTOS = [
  C.opcion(
    '¿Cuál es la definición más precisa de algoritmo?',
    [
      'Una secuencia finita y ordenada de pasos bien definidos que transforma una entrada en una salida',
      'Una serie de pasos para obtener un resultado',
      'Un conjunto de modelos entrenados',
      'Un programa que aprende de los datos',
    ],
    0,
    'Las tres palabras añadidas importan: **finita** (si no termina no es algoritmo), **ordenada** (el orden cambia el resultado) y **bien definidos** (dos personas siguiéndolo obtienen lo mismo).',
  ),
  C.vf(
    'Un modelo es un conjunto de algoritmos especializados.',
    false,
    'Esa era la definición del apunte y hay que corregirla. Un modelo es el **resultado** de aplicar un algoritmo de aprendizaje a unos datos: una función con parámetros ajustados.',
  ),
  C.opcion(
    '¿Qué es un modelo?',
    [
      'El resultado de aplicar un algoritmo de aprendizaje a unos datos',
      'Un conjunto de algoritmos',
      'Los datos sin procesar',
      'El programa que recolecta los datos',
    ],
    0,
    'Es una función con parámetros ajustados que, dada una entrada nueva, produce una salida.',
  ),
  C.opcion(
    'En la analogía de la cocina, si el algoritmo es la receta y los datos son los ingredientes, ¿qué es el modelo?',
    ['El pastel', 'Cocinar', 'El horno', 'El cocinero'],
    0,
    'Receta = algoritmo, ingredientes = datos, **cocinar = entrenar**, pastel = modelo. El pastel es lo que sale del proceso.',
  ),
  C.opcion(
    'En la misma analogía, ¿qué representa «cocinar»?',
    ['El entrenamiento', 'La inferencia', 'El modelo', 'Los datos'],
    0,
    'Entrenar es el proceso que convierte datos y algoritmo en modelo.',
  ),
  C.vf(
    'El motor de inferencia es lo que produce el modelo.',
    false,
    'Está al revés, y así quedó en el apunte. El modelo lo produce el **entrenamiento**. El motor de inferencia **usa** el modelo ya entrenado para responder ante una entrada nueva.',
  ),
  C.opcion(
    '¿De qué proceso sale el modelo?',
    ['Del entrenamiento', 'De la inferencia', 'Del motor de inferencia', 'De la predicción'],
    0,
    'Algoritmo + datos → [**entrenamiento**] → modelo. La inferencia y la predicción vienen después, cuando el modelo ya existe.',
  ),
  C.opcion(
    'Cuando al modelo ya entrenado le das un dato nuevo, ¿qué te devuelve?',
    ['Una predicción', 'Un algoritmo', 'Un modelo nuevo', 'Los datos de entrenamiento'],
    0,
    'Modelo + dato nuevo → [inferencia] → **predicción**. Con el modelo `calificación = 5 + 1 × horas`, si le das 2.5 horas te devuelve 7.5. La fórmula es el modelo; el 7.5 es la predicción.',
  ),
  C.opcion(
    '¿Cómo se comparan el entrenamiento y la inferencia en costo y frecuencia?',
    [
      'Entrenar se hace una vez y es caro; inferir se hace muchas veces y es barato',
      'Los dos se hacen una sola vez',
      'Inferir es caro y entrenar es barato',
      'Se entrena cada vez que se hace una predicción',
    ],
    0,
    'Se entrena una vez con muchos datos. Después el modelo responde miles de veces con muy poco costo cada vez.',
  ),
  C.opcion(
    '¿Qué significa que un sistema «aprende»?',
    [
      'Que mejora su desempeño en una tarea a partir de la experiencia, sin ser reprogramado',
      'Que guarda mucha información',
      'Que puede leer documentos',
      'Que alguien le escribe nuevas reglas cada semana',
    ],
    0,
    'Aprender no es almacenar información: es que los resultados sean mejores después que antes.',
  ),
  C.opcion(
    'En la programación tradicional, ¿qué le das a la computadora y qué te devuelve?',
    [
      'Le das datos y reglas; te devuelve respuestas',
      'Le das datos y respuestas; te devuelve reglas',
      'Le das reglas; te devuelve datos',
      'Le das respuestas; te devuelve datos',
    ],
    0,
    'Las reglas las escribe el programador. En machine learning es al revés: le das datos con sus respuestas y te devuelve las reglas (el modelo).',
  ),
  C.opcion(
    'En machine learning, ¿qué le das a la computadora y qué te devuelve?',
    [
      'Le das datos y respuestas conocidas; te devuelve las reglas',
      'Le das datos y reglas; te devuelve respuestas',
      'Le das reglas; te devuelve un modelo de lenguaje',
      'Le das un modelo; te devuelve datos',
    ],
    0,
    'Las reglas se infieren de los datos. Por eso conviene cuando son difíciles de escribir a mano.',
  ),
  C.opcion(
    'Para detectar spam, escribes «si el correo contiene "premio" y "gratis", es spam». ¿Qué tipo de programación es?',
    ['Tradicional', 'Machine learning', 'Deep learning', 'IA generativa'],
    0,
    'La regla la escribiste tú. Si le dieras 10,000 correos etiquetados y que deduzca los patrones, sería machine learning.',
  ),
  C.opcion(
    '¿Cuándo conviene usar machine learning en lugar de programación tradicional?',
    [
      'Cuando las reglas son difíciles de escribir a mano',
      'Cuando las reglas son conocidas y estables',
      'Siempre, porque es más moderno',
      'Cuando no hay datos',
    ],
    0,
    'Si las reglas son conocidas y estables, la programación tradicional es más simple, barata y confiable.',
  ),
  C.opcion(
    '¿Qué son los datos en bruto?',
    [
      'Representaciones de hechos del mundo que todavía no se interpretan',
      'Información que ya tiene significado',
      'El resultado de un modelo',
      'Las reglas de un sistema experto',
    ],
    0,
    'Un dato en bruto no dice nada por sí solo; adquiere significado cuando se le da contexto.',
  ),
  C.opcion(
    '¿Qué es el sobreajuste?',
    [
      'Cuando el modelo memoriza el ruido de los datos en lugar de aprender el patrón',
      'Cuando el modelo tiene demasiados datos',
      'Cuando el modelo es demasiado simple',
      'Cuando el entrenamiento tarda mucho',
    ],
    0,
    'Pasa sobre todo con pocos datos y modelos muy complejos. El modelo acierta con lo que ya vio y falla con lo nuevo.',
  ),
  C.opcion(
    '¿Cuál es el flujo de entrenamiento que dio el profesor?',
    [
      'Datos históricos → Algoritmos → Modelo',
      'Datos nuevos → Modelo → Predicción',
      'Modelo → Algoritmos → Datos',
      'Hechos → Reglas → Conclusiones',
    ],
    0,
    'La segunda opción es el flujo de **uso** (inferencia), no el de entrenamiento.',
  ),
  C.opcion(
    '¿Cuál es el flujo de uso de un modelo ya entrenado?',
    [
      'Datos nuevos → Modelo → Predicción',
      'Datos históricos → Algoritmos → Modelo',
      'Sensores → Percepción → Representación',
      'Estado inicial → Acciones → Meta',
    ],
    0,
    'A la predicción también se le llama **inferencia**.',
  ),
];

export const PREGUNTAS_QUE_ES = [
  Q.opcion(
    'Según lo visto en clase, ¿qué es la inteligencia?',
    ['Un conjunto de habilidades', 'La capacidad de calcular rápido', 'Tener mucha memoria', 'Saber programar'],
    0,
    'No es una sola capacidad, sino varias que trabajan juntas.',
  ),
  Q.multi(
    '¿Cuáles de estas habilidades de la inteligencia se mencionaron en clase?',
    ['Percepción', 'Razonamiento', 'Acción', 'Adaptabilidad', 'Velocidad de cálculo', 'Memoria fotográfica'],
    [0, 1, 2, 3],
    'Se mencionaron cinco; estas son las cuatro que quedaron anotadas. La quinta quedó pendiente en el apunte.',
  ),
  Q.opcion(
    '¿Qué es la IA débil?',
    ['IA de propósito específico', 'IA que falla mucho', 'IA capaz de sentir y pensar como humano', 'IA sin datos'],
    0,
    'Hace **una tarea concreta**: jugar ajedrez, aspirar, filtrar spam.',
  ),
  Q.opcion(
    '¿Qué es la IA fuerte?',
    ['IA capaz de sentir y pensar como humano', 'IA de propósito específico', 'IA con mucha potencia de cómputo', 'IA que usa deep learning'],
    0,
    'No existe todavía. «Fuerte» no tiene que ver con la potencia de cómputo.',
  ),
  Q.opcion('Deep Blue, que venció al campeón mundial de ajedrez, es un ejemplo de…', ['IA débil', 'IA fuerte'], 0,
    'Juega ajedrez y nada más. Es propósito específico, por muy bien que lo haga.'),
  Q.opcion('La aspiradora Roomba es un ejemplo de…', ['IA débil', 'IA fuerte'], 0, 'Tiene un solo propósito: limpiar.'),
  Q.vf(
    'Los chatbots más avanzados de hoy son IA fuerte, porque pueden conversar de cualquier tema.',
    false,
    'Toda la IA que existe hoy es **débil**. Conversar de muchos temas no es lo mismo que sentir y pensar como humano.',
  ),
  Q.vf('La IA fuerte ya existe.', false, 'No existe. Toda la IA actual es de propósito específico.'),
  Q.vf(
    'Según el profesor, la IA no decide: nos da una inferencia, y a partir de ella nosotros ponemos una regla.',
    true,
    'Lo dijo al explicar para qué sirve la lógica. La decisión es responsabilidad de quien escribe la regla, lo que conecta directo con la ética.',
  ),
];

export const PREGUNTAS_HISTORIA = [
  H.opcion(
    '¿Quién planteó, en el siglo XVII, la analogía entre el proceso de pensamiento y el cálculo?',
    ['Thomas Hobbes', 'René Descartes', 'John Locke', 'George Boole'],
    0,
    'Hobbes sostenía que razonar es calcular. En el cuaderno quedó como «Thomas Hacks» y «1600», que es el siglo XVII.',
  ),
  H.opcion(
    '¿Qué planteaba el dualismo de Descartes?',
    [
      'Que dos componentes independientes, el alma y las leyes físicas, marcan nuestras elecciones',
      'Que todo pensamiento se explica por leyes físicas',
      'Que nada hay en la mente que no haya pasado por los sentidos',
      'Que el razonamiento se puede escribir con 0 y 1',
    ],
    0,
    'Dualismo = dos componentes. La segunda opción es el materialismo, que llegó después.',
  ),
  H.opcion(
    '¿Qué postura sostenía que todos los pensamientos del cerebro se deben únicamente a leyes físicas?',
    ['Materialismo', 'Dualismo', 'Empirismo', 'Racionalismo'],
    0,
    'Si todo el pensamiento es físico, en principio una máquina podría reproducirlo. Por eso importa para la IA.',
  ),
  H.vf(
    'Según Descartes, todos los pensamientos se explican únicamente por leyes físicas.',
    false,
    'Esa es la postura del **materialismo**. Descartes era dualista: el alma y las leyes físicas son independientes.',
  ),
  H.opcion(
    '«Nada existe en la mente que no haya pasado antes por los sentidos.» ¿Quién lo planteó?',
    ['John Locke', 'Thomas Hobbes', 'René Descartes', 'Kurt Gödel'],
    0,
    'Es la postura del **empirismo**: el conocimiento viene de la experiencia. Es la idea detrás de aprender de datos. En el cuaderno quedó «John Lock».',
  ),
  H.opcion(
    '¿Qué aportó George Boole?',
    [
      'La lógica con 0 y 1 y símbolos',
      'El Test de Turing',
      'El término «inteligencia artificial»',
      'Los teoremas de incompletitud',
    ],
    0,
    'El álgebra booleana es la base de la lógica de las computadoras y de las tablas de verdad. En el cuaderno quedó «George Bolt».',
  ),
  H.opcion(
    '¿Qué dicen los teoremas de incompletitud, según el apunte?',
    [
      'Que existen afirmaciones que no se pueden demostrar verdaderas ni falsas usando la sintaxis de 0 y 1',
      'Que toda afirmación verdadera se puede demostrar',
      'Que las máquinas nunca podrán calcular',
      'Que la lógica proposicional es incompleta porque le falta el bicondicional',
    ],
    0,
    'Son de Kurt Gödel (1931; en el apunte, 1930). Ponen un límite a lo que se puede demostrar dentro de un sistema formal.',
  ),
  H.opcion('¿En qué año se planteó el Test de Turing?', ['1936', '1950', '1956', '1966'], 1,
    'En 1950. Fue la primera forma de **medir** si una máquina es inteligente.'),
  H.opcion(
    '¿Qué mide el Test de Turing?',
    [
      'Si en una conversación una máquina no se distingue de una persona',
      'Qué tan rápido calcula una máquina',
      'Cuántos datos puede guardar una máquina',
      'Si una máquina siente emociones',
    ],
    0,
    'Juzga el comportamiento, no lo que pasa por dentro. Por eso corresponde al cuadrante «actuar como humano».',
  ),
  H.opcion('¿En qué año se acuñó el término «Inteligencia Artificial»?', ['1950', '1956', '1966', '1980'], 1,
    'En 1956, en la conferencia de Dartmouth organizada por John McCarthy. Ahí la IA nace como campo con nombre propio.'),
  H.opcion('¿Cuál fue el primer chatbot?', ['ELIZA', 'Watson', 'Shakey', 'GPT-3'], 0,
    'ELIZA, de 1966. Simulaba conversar sin entender nada de lo que se le decía.'),
  H.opcion('¿En qué año apareció ELIZA?', ['1956', '1966', '1972', '1997'], 1, '1966.'),
  H.opcion('¿Qué fue Shakey (1972)?', ['Un robot', 'Un chatbot', 'Un programa de ajedrez', 'Un generador de imágenes'], 0,
    'Un robot móvil que percibía su entorno, planeaba y actuaba.'),
  H.opcion('¿Qué caracteriza a la década de 1980 en la línea del tiempo?', ['Los sistemas expertos', 'El deep learning', 'Los chatbots', 'GPT-3'], 0,
    'El conocimiento de un experto se escribía como reglas.'),
  H.multi(
    'En el apunte, junto a los sistemas expertos de 1980, ¿qué otras tres cosas se agruparon?',
    ['Algoritmos evolutivos', 'Lógica difusa', 'Redes neuronales', 'Deep learning', 'IA generativa', 'Test de Turing'],
    [0, 1, 2],
    'Las tres van agrupadas con una llave en el cuaderno, bajo 1980.',
  ),
  H.opcion('¿Qué hizo Deep Blue en 1997?', ['Le ganó al campeón mundial de ajedrez', 'Ganó Jeopardy!', 'Le ganó a un profesional de Go', 'Fue el primer chatbot'], 0,
    'Deep Blue, de IBM, venció a Garry Kaspárov.'),
  H.opcion('¿En qué año aparece Roomba en la línea del tiempo?', ['1997', '2002', '2006', '2011'], 1,
    'En 2002. La IA entra a la casa como producto de consumo.'),
  H.opcion('¿En qué año se ubica el deep learning en la línea del tiempo?', ['1980', '1997', '2006', '2015'], 2,
    'En 2006: redes neuronales profundas que aprenden solas las características.'),
  H.opcion('¿Qué es Watson (2011)?', ['El sistema de IBM que ganó el concurso Jeopardy!', 'El primer robot móvil', 'Un programa de ajedrez', 'Un generador de texto'], 0,
    'Entendía preguntas en lenguaje natural.'),
  H.opcion('¿En qué juego compitió AlphaGo (2015)?', ['Go', 'Ajedrez', 'Póker', 'Jeopardy!'], 0,
    'El Go tiene tantas posibilidades que la fuerza bruta no alcanza.'),
  H.opcion('¿En qué año aparece GPT-3?', ['2015', '2016', '2020', '2021'], 2,
    'En 2020. En el cuaderno el año quedó encimado («202?»).'),
  H.vf(
    'ChatGPT apareció en 2016.',
    false,
    'ChatGPT es de **noviembre de 2022**. GPT-3, que está en la línea del tiempo en 2020, es el modelo del que salió.',
  ),
  H.vf(
    'Cada año de la línea del tiempo marca la primera vez que ocurrió algo importante para la IA.',
    true,
    'Por eso conviene recordar **qué cambió** en cada fecha, no solo el nombre: 1966 el primer chatbot, 1997 la primera vez que una máquina vence al campeón de ajedrez, 2002 la IA entra a la casa.',
  ),
  H.opcion(
    '¿Cuál es el orden cronológico correcto?',
    [
      'Test de Turing → término IA → ELIZA → Deep Blue → GPT-3',
      'Término IA → Test de Turing → Deep Blue → ELIZA → GPT-3',
      'ELIZA → Test de Turing → término IA → GPT-3 → Deep Blue',
      'Test de Turing → ELIZA → término IA → Deep Blue → GPT-3',
    ],
    0,
    '1950 → 1956 → 1966 → 1997 → 2020.',
  ),
  H.opcion(
    '¿Qué cambio de fondo muestra la línea del tiempo entre 1980 y 2006?',
    [
      'Se pasa de que el humano escriba las reglas a que la máquina las aprenda de los datos',
      'Se pasa de las computadoras a los robots',
      'Se pasa de la IA fuerte a la IA débil',
      'Se pasa del ajedrez al Go',
    ],
    0,
    'Sistemas expertos (reglas escritas) → deep learning (reglas aprendidas). Es la misma diferencia que entre programación tradicional y machine learning.',
  ),
];

export const PREGUNTAS_APLICACIONES = [
  A.vf(
    'Según el profesor, estudiar las aplicaciones de la IA no es aprender algo nuevo, sino aplicar lo que ya se vio.',
    true,
    'Las aplicaciones usan las ramas y los enfoques que ya conocemos, aplicados a problemas reales.',
  ),
  A.opcion(
    '¿Qué hace un sistema de control?',
    [
      'Mide una variable, la compara con el valor deseado y corrige la diferencia',
      'Genera contenido nuevo a partir de datos',
      'Clasifica imágenes',
      'Busca el camino más corto',
    ],
    0,
    'Es lo que hace un termostato: mide la temperatura, la compara con la que pediste y prende o apaga.',
  ),
  A.opcion(
    '¿Qué es el control de pitch en un aerogenerador?',
    [
      'Cambiar el ángulo de las aspas',
      'Cambiar la altura de la torre',
      'Apagar el aerogenerador de noche',
      'Medir la velocidad del viento',
    ],
    0,
    'Con poco viento las gira para captar más; con viento muy fuerte, para frenar y no dañarse.',
  ),
  A.opcion(
    '¿Qué es el estado del arte?',
    ['Lo más avanzado que existe hoy sobre un tema', 'Lo que nadie ha hecho todavía', 'La historia de un tema', 'Un estilo de pintura generado por IA'],
    0,
    'Lo que nadie ha hecho todavía es la **frontera del conocimiento**, que está un paso más allá.',
  ),
  A.opcion(
    '¿Qué es la frontera del conocimiento?',
    ['Lo que nadie ha hecho hasta ahora', 'Lo más avanzado que existe hoy', 'El límite de memoria de un modelo', 'El conjunto de datos de entrenamiento'],
    0,
    'Es lo que dijo el profesor: «nadie más lo ha hecho hasta ahorita».',
  ),
  A.vf('El estado del arte es lo que nadie ha hecho todavía.', false,
    'Eso es la frontera del conocimiento. El estado del arte es lo mejor que **ya existe**.'),
  A.opcion(
    '¿Qué combinan los modelos PIML o PINN?',
    ['Física y datos', 'Imágenes y texto', 'Reglas y búsqueda', 'Hardware y software'],
    0,
    'Aprenden de datos, pero obligados a respetar las leyes físicas que ya se conocen. Del apunte: «modelos data-driven físicamente consistentes».',
  ),
  A.opcion(
    '«Sabemos cómo funciona el sistema, así que le damos más ponderación a la física.» ¿A qué técnica se refiere?',
    ['PIML / PINN', 'Random forest', 'Control difuso', 'Búsqueda en anchura'],
    0,
    'Si la física ya explica cómo se comporta el sistema, no tiene sentido que el modelo lo adivine solo de los datos.',
  ),
  A.opcion(
    'En el estado del arte del control de aerogeneradores, ¿para qué se usa el random forest?',
    ['Para predecir', 'Para generar imágenes', 'Para controlar el ángulo directamente', 'Para cifrar los datos'],
    0,
    'Es un modelo de aprendizaje automático, y se mencionó para predicción.',
  ),
  A.opcion(
    '¿Qué permite el control difuso (fuzzy)?',
    ['Decidir con valores intermedios, no solo sí o no', 'Ver a través de la niebla', 'Generar ruido aleatorio', 'Comprimir imágenes'],
    0,
    'Trabaja con grados: «viento algo fuerte», «temperatura un poco alta».',
  ),
  A.opcion(
    'Un sistema usa sensores de vibración para anticipar cuándo va a fallar una máquina. ¿Cómo se llama?',
    ['Mantenimiento predictivo', 'Mantenimiento correctivo', 'Control de pitch', 'Frontera del conocimiento'],
    0,
    'Del apunte: «si está vibrando… se enfoca a cuándo puede fallar o va a fallar».',
  ),

  // ---------------------------------------------------------------
  // El controlador PID y el caso del aerogenerador
  // ---------------------------------------------------------------
  A.opcion(
    '¿Cuántos componentes tiene el controlador PID?',
    ['2', '3', '4', '5'],
    1,
    'Tres: **P**roporcional, **I**ntegral y **D**erivativo. Cada uno con su constante K.',
  ),
  A.opcion(
    '¿Qué componente del PID se calcula con una integral?',
    ['El proporcional', 'El integral', 'El derivativo', 'Ninguno'],
    1,
    'El integral **acumula el error a lo largo del tiempo**. Mientras siga habiendo error, la integral sigue creciendo y la corrección también.',
  ),
  A.opcion(
    'En un sistema de control, ¿qué es el error?',
    [
      'La diferencia entre el valor que se quiere y el que se mide',
      'Una falla del sensor',
      'El tiempo que tarda en responder',
      'La constante K del controlador',
    ],
    0,
    'Es lo que el controlador intenta llevar a cero.',
  ),
  A.opcion(
    '¿Qué mira el componente **proporcional**?',
    ['El error de ahora', 'El error acumulado en el pasado', 'Qué tan rápido cambia el error', 'La predicción del viento'],
    0,
    'Corrige más cuanto más lejos estás en este momento.',
  ),
  A.opcion(
    '¿Qué mira el componente **derivativo**?',
    ['Qué tan rápido cambia el error', 'El error de ahora', 'El error acumulado', 'El valor deseado'],
    0,
    'Si el error está cambiando muy rápido, frena la corrección antes de pasarse. Es lo que hace que llegue suave.',
  ),
  A.opcion(
    'Un controlador que usa **solo** el componente proporcional, ¿qué problema tiene?',
    [
      'Siempre queda un error que no alcanza a quitar',
      'Oscila sin parar',
      'No reacciona al error',
      'Necesita una predicción para funcionar',
    ],
    0,
    'En el simulador se ve: con solo P la velocidad mejora pero nunca regresa del todo. Para quitar ese error que queda está la **integral**.',
  ),
  A.opcion(
    '¿Qué componente elimina el error que queda cuando solo se usa el proporcional?',
    ['El integral', 'El derivativo', 'El proporcional con una K más grande', 'La anticipación'],
    0,
    'Como acumula el error en el tiempo, mientras quede aunque sea un poco de error sigue corrigiendo, hasta que llega a cero.',
  ),
  A.opcion(
    '¿Qué es un controlador PI?',
    ['Un PID sin el componente derivativo', 'Un PID sin el componente integral', 'Un controlador con inteligencia artificial', 'Un controlador de pitch'],
    0,
    'Proporcional + Integral. Es el que aparece en «optimización de PI» en el estado del arte.',
  ),
  A.opcion(
    'En el aerogenerador, ¿sobre qué actúa el controlador para regular la velocidad?',
    ['El ángulo de las aspas', 'La altura de la torre', 'La dirección del viento', 'El generador eléctrico'],
    0,
    'Eso es el **control de pitch**.',
  ),
  A.opcion(
    '¿Por qué un PID solo no alcanza para controlar bien un aerogenerador?',
    [
      'Porque reacciona después de que aparece el error, y el viento cambia más rápido de lo que las aspas alcanzan a girar',
      'Porque el PID no funciona con electricidad',
      'Porque el PID solo sirve para temperatura',
      'Porque el PID necesita imágenes',
    ],
    0,
    'El PID es **reactivo**. Cuando se entera de la ráfaga, la ráfaga ya aceleró el rotor. Además hay muchos factores a la vez y unas K fijas no sirven igual en todas las condiciones.',
  ),
  A.opcion(
    'Según el profesor, ¿qué buscaba el estado del arte en el control de aerogeneradores?',
    [
      'Llegar a la inferencia mucho antes que en tiempo real',
      'Quitar el controlador PID',
      'Hacer las aspas más grandes',
      'Reaccionar más rápido después del cambio',
    ],
    0,
    'Porque en tiempo real ya hubo cambios. Si se predice la ráfaga, las aspas empiezan a girar antes de que llegue.',
  ),
  A.vf(
    'El PID es un control reactivo: corrige cuando el error ya apareció.',
    true,
    'Por eso el estado del arte le agrega predicción: para corregir antes.',
  ),
  A.vf(
    'En el caso del aerogenerador se usa un solo enfoque: el controlador PID.',
    false,
    'Es un sistema **híbrido**: sensores (percepción), random forest (aprendizaje automático), optimización de las K, control difuso, PINN y el PID para ejecutar la corrección.',
  ),
  A.opcion(
    'En el aerogenerador, ¿qué aporta el random forest?',
    ['Predecir el viento o la carga antes de que llegue', 'Girar las aspas', 'Medir la vibración', 'Ajustar la altura de la torre'],
    0,
    'Es un modelo de aprendizaje automático. Su papel es la predicción que permite anticiparse.',
  ),
];
