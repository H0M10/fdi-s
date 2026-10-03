import { de, preguntasDe, RAMAS } from '../fabrica';

const P = preguntasDe('ramas');

export const PREGUNTAS_RAMAS = [
  // ---------------------------------------------------------------
  // Reconocer la rama en un escenario. Es lo que más se pregunta.
  // ---------------------------------------------------------------
  P.opcion(
    'Un termostato inteligente usa sensores de temperatura repartidos por la casa para construir un mapa de qué cuartos están más calientes. ¿Qué rama es?',
    ...de(RAMAS, ['Visión por computadora', 'Percepción computacional', 'Aprendizaje automático', 'Robótica y sistemas autónomos'], 'Percepción computacional'),
    'La palabra clave es **sensores**: el sistema interpreta lo que miden para construir una representación del entorno (el mapa de calor). Si fueran cámaras sería visión por computadora; aquí no hay imágenes.',
  ),
  P.opcion(
    'Una app identifica qué especie de planta es a partir de una foto que toma el usuario. ¿Qué rama es?',
    ...de(RAMAS, ['Percepción computacional', 'IA generativa', 'Visión por computadora', 'Procesamiento de lenguaje natural'], 'Visión por computadora'),
    'Trabaja con **imágenes**, y la tarea es **clasificar**: decir qué hay en la foto. Es la primera de las cuatro tareas de visión (clasificar, detectar, segmentar, seguimiento).',
  ),
  P.opcion(
    'En la cámara de una caseta de cobro, el sistema ignora los árboles, los anuncios y el resto del auto, y recorta únicamente la placa para leerla. ¿Qué tarea de visión por computadora está haciendo?',
    ['Clasificar', 'Detectar', 'Segmentar', 'Seguimiento'],
    2,
    'Es el ejemplo de clase: de toda la imagen de la carretera, solo importa la placa. **Segmentar** es aislar la parte de la imagen que interesa. Seguir la placa mientras el auto avanza sería seguimiento.',
  ),
  P.opcion(
    'Un asistente del celular recibe la orden «pon una alarma a las 7 de la mañana» y la programa. ¿Qué rama le permite entender la orden?',
    ...de(RAMAS, ['Procesamiento de lenguaje natural', 'Computación afectiva', 'Representación del conocimiento y razonamiento', 'IA generativa'], 'Procesamiento de lenguaje natural'),
    'La orden llega por **voz o texto**, y antes de hacer cualquier cosa la máquina tiene que entender qué le pidieron. Eso es PLN. El profesor recalcó que es la rama que más se olvida.',
  ),
  P.opcion(
    'Un sistema sugiere diagnósticos a partir de reglas que escribieron médicos especialistas, del tipo «si el paciente tiene fiebre y dolor de garganta, sospechar infección». ¿Qué rama es?',
    ...de(RAMAS, ['Aprendizaje automático', 'Representación del conocimiento y razonamiento', 'Sistemas cognitivos', 'Búsqueda y planificación'], 'Representación del conocimiento y razonamiento'),
    'El flujo es exactamente el de esta rama: **hechos** (los síntomas) más **reglas** (las de los médicos) pasan por un **motor de inferencia** y dan **conclusiones**. No aprende de datos: las reglas las escribió un experto.',
  ),
  P.opcion(
    'La universidad quiere un programa que arme el horario del cuatrimestre sin que dos profesores queden en el mismo salón a la misma hora. ¿Qué rama es?',
    ...de(RAMAS, ['Búsqueda y planificación', 'Aprendizaje automático', 'Sistemas multiagente', 'Representación del conocimiento y razonamiento'], 'Búsqueda y planificación'),
    'Es el ejemplo del propio profesor. Se resuelve con un algoritmo de **optimización**, y la optimización forma parte de búsqueda y planificación porque optimizar es buscar el mejor valor.',
  ),
  P.opcion(
    'Una tienda entrena un modelo con las ventas de los últimos cinco años para predecir cuánto venderá el próximo mes. ¿Qué rama es?',
    ...de(RAMAS, ['Búsqueda y planificación', 'Aprendizaje automático', 'Percepción computacional', 'IA generativa'], 'Aprendizaje automático'),
    '**Datos históricos** y **predecir**: es el flujo de aprendizaje automático. Entrenamiento: datos históricos → algoritmo → modelo. Uso: datos nuevos → modelo → predicción.',
  ),
  P.opcion(
    'En una fábrica, un brazo mecánico toma piezas de una banda transportadora y las acomoda en cajas. ¿Qué rama es?',
    ...de(RAMAS, ['Visión por computadora', 'Robótica y sistemas autónomos', 'Sistemas multiagente', 'Percepción computacional'], 'Robótica y sistemas autónomos'),
    'Hay **interacción física**: el sistema mueve algo en el mundo real. Esa es la diferencia con todas las demás ramas, cuyo resultado es información. No hace falta que el robot sea humanoide.',
  ),
  P.opcion(
    'Un grupo de drones se reparte zonas de un bosque para buscar a una persona perdida; si uno termina su zona, ayuda al que va más atrasado. ¿Qué rama es?',
    ...de(RAMAS, ['Robótica y sistemas autónomos', 'Sistemas multiagente', 'Búsqueda y planificación', 'Sistemas cognitivos'], 'Sistemas multiagente'),
    'Son **varios agentes** y lo que hace uno afecta a los demás: se reparten el trabajo y **cooperan**. Cada dron también es robótica, pero lo que define al caso es la coordinación entre ellos.',
  ),
  P.opcion(
    'Una herramienta crea una ilustración a partir de una descripción escrita como «un gato astronauta en estilo acuarela». ¿Cuál es la rama principal?',
    ...de(RAMAS, ['Visión por computadora', 'IA generativa', 'Procesamiento de lenguaje natural', 'Aprendizaje automático'], 'IA generativa'),
    'El sistema **genera contenido nuevo**. También interviene PLN para entender la descripción, pero lo que define al sistema es que produce una imagen que no existía.',
  ),
  P.opcion(
    'Un call center analiza el tono de voz de los clientes y, si detecta enojo, transfiere la llamada a un supervisor. ¿Qué rama es?',
    ...de(RAMAS, ['Procesamiento de lenguaje natural', 'Computación afectiva', 'Percepción computacional', 'Sistemas cognitivos'], 'Computación afectiva'),
    'Reconoce y responde a **emociones**. La palabra clave son las **señales** afectivas, como el tono de voz. Si solo entendiera lo que dice el cliente sería PLN; aquí lo que se analiza es cómo se siente.',
  ),
  P.opcion(
    'Un proyecto de investigación construye un sistema que percibe su entorno, guarda lo que aprende en memoria, razona con eso y decide qué hacer, imitando cómo lo hace una persona. ¿Qué rama es?',
    ...de(RAMAS, ['Sistemas cognitivos', 'Robótica y sistemas autónomos', 'Aprendizaje automático', 'Representación del conocimiento y razonamiento'], 'Sistemas cognitivos'),
    'Es literalmente su flujo: **percibir → memoria → razonar → decidir → actuar**. La rama estudia capacidades como percepción, aprendizaje, memoria, razonamiento, lenguaje y decisión.',
  ),
  P.opcion(
    'Un traductor convierte automáticamente un correo del inglés al español. ¿Qué rama es?',
    ...de(RAMAS, ['IA generativa', 'Procesamiento de lenguaje natural', 'Representación del conocimiento y razonamiento', 'Computación afectiva'], 'Procesamiento de lenguaje natural'),
    'Interpreta un texto y genera otro texto. Todo ocurre en el lenguaje escrito, que es el terreno del PLN.',
  ),
  P.opcion(
    'Durante un partido, una cámara mantiene al balón siempre en el centro de la toma, aunque se mueva por toda la cancha. ¿Qué tarea de visión es?',
    ['Clasificar', 'Detectar', 'Segmentar', 'Seguimiento'],
    3,
    'Una vez encontrado el balón, la cámara lo **sigue** a lo largo del video. Es la última de las cuatro tareas, igual que en el ejemplo de clase la cámara sigue la placa hasta terminar de leerla.',
  ),
  P.opcion(
    'En un videojuego, los personajes que controla la computadora forman equipos, compiten por recursos y a veces negocian alianzas entre ellos. ¿Qué rama es?',
    ...de(RAMAS, ['Sistemas multiagente', 'IA generativa', 'Búsqueda y planificación', 'Sistemas cognitivos'], 'Sistemas multiagente'),
    'Varios agentes cuyas acciones se afectan entre sí, y que **compiten y negocian**. Son dos de las cuatro cosas que pueden hacer los agentes: cooperar, competir, coordinarse y negociar.',
  ),
  P.opcion(
    'Una empresa de paquetería calcula, para cada repartidor, el orden de entregas que recorre menos kilómetros. ¿Qué rama es?',
    ...de(RAMAS, ['Aprendizaje automático', 'Búsqueda y planificación', 'Robótica y sistemas autónomos', 'Sistemas multiagente'], 'Búsqueda y planificación'),
    'Hay un **estado inicial** (el almacén), una **meta** (todas las entregas hechas) y algo que **minimizar** (los kilómetros). Es búsqueda y planificación, en su variante de optimización.',
  ),
  P.opcion(
    'Una cámara de seguridad manda una alerta al celular del dueño cuando aparece una persona en el patio, pero no cuando pasa un gato. ¿Qué rama es?',
    ...de(RAMAS, ['Percepción computacional', 'Visión por computadora', 'Computación afectiva', 'Sistemas multiagente'], 'Visión por computadora'),
    'Trabaja con **video** y **detecta** personas. El profesor explicó que hoy esto se hace con visión en lugar de sensores de movimiento porque es más exacto: un sensor se activaría también con el gato.',
  ),

  // ---------------------------------------------------------------
  // Definiciones y flujos
  // ---------------------------------------------------------------
  P.opcion(
    '«Rama que busca que una máquina interprete información procedente de sensores para construir una representación útil de su entorno.» ¿Cuál es?',
    ...de(RAMAS, ['Visión por computadora', 'Percepción computacional', 'Robótica y sistemas autónomos', 'Sistemas cognitivos'], 'Percepción computacional'),
    'Es la definición de percepción computacional. Su flujo: mundo físico → sensores → percepción → representación.',
  ),
  P.opcion(
    '¿A qué rama corresponde el flujo «Hechos + Reglas → Motor de inferencia → Conclusiones»?',
    ...de(RAMAS, ['Aprendizaje automático', 'Representación del conocimiento y razonamiento', 'Sistemas cognitivos', 'Búsqueda y planificación'], 'Representación del conocimiento y razonamiento'),
    'Los hechos y las reglas son el conocimiento representado; el motor de inferencia es el que razona con ellos.',
  ),
  P.opcion(
    '¿A qué rama corresponde el flujo «Estado inicial → … → Acciones → Meta»?',
    ...de(RAMAS, ['Robótica y sistemas autónomos', 'Búsqueda y planificación', 'Sistemas multiagente', 'Aprendizaje automático'], 'Búsqueda y planificación'),
    'Se parte de un estado inicial, se exploran alternativas, se eligen acciones y se llega a una meta. La definición agrega que puede considerar costos, restricciones e incertidumbre.',
  ),
  P.opcion(
    '¿A qué rama corresponde el flujo «Percibir → Memoria → Razonar → Decidir → Actuar»?',
    ...de(RAMAS, ['Robótica y sistemas autónomos', 'Sistemas cognitivos', 'Percepción computacional', 'Representación del conocimiento y razonamiento'], 'Sistemas cognitivos'),
    'Es el flujo de los sistemas cognitivos: reproduce las capacidades mentales en orden.',
  ),
  P.opcion(
    '¿A qué rama corresponde el flujo «Mundo físico → Sensores → Percepción → Representación»?',
    ...de(RAMAS, ['Percepción computacional', 'Visión por computadora', 'Robótica y sistemas autónomos', 'Sistemas cognitivos'], 'Percepción computacional'),
    'El segundo paso, **sensores**, es la palabra que el profesor dijo que hay que buscar para reconocer esta rama.',
  ),
  P.opcion(
    '¿En qué orden van las tareas de visión por computadora, de la más simple a la más compleja?',
    [
      'Clasificar → Detectar → Segmentar → Seguimiento',
      'Detectar → Clasificar → Seguimiento → Segmentar',
      'Segmentar → Clasificar → Detectar → Seguimiento',
      'Clasificar → Segmentar → Detectar → Seguimiento',
    ],
    0,
    'Primero se dice **qué** hay (clasificar), luego **dónde** está (detectar), luego se **recorta** (segmentar) y al final se **sigue** a lo largo del video (seguimiento).',
  ),
  P.opcion(
    'Según el profesor, ¿dentro de qué rama entran la optimización y los algoritmos evolutivos?',
    ...de(RAMAS, ['Aprendizaje automático', 'Búsqueda y planificación', 'Sistemas cognitivos', 'Representación del conocimiento y razonamiento'], 'Búsqueda y planificación'),
    'Porque optimizar es **buscar** el mínimo o el máximo. Por eso la rama de búsqueda incluye la optimización y los algoritmos evolutivos.',
  ),
  P.opcion(
    'Según lo visto en clase, ¿dónde se incluye el deep learning?',
    ...de(RAMAS, ['Aprendizaje automático', 'Visión por computadora', 'IA generativa', 'Sistemas cognitivos'], 'Aprendizaje automático'),
    'El deep learning es una **subrama** del aprendizaje automático. El aprendizaje puede ser de información numérica o de imágenes, pero sigue siendo aprendizaje a partir de datos.',
  ),
  P.opcion(
    '¿Qué distingue a la robótica de todas las demás ramas?',
    [
      'Que el resultado es una interacción física con el mundo',
      'Que siempre usa redes neuronales',
      'Que el robot tiene que tener forma humana',
      'Que trabaja solo con sensores, nunca con cámaras',
    ],
    0,
    'En las demás ramas el resultado es información. En robótica el sistema **se mueve** o mueve algo. El profesor aclaró que no tiene que ser humanoide: un carrito también cuenta.',
  ),
  P.opcion(
    '¿Por qué hoy muchas cámaras de seguridad detectan personas con visión por computadora en lugar de sensores de movimiento?',
    [
      'Porque es más exacto',
      'Porque los sensores ya no se fabrican',
      'Porque la visión no necesita electricidad',
      'Porque la ley prohíbe los sensores',
    ],
    0,
    'Es lo que dijo el profesor. Un sensor de movimiento se activa con un gato, una rama o una sombra; la visión distingue qué es lo que se movió.',
  ),
  P.opcion(
    '¿Cuántas ramas de la IA se vieron en clase?',
    ['7', '9', '11', '13'],
    2,
    'Once: representación del conocimiento, búsqueda y planificación, aprendizaje automático, percepción, visión, PLN, robótica, multiagente, generativa, afectiva y sistemas cognitivos.',
  ),
  P.opcion(
    '«Rama contemporánea de modelos capaces de producir contenido sintético derivado de patrones aprendidos en datos, como texto, imágenes, audio, video o código.» ¿Cuál es?',
    ...de(RAMAS, ['Aprendizaje automático', 'IA generativa', 'Procesamiento de lenguaje natural', 'Sistemas cognitivos'], 'IA generativa'),
    'La clave es **generar contenido sintético**: algo nuevo que no existía.',
  ),
  P.opcion(
    '¿Cuál es la palabra clave que el profesor asoció con la computación afectiva?',
    ['Sensores', 'Señales', 'Imágenes', 'Agentes'],
    1,
    'Las **señales** de emoción: expresión del rostro, tono de voz, ritmo cardíaco. «Sensores» es la de percepción computacional.',
  ),

  // ---------------------------------------------------------------
  // Verdadero o falso: las confusiones más probables
  // ---------------------------------------------------------------
  P.vf(
    'La rama que interpreta y genera texto y voz se llama «procesamiento de lenguaje corporal».',
    false,
    'Es **procesamiento de lenguaje natural** (PLN). Así quedó mal en el apunte, y escribirlo así en el examen sería un error: se procesa el lenguaje escrito y hablado, no los gestos.',
  ),
  P.vf(
    'Para pertenecer a la rama de robótica, el robot tiene que tener forma humana.',
    false,
    'El profesor lo aclaró: puede ser un carrito. Lo que importa es que haya interacción física y movimiento.',
  ),
  P.vf(
    'Si un sistema recibe una instrucción por voz, esa instrucción tiene que pasar primero por procesamiento de lenguaje natural.',
    true,
    'La máquina tiene que entender qué le pidieron antes de hacer cualquier cosa. El profesor dijo que es la rama que más se olvida en los casos.',
  ),
  P.vf(
    'Si un caso menciona sensores, lo más probable es que se trate de percepción computacional; si menciona imágenes, de visión por computadora.',
    true,
    'Es el criterio que dio el profesor para distinguirlas: hacen lo mismo, pero visión trabaja con imágenes y percepción con sensores.',
  ),
  P.vf(
    'Un sistema real de IA casi siempre pertenece a una sola rama.',
    false,
    'Casi nunca. Un robot de almacén que recibe órdenes por voz y esquiva cajas con una cámara usa PLN, visión, robótica y multiagente. Si piden **la** rama, se elige la que define el propósito; si piden **las** ramas, se enlistan todas.',
  ),
  P.vf(
    'Los agentes de un sistema multiagente pueden cooperar, competir, coordinarse e incluso negociar.',
    true,
    'Son las cuatro formas de relación que mencionó el profesor.',
  ),

  // ---------------------------------------------------------------
  // Selección múltiple: cuando intervienen varias ramas
  // ---------------------------------------------------------------
  P.multi(
    'Un robot de almacén recibe órdenes por voz, esquiva cajas usando una cámara y se coordina con otros robots para no chocar. Selecciona **todas** las ramas que intervienen.',
    ['Procesamiento de lenguaje natural', 'Visión por computadora', 'Robótica y sistemas autónomos', 'Sistemas multiagente', 'IA generativa', 'Computación afectiva'],
    [0, 1, 2, 3],
    'Órdenes por voz → **PLN**. Cámara para esquivar → **visión**. Se mueve → **robótica**. Se coordina con otros → **multiagente**. No genera contenido ni reconoce emociones.',
  ),
  P.multi(
    'Le dices a una bocina inteligente «avísame si hay un perro en el patio» y una cámara del patio te manda una alerta cuando aparece. Selecciona **todas** las ramas que intervienen.',
    ['Procesamiento de lenguaje natural', 'Visión por computadora', 'Robótica y sistemas autónomos', 'Computación afectiva', 'Sistemas multiagente'],
    [0, 1],
    'Es el ejemplo de clase. Entender la orden es **PLN**; detectar el perro en la cámara es **visión**. No hay movimiento físico ni varios agentes.',
  ),
  P.multi(
    'Un auto autónomo usa cámaras para leer señales, sensores de distancia para no chocar, calcula la ruta y conduce solo. Selecciona **todas** las ramas que intervienen.',
    ['Visión por computadora', 'Percepción computacional', 'Búsqueda y planificación', 'Robótica y sistemas autónomos', 'IA generativa', 'Computación afectiva'],
    [0, 1, 2, 3],
    'Cámaras → **visión**. Sensores → **percepción**. Ruta → **búsqueda y planificación**. Conduce solo → **robótica y sistemas autónomos**, que es la rama que define al caso.',
  ),
];
