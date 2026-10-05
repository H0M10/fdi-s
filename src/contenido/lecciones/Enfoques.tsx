import { Agregado, Correccion, Ejemplo, Flujo, Ojo, Profe, S, Seccion, Tabla } from '../../componentes/Leccion';

export default function Enfoques() {
  return (
    <>
      <Seccion titulo="Dos maneras de clasificar los enfoques">
        <p>
          Hay un <strong>enfoque clásico</strong>, que pregunta qué tipo de inteligencia se busca, y un
          <strong> enfoque técnico</strong>, que pregunta con qué herramienta se construye. En los casos del
          examen, cuando preguntan «¿cuál es su enfoque?», normalmente se refieren al técnico.
        </p>
        <Ojo titulo="Lo que te van a preguntar">
          <p>
            El profesor no pregunta qué algoritmo exacto es. Te da un caso y pregunta <strong>qué enfoque</strong>:
            reglas, búsqueda, optimización, machine learning… Para contestar, hazte estas preguntas en orden:
          </p>
          <ol style={{ margin: '6px 0 0', paddingLeft: '1.3em' }}>
            <li>¿La regla <strong>la escribió una persona</strong>? → <strong>Reglas</strong></li>
            <li>¿Hay un <strong>punto de partida y una meta</strong>, un camino que encontrar? → <strong>Búsqueda</strong></li>
            <li>¿Hay algo que <strong>maximizar o minimizar</strong>? → <strong>Optimización</strong></li>
            <li>¿Se <strong>aprende de datos</strong> con su respuesta para predecir? → <strong>Machine learning</strong></li>
            <li>¿Son <strong>muchísimos datos crudos</strong>: imágenes, audio, texto? → <strong>Deep learning</strong></li>
            <li>¿Hay <strong>varias de las anteriores</strong> encadenadas? → <strong>Híbrido</strong></li>
          </ol>
          <p style={{ marginTop: 8 }}>
            Si te sale más de una, no contestes solo «híbrido»: <strong>di cuáles son y qué hace cada una</strong>.
            «Híbrido» es el nombre de la combinación; lo que demuestra que entendiste el caso son las piezas.
          </p>
        </Ojo>

        <h3>Las palabras que delatan el enfoque</h3>
        <Tabla
          cabeza={['Si el caso dice…', 'Es…']}
          filas={[
            ['«si…», «cuando pase…», «nunca», «siempre», «no más de…»', 'Reglas'],
            ['«llegar de A a B», «encontrar el camino», «la salida»', 'Búsqueda'],
            ['«lo menos posible», «lo más posible», «el mejor», «al menor costo»', 'Optimización'],
            ['«con datos de antes», «predice», «aprende»', 'Machine learning'],
            ['«millones de imágenes», «audio», «reconoce rostros»', 'Deep learning'],
          ]}
        />
        <Ojo titulo="Cuidado con «decide»">
          <p>
            La palabra <strong>«decide» no te dice el enfoque</strong>: todos terminan decidiendo algo. Lo que importa es
            <strong> cómo</strong> decide.
          </p>
          <p>
            «Decide llamar a 10 repartidores <strong>si</strong> hay más de 50 pedidos» → <strong>reglas</strong>: el 10
            ya lo fijó alguien, el sistema solo revisa la condición.
          </p>
          <p>
            «Decide cuántos repartidores llamar <strong>para gastar lo menos posible</strong>» →
            <strong> optimización</strong>: nadie sabe el número, el sistema compara opciones y elige la mejor.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="El enfoque clásico: cuatro cuadrantes">
        <Tabla
          cabeza={['', 'Como humano', 'Racionalmente']}
          filas={[
            ['Pensar', 'Pensar como un humano', 'Pensar racionalmente'],
            ['Actuar', 'Actuar como un humano', 'Actuar racionalmente'],
          ]}
        />
        <p>
          La diferencia de fondo está entre las columnas: <strong>imitar a las personas</strong>, con sus errores
          incluidos, contra <strong>hacer lo óptimo</strong> según un criterio. No son lo mismo, porque una persona
          se equivoca.
        </p>
        <Tabla
          cabeza={['Cuadrante', 'Qué busca', 'Ejemplo']}
          filas={[
            ['Pensar como humano', 'Reproducir el razonamiento de una persona', 'Modelos de psicología que simulan cómo resolvemos problemas'],
            ['Actuar como humano', 'Comportarse de forma indistinguible de una persona', 'El Test de Turing'],
            ['Pensar racionalmente', 'Deducir correctamente a partir de premisas', 'La lógica de las tablas de verdad'],
            ['Actuar racionalmente', 'Elegir la acción con el mejor resultado según un criterio', 'Un GPS que elige la ruta más corta'],
          ]}
        />
        <Profe>
          <p>La mayoría de los sistemas actuales van por <strong>actuar racionalmente</strong>.</p>
        </Profe>
      </Seccion>

      <Seccion titulo="Enfoque técnico 1 · Reglas">
        <p>
          El conocimiento se escribe como condiciones <S>si… entonces…</S> por una persona que ya sabe resolver el
          problema. Es la base de los sistemas expertos de los años 80.
        </p>
        <Flujo pasos={['Hechos + Reglas', 'Motor de inferencia', 'Conclusiones']} />
        <Tabla
          cabeza={['Conviene cuando', 'No conviene cuando']}
          filas={[[
            'Las reglas se conocen y no cambian. «Si el día es inhábil, no se cocina.»',
            'Nadie puede escribir la regla a mano. Nadie sabe convertir «martes + semana de exámenes + pozole» en un número de porciones.',
          ]]}
        />
        <h3>¿Reglas es lo mismo que programación tradicional?</h3>
        <p>
          Son de la <strong>misma familia</strong>: en las dos <strong>la lógica la escribe una persona</strong>. Eso
          es justo lo que las separa de machine learning, donde la lógica sale de los datos.
        </p>
        <Tabla
          cabeza={['', 'Programación tradicional', 'Enfoque de reglas']}
          filas={[
            ['Quién escribe la lógica', 'El programador', 'Un experto, como reglas'],
            ['Cómo se ve', 'Un procedimiento paso a paso', 'Muchas condiciones «si… entonces…»'],
            ['Quién decide qué se ejecuta', 'El orden que escribió el programador', 'El motor de inferencia, que busca qué reglas se cumplen'],
            ['Ejemplo', 'Calcular el promedio de calificaciones', '«Si tiene fiebre y tos, sospechar gripe»'],
          ]}
        />
        <p>
          El enfoque de reglas es <strong>la forma que toma la programación tradicional dentro de la IA</strong>. En un
          caso del examen, si la lógica la escribió una persona como condiciones, la respuesta es <strong>reglas</strong>.
        </p>
        <Agregado>
          <p>
            No está confirmado si el profesor pone «reglas» y «programación tradicional» como opciones separadas. Si
            aparecen las dos en la misma pregunta: <strong>reglas</strong> cuando hay conocimiento de un experto en forma
            de «si… entonces»; <strong>programación tradicional</strong> cuando es un cálculo o procedimiento fijo.
          </p>
        </Agregado>
      </Seccion>

      <Seccion titulo="Enfoque técnico 2 · Búsqueda">
        <p>
          Hay un <strong>estado inicial</strong>, una <strong>meta</strong> y acciones que llevan de uno a otro.
          Los cuatro algoritmos que se vieron se diferencian en <strong>en qué orden exploran</strong>.
        </p>
        <Ojo titulo="Para entender, no para memorizar">
          <p>
            En el examen no te preguntan si es BFS o UCS: te preguntan si el enfoque es <strong>búsqueda</strong>. Lo
            que tienes que reconocer es que hay un punto de partida y una meta. La tabla es para que entiendas qué
            hace cada uno.
          </p>
        </Ojo>
        <Tabla
          cabeza={['Algoritmo', 'Cómo explora', 'Qué garantiza']}
          filas={[
            ['BFS · anchura', 'Todos los vecinos antes de avanzar un nivel', 'El camino con menos pasos'],
            ['DFS · profundidad', 'Hasta el fondo de un camino; regresa si no sirve', 'Poca memoria; no garantiza el más corto'],
            ['UCS · costo uniforme', 'Siempre el camino más barato acumulado', 'El de menor costo, aunque tenga más pasos'],
            ['Greedy · el mejor primero', 'Hacia lo que parece más cerca de la meta', 'Nada: es rápido pero puede equivocarse'],
          ]}
        />
        <Ejemplo titulo="Para no confundirlos: de tu casa a la escuela">
          <p>
            <strong>BFS</strong> te da la ruta con menos cuadras. <strong>UCS</strong> te da la que tarda menos
            tiempo, aunque tenga más cuadras. <strong>Greedy</strong> siempre camina hacia donde se ve la escuela,
            y puede meterte a una calle cerrada. <strong>DFS</strong> se va por la primera calle hasta el final
            antes de probar otra.
          </p>
        </Ejemplo>
        <Agregado>
          <p>
            Los usos de cada algoritmo se agregaron; en el apunte de clase quedaron pendientes. Confirma que
            coincidan con lo que explicó el profesor.
          </p>
        </Agregado>
      </Seccion>

      <Seccion titulo="Enfoque técnico 3 · Optimización">
        <p>
          Busca el <strong>mejor valor</strong> de algo. Tiene dos direcciones: <strong>maximizar</strong> una
          ganancia o <strong>minimizar</strong> una pérdida, un costo o una distancia.
        </p>
        <h3>El algoritmo evolutivo de clase</h3>
        <ol>
          <li>Hay una ecuación y un conjunto de 6 datos.</li>
          <li>Se descartan los 3 peores (los más chicos, si se maximiza).</li>
          <li>Se rellena generando nuevos.</li>
          <li>Se repite.</li>
          <li>Para minimizar, al revés.</li>
        </ol>
        <Profe>
          <p>
            «En optimización estamos haciendo una <strong>búsqueda de mínimo o de máximo</strong>.» Por eso, al ver
            las ramas, la optimización entra dentro de búsqueda y planificación.
          </p>
        </Profe>
        <Tabla
          cabeza={['', 'Búsqueda', 'Optimización']}
          filas={[
            ['Qué buscas', 'Un camino hacia una meta', 'El mejor valor de algo'],
            ['Sabes que terminaste porque…', 'Llegaste a la meta', 'Ya no puedes mejorar'],
            ['Ejemplo', 'Ruta de la casa a la escuela', 'Horario de profesores sin traslapes'],
          ]}
        />
      </Seccion>

      <Seccion titulo="Enfoque técnico 4 y 5 · Machine learning y deep learning">
        <Correccion>
          <p>
            En el apunte quedó: «en ML pasamos datos etiquetados; en DL pasamos imágenes y nos dice "esta se parece
            a esta otra" pero no qué es». <strong>Esa no es la diferencia.</strong> Etiquetado contra no etiquetado
            es <strong>supervisado contra no supervisado</strong>, y aplica a los dos: hay deep learning
            supervisado y machine learning no supervisado.
          </p>
        </Correccion>
        <Tabla
          cabeza={['', 'Machine learning clásico', 'Deep learning']}
          filas={[
            ['Las características', 'Las diseña una persona', 'La red las aprende sola de los datos crudos'],
            ['Datos necesarios', 'Menos', 'Muchísimos más'],
            ['Se puede explicar', 'Sí: se sabe qué variable pesó', 'Difícil: es una caja negra'],
            ['Ejemplo', '«Fíjate en el color y el tamaño»', 'Le das la imagen tal cual'],
          ]}
        />
        <p><strong>El deep learning es un subconjunto del machine learning</strong>, no una alternativa a él.</p>
        <h3>Supervisado, regresión y clasificación</h3>
        <ul>
          <li><strong>Supervisado:</strong> cada dato trae su respuesta. «Este día comieron 480 personas.»</li>
          <li><strong>Regresión:</strong> se predice un <strong>número</strong>. ¿Cuántas porciones?</li>
          <li><strong>Clasificación:</strong> se predice una <strong>categoría</strong>. ¿Spam o no spam?</li>
        </ul>
      </Seccion>

      <Seccion titulo="Enfoque técnico 6 · Híbrido">
        <p>
          <strong>No es un cuarto enfoque</strong>: es la combinación de varios, encadenados. Casi ningún sistema
          real es un solo modelo suelto.
        </p>
        <p>
          Para reconocerlo, <strong>separa el caso en partes</strong> y ponle enfoque a cada una. Si te salen dos o
          más, es híbrido. Si te sale una sola, no lo es, por potente que sea el sistema.
        </p>
        <Tabla
          cabeza={['Caso', 'Las piezas', '¿Híbrido?']}
          filas={[
            ['App de comida', 'Predice pedidos (ML) + decide cuántos repartidores (optimización) + máximo 8 horas (reglas)', 'Sí'],
            ['Entrada de un edificio', 'Reconoce el rostro (deep learning) + si no es empleado, no abre (reglas)', 'Sí'],
            ['GPS', 'Encuentra la ruta (búsqueda)', 'No'],
            ['Reconocer pájaros en fotos', 'Deep learning', 'No'],
          ]}
        />
        <Ejemplo titulo="El caso del comedor universitario">
          <Flujo pasos={['ML predice cuánta gente viene', 'Optimización decide cuánto cocinar', 'Reglas verifican que quepa']} />
          <Tabla
            cabeza={['Enfoque', 'Qué responde', 'Qué NO puede hacer']}
            filas={[
              ['Machine learning', '¿Cuánta gente va a venir?', 'Decidir cuánto cocinar: no conoce los costos'],
              ['Optimización', '¿Cuánto conviene cocinar?', 'Estimar la demanda: necesita que se la den'],
              ['Reglas', '¿Esa decisión es posible?', 'Ni estimar ni optimizar'],
            ]}
          />
          <p>
            Se descartó la búsqueda porque <strong>no hay estado inicial ni meta</strong>: no hay un camino que
            encontrar, hay una cantidad que decidir.
          </p>
        </Ejemplo>
      </Seccion>

      <Seccion titulo="Cómo elegir el enfoque">
        <Tabla
          cabeza={['Si tienes…', 'Usa…']}
          filas={[
            ['Reglas conocidas y estables', 'Reglas'],
            ['Un estado inicial, una meta y acciones', 'Búsqueda'],
            ['Algo que maximizar o minimizar', 'Optimización'],
            ['Datos históricos con respuesta, y quieres predecir', 'Machine learning'],
            ['Muchísimos datos crudos (imágenes, audio, texto)', 'Deep learning'],
            ['Varias de las anteriores', 'Híbrido'],
          ]}
        />
        <Profe>
          <p>
            El enfoque no se elige por moda: se elige por <strong>lo que puedes justificar</strong>. Si eliges
            deep learning con datos autogenerados, te van a preguntar de dónde vienen esos datos y qué tan
            fiables son.
          </p>
        </Profe>
        <Ojo>
          <p>
            Descartar la búsqueda «porque es vieja» es un error. Se descarta cuando <strong>resuelve otro tipo de
            problema</strong>. Y decir que «híbrido» es un enfoque aparte también lo es.
          </p>
        </Ojo>
      </Seccion>
    </>
  );
}
