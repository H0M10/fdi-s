import { Correccion, Ojo, Seccion, Tabla } from '../../componentes/Leccion';

export default function Historia() {
  return (
    <>
      <Seccion titulo="Antecedentes: de la filosofía a la lógica">
        <p>
          Antes de que existieran las computadoras, la pregunta era filosófica: <strong>¿el pensamiento es algo
          físico?</strong> Si lo es, una máquina podría reproducirlo.
        </p>
        <Tabla
          cabeza={['Época', 'Quién', 'Idea', 'Qué aporta a la IA']}
          filas={[
            ['s. XVII', 'Thomas Hobbes', 'Analogía entre pensar y calcular', 'Si pensar es calcular, una máquina que calcula podría pensar'],
            ['hasta 1630', 'René Descartes', 'Dualismo: el alma y las leyes físicas son independientes', 'Hay algo del pensamiento que no es físico'],
            ['1660', '—', 'Materialismo: todo pensamiento son leyes físicas', 'Si todo es físico, se puede reproducir'],
            ['—', 'John Locke', 'Nada hay en la mente que no haya pasado por los sentidos', 'Empirismo: el conocimiento viene de la experiencia. Es la idea detrás de aprender de datos'],
            ['—', 'George Boole', 'Lógica con 0 y 1 y símbolos', 'La herramienta para escribir el razonamiento: es la lógica de las tablas de verdad'],
            ['1930', 'Kurt Gödel', 'Teoremas de incompletitud', 'Hay afirmaciones que no se pueden demostrar con la sintaxis de 0 y 1'],
          ]}
        />
        <Correccion>
          <p>
            En el cuaderno quedaron «Thomas <strong>Hacks</strong>», «John <strong>Lock</strong>» y
            «George <strong>Bolt</strong>». Son <strong>Hobbes</strong>, <strong>Locke</strong> y
            <strong> Boole</strong>. Y «lógica proporcional» es lógica <strong>proposicional</strong>.
          </p>
        </Correccion>
      </Seccion>

      <Seccion titulo="Línea del tiempo">
        <p>Cada hito importa por <strong>qué cambió</strong> respecto de lo anterior.</p>
        <Tabla
          cabeza={['Año', 'Hito', 'Qué cambió']}
          filas={[
            ['1950', 'Test de Turing', 'Primera forma de medir si una máquina es inteligente: si en una conversación no se distingue de un humano'],
            ['1956', 'Se acuña «Inteligencia Artificial»', 'La IA nace como campo con nombre propio, en la conferencia de Dartmouth'],
            ['1957', '«Razonar»', 'Quedó así en el apunte; confirma en clase a qué se refería'],
            ['1966', 'ELIZA', 'El primer chatbot. Simulaba conversar sin entender nada'],
            ['1972', 'Shakey', 'Un robot que percibía, planeaba y actuaba'],
            ['1980', 'Sistemas expertos', 'El conocimiento de un experto se escribe como reglas. En la misma época: algoritmos evolutivos, lógica difusa y redes neuronales'],
            ['1997', 'Deep Blue', 'Vence al campeón mundial de ajedrez'],
            ['2002', 'Roomba', 'La IA entra a la casa como producto de consumo'],
            ['2006', 'Deep learning', 'Redes profundas que aprenden solas las características'],
            ['2011', 'Watson', 'Entiende preguntas en lenguaje natural y gana Jeopardy!'],
            ['2015', 'AlphaGo', 'Gana en Go, donde la fuerza bruta no alcanza'],
            ['2016', 'Chatbot', 'Quedó así en el apunte; confirma cuál'],
            ['2020', 'GPT-3', 'Modelos de lenguaje que generan texto'],
            ['2021', 'Biomedicina', 'Quedó así en el apunte; confirma a qué se refería'],
          ]}
        />
        <Ojo titulo="El patrón que conviene ver">
          <p>
            <strong>1980:</strong> el humano escribe las reglas (sistemas expertos). <strong>2006 en adelante:</strong>
            la máquina aprende las reglas de los datos (deep learning). Es exactamente la diferencia entre programación
            tradicional y machine learning.
          </p>
        </Ojo>
      </Seccion>
    </>
  );
}
