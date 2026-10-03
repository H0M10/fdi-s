import { Correccion, Ejemplo, Flujo, Seccion, Tabla } from '../../componentes/Leccion';

export default function Conceptos() {
  return (
    <>
      <Seccion titulo="Datos">
        <p>
          Representaciones de hechos del mundo —números, texto, imágenes, señales— <strong>sin interpretar
          todavía</strong>. Un dato en bruto no dice nada; adquiere significado cuando se le da contexto.
        </p>
      </Seccion>

      <Seccion titulo="Algoritmo">
        <p>
          Una secuencia <strong>finita</strong> y <strong>ordenada</strong> de pasos <strong>bien definidos</strong>
          que transforma una entrada en una salida.
        </p>
        <Tabla
          cabeza={['Palabra', 'Por qué importa']}
          filas={[
            ['Finita', 'Si no termina, no es algoritmo'],
            ['Ordenada', 'El orden de los pasos cambia el resultado'],
            ['Bien definidos', 'Dos personas siguiéndolo obtienen lo mismo'],
          ]}
        />
      </Seccion>

      <Seccion titulo="Modelo">
        <Correccion>
          <p>En el apunte quedó «conjunto de algoritmos especializados». <strong>Un modelo no es un conjunto de algoritmos.</strong></p>
        </Correccion>
        <p>
          Un modelo es el <strong>resultado</strong> de aplicar un algoritmo de aprendizaje a unos datos. Es una
          función con parámetros ajustados que, dada una entrada nueva, produce una salida.
        </p>
        <Ejemplo titulo="La analogía de la cocina">
          <Tabla
            cabeza={['Concepto', 'En la cocina']}
            filas={[['Algoritmo', 'La receta'], ['Datos', 'Los ingredientes'], ['Entrenamiento', 'Cocinar'], ['Modelo', 'El pastel']]}
          />
        </Ejemplo>
      </Seccion>

      <Seccion titulo="Aprender">
        <p>
          Proceso mediante el cual un sistema <strong>mejora su desempeño en una tarea</strong> a partir de la
          experiencia, <strong>sin ser reprogramado</strong> para cada caso. Aprender no es guardar información: es
          que los resultados sean mejores después que antes.
        </p>
      </Seccion>

      <Seccion titulo="Entrenamiento e inferencia">
        <Correccion>
          <p>
            En el apunte quedó que el motor de inferencia «da como resultado un modelo». <strong>Está al revés.</strong>
            El modelo lo produce el entrenamiento; el motor de inferencia lo <strong>usa</strong>.
          </p>
        </Correccion>
        <Flujo titulo="Entrenamiento: una vez, caro" pasos={['Datos + Algoritmo', 'Entrenamiento', 'Modelo']} clave={[2]} />
        <Flujo titulo="Inferencia: muchas veces, barato" pasos={['Entrada nueva + Modelo', 'Inferencia', 'Respuesta']} clave={[2]} />
      </Seccion>

      <Seccion titulo="Programación tradicional contra machine learning">
        <Tabla
          cabeza={['', 'Programación tradicional', 'Machine learning']}
          filas={[
            ['Le das', 'Datos + reglas que tú escribiste', 'Datos + respuestas conocidas'],
            ['Te da', 'Respuestas', 'Las reglas (el modelo)'],
            ['Quién define la lógica', 'El programador', 'Se infiere de los datos'],
            ['Conviene cuando', 'Las reglas son conocidas y estables', 'Las reglas son difíciles de escribir a mano'],
          ]}
        />
        <Ejemplo titulo="Detectar spam">
          <p><strong>Tradicional:</strong> escribes «si contiene "premio" y "gratis", es spam».</p>
          <p><strong>Machine learning:</strong> le das 10,000 correos ya marcados y él deduce los patrones.</p>
        </Ejemplo>
      </Seccion>

      <Seccion titulo="Sobreajuste">
        <p>
          Cuando un modelo <strong>memoriza el ruido</strong> de los datos en lugar de aprender el patrón. Acierta con
          lo que ya vio y falla con lo nuevo. Pasa sobre todo con pocos datos y modelos muy complejos: por eso en el
          caso del comedor, con 80 a 100 días de datos, se empezó con una regresión simple.
        </p>
      </Seccion>
    </>
  );
}
