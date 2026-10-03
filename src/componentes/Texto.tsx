import { Fragment, type ReactNode } from 'react';

/**
 * Pinta texto con **negritas** y `código`. Es todo el formato que usan las
 * explicaciones del banco de preguntas; no hace falta una librería de
 * markdown para eso.
 */
export function Texto({ children }: { children: string }) {
  const partes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(children)) !== null) {
    if (m.index > ultimo) partes.push(children.slice(ultimo, m.index));
    const s = m[0];
    if (s.startsWith('**')) partes.push(<strong key={k++}>{s.slice(2, -2)}</strong>);
    else if (s.startsWith('`')) partes.push(<code key={k++} className="simb">{s.slice(1, -1)}</code>);
    else partes.push(<em key={k++}>{s.slice(1, -1)}</em>);
    ultimo = m.index + s.length;
  }
  if (ultimo < children.length) partes.push(children.slice(ultimo));
  return <>{partes.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}
