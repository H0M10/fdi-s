import { de, preguntasDe, RIESGOS } from '../fabrica';

const P = preguntasDe('etica');
const PRINCIPIOS = ['Finalidad', 'Proporcionalidad o minimización', 'Información', 'Seguridad', 'Derechos ARCO'];
const ARCO = ['Acceso', 'Rectificación', 'Cancelación', 'Oposición'];

export const PREGUNTAS_ETICA = [
  // ---------------------------------------------------------------
  // La secuencia y el caso de clase
  // ---------------------------------------------------------------
  P.opcion(
    '¿Cuál es la secuencia que se usó en clase para analizar éticamente un sistema de IA?',
    [
      'Datos → Modelo → Decisión → Consecuencias',
      'Modelo → Datos → Consecuencias → Decisión',
      'Decisión → Datos → Modelo → Consecuencias',
      'Datos → Decisión → Modelo → Consecuencias',
    ],
    0,
    'Todo empieza en los datos y termina en lo que le pasa a una persona. Un error en cualquier eslabón se arrastra hasta la consecuencia.',
  ),
  P.vf(
    'Según el profesor, que un sistema funcione no significa que sea un sistema a usar.',
    true,
    'Es la frase central del tema. El sistema de cámaras de la universidad puede funcionar técnicamente y aun así no deber usarse.',
  ),
  P.opcion(
    'El sistema de reconocimiento facial de la universidad tiene 99 % de efectividad y registra 10,000 asistencias al día. ¿Cuántos errores comete diariamente?',
    ['1', '10', '100', '1,000'],
    2,
    'El 1 % de 10,000 es 100. Un porcentaje que suena altísimo sigue produciendo cien alumnos mal registrados cada día.',
  ),
  P.opcion(
    'En el caso de las cámaras, el sistema bloquea la inscripción de forma automática y el alumno no tiene a quién reclamar. ¿Cómo se llamó ese problema en clase?',
    ['Sistema cerrado', 'Sobreajuste', 'Caja negra', 'Fuerza bruta'],
    0,
    'Un **sistema cerrado** no tiene proceso de apelación. Aunque el error sea de la máquina, nadie puede corregirlo.',
  ),

  // ---------------------------------------------------------------
  // Los 8 riesgos: reconocerlos en un escenario
  // ---------------------------------------------------------------
  P.opcion(
    'Para el sistema de asistencia, el desarrollador pide a servicios escolares la edad y el domicilio de cada alumno, aunque solo necesita foto, nombre, matrícula y horario. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Privacidad', 'Seguridad', 'Uso indebido', 'Error'], 'Privacidad'),
    'Es el ejemplo del profesor: **tener datos disponibles no significa que sean datos necesarios**.',
  ),
  P.opcion(
    'Una empresa entrena una IA de reclutamiento con 20 años de contrataciones. Como antes había pocas mujeres en la industria, el modelo descarta a las candidatas. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Error', 'Sesgo y discriminación', 'Opacidad y explicabilidad', 'Privacidad'], 'Sesgo y discriminación'),
    'También es ejemplo de clase. **Los datos históricos no siempre son la verdad objetiva**: reflejan condiciones que ya cambiaron.',
  ),
  P.opcion(
    'Un modelo que detecta tumores en radiografías acierta el 95 % de las veces. ¿Qué riesgo representa el 5 % restante?',
    ...de(RIESGOS, ['Error', 'Sesgo y discriminación', 'Seguridad', 'Uso indebido'], 'Error'),
    'Los modelos funcionan por patrones, no por verdades absolutas, y **nunca son 100 % efectivos**. El riesgo es aproximadamente la probabilidad de que ocurra por sus consecuencias.',
  ),
  P.opcion(
    'Un banco rechaza tu solicitud de crédito por decisión de un modelo, y nadie en el banco puede decirte qué variable pesó para rechazarte. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Opacidad y explicabilidad', 'Privacidad', 'Error', 'Dependencia y pérdida de juicio'], 'Opacidad y explicabilidad'),
    'Si no se puede recorrer el camino de vuelta desde la decisión hasta los datos y variables que la produjeron, hay **opacidad**.',
  ),
  P.opcion(
    'El encargado del modelo se lleva a casa el archivo con los datos de los alumnos en una memoria USB y lo comparte por correo con un amigo para que le ayude. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Seguridad', 'Uso indebido', 'Privacidad', 'Sesgo y discriminación'], 'Seguridad'),
    'Los datos no pueden quedar al alcance de cualquiera. Prestar la laptop, mandarlos por correo o subirlos a una app de IA son los ejemplos del profesor.',
  ),
  P.opcion(
    'Después de un error del sistema, nadie sabe quién tomó los datos, quién hizo el modelo ni quién aprobó la decisión. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Responsabilidad y gobernanza', 'Error', 'Opacidad y explicabilidad', 'Seguridad'], 'Responsabilidad y gobernanza'),
    'La gobernanza exige **un responsable de cada eslabón**: de los datos, del modelo, de la decisión y de las consecuencias.',
  ),
  P.opcion(
    'Al desarrollador le dieron los datos de los alumnos para la asistencia. Un amigo le pide que revise quiénes son foráneos para ofrecerles un cuarto en renta. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Uso indebido', 'Privacidad', 'Seguridad', 'Responsabilidad y gobernanza'], 'Uso indebido'),
    'Es el ejemplo de clase: usar los datos para algo distinto de lo que se autorizó. Además viola el principio legal de **finalidad**.',
  ),
  P.opcion(
    'La universidad empieza con IA para la asistencia, luego agrega otra para los exámenes, otra para recomendar deportes y otra para decidir becas. ¿Qué riesgo es?',
    ...de(RIESGOS, ['Dependencia y pérdida de juicio', 'Uso indebido', 'Error', 'Privacidad'], 'Dependencia y pérdida de juicio'),
    'Delegar cada vez más decisiones hasta que las personas dejan de usar su propio criterio.',
  ),
  P.opcion(
    'Según lo visto en clase, ¿a qué es aproximadamente igual un riesgo?',
    [
      'Probabilidad de que ocurra × consecuencias',
      'Cantidad de datos ÷ tamaño del modelo',
      'Efectividad del modelo × 100',
      'Número de usuarios afectados + costo del sistema',
    ],
    0,
    'Un error poco probable pero con consecuencias graves puede ser más riesgoso que uno frecuente pero inofensivo.',
  ),
  P.multi(
    'En el caso de las cámaras de la universidad, selecciona **todos** los problemas que se identificaron en clase.',
    ['Fallo en el reconocimiento', 'Fallas técnicas', 'Sistema cerrado, sin apelación', '99 % de efectividad no es 100 %', 'El sistema es demasiado barato', 'Las cámaras graban en blanco y negro'],
    [0, 1, 2, 3],
    'Los cuatro de clase: que no reconozca al alumno, que el equipo falle, que no haya forma de apelar y que aun con 99 % siga habiendo errores.',
  ),

  // ---------------------------------------------------------------
  // PRDM
  // ---------------------------------------------------------------
  P.opcion(
    '¿Qué significan las letras del método PRDM?',
    [
      'Personas, Riesgos, Daño, Mitigación',
      'Privacidad, Responsabilidad, Datos, Modelo',
      'Problema, Requisitos, Diseño, Monitoreo',
      'Personas, Reglas, Decisión, Modelo',
    ],
    0,
    'Es el método que el profesor dijo que hay que usar **como desarrolladores** para analizar cualquier caso.',
  ),
  P.opcion(
    'En el método PRDM, ¿qué letra responde a la pregunta «¿cómo reducir el riesgo o el daño?»?',
    ['P', 'R', 'D', 'M'],
    3,
    '**M** de mitigación. P pregunta a quiénes afecta, R qué podría salir mal y D cómo las vamos a afectar.',
  ),
  P.opcion(
    'En el método PRDM, ¿qué letra responde a «¿qué podría salir mal?»?',
    ['P', 'R', 'D', 'M'],
    1,
    '**R** de riesgos.',
  ),
  P.opcion(
    'En el caso de las cámaras, ¿cuál sería una buena **mitigación**?',
    [
      'Que una persona revise el caso antes del bloqueo y que exista un proceso de apelación',
      'Subir la efectividad del modelo a 99.5 %',
      'Instalar más cámaras',
      'Bloquear a los alumnos con 2 faltas en lugar de 3',
    ],
    0,
    'El problema de fondo no es técnico: es que la decisión es automática y no se puede apelar. Ninguna efectividad llega a 100 %, así que siempre debe haber revisión humana.',
  ),

  // ---------------------------------------------------------------
  // Leyes
  // ---------------------------------------------------------------
  P.opcion(
    '¿Qué ley protege los datos personales en manos del sector **privado**?',
    ['LFPDPPP', 'LGPDPPSO', 'Ley ARCO', 'Ley de Transparencia'],
    0,
    'Ley Federal de Protección de Datos Personales en Posesión de los **Particulares**. Particulares = privados.',
  ),
  P.opcion(
    '¿Qué ley protege los datos personales en manos del sector **público**?',
    ['LFPDPPP', 'LGPDPPSO', 'Ley ARCO', 'Ley Federal del Trabajo'],
    1,
    'Ley General de Protección de Datos Personales en Posesión de **Sujetos Obligados**. Los sujetos obligados son las instituciones públicas.',
  ),
  P.opcion(
    'Una universidad **pública** instala cámaras con reconocimiento facial. ¿Qué ley aplica?',
    ['LFPDPPP', 'LGPDPPSO'],
    1,
    'Es una institución pública, o sea un sujeto obligado. Si fuera una universidad privada, aplicaría la LFPDPPP.',
  ),
  P.opcion(
    'Una tienda departamental **privada** usa los datos de sus clientes para un sistema de recomendaciones. ¿Qué ley aplica?',
    ['LFPDPPP', 'LGPDPPSO'],
    0,
    'Es una empresa particular: aplica la ley de los particulares.',
  ),
  P.opcion(
    'Los datos se entregaron para la asistencia y se usan para otra cosa. ¿Qué principio de la ley se viola?',
    PRINCIPIOS, 0,
    '**Finalidad**: los datos solo se usan para lo que se pidieron. El profesor dijo que la ley lo cataloga como delito.',
  ),
  P.opcion(
    'Para el sistema de asistencia se pide nombre, fotografía y una foto de cuerpo entero. ¿Qué principio se viola?',
    PRINCIPIOS, 1,
    '**Proporcionalidad o minimización**: se debe pedir el mínimo necesario. La foto de cuerpo entero es desproporcionada para registrar asistencia.',
  ),
  P.opcion(
    'Se recolectan los datos sin decirles a los alumnos para qué se van a usar. ¿Qué principio se viola?',
    PRINCIPIOS, 2,
    '**Información**: hay que decir para qué se quieren los datos, mediante el **aviso de privacidad**. No avisar es delito.',
  ),
  P.opcion(
    'Los datos se guardan sin contraseña y alguien los roba. ¿Qué principio se viola?',
    PRINCIPIOS, 3,
    '**Seguridad**. Según lo visto, no protegerlos es delito, y que te los roben también.',
  ),
  P.opcion(
    '¿Qué significan las siglas ARCO?',
    [
      'Acceso, Rectificación, Cancelación, Oposición',
      'Accesibilidad, Revisión, Cancelación, Oposición',
      'Acceso, Registro, Control, Obligación',
      'Aviso, Responsabilidad, Consentimiento, Orden',
    ],
    0,
    'Ojo: en el apunte quedó «accesibilidad» y faltó la R. Es **Acceso** y **Rectificación**.',
  ),
  P.vf(
    'La A de los derechos ARCO significa «Accesibilidad».',
    false,
    'Significa **Acceso**: el derecho a saber qué datos tienen de ti. Así quedó mal en el apunte.',
  ),
  P.opcion(
    'Quiero que la escuela corrija mi fecha de nacimiento, que está mal registrada. ¿Qué derecho ARCO ejerzo?',
    ARCO, 1,
    '**Rectificación**: corregir datos que están mal.',
  ),
  P.opcion(
    'Quiero que una empresa borre todos los datos que tiene de mí. ¿Qué derecho ARCO ejerzo?',
    ARCO, 2,
    '**Cancelación**: que eliminen mis datos.',
  ),
  P.opcion(
    'No quiero que una tienda use mis datos para mandarme publicidad, aunque sigan teniéndolos para la facturación. ¿Qué derecho ARCO ejerzo?',
    ARCO, 3,
    '**Oposición**: negarme a un uso concreto de mis datos sin pedir que los borren.',
  ),
  P.opcion(
    'Quiero saber qué datos personales tiene una aplicación sobre mí. ¿Qué derecho ARCO ejerzo?',
    ARCO, 0,
    '**Acceso**: saber qué datos tienen de mí.',
  ),
  P.vf(
    'Según lo visto en clase, un tratamiento automatizado que evalúa a una persona y le produce una consecuencia importante tiene restricciones.',
    true,
    'Es lo que se dijo al final de la clase, y conecta con el caso de las cámaras: bloquear una inscripción es una consecuencia importante decidida sin intervención humana.',
  ),
];
