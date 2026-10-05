// Simulacro con el formato que reportaron los compañeros:
// 18 preguntas, 8 de opción múltiple y 10 casos con incisos.

import { useState } from 'react';
import { Pregunta } from '../componentes/Pregunta';
import { Texto } from '../componentes/Texto';
import { TODAS } from '../contenido/preguntas';
import { tema } from '../contenido/temas';
import { registrar } from '../progreso';
import type { Pregunta as TPregunta } from '../tipos';

const azar = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((x, y) => x[0] - y[0]).map(([, x]) => x);

/**
 * Las 8 de opción múltiple («ramas, enfoques, las leyes»), pero como las
 * hace el profesor: siempre a partir de un caso. Nada de definiciones ni
 * flujos («¿a qué rama corresponde el flujo…?»): eso no lo pregunta.
 * Tres de ramas, tres de enfoques y dos de ética o leyes.
 */
export function armarExamen(): TPregunta[] {
  const deCaso = (tema: string) => azar(TODAS.filter((p) => p.deCaso && p.tema === tema));
  const generales = azar([...deCaso('ramas').slice(0, 3), ...deCaso('enfoques').slice(0, 3), ...deCaso('etica').slice(0, 2)]);
  // Los 10 casos con incisos: la mayoría de IA (ramas, enfoques, ética) y
  // algunos de lógica (simbolizar, tablas, conclusiones).
  const casosIA = azar(TODAS.filter((p) => p.tipo === 'caso' && p.tema === 'casos'));
  const casosLogica = azar(TODAS.filter((p) => p.tipo === 'caso' && p.tema === 'logica'));
  return [...generales, ...azar([...casosIA.slice(0, 7), ...casosLogica.slice(0, 3)])];
}

export function Simulacro() {
  const [examen, setExamen] = useState<TPregunta[] | null>(null);
  const [indice, setIndice] = useState(0);
  const [resultados, setResultados] = useState<number[]>([]);
  const [respondida, setRespondida] = useState(false);
  const [verResultados, setVerResultados] = useState(false);

  const empezar = () => {
    setExamen(armarExamen());
    setIndice(0);
    setResultados([]);
    setRespondida(false);
    setVerResultados(false);
  };

  if (!examen) {
    return (
      <div className="pagina angosta">
        <p className="rotulo">Simulacro</p>
        <h1>Examen de práctica</h1>
        <p className="entrada">
          Con el formato que reportaron los compañeros que ya lo presentaron. Cada simulacro sale distinto.
        </p>
        <div className="examen-bloques" style={{ marginTop: 24 }}>
          <div className="examen-bloque">
            <div className="num">8</div>
            <div className="que">Opción múltiple</div>
            <p>Cada una parte de un caso: dices sus ramas, sus enfoques o su riesgo ético. Nada de definiciones.</p>
          </div>
          <div className="examen-bloque">
            <div className="num">10</div>
            <div className="que">Casos con incisos</div>
            <p>Siete de IA (rama, enfoque, ética) y tres de lógica (simbolizar, tablas, conclusiones).</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'var(--tinta-2)' }}>
          Ten a la mano una hoja para hacer las tablas, como en el examen real.
        </p>
        <button className="boton examen" onClick={empezar}>Empezar simulacro</button>
      </div>
    );
  }

  if (verResultados) {
    const total = resultados.reduce((s, x) => s + x, 0);
    const pct = Math.round((total / examen.length) * 100);
    const om = resultados.slice(0, 8).reduce((s, x) => s + x, 0);
    const casos = resultados.slice(8).reduce((s, x) => s + x, 0);
    const porTema = new Map<string, { n: number; s: number }>();
    examen.forEach((p, i) => {
      const t = tema(p.tema).corto;
      const r = porTema.get(t) ?? { n: 0, s: 0 };
      porTema.set(t, { n: r.n + 1, s: r.s + resultados[i] });
    });
    const debiles = [...porTema.entries()].filter(([, r]) => r.s / r.n < 0.7).map(([t]) => t);

    return (
      <div className="pagina angosta">
        <p className="rotulo">Resultados</p>
        <h1>{pct} %</h1>
        <div className="marcador">
          <div className="marcador-celda"><div className="num">{om.toFixed(1).replace('.0', '')}/8</div><div className="que">Opción múltiple</div></div>
          <div className="marcador-celda"><div className="num">{casos.toFixed(1).replace('.0', '')}/10</div><div className="que">Casos (por incisos acertados)</div></div>
          <div className="marcador-celda"><div className="num">{examen.length}</div><div className="que">Preguntas</div></div>
        </div>
        {debiles.length > 0 && (
          <div className="bloque ojo">
            <span className="etiqueta">Repasa antes del examen</span>
            <p>Bajaste de 70 % en: <strong>{debiles.join(', ')}</strong>. Lo que fallaste quedó guardado en Repaso.</p>
          </div>
        )}
        <h2 style={{ margin: '28px 0 12px' }}>Pregunta por pregunta</h2>
        <div className="marco">
          <table className="datos">
            <thead><tr><th>#</th><th>Pregunta</th><th>Tema</th><th>Resultado</th></tr></thead>
            <tbody>
              {examen.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--mono)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 400 }}>
                    <Texto>{p.tipo === 'caso' ? p.titulo : 'enunciado' in p && p.enunciado ? p.enunciado.slice(0, 90) + (p.enunciado.length > 90 ? '…' : '') : 'Pregunta de lógica'}</Texto>
                  </td>
                  <td style={{ fontWeight: 400 }}>{tema(p.tema).corto}</td>
                  <td style={{ color: resultados[i] === 1 ? 'var(--bien)' : resultados[i] === 0 ? 'var(--mal)' : 'var(--examen)', fontFamily: 'var(--mono)' }}>
                    {resultados[i] === 1 ? 'Bien' : resultados[i] === 0 ? 'Mal' : `${Math.round(resultados[i] * 100)} %`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fila" style={{ marginTop: 18 }}>
          <button className="boton examen" onClick={empezar}>Otro simulacro</button>
        </div>
      </div>
    );
  }

  const actual = examen[indice];
  const esUltima = indice === examen.length - 1;

  return (
    <div className="pagina angosta pila">
      <div className="sesion">
        <span style={{ fontWeight: 600, color: 'var(--examen)' }}>Simulacro</span>
        <span style={{ fontFamily: 'var(--mono)' }}>{indice + 1} / {examen.length}</span>
        <div className="medidor-barra" style={{ flex: 1 }}>
          <div className="medidor-relleno" style={{ width: `${((indice + (respondida ? 1 : 0)) / examen.length) * 100}%`, background: 'var(--examen)' }} />
        </div>
        <span>{indice < 8 ? 'Opción múltiple' : 'Casos'}</span>
      </div>

      <Pregunta
        key={`${actual.id}-${indice}`}
        p={actual}
        etiqueta={tema(actual.tema).corto}
        onListo={(f) => {
          registrar(actual.id, f);
          setResultados((r) => { const c = [...r]; c[indice] = f; return c; });
          setRespondida(true);
        }}
      />

      <div className="accion-fija">
        {respondida && !esUltima && (
          <button className="boton" onClick={() => { setIndice(indice + 1); setRespondida(false); window.scrollTo({ top: 0 }); }}>
            Siguiente →
          </button>
        )}
        {respondida && esUltima && (
          <button className="boton examen" onClick={() => { setVerResultados(true); window.scrollTo({ top: 0 }); }}>
            Ver resultados
          </button>
        )}
      </div>
    </div>
  );
}
