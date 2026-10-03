import { Agregado, Ejemplo, Flujo, Profe, Seccion, Tabla } from '../../componentes/Leccion';

export default function Aplicaciones() {
  return (
    <>
      <Seccion titulo="No es aprender algo nuevo">
        <Profe cita>No es que tengamos que aprender algo nuevo.</Profe>
        <p>Las aplicaciones usan las ramas y los enfoques que ya vimos, aplicados a problemas reales.</p>
      </Seccion>

      <Seccion titulo="Sistemas de control">
        <p>
          Un sistema de control <strong>mide</strong> una variable, la <strong>compara</strong> con el valor que se
          quiere y <strong>corrige</strong> la diferencia.
        </p>
        <Flujo pasos={['Medir', 'Comparar con lo deseado', 'Corregir']} />
        <Ejemplo titulo="Un termostato">
          <p>Mide la temperatura, la compara con la que pediste, y prende o apaga la calefacción.</p>
        </Ejemplo>
        <Agregado>
          <p>
            En el apunte quedó una fórmula como «Ktd». Lo más probable es que sea el <strong>controlador PID</strong>,
            que corrige con tres términos: <strong>P</strong> (el error de ahora), <strong>I</strong> (el error
            acumulado) y <strong>D</strong> (hacia dónde va el error, para anticiparse). Un controlador PI es el
            mismo sin el término D. Es una reconstrucción: confírmala en clase.
          </p>
        </Agregado>
      </Seccion>

      <Seccion titulo="El ejemplo de los aerogeneradores">
        <p>
          Usan <strong>control de pitch</strong>: cambian el ángulo de las aspas. Con poco viento las giran para captar
          más; con viento muy fuerte, para frenar y no dañarse.
        </p>
      </Seccion>

      <Seccion titulo="Estado del arte y frontera del conocimiento">
        <Tabla
          cabeza={['Concepto', 'Qué es']}
          filas={[
            ['Estado del arte', 'Lo más avanzado que existe hoy sobre un tema'],
            ['Frontera del conocimiento', 'Lo que nadie ha hecho hasta ahora; un paso más allá'],
          ]}
        />
        <h3>Lo que se mencionó como estado del arte en el control de aerogeneradores</h3>
        <Tabla
          cabeza={['Técnica', 'Qué aporta']}
          filas={[
            ['Optimización de controladores PI con IA', 'Ajustar las constantes del controlador con IA en lugar de a mano'],
            ['Control difuso (fuzzy)', 'Decidir con valores intermedios, no solo sí o no: «viento algo fuerte»'],
            ['Anticipación', 'Corregir antes de que el problema ocurra'],
            ['Random forest', 'Un modelo de aprendizaje automático para predecir'],
            ['PIML / PINN', 'Física más datos'],
          ]}
        />
        <h3>PIML y PINN: física más datos</h3>
        <p>
          <em>Physics-Informed Machine Learning</em> y <em>Physics-Informed Neural Networks</em>. Son modelos que aprenden
          de datos pero obligados a respetar las leyes físicas que ya se conocen: «modelos <em>data-driven</em>
          físicamente consistentes». Si ya sabemos cómo se comporta el sistema, le damos más peso a la física.
        </p>
        <h3>Mantenimiento predictivo</h3>
        <p>
          Del apunte: «si está vibrando… se enfoca a cuándo puede fallar o va a fallar». Usar los datos de los sensores,
          como la vibración, para <strong>anticipar una falla antes de que ocurra</strong>.
        </p>
      </Seccion>
    </>
  );
}
