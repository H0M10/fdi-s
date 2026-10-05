import { Ejemplo, Flujo, Ojo, Seccion, Tabla } from '../../componentes/Leccion';

export default function Casos() {
  return (
    <>
      <Seccion titulo="Cómo son los casos del examen">
        <p>
          Según los compañeros que ya lo presentaron, <strong>10 de las 18 preguntas</strong> son casos: te
          describen un sistema real donde se usa IA, y cada uno tiene <strong>4 incisos</strong>.
        </p>
        <Tabla
          cabeza={['Inciso', 'Qué te piden', 'Dónde estudiarlo']}
          filas={[
            ['Rama', '¿Qué rama o ramas intervienen? Se enlistan todas', 'Ramas'],
            ['Enfoque', '¿Cuál es su enfoque? Si son varios, todos', 'Enfoques'],
            ['Ética', '¿Qué problemas y daños éticos tiene?', 'Ética'],
            ['Mitigación o ley', 'Cómo reducirlo, o qué principio se viola', 'Ética'],
          ]}
        />
        <Ojo titulo="En las preguntas avanzadas se justifica">
          <p>
            No basta con elegir: cada inciso pide <strong>justificar</strong> por qué esa rama, ese enfoque o ese
            riesgo. En la práctica, los casos te piden escribir la justificación antes de revisar, y después te
            muestran qué tenía que decir.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="El método para contestar cualquier caso">
        <Flujo pasos={['¿Qué entra?', '¿Qué sale?', '¿Cómo lo hace?', '¿Qué puede salir mal?']} />
        <h3>1 · ¿Qué entra al sistema? → la rama</h3>
        <p>
          Sensores → percepción. Imágenes → visión. Texto o voz → PLN. Datos históricos → aprendizaje automático.
          Reglas de un experto → representación del conocimiento.
        </p>
        <h3>2 · ¿Qué sale? → confirma la rama</h3>
        <p>
          Si sale un movimiento físico → robótica. Si sale contenido nuevo → generativa. Si sale una ruta o un
          plan → búsqueda y planificación. Si sale una reacción a emociones → afectiva.
        </p>
        <h3>3 · ¿Cómo lo hace? → el enfoque</h3>
        <p>
          ¿Alguien escribió las reglas? → reglas. ¿Hay un camino que encontrar? → búsqueda. ¿Hay algo que
          maximizar o minimizar? → optimización. ¿Aprende de datos con respuesta? → machine learning. ¿Muchísimas
          imágenes o texto crudo? → deep learning.
        </p>
        <h3>4 · ¿Qué puede salir mal? → la ética</h3>
        <p>
          Recorre <strong>datos → modelo → decisión → consecuencias</strong>. ¿Se piden datos de más? Privacidad.
          ¿Los datos son del pasado y castigan a un grupo? Sesgo. ¿Nadie puede explicar la decisión? Opacidad.
          ¿La decisión es automática y no se puede apelar? Gobernanza, y la mitigación es revisión humana.
        </p>
      </Seccion>

      <Seccion titulo="Cómo se justifica">
        <p>
          Siempre con la misma forma: <strong>la respuesta + la parte del caso que la muestra</strong>. Lo que hace
          la justificación es señalar la palabra del caso que te llevó a la respuesta.
        </p>
        <Tabla
          cabeza={['Inciso', 'Plantilla']}
          filas={[
            ['Rama', '«Es [rama] porque el sistema [lo que hace con qué: imágenes, sensores, texto…].»'],
            ['Enfoque', '«Es [enfoque] porque [quién pone la lógica: una regla escrita, un camino, lo mejor posible, los datos].»'],
            ['Riesgo', '«Es [riesgo] porque [qué puede salir mal y a quién afecta].»'],
            ['Mitigación', '«[Qué se hace], porque así [se evita el daño].» Casi siempre: revisión humana.'],
          ]}
        />
      </Seccion>

      <Seccion titulo="Un caso resuelto paso a paso">
        <Ejemplo titulo="Multas automáticas por placa">
          <p>
            Una ciudad instala cámaras que encuentran la placa de los autos que se pasan el alto, la leen y emiten la
            multa automáticamente al dueño registrado, sin que nadie revise la foto.
          </p>
        </Ejemplo>
        <Tabla
          cabeza={['Inciso', 'Respuesta', 'Justificación (lo que escribes)']}
          filas={[
            ['Ramas', 'Visión por computadora y representación del conocimiento', 'Es visión porque encuentra y lee la placa en las imágenes de las cámaras. Es representación del conocimiento porque aplica la regla «al que se pasa el alto, multa».'],
            ['Enfoques', 'Deep learning y reglas', 'Leer placas en imágenes se aprende de muchísimas fotos: deep learning. Multar al que se pasa el alto es una regla escrita.'],
            ['Riesgo', 'Error', 'Una placa sucia se lee mal y se multa a otra persona: ningún modelo es 100 % efectivo.'],
            ['Mitigación', 'Revisión humana antes de multar', 'La multa es una consecuencia importante para una persona y hoy se decide sin que nadie revise.'],
          ]}
        />
      </Seccion>

      <Seccion titulo="Errores que cuestan puntos">
        <Ojo>
          <p><strong>Olvidar el PLN.</strong> Si el sistema recibe una orden por voz o texto, el PLN está en el caso aunque no sea lo principal.</p>
          <p><strong>Confundir percepción con visión.</strong> Sensores → percepción. Cámaras → visión.</p>
          <p><strong>Proponer «mejorar la efectividad» como mitigación.</strong> Nunca llega a 100 %. Lo que se mitiga es que la decisión sea automática.</p>
          <p><strong>Llamar a «híbrido» un enfoque aparte.</strong> Es la combinación de varios.</p>
          <p><strong>Escribir «lenguaje corporal».</strong> Es lenguaje natural.</p>
        </Ojo>
      </Seccion>
    </>
  );
}
