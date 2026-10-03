// Comprueba que todo el contenido se puede dibujar sin errores.
//
// Las pruebas de contenido verifican que las preguntas estén bien
// construidas; esta verifica que también se puedan mostrar. Si una
// lección o una pregunta lanzara un error al dibujarse, en la app verías
// una pantalla en blanco justo en ese tema.

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Pregunta } from './componentes/Pregunta';
import { LECCIONES } from './contenido/lecciones';
import { TODAS } from './contenido/preguntas';

describe('las lecciones se dibujan', () => {
  for (const [id, Leccion] of Object.entries(LECCIONES)) {
    it(id, () => {
      const html = renderToString(createElement(Leccion));
      expect(html.length).toBeGreaterThan(500);
    });
  }
});

describe('todas las preguntas se dibujan', () => {
  it(`las ${TODAS.length} preguntas`, () => {
    const fallas: string[] = [];
    for (const p of TODAS) {
      try {
        const html = renderToString(createElement(Pregunta, { p, onListo: () => {} }));
        if (html.length < 100) fallas.push(`${p.id}: salió casi vacía`);
      } catch (e) {
        fallas.push(`${p.id}: ${(e as Error).message}`);
      }
    }
    expect(fallas).toEqual([]);
  });
});
