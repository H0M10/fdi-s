import { Ojo, Seccion, Tabla } from '../../componentes/Leccion';

export default function QueEs() {
  return (
    <>
      <Seccion titulo="La inteligencia es un conjunto de habilidades">
        <p>No es una sola capacidad. En clase se mencionaron cinco; quedaron anotadas cuatro:</p>
        <ol>
          <li><strong>Percepción</strong></li>
          <li><strong>Razonamiento</strong></li>
          <li><strong>Acción</strong></li>
          <li><strong>Adaptabilidad</strong></li>
        </ol>
        <p style={{ fontSize: 14, color: 'var(--tinta-3)' }}>La quinta quedó pendiente en el apunte. Pregúntala en clase.</p>
      </Seccion>

      <Seccion titulo="IA débil e IA fuerte">
        <Tabla
          cabeza={['', 'Qué es', 'Ejemplos']}
          filas={[
            ['IA débil', 'De propósito específico: hace una tarea concreta', 'Deep Blue juega ajedrez, Roomba aspira, un filtro clasifica spam'],
            ['IA fuerte', 'Capaz de sentir y pensar como humano', 'No existe todavía'],
          ]}
        />
        <Ojo>
          <p>
            <strong>Toda la IA que existe hoy es débil</strong>, incluidos los chatbots más avanzados. Conversar de
            muchos temas no es lo mismo que sentir y pensar como humano. Si un caso describe un sistema real y
            pregunta si es débil o fuerte, la respuesta es débil.
          </p>
          <p>«Fuerte» no tiene que ver con la potencia de cómputo.</p>
        </Ojo>
      </Seccion>
    </>
  );
}
