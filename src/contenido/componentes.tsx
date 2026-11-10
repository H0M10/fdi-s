import type { ReactNode } from 'react';
import {
  Codigo as CodigoBase,
  Ojo,
  Profe,
  Seccion as SeccionBase,
  Tabla as TablaBase,
} from '../componentes/Leccion';

export function Seccion({
  numero,
  titulo,
  children,
  id,
}: {
  numero?: number;
  titulo: string;
  children: ReactNode;
  id?: string;
}) {
  const tituloFinal = numero !== undefined ? `${numero}. ${titulo}` : titulo;
  return (
    <SeccionBase titulo={tituloFinal} id={id}>
      {children}
    </SeccionBase>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Lista({ items, ordenada = false }: { items: ReactNode[]; ordenada?: boolean }) {
  if (ordenada) {
    return (
      <ol>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

export function Nota({ children }: { children: ReactNode }) {
  return (
    <Profe>
      <p>{children}</p>
    </Profe>
  );
}

export function Alerta({ children, titulo = 'Ojo en el examen' }: { children: ReactNode; titulo?: string }) {
  return (
    <Ojo titulo={titulo}>
      <p>{children}</p>
    </Ojo>
  );
}

export function Formula({ tex, bloque = false }: { tex: string; bloque?: boolean }) {
  if (bloque) {
    return (
      <div
        style={{
          margin: '12px 0 16px',
          padding: '10px 14px',
          background: 'var(--superficie-2)',
          border: '1px solid var(--linea)',
          borderRadius: 8,
          fontFamily: 'var(--mono)',
          fontSize: 13.5,
          overflowX: 'auto',
        }}
      >
        <code>{tex}</code>
      </div>
    );
  }
  return <code className="simb">{tex}</code>;
}

export function Pasos({ titulo, items }: { titulo?: string; items: ReactNode[] }) {
  return (
    <div className="bloque ejemplo">
      {titulo && <span className="etiqueta">{titulo}</span>}
      <ol style={{ margin: '6px 0 0', paddingLeft: 20 }}>
        {items.map((it, idx) => (
          <li key={idx} style={{ marginBottom: 6 }}>
            {it}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Tabla({
  encabezados,
  cabeza,
  filas,
}: {
  encabezados?: string[];
  cabeza?: string[];
  filas: ReactNode[][];
}) {
  return <TablaBase cabeza={encabezados ?? cabeza ?? []} filas={filas} />;
}

export function Codigo({
  titulo,
  codigo,
  children,
}: {
  titulo?: string;
  codigo?: string;
  children?: string;
}) {
  return <CodigoBase titulo={titulo}>{codigo ?? children ?? ''}</CodigoBase>;
}

