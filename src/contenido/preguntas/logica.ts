import { inciso as I, preguntasDe } from '../fabrica';

const P = preguntasDe('logica');

export const PREGUNTAS_LOGICA = [
  // ---------------------------------------------------------------
  // Conceptos
  // ---------------------------------------------------------------
  P.opcion(
    '¿Qué es una proposición?',
    [
      'Una afirmación que puede ser verdadera o falsa',
      'Cualquier oración en español',
      'Una pregunta que se responde con sí o no',
      'Una orden que la computadora debe cumplir',
    ],
    0,
    'Si no se le puede poner la etiqueta de verdadera o falsa, no es proposición. Por eso las órdenes, preguntas y exclamaciones quedan fuera.',
  ),
  P.opcion(
    '¿Es proposición la frase «Cierra la puerta»?',
    ['Sí, porque es una oración completa', 'No, porque es una orden', 'Sí, porque se puede cumplir', 'No, porque es falsa'],
    1,
    'Es el ejemplo de clase. Una orden no es verdadera ni falsa.',
  ),
  P.opcion(
    '¿Es proposición la frase «¿Tienen calor?»?',
    ['Sí', 'No, porque es una pregunta', 'Sí, porque la respuesta es verdadera', 'Depende del clima'],
    1,
    'La respuesta a la pregunta podría ser verdadera o falsa, pero la pregunta en sí no lo es.',
  ),
  P.opcion(
    '¿Es proposición la frase «México está en Europa»?',
    ['No, porque es falsa', 'Sí, y es falsa', 'Sí, y es verdadera', 'No, porque es una exclamación'],
    1,
    'Que sea falsa no la descalifica: falsa también es un valor. Lo que importa es que se le pueda asignar uno.',
  ),
  P.opcion(
    '¿Cuántas proposiciones hay en «Si el motor está encendido y está caliente, entonces está fallando»?',
    ['1', '2', '3', '4'],
    2,
    'Está encendido, está caliente, está fallando. Los conectores («y», «si… entonces») no son proposiciones: son el pegamento.',
  ),
  P.vf(
    'La sugerencia del profesor fue escribir todas las proposiciones en positivo y dejar la negación para la fórmula.',
    true,
    'Si un trozo dice «no está disponible», la proposición se guarda como «está disponible» y en la fórmula se escribe ¬. Así se sabe qué se está negando.',
  ),
  P.opcion(
    'La frase dice «el sistema contra incendios **no** está disponible». ¿Cómo se maneja?',
    [
      'r: el sistema está disponible, y en la fórmula se escribe ¬r',
      'r: el sistema no está disponible, y en la fórmula se escribe r',
      'Se ignora el «no» porque no es una proposición',
      'r: el sistema no está disponible, y en la fórmula se escribe ¬r',
    ],
    0,
    'Proposición en positivo, negación en la fórmula. La última opción niega dos veces y diría lo contrario de la frase.',
  ),
  P.opcion(
    '¿En qué único caso es falsa la implicación p → q?',
    [
      'Cuando p es verdadera y q es falsa',
      'Cuando p es falsa y q es verdadera',
      'Cuando las dos son falsas',
      'Cuando las dos son verdaderas',
    ],
    0,
    'Piénsalo como una promesa: «si estudias, apruebas» solo se rompe si estudiaste y no aprobaste. Si no estudiaste, la promesa no se puso a prueba y cuenta como cumplida.',
  ),
  P.opcion(
    '¿En qué único caso es falsa la disyunción p ∨ q?',
    ['Cuando las dos son falsas', 'Cuando las dos son verdaderas', 'Cuando solo p es verdadera', 'Nunca es falsa'],
    0,
    'Basta con que una sea verdadera. Es el «o» inclusivo: si las dos son verdaderas, también es verdadera.',
  ),
  P.opcion(
    '¿Cuántos renglones tiene la tabla de verdad de una fórmula con 3 letras distintas?',
    ['3', '6', '8', '9'],
    2,
    '2³ = 8. Es el ejemplo de clase. Cada letra que se agrega duplica la tabla.',
  ),
  P.opcion(
    '¿Cuántos renglones tiene la tabla de ((p ∨ q) ∧ ¬r) → s?',
    ['4', '8', '12', '16'],
    3,
    'Cuatro letras distintas: 2⁴ = 16. La negación no agrega letras.',
  ),
  P.opcion(
    '¿Cuántos renglones tiene la tabla de (p → q) ∧ (q → p) ∧ ¬p?',
    ['4', '6', '8', '16'],
    0,
    'Aunque p aparece tres veces, solo hay **dos letras distintas**: p y q. 2² = 4.',
  ),
  P.vf(
    'En una tabla de verdad, la última letra alterna de uno en uno: V, F, V, F…',
    true,
    'Y la primera va en bloques de la mitad de la tabla. Si la última columna de letras no alterna así, se perdió un renglón.',
  ),
  P.opcion(
    '¿Cuál es la primera ley de De Morgan?',
    ['¬(p ∧ q) ≡ ¬p ∨ ¬q', '¬(p ∧ q) ≡ ¬p ∧ ¬q', '¬(p ∨ q) ≡ ¬p ∨ ¬q', '¬(p → q) ≡ ¬p → ¬q'],
    0,
    'La negación entra al paréntesis y **el conector se voltea**: ∧ se vuelve ∨.',
  ),
  P.vf(
    '¬(p ∧ q) es equivalente a ¬p ∧ ¬q.',
    false,
    'Es la confusión más común. Al meter la negación el conector se voltea: ¬(p ∧ q) ≡ ¬p **∨** ¬q. «No es cierto que esté actualizado y protegido» significa que le falta **al menos una** de las dos, no las dos.',
  ),
  P.opcion(
    '¿Cuál es la contrapositiva de p → q?',
    ['¬q → ¬p', 'q → p', '¬p → ¬q', 'p → ¬q'],
    0,
    'La contrapositiva es equivalente a la original. Ojo: q → p (la recíproca) y ¬p → ¬q (la inversa) **no** son equivalentes.',
  ),
  P.opcion(
    'Según el profesor, ¿qué tiene que ver la lógica proposicional con la IA?',
    [
      'Sirve para tomar decisiones: la IA da una inferencia y nosotros ponemos la regla',
      'Es la forma en que se entrenan las redes neuronales',
      'Sirve para generar imágenes',
      'No tiene relación con la IA',
    ],
    0,
    '«La IA no decide, nos va a dar una inferencia; a partir de esa inferencia nosotros ponemos una regla.» Ejemplo: el modelo infiere que el motor está en falla, y la regla decide apagarlo.',
  ),
  P.opcion(
    'Una fórmula cuya columna final es verdadera en todos los renglones es una…',
    ['Tautología', 'Contradicción', 'Contingencia', 'Implicación'],
    0,
    'Siempre verdadera = tautología. Siempre falsa = contradicción. De las dos = contingencia.',
  ),
  P.vf(
    'Si una regla de decisión resulta ser una tautología, la regla no está decidiendo nada.',
    true,
    'Una tautología es verdadera siempre, así que la regla se dispararía en todos los casos. Las reglas útiles son contingentes.',
  ),

  // ---------------------------------------------------------------
  // Simbolizar. Se revisan por equivalencia: una forma distinta pero
  // equivalente también cuenta como correcta.
  // ---------------------------------------------------------------
  P.simbolizar(
    'Si el motor está encendido y está caliente, entonces está fallando.',
    [['p', 'el motor está encendido'], ['q', 'el motor está caliente'], ['r', 'el motor está fallando']],
    '(p ∧ q) → r',
    '«y» une las dos primeras; «si… entonces» une ese bloque con la tercera.',
  ),
  P.simbolizar(
    'El usuario tiene contraseña pero no tiene segundo factor.',
    [['p', 'el usuario tiene contraseña'], ['q', 'el usuario tiene segundo factor']],
    'p ∧ ¬q',
    '«pero» funciona igual que «y».',
  ),
  P.simbolizar(
    'Si el respaldo no se probó, entonces no se puede confiar en él.',
    [['p', 'el respaldo se probó'], ['q', 'se puede confiar en el respaldo']],
    '¬p → ¬q',
    'Las dos vienen negadas en la frase, pero las proposiciones están en positivo: las dos llevan ¬.',
  ),
  P.simbolizar(
    'El servidor responde si y solo si la red está disponible.',
    [['p', 'el servidor responde'], ['q', 'la red está disponible']],
    'p ↔ q',
    '«si y solo si» es el bicondicional, no la implicación.',
  ),
  P.simbolizar(
    'No es cierto que el sistema esté actualizado y protegido.',
    [['p', 'el sistema está actualizado'], ['q', 'el sistema está protegido']],
    '¬(p ∧ q)',
    '«No es cierto que…» niega todo lo que sigue: la negación va afuera del paréntesis.',
  ),
  P.simbolizar(
    'Ni el sensor detecta humo ni la temperatura sube.',
    [['p', 'el sensor detecta humo'], ['q', 'la temperatura sube']],
    '¬p ∧ ¬q',
    '«Ni… ni…» niega las dos por separado. Por De Morgan, ¬(p ∨ q) también es correcta.',
  ),
  P.simbolizar(
    'Si existe humo o existe fuego, y el sistema contra incendios no está disponible, entonces se activa la alarma general.',
    [['p', 'existe humo'], ['q', 'existe fuego'], ['r', 'el sistema contra incendios está disponible'], ['s', 'se activa la alarma general']],
    '((p ∨ q) ∧ ¬r) → s',
    'Tres agrupaciones: primero la «o», luego la «y» con la negación, y al final la implicación.',
  ),
  P.simbolizar(
    'Si el candidato tiene experiencia o tiene certificación, y además pasa la entrevista, entonces se le contrata.',
    [['p', 'el candidato tiene experiencia'], ['q', 'el candidato tiene certificación'], ['r', 'el candidato pasa la entrevista'], ['s', 'se contrata al candidato']],
    '((p ∨ q) ∧ r) → s',
    '«además» es otra forma de decir «y». La «o» va agrupada porque es una alternativa entre dos requisitos.',
  ),
  P.simbolizar(
    'El usuario está autenticado y, o bien es administrador, o bien tiene permiso explícito.',
    [['p', 'el usuario está autenticado'], ['q', 'el usuario es administrador'], ['r', 'el usuario tiene permiso explícito']],
    'p ∧ (q ∨ r)',
    'La autenticación es obligatoria siempre; lo que está a elección es lo otro. (p ∧ q) ∨ r **no** es lo mismo: pruébalo en el constructor.',
  ),
  P.simbolizar(
    'Si no hay respaldo y el disco falla, entonces se pierde la información.',
    [['p', 'hay respaldo'], ['q', 'el disco falla'], ['r', 'se pierde la información']],
    '(¬p ∧ q) → r',
  ),
  P.simbolizar(
    'El pedido está pagado y hay inventario, o el cliente tiene crédito aprobado y no debe facturas vencidas.',
    [['p', 'el pedido está pagado'], ['q', 'hay inventario'], ['r', 'el cliente tiene crédito aprobado'], ['s', 'el cliente debe facturas vencidas']],
    '(p ∧ q) ∨ (r ∧ ¬s)',
    'Son dos caminos alternativos, cada uno con dos condiciones.',
  ),
  P.simbolizar(
    'Si la cámara detecta a una persona y es de noche, entonces se enciende la luz.',
    [['p', 'la cámara detecta a una persona'], ['q', 'es de noche'], ['r', 'se enciende la luz']],
    '(p ∧ q) → r',
  ),
  P.simbolizar(
    'Si la batería está baja o se pierde la señal, entonces el dron regresa a la base.',
    [['p', 'la batería está baja'], ['q', 'se pierde la señal'], ['r', 'el dron regresa a la base']],
    '(p ∨ q) → r',
  ),
  P.simbolizar(
    'El modelo se reentrena si y solo si llegan datos nuevos.',
    [['p', 'el modelo se reentrena'], ['q', 'llegan datos nuevos']],
    'p ↔ q',
  ),
  P.simbolizar(
    'Si el sensor no detecta movimiento, entonces la luz se apaga.',
    [['p', 'el sensor detecta movimiento'], ['q', 'la luz se apaga']],
    '¬p → q',
    'La proposición está en positivo («detecta movimiento»); el «no» de la frase va en la fórmula.',
  ),
  P.simbolizar(
    'Si el modelo no tiene sesgo y es explicable, entonces es confiable.',
    [['p', 'el modelo tiene sesgo'], ['q', 'el modelo es explicable'], ['r', 'el modelo es confiable']],
    '(¬p ∧ q) → r',
    'Fíjate en p: está escrita en positivo («tiene sesgo»), así que «no tiene sesgo» es ¬p.',
  ),
  P.simbolizar(
    'Si hay tres intentos fallidos y no se verificó la identidad, entonces se bloquea la cuenta.',
    [['p', 'hay tres intentos fallidos'], ['q', 'se verificó la identidad'], ['r', 'se bloquea la cuenta']],
    '(p ∧ ¬q) → r',
  ),
  P.simbolizar(
    'Si llueve, entonces no se riega el jardín.',
    [['p', 'llueve'], ['q', 'se riega el jardín']],
    'p → ¬q',
  ),
  P.simbolizar(
    'El sistema funciona solo si hay energía.',
    [['p', 'el sistema funciona'], ['q', 'hay energía']],
    'p → q',
    'Trampa clásica: «A solo si B» se escribe A → B. Si el sistema funciona, es porque hay energía; pero que haya energía no garantiza que funcione.',
  ),
  P.simbolizar(
    'La alarma suena si y solo si se detecta movimiento y el sistema está armado.',
    [['p', 'la alarma suena'], ['q', 'se detecta movimiento'], ['r', 'el sistema está armado']],
    'p ↔ (q ∧ r)',
  ),

  // ---------------------------------------------------------------
  // Llenar la tabla. La respuesta la calcula el motor.
  // ---------------------------------------------------------------
  P.tabla('p → q', 'La implicación sola. Es la que más se confunde.'),
  P.tabla('p ∧ ¬q'),
  P.tabla('¬(p ∨ q)'),
  P.tabla('¬p ∨ q', 'Compara tu columna con la de p → q.'),
  P.tabla('p ↔ ¬q'),
  P.tabla('(p ∧ q) → r', 'El ejemplo del motor.'),
  P.tabla('p ∨ (q ∧ r)'),
  P.tabla('(p ∨ q) ∧ ¬r'),
  P.tabla('(p ∧ ¬q) → r'),
  P.tabla('¬(p ∧ q) ∨ r'),
  P.tabla('(p → q) → r'),
  P.tabla('(p → q) ∧ (q → p)', 'Compara tu columna con la de p ↔ q.'),

  // ---------------------------------------------------------------
  // Tautología, contradicción o contingencia. Calculado por el motor.
  // ---------------------------------------------------------------
  P.clasificar('p ∨ ¬p'),
  P.clasificar('p ∧ ¬p'),
  P.clasificar('p → q'),
  P.clasificar('(p ∧ q) → p', 'Si las dos son ciertas, ¿la primera es cierta?'),
  P.clasificar('p → (p ∨ q)'),
  P.clasificar('((p → q) ∧ p) → q', 'Esta es la regla del modus ponens escrita como fórmula.'),
  P.clasificar('((p → q) ∧ q) → p', 'Parece la anterior, pero no lo es.'),
  P.clasificar('(p → q) ↔ (¬q → ¬p)', 'Una implicación y su contrapositiva.'),
  P.clasificar('¬(p ∨ q) ↔ (¬p ∧ ¬q)', 'La segunda ley de De Morgan.'),
  P.clasificar('(p ∧ ¬q) ∧ (p → q)'),
  P.clasificar('p ↔ ¬p'),
  P.clasificar('(p → q) ∨ (q → p)'),
  P.clasificar('(p ∧ q) ∨ r'),
  P.clasificar('¬(p → q) ↔ (p ∧ ¬q)', '¿Cuándo es falsa una implicación?'),
  P.clasificar('(p ∨ q) ∧ (¬p ∧ ¬q)'),

  // ---------------------------------------------------------------
  // Sacar conclusiones. La opción correcta la calcula el motor: es la
  // única que se sigue de las premisas.
  // ---------------------------------------------------------------
  P.conclusion(
    '«Si llueve, el piso se moja. Llueve.» ¿Qué se concluye?',
    [['p', 'llueve'], ['q', 'el piso se moja']],
    ['p → q', 'p'],
    [['El piso se moja', 'q'], ['El piso no se moja', '¬q'], ['No llueve', '¬p'], ['Ninguna de las anteriores se sigue', null]],
    '**Modus ponens**: si tienes p → q y además p, concluyes q.',
  ),
  P.conclusion(
    '«Si el sensor detecta humo, suena la alarma. La alarma no sonó.» ¿Qué se concluye?',
    [['p', 'el sensor detecta humo'], ['q', 'suena la alarma']],
    ['p → q', '¬q'],
    [['El sensor no detectó humo', '¬p'], ['El sensor detectó humo', 'p'], ['La alarma sonó', 'q'], ['Ninguna de las anteriores se sigue', null]],
    '**Modus tollens**: si p → q y q es falsa, entonces p tiene que ser falsa. Si hubiera detectado humo, la alarma habría sonado.',
  ),
  P.conclusion(
    '«Si estudio, apruebo. Si apruebo, me gradúo.» ¿Qué se concluye?',
    [['p', 'estudio'], ['q', 'apruebo'], ['r', 'me gradúo']],
    ['p → q', 'q → r'],
    [['Si estudio, me gradúo', 'p → r'], ['Si me gradúo, es que estudié', 'r → p'], ['Estudio', 'p'], ['Ninguna de las anteriores se sigue', null]],
    '**Silogismo hipotético**: las implicaciones se encadenan. Ojo: no se concluye que estudies, solo que *si* estudias, te gradúas.',
  ),
  P.conclusion(
    '«El servidor falla o la red falla. El servidor no falla.» ¿Qué se concluye?',
    [['p', 'el servidor falla'], ['q', 'la red falla']],
    ['p ∨ q', '¬p'],
    [['La red falla', 'q'], ['La red no falla', '¬q'], ['El servidor falla', 'p'], ['Ninguna de las anteriores se sigue', null]],
    '**Silogismo disyuntivo**: si una de las dos tiene que ser cierta y una no lo es, es la otra.',
  ),
  P.conclusion(
    '«Si alguien es administrador, puede borrar archivos. Juan no es administrador.» ¿Qué se concluye?',
    [['p', 'Juan es administrador'], ['q', 'Juan puede borrar archivos']],
    ['p → q', '¬p'],
    [['Juan no puede borrar archivos', '¬q'], ['Juan puede borrar archivos', 'q'], ['Juan es administrador', 'p'], ['Ninguna de las anteriores se sigue', null]],
    'Trampa: **negar el antecedente**. La regla dice qué pasa con los administradores, no con los demás. Juan podría tener otro permiso.',
  ),
  P.conclusion(
    '«Si el modelo está sobreajustado, falla con datos nuevos. El modelo falla con datos nuevos.» ¿Qué se concluye?',
    [['p', 'el modelo está sobreajustado'], ['q', 'el modelo falla con datos nuevos']],
    ['p → q', 'q'],
    [['El modelo está sobreajustado', 'p'], ['El modelo no está sobreajustado', '¬p'], ['El modelo no falla con datos nuevos', '¬q'], ['Ninguna de las anteriores se sigue', null]],
    'Trampa: **afirmar el consecuente**. Puede fallar por muchas otras razones, como datos mal capturados.',
  ),
  P.conclusion(
    '«Si el motor está encendido y está caliente, está fallando. El motor no está fallando. El motor está encendido.» ¿Qué se concluye?',
    [['p', 'el motor está encendido'], ['q', 'el motor está caliente'], ['r', 'el motor está fallando']],
    ['(p ∧ q) → r', '¬r', 'p'],
    [['El motor no está caliente', '¬q'], ['El motor está caliente', 'q'], ['El motor está apagado', '¬p'], ['Ninguna de las anteriores se sigue', null]],
    'Como no está fallando, no puede ser que esté encendido **y** caliente. Y como sí está encendido, lo que falla es que esté caliente.',
  ),
  P.conclusion(
    '«No es cierto que el sistema esté actualizado y protegido. El sistema está actualizado.» ¿Qué se concluye?',
    [['p', 'el sistema está actualizado'], ['q', 'el sistema está protegido']],
    ['¬(p ∧ q)', 'p'],
    [['El sistema no está protegido', '¬q'], ['El sistema está protegido', 'q'], ['El sistema no está actualizado', '¬p'], ['Ninguna de las anteriores se sigue', null]],
    'Por De Morgan, le falta al menos una de las dos. Como sí está actualizado, le falta la protección.',
  ),
  P.conclusion(
    '«Si hay humo o hay fuego, se activa la alarma. La alarma no se activó.» ¿Qué se concluye?',
    [['p', 'hay humo'], ['q', 'hay fuego'], ['r', 'se activa la alarma']],
    ['(p ∨ q) → r', '¬r'],
    [['No hay humo y no hay fuego', '¬p ∧ ¬q'], ['Hay humo', 'p'], ['Hay fuego pero no hay humo', 'q ∧ ¬p'], ['Ninguna de las anteriores se sigue', null]],
    'Modus tollens más De Morgan: ¬(p ∨ q) ≡ ¬p ∧ ¬q. Si cualquiera de los dos hubiera ocurrido, la alarma se habría activado.',
  ),
  P.conclusion(
    '«Si la cámara detecta a una persona, se graba. Si se graba, se avisa al guardia. La cámara detectó a una persona.» ¿Qué se concluye?',
    [['p', 'la cámara detecta a una persona'], ['q', 'se graba'], ['r', 'se avisa al guardia']],
    ['p → q', 'q → r', 'p'],
    [['Se avisa al guardia', 'r'], ['No se avisa al guardia', '¬r'], ['No se grabó', '¬q'], ['Ninguna de las anteriores se sigue', null]],
    'Modus ponens dos veces seguidas: de p sale q, y de q sale r.',
  ),
  P.conclusion(
    '«Si el usuario tiene contraseña y segundo factor, entra al sistema. El usuario no entró.» ¿Qué se concluye?',
    [['p', 'el usuario tiene contraseña'], ['q', 'el usuario tiene segundo factor'], ['r', 'el usuario entra al sistema']],
    ['(p ∧ q) → r', '¬r'],
    [['No tiene contraseña o no tiene segundo factor', '¬p ∨ ¬q'], ['No tiene contraseña ni segundo factor', '¬p ∧ ¬q'], ['No tiene contraseña', '¬p'], ['Ninguna de las anteriores se sigue', null]],
    'Modus tollens da ¬(p ∧ q), y De Morgan lo convierte en ¬p ∨ ¬q: le falta **al menos una**. Decir que le faltan las dos es ir más lejos de lo que permiten las premisas.',
  ),
  P.conclusion(
    '«Llueve o hace sol. Si llueve, llevo paraguas. No llevo paraguas.» ¿Qué se concluye?',
    [['p', 'llueve'], ['q', 'hace sol'], ['r', 'llevo paraguas']],
    ['p ∨ q', 'p → r', '¬r'],
    [['Hace sol', 'q'], ['Llueve', 'p'], ['Llevo paraguas', 'r'], ['Ninguna de las anteriores se sigue', null]],
    'Dos pasos: por modus tollens no llueve; por silogismo disyuntivo, entonces hace sol.',
  ),

  // ---------------------------------------------------------------
  // Casos tipo examen: un enunciado con cuatro incisos
  // ---------------------------------------------------------------
  P.caso(
    'Sistema de riego',
    'Un invernadero tiene la siguiente regla: «El sistema de riego se activa si el suelo está seco y no está lloviendo».',
    [
      I.simbolizar('Simboliza la regla.', [['p', 'el suelo está seco'], ['q', 'está lloviendo'], ['r', 'se activa el riego']], '(p ∧ ¬q) → r',
        '«A si B» se escribe B → A. Y «no está lloviendo» va como ¬q.'),
      I.opcion('¿Cuántos renglones tiene su tabla de verdad?', ['4', '6', '8', '16'], 2, 'Tres letras distintas: 2³ = 8.'),
      I.tabla('(p ∧ ¬q) → r', 'Completa la columna final.'),
      I.clasificar('(p ∧ ¬q) → r', '¿La regla es tautología, contradicción o contingencia?'),
    ],
  ),
  P.caso(
    'Alarma de seguridad',
    'Regla del sistema: «Si se detecta movimiento y el sistema está armado, suena la alarma». Una noche, la alarma no sonó y el sistema sí estaba armado.',
    [
      I.simbolizar('Simboliza la regla.', [['p', 'se detecta movimiento'], ['q', 'el sistema está armado'], ['r', 'suena la alarma']], '(p ∧ q) → r'),
      I.tabla('(p ∧ q) → r', 'Completa la columna final de la regla.'),
      I.conclusion(
        'Con la regla, sabiendo que la alarma no sonó y que el sistema estaba armado, ¿qué se concluye?',
        [['p', 'se detecta movimiento'], ['q', 'el sistema está armado'], ['r', 'suena la alarma']],
        ['(p ∧ q) → r', '¬r', 'q'],
        [['No se detectó movimiento', '¬p'], ['Se detectó movimiento', 'p'], ['El sistema no estaba armado', '¬q'], ['Ninguna de las anteriores se sigue', null]],
        'Si hubiera habido movimiento, con el sistema armado, la alarma habría sonado.',
      ),
      I.clasificar('(p ∧ q) → r', 'Clasifica la regla.'),
    ],
  ),
  P.caso(
    'Regreso automático del dron',
    'Un dron de reparto tiene esta regla: «Si la batería está baja o se pierde la señal, el dron regresa a la base».',
    [
      I.simbolizar('Simboliza la regla.', [['p', 'la batería está baja'], ['q', 'se pierde la señal'], ['r', 'el dron regresa a la base']], '(p ∨ q) → r'),
      I.opcion('¿En cuántos renglones de la tabla la regla resulta falsa?', ['0', '1', '3', '4'], 2,
        'Es falsa cuando la condición (p ∨ q) es verdadera y r es falsa. p ∨ q es verdadera en 3 de los 4 casos de p y q, y en cada uno r puede ser F: 3 renglones.'),
      I.tabla('(p ∨ q) → r', 'Completa la columna final.'),
      I.clasificar('(p ∨ q) → r'),
    ],
  ),
  P.caso(
    'Acceso con doble verificación',
    'Política de una empresa: «Un usuario entra al sistema si tiene contraseña y código de verificación». Ayer, un usuario intentó entrar y no pudo.',
    [
      I.simbolizar('Simboliza la política.', [['p', 'tiene contraseña'], ['q', 'tiene código de verificación'], ['r', 'entra al sistema']], '(p ∧ q) → r'),
      I.conclusion(
        'Sabiendo que el usuario no entró, ¿qué se concluye?',
        [['p', 'tiene contraseña'], ['q', 'tiene código de verificación'], ['r', 'entra al sistema']],
        ['(p ∧ q) → r', '¬r'],
        [['Le faltó la contraseña o le faltó el código', '¬p ∨ ¬q'], ['Le faltaron la contraseña y el código', '¬p ∧ ¬q'], ['Le faltó el código', '¬q'], ['Ninguna de las anteriores se sigue', null]],
        'Le falta **al menos una** de las dos condiciones. Por De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q.',
      ),
      I.opcion('¿Qué ley se usa para pasar de ¬(p ∧ q) a ¬p ∨ ¬q?', ['De Morgan', 'Contrapositiva', 'Doble negación', 'Modus ponens'], 0,
        'La negación entra al paréntesis y el conector se voltea.'),
      I.tabla('¬(p ∧ q)', 'Completa la tabla de ¬(p ∧ q).'),
    ],
  ),
  P.caso(
    'Las dos tablas: implicación y contrapositiva',
    'Se quiere demostrar con tablas de verdad que «si el sensor detecta humo, suena la alarma» dice lo mismo que «si la alarma no suena, el sensor no detectó humo». p: el sensor detecta humo; q: suena la alarma.',
    [
      I.tabla('p → q', 'Primera tabla: p → q.'),
      I.tabla('¬q → ¬p', 'Segunda tabla: ¬q → ¬p.'),
      I.vf('Las dos tablas tienen exactamente la misma columna final.', true,
        'Por eso son equivalentes: la contrapositiva dice lo mismo que la implicación original.'),
      I.clasificar('(p → q) ↔ (¬q → ¬p)', 'Si unes las dos con ↔, ¿qué resulta?'),
    ],
  ),
  P.caso(
    'Las dos tablas: De Morgan',
    'Se quiere comprobar que «no es cierto que el sistema esté actualizado y protegido» equivale a «el sistema no está actualizado o no está protegido». p: está actualizado; q: está protegido.',
    [
      I.tabla('¬(p ∧ q)', 'Primera tabla: ¬(p ∧ q).'),
      I.tabla('¬p ∨ ¬q', 'Segunda tabla: ¬p ∨ ¬q.'),
      I.vf('¬(p ∧ q) también sería equivalente a ¬p ∧ ¬q.', false,
        '¬p ∧ ¬q es verdadera en un solo renglón; ¬(p ∧ q) en tres. No coinciden.'),
      I.clasificar('¬(p ∧ q) ↔ (¬p ∨ ¬q)', 'Clasifica la equivalencia completa.'),
    ],
  ),
  P.caso(
    'Diagnóstico del motor',
    'Regla de mantenimiento: «Si el motor está encendido y está caliente, entonces está fallando». El técnico revisa: el motor no está fallando, pero sí está encendido.',
    [
      I.simbolizar('Simboliza la regla.', [['p', 'el motor está encendido'], ['q', 'el motor está caliente'], ['r', 'el motor está fallando']], '(p ∧ q) → r'),
      I.opcion('¿Cuántas proposiciones tiene la regla?', ['2', '3', '4', '5'], 1, 'Encendido, caliente y fallando.'),
      I.conclusion(
        '¿Qué concluye el técnico?',
        [['p', 'el motor está encendido'], ['q', 'el motor está caliente'], ['r', 'el motor está fallando']],
        ['(p ∧ q) → r', '¬r', 'p'],
        [['El motor no está caliente', '¬q'], ['El motor está caliente', 'q'], ['El motor está apagado', '¬p'], ['Ninguna de las anteriores se sigue', null]],
        'No puede estar encendido **y** caliente, porque estaría fallando. Como sí está encendido, no está caliente.',
      ),
      I.clasificar('(p ∧ q) → r', 'Clasifica la regla.'),
    ],
  ),
  P.caso(
    'Tres reglas candidatas',
    'Un equipo propone tres reglas para encender la ventilación de un servidor, donde p es «la temperatura es alta». Regla A: p ∨ ¬p. Regla B: p ∧ ¬p. Regla C: p.',
    [
      I.clasificar('p ∨ ¬p', 'Clasifica la regla A.'),
      I.clasificar('p ∧ ¬p', 'Clasifica la regla B.'),
      I.opcion('¿Qué haría la regla A en la práctica?', [
        'Encender la ventilación siempre, haga calor o no',
        'No encender nunca la ventilación',
        'Encenderla solo cuando hace calor',
        'Encenderla al azar',
      ], 0, 'Una tautología es verdadera en todos los casos: la regla se dispara siempre y no está decidiendo nada.'),
      I.opcion('¿Cuál de las tres es la única que sirve como regla de decisión?', ['A', 'B', 'C'], 2,
        'Solo C es contingente: depende de la temperatura. A se dispara siempre y B nunca.'),
    ],
  ),
];
