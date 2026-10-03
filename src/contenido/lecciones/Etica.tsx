import { Agregado, Correccion, Ejemplo, Flujo, Ojo, Profe, Seccion, Tabla } from '../../componentes/Leccion';

export default function Etica() {
  return (
    <>
      <Seccion titulo="El caso de la clase">
        <Ejemplo titulo="Cámaras en la universidad">
          <p>
            Una universidad pública instala cámaras con reconocimiento facial para registrar la asistencia. Si el
            sistema registra <strong>3 faltas</strong>, <strong>bloquea automáticamente</strong> la inscripción del
            alumno.
          </p>
        </Ejemplo>
        <h3>La secuencia</h3>
        <Flujo pasos={['Datos', 'Modelo', 'Decisión', 'Consecuencias']} clave={[3]} />
        <p>
          Todo análisis ético sigue esta cadena. Un error en cualquier eslabón se arrastra hasta la consecuencia,
          que es lo que vive una persona.
        </p>
        <h3>Los problemas que se identificaron</h3>
        <ul>
          <li><strong>Fallo en el reconocimiento:</strong> no reconoce al alumno que sí asistió.</li>
          <li><strong>Fallas técnicas:</strong> la cámara se cae, no hay luz, no hay red.</li>
          <li><strong>Sistema cerrado:</strong> no hay forma de apelar; nadie revisa la decisión.</li>
          <li><strong>99 % de efectividad:</strong> suena alto, pero con 10,000 registros al día son 100 errores diarios.</li>
        </ul>
        <Profe cita>Que un sistema funcione no significa que sea un sistema a usar.</Profe>
      </Seccion>

      <Seccion titulo="Los 8 riesgos de usar IA">
        <Tabla
          cabeza={['Riesgo', 'Qué es', 'Ejemplo de clase']}
          filas={[
            ['1 · Privacidad', 'Tener datos disponibles no significa que sean datos necesarios', 'Para la asistencia solo necesito foto, nombre, matrícula y horario; no necesito saber que tiene 24 años y vive en El Campanario'],
            ['2 · Sesgo y discriminación', 'Los datos históricos no siempre son la verdad objetiva', 'IA de reclutamiento con 20 años de datos: entonces había pocas mujeres, así que el modelo infiere que el puesto es para hombres'],
            ['3 · Error', 'Los modelos nunca son 100 % efectivos; funcionan por patrones', 'Riesgo ≈ probabilidad de que ocurra × consecuencias'],
            ['4 · Opacidad y explicabilidad', 'Hay que poder saber por qué el modelo decidió: qué variables y de dónde salieron los datos', 'Si no puedo recorrer el camino de vuelta desde la inferencia, hay opacidad'],
            ['5 · Seguridad', 'Los datos no pueden estar al alcance de cualquiera', 'Prestar la laptop, mandarlos por correo, subirlos a una app de IA'],
            ['6 · Responsabilidad y gobernanza', 'Tener control y, sobre todo, un responsable', 'Quién tomó los datos, quién hizo el modelo, quién decidió, quién responde'],
            ['7 · Uso indebido', 'Usar los datos para algo distinto de lo autorizado', 'Me dan los datos para la asistencia y un amigo me pide ver quiénes son foráneos para rentarles un cuarto'],
            ['8 · Dependencia y pérdida de juicio', 'Delegar cada vez más decisiones hasta dejar de pensar', 'IA para asistencia, luego exámenes, luego deportes, luego becas'],
          ]}
        />
        <Ojo titulo="Cómo no confundirlos">
          <p>
            <strong>Privacidad</strong> es pedir datos de más. <strong>Seguridad</strong> es no proteger los que
            sí tienes. <strong>Uso indebido</strong> es usarlos para otra cosa. Los tres tienen que ver con datos,
            pero son tres momentos distintos: al pedirlos, al guardarlos y al usarlos.
          </p>
          <p>
            <strong>Error</strong> es que el modelo se equivoque. <strong>Sesgo</strong> es que se equivoque
            siempre contra el mismo grupo.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="El método PRDM">
        <p>El profesor dijo que, como desarrolladores, hay que usarlo para analizar cualquier caso.</p>
        <Tabla
          cabeza={['Letra', 'Pregunta']}
          filas={[
            ['P · Personas', '¿A quiénes afecta?'],
            ['R · Riesgos', '¿Qué podría salir mal?'],
            ['D · Daño', '¿Cómo las vamos a afectar?'],
            ['M · Mitigación', '¿Cómo reducir el riesgo o el daño?'],
          ]}
        />
        <Agregado>
          <p><strong>PRDM aplicado al caso de las cámaras</strong> (para practicar el método):</p>
          <ul>
            <li><strong>Personas:</strong> alumnos, profesores, servicios escolares.</li>
            <li><strong>Riesgos:</strong> que no reconozca a quien sí asistió; que la cámara falle; que se guarden más datos de los necesarios.</li>
            <li><strong>Daño:</strong> un alumno pierde su inscripción por un error que no cometió, y no tiene a quién reclamar.</li>
            <li><strong>Mitigación:</strong> que el bloqueo no sea automático y lo revise una persona; que exista apelación; guardar solo lo necesario.</li>
          </ul>
        </Agregado>
      </Seccion>

      <Seccion titulo="Las leyes de protección de datos en México">
        <Tabla
          cabeza={['Ley', 'Para quién', 'Truco']}
          filas={[
            ['LFPDPPP', 'Sector privado', 'Ley Federal … en Posesión de los Particulares. Particular = privado'],
            ['LGPDPPSO', 'Sector público', 'Ley General … en Posesión de Sujetos Obligados. Sujeto obligado = institución pública'],
          ]}
        />
        <Ojo>
          <p>
            El caso de clase es una universidad <strong>pública</strong>, así que aplica la <strong>LGPDPPSO</strong>.
            Si fuera privada, la LFPDPPP.
          </p>
        </Ojo>

        <h3>Los 5 puntos que marca la ley</h3>
        <Tabla
          cabeza={['Principio', 'Qué significa', 'Ejemplo']}
          filas={[
            ['1 · Finalidad', 'Los datos solo se usan para lo que se pidieron', 'Si los uso para otra cosa, la ley lo cataloga como delito'],
            ['2 · Proporcionalidad o minimización', 'Pedir el mínimo necesario', 'Para la asistencia: nombre y foto. Foto de cuerpo entero ya es desproporcionado'],
            ['3 · Información', 'Decir para qué se quieren los datos', 'Aviso de privacidad. No avisar es delito'],
            ['4 · Seguridad', 'Proteger los datos', 'No protegerlos es delito; que te los roben, también'],
            ['5 · Derechos ARCO', 'Lo que el titular puede exigir', 'Ver abajo'],
          ]}
        />

        <h3>Derechos ARCO</h3>
        <Tabla
          cabeza={['Letra', 'Derecho', 'Ejemplo']}
          filas={[
            ['A', 'Acceso', 'Quiero saber qué datos tienen de mí'],
            ['R', 'Rectificación', 'Mi fecha de nacimiento está mal: corríjanla'],
            ['C', 'Cancelación', 'Borren mis datos'],
            ['O', 'Oposición', 'No usen mis datos para publicidad, aunque los sigan teniendo'],
          ]}
        />
        <Correccion>
          <p>
            En el apunte quedó «cancelación, <strong>accesibilidad</strong>, oposición». Faltó la <strong>R de
            rectificación</strong>, y la A es de <strong>acceso</strong>, no de accesibilidad.
          </p>
        </Correccion>

        <h3>Decisiones automatizadas</h3>
        <Profe>
          <p>
            Según lo visto: no se debe usar IA para decidir en un <strong>juicio</strong> que involucre a una
            persona, y el <strong>tratamiento automatizado</strong> que evalúa o predice aspectos de una persona y le
            produce una <strong>consecuencia importante</strong> tiene restricciones.
          </p>
        </Profe>
        <p>
          Eso conecta todo el tema con el caso de las cámaras: bloquear una inscripción es exactamente una
          consecuencia importante decidida sin intervención humana.
        </p>
        <Agregado>
          <p>
            Las dos leyes se reformaron en marzo de 2025 y desapareció el INAI. Para el examen vale lo que dio el
            profesor; esto es solo para que no te sorprenda si lo ves en otro lado.
          </p>
        </Agregado>
      </Seccion>

      <Seccion titulo="Cómo contestar la parte ética de un caso">
        <ol>
          <li>Recorre la secuencia <strong>datos → modelo → decisión → consecuencias</strong> y busca dónde se rompe.</li>
          <li>Ponle nombre con uno de los <strong>8 riesgos</strong>.</li>
          <li>Si involucra datos personales, di qué <strong>principio de la ley</strong> se viola.</li>
          <li>Propón una <strong>mitigación</strong> concreta. Casi siempre incluye que una persona revise la decisión.</li>
        </ol>
        <Ojo>
          <p>
            Subir la efectividad del modelo casi nunca es la mitigación correcta: <strong>ninguna llega a 100 %</strong>.
            Lo que se corrige es que la decisión no sea automática ni definitiva.
          </p>
        </Ojo>
      </Seccion>
    </>
  );
}
