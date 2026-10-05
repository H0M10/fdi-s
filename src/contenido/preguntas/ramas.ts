// Toda pregunta de identificar la rama va con P.ramas: selección múltiple,
// las once ramas en el mismo orden y la misma pregunta, sea una o varias
// las correctas. En el examen te dan un caso y dices qué rama o ramas son.
//
// Se marca lo que se puede señalar en el texto del caso. Cuando algo es
// discutible (el caso no lo dice pero se puede deducir), va como «también
// se vale»: marcarlo o no, no cuenta en contra.

import { preguntasDe } from '../fabrica';

const P = preguntasDe('ramas');
const TAREAS = ['Clasificar', 'Detectar', 'Segmentar', 'Seguimiento'];

export const PREGUNTAS_RAMAS = [
  // ---------------------------------------------------------------
  // Reconocer las ramas en un escenario. Es lo que más se pregunta.
  // ---------------------------------------------------------------
  P.ramas(
    'Un termostato inteligente usa sensores de temperatura repartidos por la casa para construir un mapa de qué cuartos están más calientes.',
    ['Percepción computacional'],
    'La palabra clave es **sensores**: el sistema interpreta lo que miden para construir una representación del entorno (el mapa de calor). Si fueran cámaras sería visión por computadora; aquí no hay imágenes.',
  ),
  P.ramas(
    'Una app identifica qué especie de planta es a partir de una foto que toma el usuario.',
    ['Visión por computadora'],
    'Trabaja con **imágenes**, y la tarea es **clasificar**: decir qué hay en la foto. Aprendizaje automático también se vale: para reconocer plantas el modelo se entrenó con fotos, aunque el caso no lo diga.',
    undefined, ['Aprendizaje automático'],
  ),
  P.opcion(
    'En la cámara de una caseta de cobro, el sistema ignora los árboles, los anuncios y el resto del auto, y recorta únicamente la placa para leerla. ¿Qué tarea de visión por computadora está haciendo?',
    TAREAS, 2,
    'Es el ejemplo de clase: de toda la imagen de la carretera, solo importa la placa. **Segmentar** es aislar la parte de la imagen que interesa. Seguir la placa mientras el auto avanza sería seguimiento.',
  ),
  P.ramas(
    'Un asistente del celular recibe la orden «pon una alarma a las 7 de la mañana» y la programa.',
    ['Procesamiento de lenguaje natural'],
    'La orden llega por **voz o texto**, y antes de hacer cualquier cosa la máquina tiene que entender qué le pidieron. Eso es PLN. El profesor recalcó que es la rama que más se olvida.',
  ),
  P.ramas(
    'Un sistema sugiere diagnósticos a partir de reglas que escribieron médicos especialistas, del tipo «si el paciente tiene fiebre y dolor de garganta, sospechar infección».',
    ['Representación del conocimiento y razonamiento'],
    'El flujo es exactamente el de esta rama: **hechos** (los síntomas) más **reglas** (las de los médicos) pasan por un **motor de inferencia** y dan **conclusiones**. No es aprendizaje automático: las reglas las escribió un experto, no salieron de datos.',
  ),
  P.ramas(
    'La universidad quiere un programa que arme el horario del cuatrimestre sin que dos profesores queden en el mismo salón a la misma hora.',
    ['Búsqueda y planificación'],
    'Es el ejemplo del propio profesor. Se resuelve con un algoritmo de **optimización**, y la optimización forma parte de búsqueda y planificación porque optimizar es buscar el mejor valor. «Sin que dos queden en el mismo salón» es una restricción; si la viste como regla, representación del conocimiento también se vale.',
    undefined, ['Representación del conocimiento y razonamiento'],
  ),
  P.ramas(
    'Una tienda entrena un modelo con las ventas de los últimos cinco años para predecir cuánto venderá el próximo mes.',
    ['Aprendizaje automático'],
    '**Datos históricos** y **predecir**: es el flujo de aprendizaje automático. Entrenamiento: datos históricos → algoritmo → modelo. Uso: datos nuevos → modelo → predicción.',
  ),
  P.ramas(
    'En una fábrica, un brazo mecánico toma piezas de una banda transportadora y las acomoda en cajas.',
    ['Robótica y sistemas autónomos'],
    'Hay **interacción física**: el sistema mueve algo en el mundo real. Esa es la diferencia con todas las demás ramas, cuyo resultado es información. No hace falta que el robot sea humanoide. El caso no dice cámaras ni sensores, así que no se marcan.',
  ),
  P.ramas(
    'Un grupo de drones se reparte zonas de un bosque para buscar a una persona perdida; si uno termina su zona, ayuda al que va más atrasado.',
    ['Sistemas multiagente', 'Robótica y sistemas autónomos'],
    'Son **varios agentes** y lo que hace uno afecta a los demás: se reparten el trabajo y **cooperan** (multiagente). Cada dron vuela solo (robótica). Repartir las zonas es planear, así que búsqueda y planificación también se vale. El caso no dice cámaras: visión no se marca.',
    undefined, ['Búsqueda y planificación'],
  ),
  P.ramas(
    'Una herramienta crea una ilustración a partir de una descripción escrita como «un gato astronauta en estilo acuarela».',
    ['IA generativa', 'Procesamiento de lenguaje natural'],
    'Para entender la descripción escrita hace falta **PLN**, y producir una imagen que no existía es **IA generativa**. No es visión por computadora: visión interpreta imágenes que ya existen; aquí se crean.',
  ),
  P.ramas(
    'Un call center analiza el tono de voz de los clientes y, si detecta enojo, transfiere la llamada a un supervisor.',
    ['Computación afectiva'],
    'Reconoce y responde a **emociones**. La palabra clave son las **señales** afectivas, como el tono de voz. No es PLN: que haya voz no basta; PLN es para entender **qué** dice el cliente, y aquí solo importa **cómo** lo dice. «Si detecta enojo, transfiere» es una regla: representación del conocimiento también se vale.',
    undefined, ['Representación del conocimiento y razonamiento'],
  ),
  P.ramas(
    'Un sistema escucha las llamadas de un call center y avisa al supervisor cuando el cliente dice la palabra «cancelar».',
    ['Procesamiento de lenguaje natural'],
    'Aquí sí tiene que entender **qué** dice el cliente (la palabra «cancelar»): **PLN**. Compáralo con el call center que escucha el **tono** para detectar enojo: ahí es **cómo** lo dice, y eso es computación afectiva. «Si dice cancelar, avisa» es una regla: representación del conocimiento también se vale.',
    undefined, ['Representación del conocimiento y razonamiento'],
  ),
  P.ramas(
    'Una app escucha tu clase y escribe palabra por palabra lo que dijo el profesor.',
    ['Procesamiento de lenguaje natural'],
    'Convertir voz en texto es entender las **palabras**: **PLN**. No importa cómo suena el profesor, sino qué dice. No es generativa: no inventa nada, copia lo que se dijo.',
  ),
  P.ramas(
    'Un proyecto de investigación construye un sistema que percibe su entorno, guarda lo que aprende en memoria, razona con eso y decide qué hacer, imitando cómo lo hace una persona.',
    ['Sistemas cognitivos'],
    'Es literalmente su flujo: **percibir → memoria → razonar → decidir → actuar**. «Percibe» y «aprende» son pasos de ese flujo; no se marcan aparte porque el caso no menciona sensores ni datos de entrenamiento.',
  ),
  P.ramas(
    'Un traductor convierte automáticamente un correo del inglés al español.',
    ['Procesamiento de lenguaje natural'],
    'Interpreta un texto y produce otro texto: todo ocurre en el lenguaje escrito, que es el terreno del PLN. Como redacta un texto nuevo, IA generativa también se vale.',
    undefined, ['IA generativa'],
  ),
  P.opcion(
    'Durante un partido, una cámara mantiene al balón siempre en el centro de la toma, aunque se mueva por toda la cancha. ¿Qué tarea de visión es?',
    TAREAS, 3,
    'Una vez encontrado el balón, la cámara lo **sigue** a lo largo del video. Es la última de las cuatro tareas, igual que en el ejemplo de clase la cámara sigue la placa hasta terminar de leerla.',
  ),
  P.ramas(
    'En un videojuego, los personajes que controla la computadora forman equipos, compiten por recursos y a veces negocian alianzas entre ellos.',
    ['Sistemas multiagente'],
    'Varios agentes cuyas acciones se afectan entre sí, y que **compiten y negocian**. Son dos de las cuatro cosas que pueden hacer los agentes: cooperar, competir, coordinarse y negociar.',
  ),
  P.ramas(
    'Una empresa de paquetería calcula, para cada repartidor, el orden de entregas que recorre menos kilómetros.',
    ['Búsqueda y planificación'],
    'Hay un **estado inicial** (el almacén), una **meta** (todas las entregas hechas) y algo que **minimizar** (los kilómetros). Es búsqueda y planificación, en su variante de optimización.',
  ),
  P.ramas(
    'Una cámara de seguridad manda una alerta al celular del dueño cuando aparece una persona en el patio, pero no cuando pasa un gato.',
    ['Visión por computadora'],
    'Trabaja con **video** y **detecta** personas. El profesor explicó que hoy esto se hace con visión en lugar de sensores de movimiento porque es más exacto: un sensor se activaría también con el gato.',
  ),

  // ---------------------------------------------------------------
  // Casos de varias ramas: hay que encontrarlas todas.
  // ---------------------------------------------------------------
  P.ramas(
    'Un robot de almacén recibe órdenes por voz, esquiva cajas usando una cámara y se coordina con otros robots para no chocar.',
    ['Procesamiento de lenguaje natural', 'Visión por computadora', 'Robótica y sistemas autónomos', 'Sistemas multiagente'],
    'Órdenes por voz → **PLN**. Cámara para esquivar → **visión**. Se mueve → **robótica**. Se coordina con otros → **multiagente**. No genera contenido ni reconoce emociones.',
  ),
  P.ramas(
    'Le dices a una bocina inteligente «avísame si hay un perro en el patio» y una cámara del patio te manda una alerta cuando aparece.',
    ['Procesamiento de lenguaje natural', 'Visión por computadora'],
    'Es el ejemplo de clase. Entender la orden es **PLN**; detectar el perro en la cámara es **visión**. No hay movimiento físico ni varios agentes.',
  ),
  P.ramas(
    'Un auto autónomo usa cámaras para leer señales, sensores de distancia para no chocar, calcula la ruta y conduce solo.',
    ['Visión por computadora', 'Percepción computacional', 'Búsqueda y planificación', 'Robótica y sistemas autónomos'],
    'Cámaras → **visión**. Sensores → **percepción**. Ruta → **búsqueda y planificación**. Conduce solo → **robótica y sistemas autónomos**, que es la rama que define al caso.',
  ),
  P.ramas(
    'Un banco pone en su app un asistente que entiende las preguntas que escriben los clientes y redacta una respuesta nueva para cada una.',
    ['Procesamiento de lenguaje natural', 'IA generativa'],
    'Entender lo que escribe el cliente es **PLN**. Redactar una respuesta que no estaba escrita es **IA generativa**.',
  ),
  P.ramas(
    'Una aspiradora robot usa sensores de choque y de distancia para saber dónde hay muebles, arma un mapa de la casa y planea por dónde pasar para limpiar todo.',
    ['Percepción computacional', 'Búsqueda y planificación', 'Robótica y sistemas autónomos'],
    'Sensores para conocer el entorno → **percepción**. Planear por dónde pasar → **búsqueda y planificación**. Se mueve sola por la casa → **robótica**. No hay cámaras, así que no es visión.',
  ),
  P.ramas(
    'Las cámaras de una tienda detectan cuando un cliente se ve frustrado frente a un estante y le avisan a un empleado para que lo ayude.',
    ['Visión por computadora', 'Computación afectiva'],
    'Las cámaras analizan la cara del cliente → **visión**. Lo que se busca en la cara es una **emoción** (frustración) → **computación afectiva**.',
  ),
  P.ramas(
    'Un hospital predice qué pacientes tienen más riesgo de volver a internarse, con el historial de miles de pacientes anteriores. Luego, con reglas que escribieron los médicos («si el riesgo es alto y vive solo, programar una visita»), decide el seguimiento.',
    ['Aprendizaje automático', 'Representación del conocimiento y razonamiento'],
    'Predecir con el historial de pacientes anteriores → **aprendizaje automático**. Reglas «si… entonces» escritas por los médicos que llevan a una decisión → **representación del conocimiento y razonamiento**. La predicción es uno de los **hechos** que usan las reglas.',
  ),
  P.ramas(
    'Un grupo de drones con cámaras se reparte un campo de cultivo; cada uno detecta en sus fotos las plantas con plaga y avisa a los demás para no revisar dos veces la misma zona.',
    ['Sistemas multiagente', 'Visión por computadora', 'Robótica y sistemas autónomos'],
    'Varios drones que se avisan y se reparten el trabajo → **multiagente**. Detectar plagas en fotos → **visión**. Vuelan solos → **robótica**. Repartir el campo es planear, así que búsqueda y planificación también se vale.',
    undefined, ['Búsqueda y planificación'],
  ),
  // Las dos ramas de texto: PLN entiende, generativa crea.
  P.ramas(
    'Un filtro revisa los correos que llegan y manda a la carpeta de spam los que parecen fraude.',
    ['Procesamiento de lenguaje natural'],
    'Lee e interpreta el texto de cada correo para clasificarlo: **PLN**. No crea nada nuevo, así que no es generativa. Si pensaste que aprendió de correos anteriores, aprendizaje automático también se vale.',
    undefined, ['Aprendizaje automático'],
  ),
  P.ramas(
    'Le das a una app un capítulo de un libro y te escribe un resumen nuevo con sus propias palabras.',
    ['Procesamiento de lenguaje natural', 'IA generativa'],
    'Tiene que entender el capítulo: **PLN**. Y redacta un texto que no existía: **IA generativa**. Son las dos ramas de texto juntas, igual que un chatbot que redacta sus respuestas.',
  ),
  P.ramas(
    'Eliges un estilo de una lista («jazz», «rock», «clásica») y una herramienta compone una canción nueva en ese estilo.',
    ['IA generativa'],
    'Crea contenido nuevo (música): **IA generativa**. No hay texto ni voz que entender, porque el estilo se elige de una lista: no es PLN.',
  ),
  P.ramas(
    'Un juguete robot entiende lo que le dice el niño, nota por su tono de voz si está triste y se acerca a él para jugar.',
    ['Procesamiento de lenguaje natural', 'Computación afectiva', 'Robótica y sistemas autónomos'],
    'Entender lo que dice → **PLN**. Notar la tristeza por el tono → **computación afectiva** (las señales). Acercarse → **robótica**. Ojo: son dos cosas distintas sobre la misma voz: **qué** dice (PLN) y **cómo** se siente (afectiva).',
  ),

  // ---------------------------------------------------------------
  // Definiciones y flujos
  // ---------------------------------------------------------------
  P.ramas(
    '«Rama que busca que una máquina interprete información procedente de sensores para construir una representación útil de su entorno.»',
    ['Percepción computacional'],
    'Es la definición de percepción computacional. Su flujo: mundo físico → sensores → percepción → representación.',
    '¿A qué rama o ramas corresponde esta definición?',
  ),
  P.ramas(
    'El flujo «Hechos + Reglas → Motor de inferencia → Conclusiones»,',
    ['Representación del conocimiento y razonamiento'],
    'Los hechos y las reglas son el conocimiento representado; el motor de inferencia es el que razona con ellos.',
    '¿a qué rama o ramas corresponde?',
  ),
  P.ramas(
    'El flujo «Estado inicial → … → Acciones → Meta»,',
    ['Búsqueda y planificación'],
    'Se parte de un estado inicial, se exploran alternativas, se eligen acciones y se llega a una meta. La definición agrega que puede considerar costos, restricciones e incertidumbre.',
    '¿a qué rama o ramas corresponde?',
  ),
  P.ramas(
    'El flujo «Percibir → Memoria → Razonar → Decidir → Actuar»,',
    ['Sistemas cognitivos'],
    'Es el flujo de los sistemas cognitivos: reproduce las capacidades mentales en orden.',
    '¿a qué rama o ramas corresponde?',
  ),
  P.ramas(
    'El flujo «Mundo físico → Sensores → Percepción → Representación»,',
    ['Percepción computacional'],
    'El segundo paso, **sensores**, es la palabra que el profesor dijo que hay que buscar para reconocer esta rama.',
    '¿a qué rama o ramas corresponde?',
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
  P.ramas(
    'Según el profesor, la optimización y los algoritmos evolutivos,',
    ['Búsqueda y planificación'],
    'Porque optimizar es **buscar** el mínimo o el máximo. Por eso la rama de búsqueda incluye la optimización y los algoritmos evolutivos.',
    '¿dentro de qué rama o ramas entran?',
  ),
  P.ramas(
    'Según lo visto en clase, el deep learning,',
    ['Aprendizaje automático'],
    'El deep learning es una **subrama** del aprendizaje automático. El aprendizaje puede ser de información numérica o de imágenes, pero sigue siendo aprendizaje a partir de datos.',
    '¿dentro de qué rama o ramas se incluye?',
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
  P.ramas(
    '«Rama contemporánea de modelos capaces de producir contenido sintético derivado de patrones aprendidos en datos, como texto, imágenes, audio, video o código.»',
    ['IA generativa'],
    'La clave es **generar contenido sintético**: algo nuevo que no existía.',
    '¿A qué rama o ramas corresponde esta definición?',
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
    'Casi nunca. Un robot de almacén que recibe órdenes por voz y esquiva cajas con una cámara usa PLN, visión, robótica y multiagente. En el examen se enlistan todas, y cada una se justifica con la parte del caso que la muestra.',
  ),
  P.vf(
    'Los agentes de un sistema multiagente pueden cooperar, competir, coordinarse e incluso negociar.',
    true,
    'Son las cuatro formas de relación que mencionó el profesor.',
  ),
];
