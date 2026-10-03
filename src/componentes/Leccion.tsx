// Bloques para escribir las lecciones.
//
// Cada bloque marca de dónde viene el contenido, porque importa para el
// examen: lo que dijo el profesor es lo que se califica, lo agregado sirve
// para entender, y las correcciones evitan escribir un error del apunte.

import type { ReactNode } from 'react';

export function Seccion({ titulo, children, id }: { titulo: string; children: ReactNode; id?: string }) {
  return (
    <section className="seccion" id={id}>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

/** Lo que dijo el profesor. Es lo que se califica. */
export function Profe({ children, cita = false }: { children: ReactNode; cita?: boolean }) {
  return (
    <div className="bloque profe">
      <span className="etiqueta">Así lo dijo el profesor</span>
      {cita ? <p className="cita">«{children}»</p> : children}
    </div>
  );
}

/** Lo que conviene tener presente en el examen. */
export function Ojo({ children, titulo = 'Ojo en el examen' }: { children: ReactNode; titulo?: string }) {
  return (
    <div className="bloque ojo">
      <span className="etiqueta">{titulo}</span>
      {children}
    </div>
  );
}

/** Un error del apunte, con la versión correcta. */
export function Correccion({ children }: { children: ReactNode }) {
  return (
    <div className="bloque correccion">
      <span className="etiqueta">Corrección del apunte</span>
      {children}
    </div>
  );
}

export function Ejemplo({ children, titulo = 'Ejemplo' }: { children: ReactNode; titulo?: string }) {
  return (
    <div className="bloque ejemplo">
      <span className="etiqueta">{titulo}</span>
      {children}
    </div>
  );
}

/** Contenido que no viene de clase: se agregó para entender mejor. */
export function Agregado({ children }: { children: ReactNode }) {
  return (
    <div className="bloque agregado">
      <span className="etiqueta">Agregado · no viene de los apuntes</span>
      {children}
    </div>
  );
}

/** El diagrama de flechas que usaba el profesor para cada rama. */
export function Flujo({ pasos, clave = [], titulo }: { pasos: string[]; clave?: number[]; titulo?: string }) {
  return (
    <div className="flujo" role="img" aria-label={(titulo ? titulo + ': ' : '') + pasos.join(', luego ')}>
      {titulo && <span className="flujo-titulo">{titulo}</span>}
      {pasos.map((p, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span className="flujo-flecha" aria-hidden>→</span>}
          <span className={`flujo-paso ${clave.includes(i) ? 'clave' : ''}`}>{p}</span>
        </span>
      ))}
    </div>
  );
}

export function Tabla({ cabeza, filas }: { cabeza: string[]; filas: ReactNode[][] }) {
  return (
    <div className="marco">
      <table className="datos">
        <thead><tr>{cabeza.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {filas.map((f, i) => <tr key={i}>{f.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

export function S({ children }: { children: ReactNode }) {
  return <code className="simb">{children}</code>;
}
