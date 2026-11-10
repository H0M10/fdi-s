import { useState } from 'react';
import {
  Correccion,
  Ejemplo,
  Flujo,
  Ojo,
  Profe,
  S,
  Seccion,
  Tabla,
} from '../../../componentes/Leccion';

interface ProblemaDesdeCero {
  id: string;
  titulo: string;
  etiqueta: string;
  enunciado: string;
  inicio: string;
  estados: string;
  acciones: string;
  restricciones: string;
  meta: string;
  solucion: string;
}

const PROBLEMAS_DESDE_CERO: ProblemaDesdeCero[] = [
  {
    id: 'elevador',
    titulo: '1. El Elevador de la Torre (Pizarrón 12/10)',
    etiqueta: 'Visto en clase',
    enunciado:
      'Estás en la Planta Baja (PB) de un edificio de 5 pisos (PB, P1, P2, P3, P4, P5) con un estacionamiento subterráneo (S1). Quieres llegar al Piso 5 (P5) usando el elevador, pero hoy el estacionamiento subterráneo (S1) está inundado y bloqueado.',
    inicio: 'Planta Baja (PB).',
    estados: 'Todos los pisos posibles del elevador: PB, P1, P2, P3, P4, P5 (y S1 como piso bloqueado).',
    acciones: 'Subir 1 piso o Bajar 1 piso.',
    restricciones: 'No se puede bajar al estacionamiento subterráneo (S1) porque está bloqueado, ni pasar del P5.',
    meta: 'Estar en el Piso 5 (P5).',
    solucion: 'PB → P1 → P2 → P3 → P4 → P5 (5 acciones de subir).',
  },
  {
    id: 'parejas',
    titulo: '2. Las Parejas / Esposos Celosos (Cruce del Río)',
    etiqueta: 'Visto en clase',
    enunciado:
      'Dos matrimonios —Pareja 1 (H1, M1) y Pareja 2 (H2, M2)— deben cruzar un río desde la orilla izquierda hasta la derecha. Tienen una balsa donde caben máximo 2 personas. Ninguna mujer puede quedarse en una orilla (ni en la balsa) con otro hombre si no está presente su propio esposo.',
    inicio: '[0, 0, 0, 0, 0] (representando [H1, M1, H2, M2, Balsa] todos en la orilla izquierda = 0).',
    estados: 'Arreglos [H1, M1, H2, M2, Balsa] con valores 0 (izquierda) y 1 (derecha).',
    acciones: 'Cruzar a 1 o 2 personas en la balsa de una orilla a la otra (cambiando su valor y el de la balsa entre 0 y 1).',
    restricciones:
      '1) En la balsa viajan mínimo 1 y máximo 2 personas. 2) Regla de celos: M1 no puede estar con H2 sin H1, y M2 no puede estar con H1 sin H2.',
    meta: '[1, 1, 1, 1, 1] (los 4 y la balsa en la orilla derecha).',
    solucion:
      '1) Cruzan M1 y M2 → [0,1,0,1,1] · 2) Regresa M1 → [0,0,0,1,0] · 3) Cruzan H1 y H2 → [1,0,1,1,1] · 4) Regresa M2 → [1,0,1,0,0] · 5) Cruzan M1 y M2 → [1,1,1,1,1].',
  },
  {
    id: 'jarras-4-3',
    titulo: '3. Jarras de Agua de 4 L y 3 L (sin marcas)',
    etiqueta: 'Visto en clase',
    enunciado:
      'Tienes una jarra de 4 litros y una de 3 litros sin marcas de graduación. Al inicio ambas están vacías y tienes una llave de agua. Necesitas medir exactamente 2 litros dentro de la jarra de 4 litros.',
    inicio: '[0, 0] (0 litros en la jarra de 4 L y 0 litros en la de 3 L).',
    estados: 'Pares [x, y] donde x son los litros en la jarra de 4 L (0 a 4) e y los litros en la de 3 L (0 a 3).',
    acciones:
      '1) Llenar la de 4 L, 2) Llenar la de 3 L, 3) Vaciar la de 4 L, 4) Vaciar la de 3 L, 5) Pasar agua de 4 L a 3 L hasta llenar o vaciar, 6) Pasar agua de 3 L a 4 L hasta llenar o vaciar.',
    restricciones: 'No se puede medir "a ojo" a la mitad ni rebasar la capacidad máxima de 4 L y 3 L.',
    meta: '[2, 0] (tener 2 litros exactos en la jarra de 4 L).',
    solucion:
      '[0,0] → Llenar 3L [0,3] → Pasar a 4L [3,0] → Llenar 3L [3,3] → Pasar a 4L hasta tope [4,2] → Vaciar 4L [0,2] → Pasar los 2L a 4L [2,0].',
  },
  {
    id: 'robot-edificio',
    titulo: '4. Robot Repartidor en Edificio con Sala Cerrada',
    etiqueta: 'Visto en clase',
    enunciado:
      'Un robot inicia en la Entrada de un centro de trabajo y debe entregar un paquete en la Salida. Las áreas son: Entrada, Recepción, Oficina, Cafetería, Laboratorio, Almacén y Salida. Hoy el Laboratorio está cerrado por mantenimiento.',
    inicio: '"Entrada" (el robot se encuentra en la Entrada).',
    estados: 'Cada una de las habitaciones del edificio: Entrada, Recepción, Oficina, Cafetería, Laboratorio, Almacén, Salida.',
    acciones: 'Desplazarse de una habitación a otra que esté conectada directamente por un pasillo o puerta.',
    restricciones: 'No puede entrar ni pasar por el "Laboratorio" porque está en mantenimiento.',
    meta: 'Llegar a la "Salida".',
    solucion: 'Entrada → Recepción → Oficina → Cafetería → Salida (o Entrada → Recepción → Oficina → Almacén → Salida).',
  },
  {
    id: 'granjero',
    titulo: '5. NUEVO: El Granjero, el Lobo, la Cabra y la Col',
    etiqueta: 'Problema nuevo tipo examen',
    enunciado:
      'Un granjero (G) debe cruzar un río en un bote con un lobo (L), una cabra (C) y una col (R). En el bote solo caben el granjero y a lo más 1 elemento. Si el granjero no está presente en esa orilla, el lobo se come a la cabra y la cabra se come la col.',
    inicio: '[0, 0, 0, 0] (representando [Granjero, Lobo, Cabra, Col] en la orilla izquierda = 0).',
    estados: 'Arreglos [G, L, C, R] con valores 0 (izquierda) y 1 (derecha).',
    acciones: 'El granjero cruza el río solo o llevando consigo a 1 elemento (L, C o R) que esté en su misma orilla.',
    restricciones:
      '1) Solo el granjero sabe remar y solo cabe 1 acompañante. 2) Prohibido dejar solos al Lobo con la Cabra sin el granjero, y prohibido dejar solas a la Cabra con la Col sin el granjero.',
    meta: '[1, 1, 1, 1] (todos en la orilla derecha sanos y salvos).',
    solucion:
      '1) Cruza con Cabra [1,0,1,0] → 2) Regresa solo [0,0,1,0] → 3) Cruza con Lobo [1,1,1,0] → 4) Regresa con Cabra [0,1,0,0] → 5) Cruza con Col [1,1,0,1] → 6) Regresa solo [0,1,0,1] → 7) Cruza con Cabra [1,1,1,1].',
  },
  {
    id: 'aspiradora',
    titulo: '6. NUEVO: Robot Aspiradora en 2 Habitaciones (A y B)',
    etiqueta: 'Problema nuevo tipo examen',
    enunciado:
      'Un robot aspiradora inicia en el Cuarto A. La casa tiene 2 cuartos conectados (A y B) y al principio ambos están Sucios. El robot puede aspirar el cuarto donde está o moverse al otro cuarto, y cuenta con batería para máximo 4 acciones.',
    inicio: '["A", "Sucio", "Sucio"] (formato: [Posición_Robot, Estado_A, Estado_B]).',
    estados: 'Las 8 combinaciones posibles de [Posición_Robot (A o B), Estado_A (Sucio/Limpio), Estado_B (Sucio/Limpio)].',
    acciones: '1) Aspirar el cuarto actual, 2) Moverse de A a B, 3) Moverse de B a A.',
    restricciones: 'Solo puede aspirar el cuarto donde está parado y no puede hacer más de 4 acciones por la batería.',
    meta: 'Que ambos cuartos estén limpios: ["A", "Limpio", "Limpio"] o ["B", "Limpio", "Limpio"].',
    solucion:
      '["A", "Sucio", "Sucio"] → 1) Aspirar A ["A", "Limpio", "Sucio"] → 2) Moverse a B ["B", "Limpio", "Sucio"] → 3) Aspirar B ["B", "Limpio", "Limpio"] (logrado en 3 acciones).',
  },
  {
    id: 'puente-linterna',
    titulo: '7. NUEVO: Cruzar el Puente de Noche con 1 Linterna',
    etiqueta: 'Problema nuevo tipo examen',
    enunciado:
      'Tres excursionistas (A tarda 1 min, B tarda 2 min y C tarda 5 min) deben cruzar un puente de noche con 1 sola linterna. El puente aguanta máximo a 2 personas a la vez, que caminan al paso del más lento. Necesitan estar todos del otro lado en máximo 8 minutos.',
    inicio: '[0, 0, 0, 0, 0] (formato: [A, B, C, Linterna, Minutos = 0] en el lado izquierdo).',
    estados: 'Posición de A, B, C y la Linterna (0 o 1) junto con el tiempo acumulado en minutos.',
    acciones: 'Cruzar 1 o 2 personas que estén del lado de la linterna, sumando los minutos del más lento del par.',
    restricciones: '1) Nadie puede cruzar sin la linterna. 2) Máximo 2 personas por cruce. 3) El tiempo total no debe pasar de 8 minutos.',
    meta: '[1, 1, 1, 1, tiempo <= 8] (los 3 y la linterna del otro lado en 8 minutos o menos).',
    solucion:
      '1) Cruzan A y B (2 min) → 2) Regresa A con la linterna (1 min, van 3 min) → 3) Cruzan A y C (5 min, total = 8 min).',
  },
  {
    id: 'jarras-5-2',
    titulo: '8. NUEVO: Jarras de 5 Litros y 2 Litros (medir 1 Litro)',
    etiqueta: 'Problema nuevo tipo examen',
    enunciado:
      'Tienes una jarra de 5 litros y otra de 2 litros, ambas vacías al inicio y sin marcas de graduación. Necesitas dejar exactamente 1 litro en la jarra de 5 litros.',
    inicio: '[0, 0] (ambas jarras vacías).',
    estados: 'Pares [x, y] donde x va de 0 a 5 litros e y va de 0 a 2 litros.',
    acciones: 'Llenar cualquiera de las dos jarras, vaciar cualquiera de las dos, o trasvasar de una a otra hasta tope.',
    restricciones: 'No medir al tanteo ni derramar agua fuera de las capacidades de 5 L y 2 L.',
    meta: '[1, 2] o [1, 0] (tener 1 litro exacto en la jarra de 5 L).',
    solucion:
      '1) Llenar la de 5 L → [5,0] · 2) Pasar de 5 L a 2 L → [3,2] · 3) Vaciar la de 2 L → [3,0] · 4) Pasar de 5 L a 2 L → [1,2] (queda 1 L en la de 5 L).',
  },
];

function TallerProblemasDesdeCero() {
  const [idx, setIdx] = useState(0);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [campos, setCampos] = useState({
    inicio: '',
    estados: '',
    acciones: '',
    restricciones: '',
    meta: '',
    solucion: '',
  });

  const actual = PROBLEMAS_DESDE_CERO[idx];

  const cambiarProblema = (nuevoIdx: number) => {
    setIdx(nuevoIdx);
    setMostrarRespuesta(false);
    setCampos({ inicio: '', estados: '', acciones: '', restricciones: '', meta: '', solucion: '' });
  };

  return (
    <div className="pregunta" style={{ marginTop: 16 }}>
      <div className="pregunta-meta">
        <span className="tipo">Práctica a mano desde cero (como en el examen impreso)</span>
        <span>Problema {idx + 1} de {PROBLEMAS_DESDE_CERO.length}</span>
      </div>

      <div className="filtros" role="group" aria-label="Elegir problema para resolver desde cero" style={{ marginBottom: 14 }}>
        {PROBLEMAS_DESDE_CERO.map((p, i) => (
          <button
            key={p.id}
            className="chip"
            aria-pressed={i === idx}
            onClick={() => cambiarProblema(i)}
          >
            {p.titulo}
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: 18, marginBottom: 6 }}>{actual.titulo}</h3>
      <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--acento)', marginTop: 0 }}>
        {actual.etiqueta}
      </p>
      <div className="escenario">
        <p>{actual.enunciado}</p>
      </div>

      <p style={{ fontSize: 14, color: 'var(--tinta-2)' }}>
        Escribe los 6 elementos como si estuvieras llenando tu hoja de examen y luego presiona{' '}
        <strong>Comparar con respuesta de 10</strong>:
      </p>

      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {(
          [
            ['inicio', '1. Inicio (¿Dónde comienza el problema?)', 'Ej. PB, [0, 0, 0, 0, 0], [0, 0]...'],
            ['estados', '2. Estados (¿Qué situaciones son posibles y cómo las representas?)', 'Ej. Arreglos [x, y], todos los pisos...'],
            ['acciones', '3. Acciones (¿Qué puedo hacer para cambiar de estado?)', 'Ej. Subir/bajar, llenar/vaciar/trasvasar...'],
            ['restricciones', '4. Restricciones (¿Qué está prohibido o bloqueado?)', 'Ej. No pasar por X, no dejar solos a...'],
            ['meta', '5. Meta (¿Qué quiero alcanzar?)', 'Ej. Llegar a P5, [1, 1, 1, 1, 1], tener 2 L...'],
            ['solucion', '6. Solución paso a paso (¿Cómo vamos a llegar del Inicio a la Meta?)', 'Escribe la secuencia ordenada de pasos...'],
          ] as const
        ).map(([clave, etiqueta, placeholder]) => (
          <div key={clave} style={{ border: '1px solid var(--linea)', borderRadius: 8, padding: 12, background: 'var(--superficie)' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
              {etiqueta}
            </label>
            <textarea
              className="campo"
              rows={clave === 'solucion' ? 3 : 2}
              value={campos[clave]}
              placeholder={placeholder}
              onChange={(e) => setCampos({ ...campos, [clave]: e.target.value })}
            />
            {mostrarRespuesta && (
              <div className="retro bien" style={{ marginTop: 8, marginBottom: 0 }}>
                <span className="veredicto">Respuesta modelo de examen</span>
                <p style={{ margin: 0 }}>{actual[clave]}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fila" style={{ marginTop: 14 }}>
        <button className="boton" onClick={() => setMostrarRespuesta(!mostrarRespuesta)}>
          {mostrarRespuesta ? 'Ocultar respuestas modelo' : 'Comparar con respuesta de 10'}
        </button>
        <button
          className="boton sec"
          onClick={() => cambiarProblema((idx + 1) % PROBLEMAS_DESDE_CERO.length)}
        >
          Siguiente problema →
        </button>
      </div>
    </div>
  );
}

export default function Problemas() {
  return (
    <>
      <Seccion titulo="¿Qué se ve en el Tema 1? (Cero código, 100% plantear y resolver problemas desde cero)">
        <Profe>
          <p>
            <strong>Apunte del 9/10 y 12/10:</strong> En el Tema 1 <strong>todavía no programamos nada</strong> ni
            usamos algoritmos. Lo que evalúa el profesor aquí es que sepas agarrar <strong>cualquier problema desde cero</strong>{' '}
            y desglosarlo en sus partes:
            <br />
            <em>
              «Para un problema de búsqueda tengo que tener 4 cosas: Inicio (¿dónde comienza?), Estados (¿qué
              situaciones son posibles?), Acciones (¿qué puedo hacer?) y Meta (¿qué quiero alcanzar?), además de las
              Restricciones y la Solución.»
            </em>
          </p>
        </Profe>

        <Flujo
          titulo="Los 6 puntos que debes escribir cuando el examen te pide plantear un problema desde cero"
          pasos={[
            '1. Inicio (¿Dónde empieza?)',
            '2. Estados (¿Qué situaciones existen?)',
            '3. Acciones (¿Qué puedo hacer?)',
            '4. Restricciones (¿Qué está prohibido?)',
            '5. Meta (¿Qué quiero lograr?)',
            '6. Solución (Secuencia de pasos)',
          ]}
          clave={[0, 1, 2, 4]}
        />
      </Seccion>

      <Seccion titulo="1. Los 6 elementos y las diferencias teóricas que preguntan en el examen">
        <Tabla
          cabeza={['Elemento', 'Pregunta que responde (Pizarrón 12/10)', 'Significado claro para escribir en el examen']}
          filas={[
            [
              '1. Inicio (Estado inicial)',
              '¿Dónde comienza el problema?',
              'Es la situación o punto exacto de partida desde donde arranca el agente.',
            ],
            [
              '2. Estados',
              '¿Qué situaciones son posibles?',
              'Es toda la INFORMACIÓN necesaria para describir una situación o configuración posible del problema en un momento dado.',
            ],
            [
              '3. Acciones (Operadores)',
              '¿Qué puedo hacer?',
              'Son las operaciones o movimientos permitidos que nos hacen cambiar de un estado a otro.',
            ],
            [
              '4. Meta (Objetivo)',
              '¿Qué quiero alcanzar?',
              'Es la condición o estado final que queremos lograr para dar el problema por terminado.',
            ],
            [
              '5. Restricciones',
              '¿Qué NO tengo permitido hacer?',
              'Son las reglas, límites o bloqueos que prohíben ciertos estados o acciones (recortan las posibilidades).',
            ],
            [
              '6. Solución',
              '¿Cómo vamos a llegar?',
              'Es la secuencia ordenada de acciones (o de estados paso a paso) que lleva desde el Inicio hasta la Meta sin violar ninguna restricción.',
            ],
          ]}
        />

        <Ojo titulo="4 Diferencias teóricas clásicas de examen («¿Cuál es la diferencia entre...?»)">
          <ul>
            <li>
              <strong>1. Diferencia entre META y SOLUCIÓN:</strong> La <strong>Meta</strong> es solamente el destino o
              condición final que quieres alcanzar (ej. <em>«estar en el Piso 5»</em> o <em>«tener 2 litros»</em>),
              mientras que la <strong>Solución</strong> es <strong>todo el camino o secuencia de pasos</strong> que
              seguiste desde el inicio para llegar hasta esa meta (ej. <em>«PB → P1 → P2 → P3 → P4 → P5»</em>).
            </li>
            <li>
              <strong>2. Diferencia entre ESTADO y ACCIÓN:</strong> El <strong>Estado</strong> es una{' '}
              <em>fotografía estática</em> con la información de cómo están las cosas en ese instante (ej.{' '}
              <em>«jarra grande con 3 L y chica con 0 L»</em>), mientras que la <strong>Acción</strong> es el{' '}
              <em>verbo o movimiento</em> que transforma un estado en otro (ej. <em>«llenar la jarra chica»</em>).
            </li>
            <li>
              <strong>3. Diferencia entre ACCIÓN y RESTRICCIÓN:</strong> Las <strong>Acciones</strong> dicen qué
              movimientos existen en general (ej. <em>«subir o bajar pisos»</em>, <em>«cruzar en la balsa»</em>),
              mientras que las <strong>Restricciones</strong> dicen qué casos están prohibidos o bloqueados (ej.{' '}
              <em>«el sótano está cerrado»</em> o <em>«una esposa no puede quedarse sola con otro hombre»</em>).
            </li>
            <li>
              <strong>4. Diferencia entre ESTADO y NODO (apunte del 9/10 y 19/10):</strong> El <strong>Estado</strong>{' '}
              es la <strong>información</strong> de la situación, y el <strong>Nodo</strong> es el punto o «lugar»
              cuando dibujamos ese estado dentro de un diagrama (grafo).
            </li>
          </ul>
        </Ojo>

        <Correccion>
          <p>
            En el apunte rápido de WhatsApp del 9/10 quedó escrito <em>«Estado de informática»</em>: el profesor dijo{' '}
            <strong>«Estado = información»</strong> (en los estados debemos guardar toda la información disponible del
            problema en ese instante).
          </p>
        </Correccion>
      </Seccion>

      <Seccion titulo="2. El tip del profesor: «Pensar cómo programarlo» (representar estados)">
        <Profe>
          <p>
            <strong>Apunte del 19/10 y 3/11:</strong> Cuando vimos los ejemplos del robot, del matrimonio (esposos
            celosos) o de las jarras, el profesor nos dio el tip de <strong>pensar cómo representarlo</strong>: en vez
            de escribir párrafos largos en español, resumir la información de cada estado como una{' '}
            <strong>lista o arreglo</strong> <S>[...]</S>, un <strong>par de números</strong> <S>[x, y]</S> o una{' '}
            <strong>palabra corta</strong>.
          </p>
        </Profe>

        <Tabla
          cabeza={['Tipo de problema', 'Cómo resumir el Estado en papel («pensar como programador»)', 'Por qué sirve representarlo así']}
          filas={[
            [
              'Moverse en un mapa (Robot, Elevador, Ciudades)',
              'El nombre del lugar actual: "PB", "Entrada", "Querétaro".',
              'Porque lo único que cambia en cada paso es dónde estás parado.',
            ],
            [
              'Problemas con cantidades (Jarras, Mochila, Cambio de billetes)',
              'Un par o arreglo de números: [x, y] (ej. [4, 2] = 4L en la grande y 2L en la chica).',
              'Porque de un vistazo ves cuánto tiene cada recipiente y puedes sumar o restar.',
            ],
            [
              'Problemas de encender/apagar o cruzar de orilla (Interruptores, Esposos celosos, Granjero)',
              'Arreglo de ceros y unos (0 = apagado / orilla izquierda, 1 = encendido / orilla derecha), ej. [H1, M1, H2, M2, Balsa] = [0, 0, 0, 0, 0].',
              'Porque cada acción solo cambia unos cuantos 0 por 1 y es facilísimo revisar si un estado rompe alguna restricción.',
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="3. Taller interactivo: Resuelve problemas desde cero (como en el examen)">
        <p>
          Aquí tienes <strong>8 problemas completos</strong> (los 4 clásicos de clase y 4 problemas nuevos tipo examen).
          Elige cualquiera, llena tú mismo el <strong>Inicio, Estados, Acciones, Restricciones, Meta y Solución</strong>{' '}
          desde cero y compáralo con la respuesta de 10:
        </p>
        <TallerProblemasDesdeCero />
      </Seccion>

      <Seccion titulo="4. Resumen de consulta rápida: Problemas resueltos paso a paso">
        <Ejemplo titulo="A. Problemas de desplazamiento: Elevador, Viaje a CDMX y Robot en edificio">
          <Tabla
            cabeza={['Elemento', 'Elevador (Apunte 12/10)', 'Viaje en carretera (Apunte 9/10)', 'Robot en edificio (Apunte 19/10)']}
            filas={[
              ['1. Inicio', 'Planta Baja (PB)', 'Querétaro', 'Entrada'],
              ['2. Estados', 'Todos los pisos: S1, PB, P1, P2, P3, P4, P5', 'Querétaro, San Juan del Río, Celaya, Tepeji, CDMX...', 'Entrada, Pasillo, Aula, Laboratorio'],
              ['3. Acciones', 'Subir 1 piso, Bajar 1 piso', 'Manejar de una ciudad a otra conectada', 'Avanzar por una puerta/pasillo a una sala vecina'],
              ['4. Meta', 'Llegar al Piso 5 (P5)', 'Llegar a CDMX', 'Llegar al Laboratorio'],
              ['5. Restricciones', 'El estacionamiento subterráneo (S1) está bloqueado', '«No pasar por San Juan del Río porque ahí vive mi ex»', 'No atravesar paredes ni entrar a zonas en mantenimiento'],
              ['6. Solución', 'PB → P1 → P2 → P3 → P4 → P5', 'Ruta alterna sin tocar San Juan del Río', 'Entrada → Pasillo → Laboratorio'],
            ]}
          />
        </Ejemplo>

        <Ejemplo titulo="B. Problema de las Parejas / Esposos Celosos (Tabla completa de 5 cruces)">
          <Tabla
            cabeza={['Paso', 'Acción realizada', 'Estado [H1, M1, H2, M2, Balsa]', 'Orilla Izquierda (0)', 'Orilla Derecha (1) · ¿Cumple restricción?']}
            filas={[
              ['0 (Inicio)', 'Posición inicial', '[0, 0, 0, 0, 0]', 'H1, M1, H2, M2 (Balsa)', 'Vacía — Válido'],
              ['Paso 1', 'Cruzan las dos esposas (M1 y M2)', '[0, 1, 0, 1, 1]', 'H1, H2 (solos)', 'M1, M2 (solas) — Válido'],
              ['Paso 2', 'Regresa M1 con la balsa', '[0, 0, 0, 1, 0]', 'H1, M1, H2 (M1 está con su esposo H1)', 'M2 (sola) — Válido'],
              ['Paso 3', 'Cruzan los dos esposos (H1 y H2)', '[1, 0, 1, 1, 1]', 'M1 (sola)', 'H1, H2, M2 (M2 está con su esposo H2) — Válido'],
              ['Paso 4', 'Regresa M2 con la balsa', '[1, 0, 1, 0, 0]', 'M1, M2 (solas)', 'H1, H2 (solos) — Válido'],
              ['Paso 5 (Meta)', 'Cruzan las dos esposas (M1 y M2)', '[1, 1, 1, 1, 1]', 'Vacía', 'H1, M1, H2, M2 (Balsa) — ¡META!'],
            ]}
          />
        </Ejemplo>
      </Seccion>
    </>
  );
}
