// Inicio, página de tema, repaso y constructor de tablas.

import { useState } from 'react';
import { Agregado } from '../componentes/Leccion';
import { Teclado } from '../componentes/Pregunta';
import { TablaVerdad } from '../componentes/TablaVerdad';
import { LECCIONES } from '../contenido/lecciones';
import { deTema, porId, TODAS } from '../contenido/preguntas';
import { anterior, BLOQUES, numero, siguiente, tema, TEMAS } from '../contenido/temas';
import { analizar, aTexto, clasificar, ErrorFormula, justificar, NOMBRE_CLASE, variables } from '../logica/motor';
import { reiniciar, resumen, useProgreso } from '../progreso';
import { ir } from '../rutas';
import type { IdTema } from '../tipos';
import { Practica } from './Practica';

/* ------------------------------------------------------------------ */
/* Inicio                                                             */
/* ------------------------------------------------------------------ */
export function Inicio() {
  const progreso = useProgreso();
  const global = resumen(TODAS.map((p) => p.id), progreso);
  const fallidas = TODAS.filter((p) => progreso[p.id] && progreso[p.id].ultimo < 1).length;

  return (
    <div className="pagina">
      <p className="rotulo">Fundamentos de IA</p>
      <h1>Todo lo del examen, tema por tema</h1>
      <p className="entrada">
        Explicaciones con los ejemplos de clase, {TODAS.length} preguntas para practicar y un simulacro con el
        mismo formato del examen.
      </p>

      <section className="examen-tarjeta" aria-labelledby="examen-titulo">
        <p className="rotulo">Cómo es el examen</p>
        <h2 id="examen-titulo">18 preguntas, según los que ya lo presentaron</h2>
        <div className="examen-bloques">
          <div className="examen-bloque">
            <div className="num">8</div>
            <div className="que">Opción múltiple</div>
            <p>Generales: ramas, enfoques, leyes. «Esas están fáciles.»</p>
          </div>
          <div className="examen-bloque">
            <div className="num">10</div>
            <div className="que">Casos con 4 incisos</div>
            <p>Te dan un caso de IA y te piden la rama, el enfoque y los problemas éticos.</p>
          </div>
          <div className="examen-bloque">
            <div className="num">2+</div>
            <div className="que">Tablas de verdad</div>
            <p>Simbolizar y hacer la tabla, sacar conclusiones, y clasificar justificando.</p>
          </div>
        </div>
        <div className="fila">
          <button className="boton examen" onClick={() => ir('simulacro')}>Hacer un simulacro</button>
          {fallidas > 0 && <button className="boton sec" onClick={() => ir('repaso')}>Repasar {fallidas} falladas</button>}
        </div>
      </section>

      <div className="fila" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2>Temas, en orden de estudio</h2>
        {global.vistas > 0 && (
          <span className="medidor-texto">{global.dominadas} de {global.total} dominadas</span>
        )}
      </div>
      <p style={{ fontSize: 14, color: 'var(--tinta-2)', margin: '6px 0 0', maxWidth: '62ch' }}>
        Van en el orden en que se dieron en clase, que también es el orden en que se necesitan: cada uno usa lo
        del anterior.
      </p>
      {BLOQUES.map((b) => (
        <section key={b.id} className="bloque-temas" aria-labelledby={`bloque-${b.id}`}>
          <div className="bloque-temas-cabeza">
            <h3 id={`bloque-${b.id}`}>{b.titulo}</h3>
            <p>{b.idea}</p>
          </div>
          <div className="temas-rejilla">
            {TEMAS.filter((t) => t.bloque === b.id).map((t) => {
              const r = resumen(deTema(t.id).map((p) => p.id), progreso);
              return (
                <button key={t.id} className="tema-tarjeta" onClick={() => ir(`tema-${t.id}`)}>
                  <span className="tema-num">{numero(t.id)}</span>
                  <h3>{t.titulo}</h3>
                  <p>{t.resumen}</p>
                  <span className="en-examen">{t.enExamen}</span>
                  <div className="medidor">
                    <div className="medidor-barra"><div className="medidor-relleno" style={{ width: `${(r.dominadas / r.total) * 100}%` }} /></div>
                    <span className="medidor-texto">{r.dominadas}/{r.total}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <footer className="pie">
        <p>
          Construido sobre los apuntes de clase. Los bloques azules son lo que dijo el profesor; los rojos, errores del
          apunte corregidos; los punteados, cosas agregadas que no venían en clase.
        </p>
        <p>
          Las respuestas de tablas, clasificación y conclusiones no están escritas a mano: las calcula un motor de
          lógica verificado con pruebas automáticas.
        </p>
        {global.vistas > 0 && (
          <p><button className="boton fant chico" onClick={() => reiniciar()}>Borrar mi progreso</button></p>
        )}
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página de un tema                                                  */
/* ------------------------------------------------------------------ */
export function PaginaTema({ id, practicar }: { id: IdTema; practicar: boolean }) {
  const t = tema(id);
  const Leccion = LECCIONES[id];
  const preguntas = deTema(id);
  const progreso = useProgreso();
  const r = resumen(preguntas.map((p) => p.id), progreso);
  const ant = anterior(id);
  const sig = siguiente(id);
  const bloque = BLOQUES.find((b) => b.id === t.bloque)!;

  return (
    <div className="pagina angosta">
      <div className="tema-cabecera">
        <p className="rotulo">Tema {numero(id)} de {TEMAS.length} · {bloque.titulo}</p>
        <h1>{t.titulo}</h1>
        <p className="entrada">{t.resumen}</p>
        <div className="bloque ojo" style={{ marginTop: 16, marginBottom: 0 }}>
          <span className="etiqueta">En el examen</span>
          <p>{t.enExamen}</p>
        </div>
      </div>

      <div className="pestanas" role="tablist">
        <button role="tab" aria-selected={!practicar} onClick={() => ir(`tema-${id}`)}>Aprender</button>
        <button role="tab" aria-selected={practicar} onClick={() => ir(`practica-${id}`)}>
          Practicar · {preguntas.length}
        </button>
        <span style={{ marginLeft: 'auto', alignSelf: 'center' }} className="medidor-texto">{r.dominadas}/{r.total}</span>
      </div>

      {practicar ? (
        <Practica
          preguntas={preguntas}
          siguienteTema={sig ? { numero: numero(sig.id), titulo: sig.titulo, ir: () => ir(`tema-${sig.id}`) } : undefined}
          alVolverLeccion={() => ir(`tema-${id}`)}
        />
      ) : (
        <>
          <article className="leccion"><Leccion /></article>
          <div className="fila" style={{ marginTop: 10 }}>
            <button className="boton" onClick={() => { ir(`practica-${id}`); window.scrollTo({ top: 0 }); }}>
              Practicar con {preguntas.length} preguntas →
            </button>
          </div>
        </>
      )}

      <nav className="vecinos" aria-label="Orden de estudio">
        {ant ? (
          <button className="vecino" onClick={() => ir(`tema-${ant.id}`)}>
            <span className="vecino-rotulo">← Anterior</span>
            <span className="vecino-titulo">{numero(ant.id)}. {ant.titulo}</span>
          </button>
        ) : <span />}
        {sig ? (
          <button className="vecino siguiente" onClick={() => ir(`tema-${sig.id}`)}>
            <span className="vecino-rotulo">Siguiente →</span>
            <span className="vecino-titulo">{numero(sig.id)}. {sig.titulo}</span>
          </button>
        ) : (
          <button className="vecino siguiente" onClick={() => ir('simulacro')}>
            <span className="vecino-rotulo">Terminaste los temas →</span>
            <span className="vecino-titulo">Haz un simulacro</span>
          </button>
        )}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Repaso de lo fallado                                               */
/* ------------------------------------------------------------------ */
export function Repaso() {
  const progreso = useProgreso();
  const [ids] = useState(() => Object.keys(progreso).filter((k) => progreso[k].ultimo < 1 && porId.has(k)));
  const preguntas = ids.map((k) => porId.get(k)!);

  return (
    <div className="pagina angosta">
      <p className="rotulo">Repaso</p>
      <h1>Lo que has fallado</h1>
      <p className="entrada">
        Cada pregunta que contestas mal se guarda aquí. Cuando la aciertes, sale de la lista la próxima vez que entres.
      </p>
      <div style={{ marginTop: 22 }}>
        {preguntas.length === 0 ? (
          <div className="vacio">
            <p style={{ margin: 0 }}>No tienes preguntas falladas pendientes.</p>
            <p style={{ margin: '10px 0 0' }}><button className="boton sec" onClick={() => ir('simulacro')}>Hacer un simulacro</button></p>
          </div>
        ) : (
          <Practica preguntas={preguntas} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Constructor de tablas                                              */
/* ------------------------------------------------------------------ */
const EJEMPLOS = [
  ['motor', '(p ∧ q) → r'],
  ['incendios', '((p ∨ q) ∧ ¬r) → s'],
  ['De Morgan', '¬(p ∧ q) ↔ (¬p ∨ ¬q)'],
  ['contrapositiva', '(p → q) ↔ (¬q → ¬p)'],
  ['modus ponens', '((p → q) ∧ p) → q'],
  ['tautología', 'p ∨ ¬p'],
  ['contradicción', 'p ∧ ¬p'],
];

export function Constructor() {
  const [texto, setTexto] = useState('(p ∧ q) → r');
  let error = '';
  let arbol = null;
  try {
    if (texto.trim()) {
      arbol = analizar(texto);
      if (variables(arbol).length > 5) { error = 'Con más de 5 letras la tabla pasa de 32 renglones. Divídela en partes.'; arbol = null; }
    }
  } catch (e) {
    error = e instanceof ErrorFormula ? e.message : 'No se pudo leer la fórmula.';
  }

  return (
    <div className="pagina angosta">
      <p className="rotulo">Herramienta</p>
      <h1>Constructor de tablas</h1>
      <p className="entrada">
        Escribe una fórmula y la resuelve con todas las columnas intermedias. Úsalo para comprobar las tablas que
        hagas en tu cuaderno.
      </p>
      <div className="pregunta" style={{ marginTop: 22 }}>
        <input className="campo" value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Fórmula"
          spellCheck={false} autoCapitalize="off" autoComplete="off" />
        <Teclado letras={['p', 'q', 'r', 's']} alInsertar={(s) => setTexto((t) => t + s)} />
        <div className="fila" style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: 'var(--tinta-3)' }}>Ejemplos:</span>
          {EJEMPLOS.map(([n, f]) => <button key={n} className="boton fant chico" onClick={() => setTexto(f)}>{n}</button>)}
          <button className="boton fant chico" onClick={() => setTexto('')}>borrar</button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--tinta-3)', margin: '0 0 14px' }}>
          Atajos: <code className="simb">~</code> o <code className="simb">!</code> para ¬,
          <code className="simb">^</code> para ∧, <code className="simb">v</code> para ∨,
          <code className="simb">-&gt;</code> para →, <code className="simb">&lt;-&gt;</code> para ↔.
        </p>
        {error && <p className="aviso error">{error}</p>}
        {arbol && (
          <>
            <p className="aviso info">Leída así: <strong>{aTexto(arbol)}</strong> · {NOMBRE_CLASE[clasificar(arbol)]}</p>
            <TablaVerdad formula={texto} />
            <p style={{ fontSize: 14.5 }}><strong>Justificación:</strong> {justificar(arbol)}</p>
          </>
        )}
      </div>
      <Agregado>
        <p>
          Para comprobar si dos fórmulas son equivalentes, únelas con ↔. Si sale tautología, lo son. Para comprobar una
          conclusión, escribe <code className="simb">(premisa1 ∧ premisa2) → conclusión</code>: si es tautología, la
          conclusión es válida.
        </p>
      </Agregado>
    </div>
  );
}
