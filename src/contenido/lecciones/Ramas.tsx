import { Agregado, Correccion, Ejemplo, Flujo, Ojo, Profe, Seccion, Tabla } from '../../componentes/Leccion';

export default function Ramas() {
  return (
    <>
      <Seccion titulo="Once ramas, cada una con su flujo">
        <p>
          El profesor dio cada rama con una <strong>definición</strong> y un <strong>flujo de flechas</strong>.
          El flujo es lo más útil para el examen: cuando te pongan un caso, la manera más rápida de reconocer
          la rama es preguntarte qué entra al sistema y qué sale.
        </p>
        <Correccion>
          <p>
            En el apunte quedó «procesamiento de lenguaje <strong>corporal</strong>». Es procesamiento de
            lenguaje <strong>natural</strong>: se procesa texto y voz, no gestos. Escribirlo como quedó en el
            apunte sería un error en el examen.
          </p>
        </Correccion>
        <Ojo titulo="Siglas: por confirmar">
          <p>
            El profesor dio siglas para las ramas y pidió usarlas en el examen, pero no quedaron en los apuntes.
            Las que se tienen, como las recuerdas:
          </p>
          <Tabla
            cabeza={['Rama', 'Sigla']}
            filas={[
              ['Percepción computacional', 'P.C.'],
              ['Procesamiento de lenguaje natural', 'PLN'],
              ['Sistemas multiagente', 'SMA'],
            ]}
          />
          <p>
            Confírmalas con tus compañeros o tu cuaderno, y consigue las de las demás ramas: no todas tenían, pero
            aquí no se inventan. Mientras, en las preguntas aparecen junto al nombre.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="1 · Representación del conocimiento y razonamiento">
        <p>
          Estudia cómo representar el conocimiento para que una máquina pueda <strong>consultarlo y razonar
          con él</strong>.
        </p>
        <Flujo pasos={['Hechos + Reglas', 'Motor de inferencia', 'Conclusiones']} clave={[0]} />
        <p>
          La señal es que alguien <strong>ya sabe</strong> las reglas y se las escribe a la máquina. El sistema
          no aprende nada: aplica lo que le dijeron.
        </p>
        <Ejemplo>
          <p>
            Un médico escribe «si el paciente tiene fiebre y dolor de garganta, sospechar infección». Los
            síntomas del paciente son los <strong>hechos</strong>, la frase del médico es la <strong>regla</strong>,
            y el motor de inferencia junta las dos para llegar al diagnóstico.
          </p>
        </Ejemplo>
      </Seccion>

      <Seccion titulo="2 · Búsqueda y planificación">
        <p>
          Estudia cómo explorar alternativas y elegir acciones para pasar de un <strong>estado inicial</strong> a
          un <strong>estado objetivo</strong>, considerando costos, restricciones e incertidumbre.
        </p>
        <Flujo pasos={['Estado inicial', 'Búsqueda y planificación', 'Acciones', 'Meta']} clave={[0, 3]} />
        <Profe>
          <p>
            Aquí la búsqueda también abarca la <strong>optimización</strong>, porque «en optimización estamos
            haciendo una búsqueda de mínimo o de máximo». Por eso entran también los <strong>algoritmos
            evolutivos</strong>.
          </p>
        </Profe>
        <Ejemplo titulo="Ejemplo del profesor">
          <p>
            Encontrar el horario para que los profesores no se traslapen en salón, materia y horario. Se resuelve
            con un algoritmo de optimización.
          </p>
        </Ejemplo>
      </Seccion>

      <Seccion titulo="3 · Aprendizaje automático">
        <p>
          Desarrolla métodos capaces de <strong>mejorar su desempeño a partir de datos</strong>, construyendo
          modelos que <strong>generalizan a casos nuevos</strong>. Es <em>machine learning</em>, e incluye al
          <em> deep learning</em> como subrama.
        </p>
        <Flujo titulo="Entrenamiento" pasos={['Datos históricos', 'Algoritmos', 'Modelo']} clave={[0]} />
        <Flujo titulo="Uso" pasos={['Datos nuevos', 'Modelo', 'Predicción (inferencia)']} clave={[2]} />
        <p>
          La señal: hay <strong>datos del pasado</strong> y se quiere <strong>predecir</strong> algo del futuro.
        </p>
      </Seccion>

      <Seccion titulo="4 · Percepción computacional (P.C.)">
        <p>
          Busca que una máquina <strong>interprete información de sensores</strong> para construir una
          representación útil de su entorno.
        </p>
        <Flujo pasos={['Mundo físico', 'Sensores', 'Percepción', 'Representación']} clave={[1]} />
        <Profe>
          <p>
            «Ojo: cuando definamos qué rama utilizar, una palabra muy importante es <strong>sensores</strong>.
            ¿Por qué? Porque viene la siguiente.»
          </p>
        </Profe>
        <p>
          Sensores de temperatura, humedad, movimiento, distancia, vibración: todo eso es percepción. Si en lugar
          de sensores hay <strong>imágenes</strong>, es la siguiente rama.
        </p>
      </Seccion>

      <Seccion titulo="5 · Visión por computadora">
        <p>
          <strong>Hace lo mismo que la percepción, pero con imágenes.</strong> Permite analizar imágenes y video
          para reconocer, segmentar o seguir objetos y escenas.
        </p>
        <Flujo pasos={['Video / Imagen', 'Modelo de visión', 'Información']} clave={[0]} />
        <h3>Las cuatro tareas, en orden</h3>
        <Tabla
          cabeza={['Tarea', 'Qué hace', 'Ejemplo de clase']}
          filas={[
            ['Clasificar', 'Dice qué hay en la imagen', 'Muchas fotos de perros y gatos; le pasas una nueva y dice cuál es'],
            ['Detectar', 'Dice dónde está', 'Cámaras que mandan alarma al ver a una persona'],
            ['Segmentar', 'Recorta la parte que importa', 'En la foto de la carretera, aislar solo la placa'],
            ['Seguimiento', 'Sigue el objeto en el video', 'La cámara sigue la placa hasta terminar de leerla'],
          ]}
        />
        <Ejemplo titulo="El ejemplo de la placa">
          <p>
            En la imagen de una carretera hay árboles, postes, anuncios y el auto en su carril. Lo único que
            importa es la placa. La cámara rastrea qué se parece a una placa, <strong>segmenta</strong> esa
            parte, y ahí empieza otro proceso para leer los números mientras le da <strong>seguimiento</strong>
            hasta terminar.
          </p>
        </Ejemplo>
        <Profe>
          <p>
            Hoy muchas cámaras detectan personas con visión en lugar de con sensores, porque <strong>es más
            exacto</strong>. Un sensor de movimiento se activa con un gato o una rama.
          </p>
        </Profe>
      </Seccion>

      <Seccion titulo="6 · Procesamiento de lenguaje natural (PLN)">
        <p>Se dedica a <strong>interpretar y generar lenguaje escrito o hablado</strong>.</p>
        <Flujo pasos={['Texto / Voz', 'Procesamiento', 'Significado · Clasificación · Respuesta']} clave={[0]} />
        <Ojo titulo="La que siempre se olvida">
          <p>
            El profesor insistió en esto: si el sistema <strong>recibe una instrucción por texto o voz</strong>,
            esa instrucción <strong>primero tiene que pasar por PLN</strong>, porque la máquina tiene que entender
            qué le pidieron.
          </p>
          <p>
            Ejemplo de clase: «avísame si hay un perro en el patio». Detectar el perro es visión, pero entender
            la orden es PLN. Las dos ramas están en el caso, y casi todos olvidan la segunda.
          </p>
        </Ojo>
        <Ojo titulo="Pero no todo lo que tiene voz es PLN">
          <p>
            PLN es para entender <strong>qué se dice</strong>: las palabras y su significado. Si el sistema solo
            escucha <strong>cómo se dice</strong> (el tono, si grita, si suena triste), eso es una señal, igual que
            la expresión de la cara, y es computación afectiva.
          </p>
          <Tabla
            cabeza={['El sistema…', 'Rama', 'Ejemplo']}
            filas={[
              ['entiende las palabras: una orden, una pregunta, un texto', 'PLN', '«Pon una alarma a las 7», un chatbot, un filtro de spam'],
              ['escucha el tono para saber cómo se siente la persona', 'Computación afectiva', 'El call center que detecta enojo; la app de citas que mide el interés'],
              ['hace las dos cosas', 'PLN + afectiva', 'El juguete que entiende lo que dice el niño y nota por su tono que está triste'],
            ]}
          />
          <p>
            Y ojo con la sigla: es <strong>PLN</strong>, procesamiento de lenguaje natural. «PNL» es otra cosa
            (programación neurolingüística).
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="7 · Robótica y sistemas autónomos">
        <p>
          Rama interdisciplinaria que combina computación, ingeniería y control. Con IA, permite que los robots
          <strong> perciban</strong> el entorno, <strong>planifiquen</strong> y se <strong>adapten</strong> a
          situaciones no programadas.
        </p>
        <Flujo pasos={['Percepción', 'Localizar / Entender', 'Planificar', 'Actuar']} clave={[3]} />
        <Profe>
          <p>
            En las demás ramas el resultado es información; en robótica hay una <strong>interacción
            física</strong>. Por lo general se piensa en algo humanoide, pero puede ser un carrito: cualquier cosa
            que tenga movimiento.
          </p>
        </Profe>
      </Seccion>

      <Seccion titulo="8 · Sistemas multiagente (SMA)">
        <p>
          Sistemas formados por <strong>varios agentes</strong> capaces de percibir y actuar, donde
          <strong> las acciones de uno afectan a los demás</strong>.
        </p>
        <Flujo pasos={['Agente A', 'Agente B', 'Agente C', '…']} />
        <p>Los agentes pueden <strong>cooperar, competir, coordinarse e incluso negociar</strong>.</p>
        <Ejemplo titulo="Ejemplo del profesor">
          <p>
            En un almacén moderno hay robots que van entre los pasillos. No se programa cada uno con «ve a tal
            estante y tráeme esto»: se programan como un sistema donde cada uno sabe dónde están los demás, y así
            no chocan.
          </p>
        </Ejemplo>
      </Seccion>

      <Seccion titulo="9 · IA generativa">
        <p>
          Rama contemporánea de modelos capaces de <strong>generar contenido sintético</strong> a partir de
          patrones aprendidos en datos: texto, imágenes, audio, video o código.
        </p>
        <p>La señal: el sistema <strong>crea algo nuevo</strong> en lugar de clasificar o predecir.</p>
        <Ojo titulo="Las dos ramas de texto: PLN y generativa">
          <p>
            Las dos pueden trabajar con texto, y las definiciones del profesor se enciman: PLN es «interpretar y
            generar lenguaje escrito u hablado», y generativa es «generar contenido sintético: textos, imágenes,
            audio, video o código». Para separarlas, pregúntate qué hace el sistema con el texto:
          </p>
          <Tabla
            cabeza={['El sistema…', 'Rama', 'Ejemplo']}
            filas={[
              ['Entiende o clasifica texto o voz, sin crear nada', 'PLN', 'Filtro de spam, moderar publicaciones, entender «pon una alarma»'],
              ['Entiende lo que le escriben y redacta algo nuevo', 'PLN + generativa', 'Chatbot que redacta sus respuestas, app que escribe resúmenes'],
              ['Crea contenido nuevo que no es lenguaje', 'Generativa', 'Fotos de personas que no existen, música nueva'],
              ['Crea una imagen a partir de una descripción escrita', 'Generativa + PLN', 'El gato astronauta: PLN entiende la descripción'],
            ]}
          />
          <p>
            El traductor queda en medio: es PLN, y como redacta un texto nuevo, generativa también se vale.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="10 · Computación afectiva">
        <p>
          Sistemas capaces de <strong>reconocer, modelar o responder a emociones</strong> y otros fenómenos
          afectivos.
        </p>
        <p>
          Palabra clave: <strong>señales</strong>. La expresión del rostro, el tono de voz, el ritmo cardíaco.
        </p>
      </Seccion>

      <Seccion titulo="11 · Sistemas cognitivos">
        <p>
          También llamada <strong>cognición computacional</strong>. Usa modelos computacionales para estudiar o
          construir capacidades como percepción, aprendizaje, memoria, razonamiento, lenguaje, decisión y
          conocimiento de sentido común.
        </p>
        <Flujo pasos={['Percibir', 'Memoria', 'Razonar', 'Decidir', 'Actuar']} />
        <p>
          Se distingue de la robótica en que no tiene que moverse: lo que busca es reproducir el
          <strong> proceso mental completo</strong>, en orden.
        </p>
      </Seccion>

      <Seccion titulo="Cómo identificar la rama en un caso">
        <Tabla
          cabeza={['Si el caso dice…', 'Rama']}
          filas={[
            ['hechos, reglas, «si… entonces» escritas por un experto', 'Representación del conocimiento'],
            ['ruta, horario, estado inicial y meta, minimizar o maximizar', 'Búsqueda y planificación'],
            ['datos históricos, predecir, entrenar', 'Aprendizaje automático'],
            ['sensores', 'Percepción computacional'],
            ['cámara, imagen, video', 'Visión por computadora'],
            ['texto, voz, instrucción, chat', 'Procesamiento de lenguaje natural'],
            ['se mueve, interacción física', 'Robótica'],
            ['varios robots o agentes que se coordinan', 'Sistemas multiagente'],
            ['genera contenido nuevo', 'IA generativa'],
            ['emociones', 'Computación afectiva'],
            ['percibir, recordar, razonar y decidir como una persona', 'Sistemas cognitivos'],
          ]}
        />
        <Ojo titulo="Un caso real casi nunca es una sola rama">
          <p>
            Un robot de almacén que recibe órdenes por voz y esquiva cajas con una cámara usa PLN, visión,
            robótica y multiagente. Si te piden <strong>la</strong> rama, elige la que define el propósito del
            sistema. Si te piden <strong>las</strong> ramas, enlístalas todas.
          </p>
          <p>
            Por eso en la práctica todas las preguntas de ramas te dejan marcar varias, aunque la respuesta sea una
            sola: tienes que decidir tú cuántas son.
          </p>
        </Ojo>
        <h3>Qué se marca y qué no</h3>
        <ul>
          <li>
            Se marca lo que puedes <strong>señalar en el texto</strong>. Si el caso no dice cámaras, no marques
            visión aunque te imagines que las tiene.
          </li>
          <li>
            Si el sistema aplica una regla para decidir algo («si registra 3 faltas, bloquea»), esa parte es
            <strong> representación del conocimiento y razonamiento</strong>: un hecho más una regla llevan a una
            conclusión.
          </li>
          <li>
            Lo que se puede deducir pero el caso no dice aparece en ámbar como <strong>«también se vale»</strong>:
            marcarlo o no, no cuenta en contra.
          </li>
        </ul>
        <h3>Visión y aprendizaje automático: cuándo van juntas</h3>
        <p>
          Responden preguntas distintas. <strong>Visión</strong> dice <em>qué entra</em> al sistema: imágenes o video.{' '}
          <strong>Aprendizaje automático</strong> dice <em>cómo aprendió</em> a reconocer lo que ve: con ejemplos. Por
          eso casi siempre andan juntas. El profesor lo explicó así en visión: le pasas muchas fotos de perros y gatos,
          y después, con una foto nueva, te dice cuál es.
        </p>
        <Tabla
          cabeza={['El caso…', 'Aprendizaje automático', 'Ejemplo']}
          filas={[
            ['dice que aprendió: «se entrenó con», «datos históricos», «millones de fotos»', 'Obligatoria', 'Radiografías: «se entrenó con 100,000 radiografías»'],
            ['reconoce algo en imágenes, pero no dice cómo aprendió', 'También se vale', 'La bocina que detecta al perro; la app que reconoce plantas'],
            ['no reconoce ni predice nada: solo mide o sigue una regla', 'No va', 'Termostato con sensores; riego con la regla del agrónomo'],
          ]}
        />
        <p>
          Lo mismo pasa con PLN, computación afectiva e IA generativa: entender voz, reconocer emociones o crear
          imágenes se aprende de ejemplos. Si el caso lo dice, marca aprendizaje automático; si no, también se vale.
        </p>
        <h3>Cómo se justifica</h3>
        <p>
          En las preguntas avanzadas, cada rama que marcas se justifica. La forma es siempre la misma:{' '}
          <strong>la rama + la parte del caso que la muestra</strong>.
        </p>
        <Ejemplo titulo="Cámaras de asistencia">
          <p>
            «Es <strong>visión por computadora</strong> porque reconoce rostros en las imágenes de las cámaras. Es{' '}
            <strong>representación del conocimiento</strong> porque aplica la regla de que con 3 faltas se bloquea
            la inscripción.»
          </p>
        </Ejemplo>
        <p>
          La tabla de arriba es justo eso: la palabra del caso que delata cada rama. En los casos tipo examen de la
          práctica te pide escribir la justificación antes de revisar, y después te muestra qué tenía que decir.
        </p>
        <Agregado>
          <p>
            Un truco para decidir la rama principal: pregúntate qué perdería el sistema si le quitaras esa parte.
            Al robot de almacén sin cámara le cuesta más esquivar; sin la coordinación entre robots, chocan y el
            almacén deja de funcionar. Esa es la que define el caso.
          </p>
        </Agregado>
      </Seccion>
    </>
  );
}
