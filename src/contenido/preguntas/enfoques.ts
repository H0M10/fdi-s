import { de, ENFOQUES, preguntasDe } from '../fabrica';

const P = preguntasDe('enfoques');
const CUADRANTES = ['Pensar como humano', 'Actuar como humano', 'Pensar racionalmente', 'Actuar racionalmente'];

/** Los enfoques que pueden formar un híbrido. «Híbrido» no va aquí: es el
 *  nombre de la combinación, no una pieza. */
const COMPONENTES = ['Reglas', 'Búsqueda', 'Optimización', 'Machine learning', 'Deep learning'] as const;
const I_ = { reglas: 0, busqueda: 1, opt: 2, ml: 3, dl: 4 };

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
    'BFS, DFS, UCS y Greedy, que se vieron en clase, son algoritmos de qué enfoque?',
    ...de(ENFOQUES, ['Búsqueda', 'Optimización', 'Machine learning', 'Reglas'], 'Búsqueda'),
    'Los cuatro parten de un **estado inicial** y buscan llegar a una **meta**; solo cambia el orden en que exploran. En el examen se pregunta el enfoque, no cuál de los cuatro es.',
  ),
  P.opcion(
    'El algoritmo evolutivo que se vio en clase es un ejemplo de qué enfoque?',
    ...de(ENFOQUES, ['Optimización', 'Búsqueda', 'Machine learning', 'Reglas'], 'Optimización'),
    'Se usó para **maximizar** o **minimizar** una ecuación: descartar los peores, generar nuevos y repetir.',
  ),
  P.vf(
    'En el enfoque de reglas, igual que en la programación tradicional, la lógica la escribe una persona.',
    true,
    'Son de la misma familia. El enfoque de reglas es la forma que toma la programación tradicional dentro de la IA: un experto escribe condiciones «si… entonces» y un motor de inferencia las aplica.',
  ),
  P.vf(
    'En machine learning, la lógica que decide la respuesta la escribe el programador.',
    false,
    'Es al revés: en machine learning la lógica **sale de los datos**. Eso es lo que lo separa de las reglas y de la programación tradicional.',
  ),
  P.opcion(
    '¿Qué tienen en común el enfoque de reglas y la programación tradicional, y qué los separa de machine learning?',
    [
      'En los dos la lógica la escribe una persona; en machine learning sale de los datos',
      'Los dos necesitan millones de datos; machine learning no',
      'Los dos usan redes neuronales; machine learning no',
      'Los dos buscan un camino hacia una meta; machine learning no',
    ],
    0,
    'Esa es la pregunta que hay que hacerse ante un caso: **¿la regla la escribió alguien, o se aprendió de los datos?**',
  ),
  P.opcion(
    'Según el profesor, si buscas **una** solución a un problema, ¿qué enfoque usas?',
    ...de(ENFOQUES, ['Búsqueda', 'Optimización', 'Reglas', 'Machine learning'], 'Búsqueda'),
    'Es la regla que dio en clase: buscar una solución → búsqueda; buscar **mejorar** una solución → optimización.',
  ),
  P.opcion(
    'Según el profesor, si buscas **mejorar** una solución que ya tienes, ¿qué enfoque usas?',
    ...de(ENFOQUES, ['Optimización', 'Búsqueda', 'Reglas', 'Deep learning'], 'Optimización'),
    'Mejorar es buscar el mejor valor: el máximo o el mínimo.',
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

  // ---------------------------------------------------------------
  // Más casos de «¿qué enfoque es?», que es como pregunta el profesor.
  // La pregunta clave para cada uno: ¿la regla la escribió alguien, hay
  // un camino que encontrar, algo que maximizar o minimizar, o se
  // aprende de los datos?
  // ---------------------------------------------------------------
  P.opcion(
    'Un banco aprueba créditos con su reglamento: si el cliente gana más de $15,000 al mes y no tiene deudas vencidas, se aprueba. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Reglas', 'Machine learning', 'Optimización', 'Búsqueda'], 'Reglas'),
    'El banco ya sabe la regla y la escribió. No aprende nada de clientes anteriores: solo aplica la condición.',
  ),
  P.opcion(
    'Un termostato enciende la calefacción si la temperatura baja de 20 °C y la apaga si pasa de 23 °C. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Reglas', 'Deep learning', 'Optimización', 'Machine learning'], 'Reglas'),
    'Dos condiciones «si… entonces» escritas por una persona.',
  ),
  P.opcion(
    'Un sistema de tránsito registra una infracción si el semáforo está en rojo y un auto cruza la línea. ¿Qué enfoque decide la infracción?',
    ...de(ENFOQUES, ['Reglas', 'Búsqueda', 'Optimización', 'Machine learning'], 'Reglas'),
    'La decisión sigue una regla del reglamento de tránsito. Ojo: detectar el auto en la cámara sí usaría deep learning; la pregunta es sobre quién **decide** la infracción.',
  ),
  P.opcion(
    'En un videojuego, el personaje tiene que encontrar la salida de un laberinto desde la entrada. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Búsqueda', 'Optimización', 'Reglas', 'Machine learning'], 'Búsqueda'),
    'Estado inicial (la entrada), meta (la salida) y acciones (avanzar por un pasillo). Hay un **camino** que encontrar.',
  ),
  P.opcion(
    'Un programa de ajedrez revisa las jugadas posibles para encontrar una secuencia que lleve al jaque mate. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Búsqueda', 'Reglas', 'Optimización', 'Deep learning'], 'Búsqueda'),
    'Parte de la posición actual y explora jugadas hasta llegar a una meta: el jaque mate.',
  ),
  P.opcion(
    'Una app del metro te dice qué trenes tomar para ir de una estación a otra con menos transbordos. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Búsqueda', 'Machine learning', 'Reglas', 'Deep learning'], 'Búsqueda'),
    'De una estación (estado inicial) a otra (meta), eligiendo acciones (qué tren tomar).',
  ),
  P.opcion(
    'Una fábrica decide cuántas piezas producir de cada modelo para ganar lo más posible con el material que tiene. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Optimización', 'Búsqueda', 'Machine learning', 'Reglas'], 'Optimización'),
    'No hay un camino que encontrar: hay una **cantidad** que elegir para **maximizar** la ganancia.',
  ),
  P.opcion(
    'Una empresa de alimento para ganado busca la mezcla de ingredientes que cumpla los nutrientes necesarios al menor costo. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Optimización', 'Reglas', 'Deep learning', 'Búsqueda'], 'Optimización'),
    '**Minimizar** el costo cumpliendo restricciones: es optimización.',
  ),
  P.opcion(
    'Una paquetería quiere acomodar las cajas dentro del camión para que quepa la mayor cantidad posible. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Optimización', 'Búsqueda', 'Machine learning', 'Reglas'], 'Optimización'),
    'Se busca el **mejor acomodo**, el que maximiza lo que cabe.',
  ),
  P.opcion(
    'Una aseguradora predice qué clientes van a cancelar su póliza, usando el historial de 5,000 clientes anteriores de los que ya sabe si cancelaron o no. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Machine learning', 'Reglas', 'Búsqueda', 'Optimización'], 'Machine learning'),
    'Datos históricos **con su respuesta** (canceló o no) para predecir: aprendizaje supervisado.',
  ),
  P.opcion(
    'Una inmobiliaria estima el precio de una casa según sus metros, su colonia y sus recámaras, a partir de las ventas de los últimos años. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Machine learning', 'Reglas', 'Optimización', 'Búsqueda'], 'Machine learning'),
    'Aprende la relación entre las características y el precio de los datos. Como predice un número, es regresión.',
  ),
  P.opcion(
    'Una tienda en línea te recomienda productos según lo que compraron clientes con gustos parecidos a los tuyos. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Machine learning', 'Reglas', 'Búsqueda', 'Optimización'], 'Machine learning'),
    'Nadie escribió la regla de qué recomendar: sale de los patrones de compra de miles de clientes.',
  ),
  P.opcion(
    'Una app escucha unos segundos de una canción y te dice cuál es; se entrenó con millones de canciones grabadas. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Deep learning', 'Reglas', 'Búsqueda', 'Optimización'], 'Deep learning'),
    'Audio crudo y millones de ejemplos: la red aprende sola qué rasgos del sonido importan.',
  ),
  P.opcion(
    'Un sistema convierte lo que hablas en texto, entrenado con miles de horas de grabaciones de voz. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Deep learning', 'Reglas', 'Optimización', 'Búsqueda'], 'Deep learning'),
    'Datos crudos (audio) en enormes cantidades. Nadie podría escribir a mano las reglas del habla.',
  ),

  // ---------------------------------------------------------------
  // Identificar TODOS los enfoques de un caso. Marcar solo «híbrido» es
  // demasiado general: lo que importa es saber cuáles lo forman. Si son
  // dos o más, el sistema es híbrido; si es uno, no lo es. Por eso hay
  // también casos de un solo enfoque: para no marcar de más.
  // ---------------------------------------------------------------
  P.multi(
    'Una app de comida predice cuántos pedidos habrá cada hora con datos de meses anteriores, decide cuántos repartidores llamar para gastar lo menos posible, y nunca programa a alguien más de 8 horas. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.ml, I_.opt, I_.reglas],
    '**Machine learning** predice los pedidos (datos de meses anteriores). **Optimización** decide cuántos repartidores (gastar lo menos posible). **Reglas** limita las horas (nunca más de 8). Como son tres enfoques juntos, el sistema es **híbrido**.',
  ),
  P.multi(
    'Un hospital programa las cirugías: predice cuánto va a durar cada una con datos de cirugías anteriores, acomoda los quirófanos para atender al mayor número de pacientes, y nunca programa una cirugía sin anestesiólogo. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.ml, I_.opt, I_.reglas],
    'Predecir la duración con cirugías anteriores es **machine learning**. Acomodar para atender a más pacientes es **optimización**. «Nunca sin anestesiólogo» es una **regla**. Tres enfoques: **híbrido**.',
  ),
  P.multi(
    'El comedor universitario del caso de clase: predice cuánta gente va a venir con el registro de días anteriores, decide cuántas porciones cocinar según lo que cuesta que sobre y que falte, y no cocina en días inhábiles. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.ml, I_.opt, I_.reglas],
    'Es el caso de tu exposición. **Machine learning** estima la demanda, **optimización** elige cuánto cocinar y **reglas** acotan (días inhábiles, capacidad). No hay **búsqueda** porque no hay un camino que encontrar, ni **deep learning** porque son pocos datos. Es **híbrido**.',
  ),
  P.multi(
    'Una app de transporte calcula la ruta para llegar a tu destino, predice cuánto vas a tardar según el tráfico de los mismos días en semanas anteriores, y no acepta viajes de más de 100 km. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.busqueda, I_.ml, I_.reglas],
    'La ruta es **búsqueda** (de donde estás a tu destino). Estimar el tiempo con el tráfico de otras semanas es **machine learning**. El límite de 100 km es una **regla**. Tres enfoques: **híbrido**.',
  ),
  P.multi(
    'En la entrada de un edificio, una cámara reconoce el rostro de quien llega con una red entrenada con millones de fotos. Si la persona no está en la lista de empleados, la puerta no se abre. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.dl, I_.reglas],
    'Reconocer rostros con millones de fotos es **deep learning**. «Si no está en la lista, no abrir» es una **regla**. Dos enfoques: **híbrido**.',
  ),
  P.multi(
    'Un robot de almacén encuentra el camino entre los estantes para llegar a cada producto, y decide en qué orden recoger los pedidos para terminar lo más rápido posible. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.busqueda, I_.opt],
    'Llegar a cada producto es **búsqueda** (punto de partida y meta). Elegir el orden para terminar lo antes posible es **optimización**. Dos enfoques: **híbrido**.',
  ),
  P.multi(
    'Una tienda en línea predice qué productos se van a vender más el próximo mes con las ventas de años anteriores, y con esa predicción decide cuánto comprar de cada uno para gastar lo menos posible sin quedarse sin inventario. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.ml, I_.opt],
    'Predecir con ventas anteriores es **machine learning**. Decidir cuánto comprar para gastar lo menos es **optimización**. Es la misma pareja que en el comedor: el modelo predice, la optimización decide. **Híbrido**.',
  ),

  // ---------------------------------------------------------------
  // «Decide» no dice el enfoque. Mismo verbo, enfoques distintos: lo que
  // cambia es si alguien ya fijó la respuesta (reglas) o si el sistema
  // compara opciones y elige la mejor (optimización).
  // ---------------------------------------------------------------
  P.vf(
    'Si un caso dice que el sistema «decide» algo, el enfoque es reglas.',
    false,
    'Todos los enfoques terminan decidiendo algo. Lo que importa es **cómo** decide: si revisa una condición que alguien escribió, es reglas; si compara opciones para quedarse con la mejor, es optimización.',
  ),
  P.opcion(
    '¿Qué parte de un caso te dice que el enfoque es optimización?',
    ['«para gastar lo menos posible»', '«decide»', '«si hay más de 50 pedidos»', '«con datos de meses anteriores»'],
    0,
    '«Lo menos posible», «lo más posible», «el mejor», «al menor costo»: eso es optimización. «Decide» aparece con cualquier enfoque; «si hay más de…» es una regla; «con datos anteriores» es machine learning.',
  ),
  P.opcion(
    'Una app de comida decide llamar a 10 repartidores si hay más de 50 pedidos, y a 5 si hay menos. ¿Qué enfoque decide cuántos llamar?',
    ...de(ENFOQUES, ['Reglas', 'Optimización', 'Machine learning', 'Búsqueda'], 'Reglas'),
    'Los números 10 y 5 ya los fijó una persona. El sistema no compara opciones: solo revisa si hay más de 50. Eso es **reglas**.',
  ),
  P.opcion(
    'Una app de comida decide cuántos repartidores llamar para gastar lo menos posible sin dejar pedidos sin entregar. ¿Qué enfoque decide cuántos llamar?',
    ...de(ENFOQUES, ['Optimización', 'Reglas', 'Machine learning', 'Búsqueda'], 'Optimización'),
    'Nadie fijó el número. El sistema compara: ¿con 5 alcanza?, ¿con 6?… y elige el que cuesta menos. «**Lo menos posible**» es la señal de optimización.',
  ),
  P.opcion(
    'Un almacén decide volver a pedir un producto cuando le quedan menos de 20 piezas. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Reglas', 'Optimización', 'Machine learning', 'Búsqueda'], 'Reglas'),
    '«Cuando queden menos de 20» es una condición fija que escribió alguien.',
  ),
  P.opcion(
    'Un almacén decide cuántas piezas pedir de cada producto para gastar lo menos posible sin quedarse sin inventario. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Optimización', 'Reglas', 'Machine learning', 'Búsqueda'], 'Optimización'),
    'El mismo almacén, pero ahora busca **la mejor cantidad**. Nadie sabe la respuesta de antemano: el sistema la calcula comparando opciones.',
  ),
  P.opcion(
    'Un banco decide no prestarle a nadie que tenga deudas vencidas. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Reglas', 'Optimización', 'Machine learning', 'Deep learning'], 'Reglas'),
    'Es una condición del reglamento: «si tiene deudas vencidas, no se presta».',
  ),
  P.opcion(
    'Un banco decide a qué clientes prestarles para ganar lo más posible con el dinero que tiene disponible. ¿Qué enfoque es?',
    ...de(ENFOQUES, ['Optimización', 'Reglas', 'Machine learning', 'Búsqueda'], 'Optimización'),
    '«**Lo más posible**» con un recurso limitado: optimización. Compara combinaciones de clientes y elige la que más gana.',
  ),

  // Casos de UN solo enfoque: aquí no es híbrido.
  P.multi(
    'Un GPS encuentra cómo llegar de tu casa a la escuela. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.busqueda],
    'Solo **búsqueda**: punto de partida, meta y calles. No predice nada ni optimiza un valor. Como es un solo enfoque, **no es híbrido**.',
  ),
  P.multi(
    'Un sistema escolar registra una falta cuando un alumno acumula 3 retardos. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.reglas],
    'Solo **reglas**: la condición la escribió una persona. Un solo enfoque, **no es híbrido**.',
  ),
  P.multi(
    'Una app identifica qué especie de pájaro es a partir de una foto, con una red entrenada con millones de imágenes. Selecciona **todos** los enfoques que usa.',
    [...COMPONENTES], [I_.dl],
    'Solo **deep learning**. Que sea muy potente no lo hace híbrido: híbrido es cuando se **combinan** enfoques distintos.',
  ),
];
