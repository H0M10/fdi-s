import { Agregado, Correccion, Ejemplo, Ojo, Profe, S, Seccion, Tabla } from '../../componentes/Leccion';
import { TablaVerdad } from '../../componentes/TablaVerdad';

export default function Logica() {
  return (
    <>
      <Seccion titulo="Para qué sirve esto en IA">
        <Profe cita>
          La IA no decide, nos va a dar una inferencia; a partir de esa inferencia nosotros ponemos una regla.
        </Profe>
        <p>
          Un modelo de machine learning puede inferir que el motor está en falla. Pero la <strong>regla</strong>
          que decide apagarlo la escribe una persona, y se escribe con lógica.
        </p>
      </Seccion>

      <Seccion titulo="Qué es una proposición">
        <p>Una <strong>afirmación que puede ser verdadera o falsa</strong>. Nada más.</p>
        <Tabla
          cabeza={['Frase', '¿Proposición?', 'Por qué']}
          filas={[
            ['México está en Europa', 'Sí', 'Es falsa, pero falsa también es un valor'],
            ['México está en América', 'Sí', 'Es verdadera'],
            ['Cierra la puerta', 'No', 'Es una orden'],
            ['¿Tienen calor?', 'No', 'Es una pregunta'],
            ['¡Ah, caray!', 'No', 'No se presta a ser verdadera o falsa'],
          ]}
        />
      </Seccion>

      <Seccion titulo="De la frase a los símbolos">
        <ol>
          <li>Separa las proposiciones. Los conectores (y, o, si… entonces, no) no son proposiciones: son el pegamento.</li>
          <li><strong>Escríbelas todas en positivo.</strong> Si un trozo viene negado, la proposición se guarda afirmativa y la negación va en la fórmula.</li>
          <li>Asígnales letras: p, q, r, s.</li>
          <li>Traduce los conectores y <strong>apóyate en paréntesis</strong>.</li>
        </ol>
        <Ejemplo titulo="Ejemplo de clase: el motor">
          <p>«Si el motor está encendido y está caliente, entonces está fallando» → <strong>3 proposiciones</strong>.</p>
          <p>p: el motor está encendido · q: está caliente · r: está fallando</p>
          <p><S>(p ∧ q) → r</S></p>
        </Ejemplo>
        <Ejemplo titulo="Ejemplo de clase: el sistema contra incendios">
          <p>«Si existe humo o fuego, y el sistema contra incendios <strong>no</strong> está disponible…»</p>
          <p>
            La proposición se guarda en positivo: <strong>r: el sistema está disponible</strong>. El «no» va en la
            fórmula como <S>¬r</S>. Si guardaras «r: no está disponible», la tabla saldría igual, pero al aplicar De
            Morgan o negar la regla ya no sabrías que r traía una negación adentro, y el resultado saldría al revés.
          </p>
        </Ejemplo>
        <Ojo titulo="Dos trampas de traducción">
          <p><strong>«A si B»</strong> se escribe <S>B → A</S>. «Se riega si el suelo está seco» es <S>seco → riega</S>.</p>
          <p>
            <strong>«A solo si B»</strong> se escribe <S>A → B</S>. «El sistema funciona solo si hay energía» es
            <S> funciona → energía</S>: que haya energía no garantiza que funcione.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="Los conectores">
        <Tabla
          cabeza={['Símbolo', 'Nombre', 'Se lee', 'Es falso solo cuando…']}
          filas={[
            [<S key="1">¬</S>, 'Negación', 'no', 'Invierte el valor'],
            [<S key="2">∧</S>, 'Conjunción', 'y', 'Alguna de las dos es falsa'],
            [<S key="3">∨</S>, 'Disyunción', 'o', 'Las dos son falsas'],
            [<S key="4">→</S>, 'Implicación', 'si… entonces', 'La primera es V y la segunda F'],
            [<S key="5">↔</S>, 'Bicondicional', 'si y solo si', 'Las dos tienen valor distinto'],
          ]}
        />
        <Correccion>
          <p>
            En el apunte quedó «V» para la disyunción. Es <S>∨</S>, que se parece a una V. No lo confundas con la V
            de verdadero dentro de la tabla.
          </p>
        </Correccion>
        <h3>La implicación, que es la que todos fallan</h3>
        <TablaVerdad formula="p → q" />
        <p>
          Piénsala como una promesa. «Si estudias, apruebas» solo se rompe si <strong>estudiaste y no
          aprobaste</strong>. Si no estudiaste, la promesa nunca se puso a prueba, y una promesa que no se rompió
          cuenta como cumplida. Por eso los dos renglones donde p es falsa dan verdadero.
        </p>
      </Seccion>

      <Seccion titulo="Cuántos renglones, y por qué se llenan así">
        <p>
          Son <strong>2ⁿ</strong>, con <em>n</em> = número de letras <strong>distintas</strong>. Si p aparece tres
          veces, sigue contando como una.
        </p>
        <Tabla
          cabeza={['Letras', 'Renglones', 'Se agregaron']}
          filas={[['1', '2', '—'], ['2', '4', '+2'], ['3', '8', '+4'], ['4', '16', '+8']]}
        />
        <p>
          Al meter una letra <strong>se agregan tantos renglones como ya tenías</strong>: la tabla se duplica,
          porque cada combinación vieja ahora se puede dar con la letra nueva verdadera o falsa.
        </p>
        <h3>Por qué la primera columna va VVFF y la última VFVF</h3>
        <p>
          Una tabla de verdad <strong>no calcula un resultado: prueba todos los escenarios posibles</strong>, sin
          saltarse ninguno ni repetir ninguno. Por eso no puede ser todo V: estarías probando un solo escenario.
        </p>
        <p>
          El patrón es un <strong>contador</strong>. Como en el odómetro de un coche, la rueda de la derecha gira
          rápido y la de la izquierda casi no se mueve. La última letra cambia en cada renglón; la primera cambia
          una sola vez, a la mitad.
        </p>
        <Tabla
          cabeza={['Letra', 'Con 3 letras', 'Con 4 letras']}
          filas={[
            ['Primera', 'Bloques de 4: VVVVFFFF', 'Bloques de 8'],
            ['Segunda', 'Bloques de 2: VVFFVVFF', 'Bloques de 4'],
            ['Tercera', 'Bloques de 1: VFVFVFVF', 'Bloques de 2'],
            ['Cuarta', '—', 'Bloques de 1'],
          ]}
        />
        <Ojo titulo="Cómo saber que no perdiste un renglón">
          <p>Cuenta que sean 2ⁿ. Revisa que la última columna de letras alterne de uno en uno sin excepción. Y que el primer renglón sea todo V y el último todo F.</p>
        </Ojo>
      </Seccion>

      <Seccion titulo="Cómo se resuelve una tabla completa">
        <p>
          Nunca la columna final de un jalón: resuelve primero los paréntesis más internos, cada uno en su propia
          columna. Esta es la del ejemplo de incendios, con sus cuatro pasos:
        </p>
        <TablaVerdad formula="((p ∨ q) ∧ ¬r) → s" />
      </Seccion>

      <Seccion titulo="Tautología, contradicción y contingencia">
        <p>Se mira <strong>solo la columna final</strong>:</p>
        <Tabla
          cabeza={['Nombre', 'La columna final…', 'Ejemplo']}
          filas={[
            ['Tautología', 'es siempre verdadera', <S key="t">p ∨ ¬p</S>],
            ['Contradicción', 'es siempre falsa', <S key="c">p ∧ ¬p</S>],
            ['Contingencia', 'tiene de las dos', <S key="g">p → q</S>],
          ]}
        />
        <Ojo titulo="En el examen piden justificar">
          <p>
            La justificación tiene siempre la misma forma: <em>«es tautología porque en los 4 renglones de la tabla la
            columna final es verdadera»</em>. Para una contingencia: <em>«porque la columna final tiene 3 verdaderos y
            1 falso; el resultado depende de los valores»</em>.
          </p>
        </Ojo>
        <Agregado>
          <p>
            Una regla de decisión que resulta tautología no decide nada: se dispara siempre. Una contradicción nunca
            se dispara. Las reglas útiles son contingentes.
          </p>
        </Agregado>
      </Seccion>

      <Seccion titulo="Leyes">
        <h3>De Morgan</h3>
        <Correccion>
          <p>
            En el apunte quedó: «si tenemos negados p y q es lo mismo que negar p o q». Así no se entiende, porque le
            faltan los paréntesis que deciden todo. Son <strong>dos leyes</strong>, y en las dos la negación entra al
            paréntesis y <strong>el conector se voltea</strong>.
          </p>
        </Correccion>
        <Tabla
          cabeza={['Ley', 'En español']}
          filas={[
            [<S key="1">¬(p ∧ q) ≡ ¬p ∨ ¬q</S>, '«No es cierto que esté actualizado y protegido» = le falta al menos una'],
            [<S key="2">¬(p ∨ q) ≡ ¬p ∧ ¬q</S>, '«No hay humo ni fuego» = no hay ninguno de los dos'],
          ]}
        />
        <p>Compruébalo: si dos fórmulas son equivalentes, unidas con ↔ dan tautología.</p>
        <TablaVerdad formula="¬(p ∧ q) ↔ (¬p ∨ ¬q)" />
        <h3>Otras equivalencias útiles</h3>
        <Tabla
          cabeza={['Ley', 'Equivalencia']}
          filas={[
            ['Doble negación', <S key="1">¬¬p ≡ p</S>],
            ['Contrapositiva', <S key="2">p → q ≡ ¬q → ¬p</S>],
            ['Implicación como disyunción', <S key="3">p → q ≡ ¬p ∨ q</S>],
          ]}
        />
        <Ojo>
          <p>
            La contrapositiva <S>¬q → ¬p</S> sí es equivalente a <S>p → q</S>. Pero la recíproca <S>q → p</S> y la
            inversa <S>¬p → ¬q</S> <strong>no</strong> lo son.
          </p>
        </Ojo>
      </Seccion>

      <Seccion titulo="Sacar conclusiones">
        <p>
          Según los compañeros, el examen trae «un enunciado donde tenías que poner qué conclusiones te salían».
          Estas son las cuatro reglas válidas y las dos trampas.
        </p>
        <Tabla
          cabeza={['Regla', 'Si sabes…', '…concluyes', 'Ejemplo']}
          filas={[
            ['Modus ponens', 'p → q, y p', 'q', 'Si llueve, el piso se moja. Llueve. → El piso se moja'],
            ['Modus tollens', 'p → q, y ¬q', '¬p', 'Si hay humo, suena la alarma. No sonó. → No hubo humo'],
            ['Silogismo hipotético', 'p → q, y q → r', 'p → r', 'Si estudio, apruebo; si apruebo, me gradúo. → Si estudio, me gradúo'],
            ['Silogismo disyuntivo', 'p ∨ q, y ¬p', 'q', 'Falla el servidor o la red. No es el servidor. → Es la red'],
          ]}
        />
        <Ojo titulo="Las dos trampas">
          <p>
            <strong>Afirmar el consecuente:</strong> de <S>p → q</S> y <S>q</S> <strong>no</strong> se concluye p.
            «Si llueve, el piso se moja. El piso está mojado.» Pudieron haber lavado.
          </p>
          <p>
            <strong>Negar el antecedente:</strong> de <S>p → q</S> y <S>¬p</S> <strong>no</strong> se concluye ¬q.
            «Si es administrador, puede borrar. No es administrador.» Podría tener otro permiso.
          </p>
        </Ojo>
        <Agregado>
          <p>
            Cómo comprobar cualquier conclusión con una tabla: haz la tabla de las premisas y la conclusión juntas.
            La conclusión es válida si en <strong>todos</strong> los renglones donde las premisas son verdaderas, la
            conclusión también lo es.
          </p>
        </Agregado>
      </Seccion>
    </>
  );
}
