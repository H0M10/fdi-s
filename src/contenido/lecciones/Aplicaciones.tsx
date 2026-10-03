import { Agregado, Ejemplo, Flujo, Ojo, Profe, Seccion, Tabla } from '../../componentes/Leccion';
import { SimuladorPID } from '../../componentes/SimuladorPID';

function Formula() {
  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(14px, 3.6vw, 18px)', background: 'var(--superficie)', border: '1px solid var(--linea)', borderRadius: 8, padding: '16px 14px', margin: '0 0 18px', textAlign: 'center', overflowX: 'auto', whiteSpace: 'nowrap' }}>
      u(t) = <span style={{ color: 'var(--acento)' }}>K<sub>p</sub>·e(t)</span>
      {' + '}<span style={{ color: 'var(--examen)' }}>K<sub>i</sub>·∫ e(t) dt</span>
      {' + '}<span style={{ color: 'var(--bien)' }}>K<sub>d</sub>·de(t)/dt</span>
    </div>
  );
}

export default function Aplicaciones() {
  return (
    <>
      <Seccion titulo="No es aprender algo nuevo">
        <Profe cita>No es que tengamos que aprender algo nuevo.</Profe>
        <p>
          Las aplicaciones juntan las ramas y los enfoques que ya vimos para resolver un problema real. El ejemplo
          de clase fue el control de un <strong>aerogenerador</strong>, y para entenderlo primero hay que entender
          qué es un sistema de control.
        </p>
      </Seccion>

      <Seccion titulo="Sistemas de control">
        <p>
          Un sistema de control <strong>mide</strong> una variable, la <strong>compara</strong> con el valor que se
          quiere y <strong>corrige</strong> la diferencia. A esa diferencia se le llama <strong>error</strong>.
        </p>
        <Flujo pasos={['Medir', 'Comparar con el valor deseado', 'Calcular el error', 'Corregir']} clave={[2]} />
        <Ejemplo titulo="Un termostato">
          <p>Mide la temperatura, la compara con la que pediste, y prende o apaga la calefacción.</p>
        </Ejemplo>
      </Seccion>

      <Seccion titulo="El controlador PID: tres componentes">
        <p>
          Es el controlador que explicó el profesor. Calcula cuánto corregir sumando <strong>tres
          componentes</strong>, y uno de ellos es una <strong>integral</strong>:
        </p>
        <Formula />
        <p style={{ fontSize: 14.5, color: 'var(--tinta-2)' }}>
          <strong>e(t)</strong> es el error: cuánto se aleja lo que mides de lo que quieres. <strong>u(t)</strong> es
          la corrección que se aplica. Las tres <strong>K</strong> son números que se ajustan: dicen cuánto pesa cada
          componente.
        </p>
        <Tabla
          cabeza={['Componente', 'Mira…', 'Qué resuelve', 'Si solo usaras este']}
          filas={[
            ['P · proporcional', 'El error de ahora', 'Corrige más cuanto más lejos estás', 'Siempre queda un error que no alcanza a quitar'],
            ['I · integral', 'El error acumulado en el tiempo', 'Elimina el error que va quedando: mientras siga habiendo error, la integral sigue creciendo', 'Corrige de más y oscila'],
            ['D · derivativo', 'Qué tan rápido cambia el error', 'Frena antes de pasarse: se anticipa un poco', 'No sirve solo: no corrige un error que no cambia'],
          ]}
        />
        <Ejemplo titulo="Para recordarlo: la regadera">
          <p>Quieres el agua tibia y sale fría.</p>
          <p><strong>P:</strong> giras la llave más cuanto más fría está.</p>
          <p><strong>I:</strong> si ya llevas rato con el agua un poco fría, sigues girando aunque la diferencia sea chica. Es lo que quita el «casi».</p>
          <p><strong>D:</strong> si sientes que se está calentando muy rápido, aflojas antes de quemarte.</p>
        </Ejemplo>
        <Agregado>
          <p>
            En el apunte quedó «Ktd» y «control fuzzy». Las tres K son las constantes K<sub>p</sub>, K<sub>i</sub> y
            K<sub>d</sub>. Un controlador <strong>PI</strong> es el mismo sin el componente D, y es el que aparece en
            «optimización de PI».
          </p>
        </Agregado>
      </Seccion>

      <Seccion titulo="El caso del aerogenerador">
        <p>
          El aerogenerador tiene que mantener su velocidad estable aunque el viento cambie. La forma de hacerlo es el
          <strong> control de pitch</strong>: girar las aspas. Con poco viento se giran para captar más; con viento
          fuerte, para frenar y no dañarse.
        </p>
        <h3>Por qué un PID solo no alcanza</h3>
        <p>
          El PID <strong>reacciona</strong>: corrige cuando el error ya apareció. Con el viento eso es un problema,
          porque una ráfaga cambia más rápido de lo que las aspas alcanzan a girar. Cuando el PID se entera, la ráfaga
          ya aceleró el rotor. Además hay muchos factores a la vez —velocidad del viento, dirección, turbulencia,
          temperatura, desgaste—, y unas constantes K fijas no funcionan igual de bien en todas las condiciones.
        </p>
        <Profe>
          <p>
            La idea del estado del arte es <strong>llegar a la inferencia mucho antes que en tiempo real</strong>,
            porque en tiempo real ya hubo cambios.
          </p>
        </Profe>
        <h3>Velo en el simulador</h3>
        <p>
          Prueba cada configuración en orden. Cuando llega la ráfaga, la velocidad sube; el control tiene que
          regresarla a la línea verde.
        </p>
        <SimuladorPID />
        <Ojo titulo="Lo que hay que ver">
          <p><strong>Solo P</strong> mejora, pero el error nunca llega a cero.</p>
          <p><strong>PI</strong> sí lo elimina, gracias a la integral, pero se pasa y oscila.</p>
          <p><strong>PID</strong> llega más suave: la derivada frena antes de pasarse.</p>
          <p>
            <strong>PID + predicción</strong> es la idea del estado del arte: con el <strong>mismo</strong> PID, el pico
            baja a menos de la tercera parte, porque las aspas empiezan a girar antes de que la ráfaga llegue.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="Cómo se aplicó todo lo que vimos">
        <p>
          Este es el punto de la clase: el problema del aerogenerador no se resuelve con una sola cosa, sino juntando
          ramas, enfoques y el PID.
        </p>
        <Tabla
          cabeza={['Pieza', 'Rama o enfoque', 'Qué aporta al aerogenerador']}
          filas={[
            ['Sensores de viento y de vibración', 'Percepción computacional', 'Los datos de lo que está pasando'],
            ['Random forest', 'Aprendizaje automático', 'Predecir el viento o la carga antes de que llegue'],
            ['Optimización de PI', 'Búsqueda y optimización', 'Encontrar los mejores valores de las K en lugar de ajustarlos a mano'],
            ['Control difuso (fuzzy)', 'Reglas con valores intermedios', 'Decidir con «viento algo fuerte», no solo sí o no'],
            ['PIML / PINN', 'Aprendizaje automático + física', 'Un modelo que aprende de datos pero respeta las leyes físicas'],
            ['PID', 'Sistema de control', 'Ejecutar la corrección en las aspas'],
          ]}
        />
        <p>Es un <strong>sistema híbrido</strong>: ninguna pieza sirve sola, y cada una cubre lo que la otra no puede.</p>
      </Seccion>

      <Seccion titulo="Estado del arte y frontera del conocimiento">
        <Tabla
          cabeza={['Concepto', 'Qué es']}
          filas={[
            ['Estado del arte', 'Lo más avanzado que existe hoy sobre un tema'],
            ['Frontera del conocimiento', 'Lo que nadie ha hecho hasta ahora; un paso más allá'],
          ]}
        />
        <h3>PIML y PINN: física más datos</h3>
        <p>
          <em>Physics-Informed Machine Learning</em> y <em>Physics-Informed Neural Networks</em>. Aprenden de datos, pero
          obligados a respetar las leyes físicas que ya se conocen: «modelos <em>data-driven</em> físicamente
          consistentes». Como ya sabemos cómo funciona un aerogenerador, se le da más peso a la física.
        </p>
        <h3>Mantenimiento predictivo</h3>
        <p>
          Del apunte: «si está vibrando… se enfoca a cuándo puede fallar o va a fallar». Usar los datos de los sensores
          para <strong>anticipar una falla</strong> antes de que ocurra. Es la misma idea que el control con predicción,
          aplicada al mantenimiento.
        </p>
      </Seccion>
    </>
  );
}
