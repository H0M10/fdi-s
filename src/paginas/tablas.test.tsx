// @vitest-environment jsdom
//
// Prueba la sección «Tablas» haciendo clic: llenar columnas, equivocarse,
// corregir y clasificar. Las respuestas salen del motor, así que lo que
// se prueba aquí es el recorrido, no la lógica.

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ResolverTabla } from '../componentes/ResolverTabla';
import { PROBLEMAS } from '../contenido/problemasTablas';
import { analizar, clasificar } from '../logica/motor';
import { interpretar } from '../rutas';
import { Tablas } from './Tablas';

afterEach(() => cleanup());

const clic = (texto: string | RegExp) => fireEvent.click(screen.getByText(texto));
const celda = (renglon: number, columna: string) => screen.getByLabelText(`Renglón ${renglon} de ${columna}`);

describe('resolver una tabla paso a paso', () => {
  it('p ∧ q: con el truco de «todo F» y un cambio, sale a la primera', () => {
    render(<ResolverTabla formula="p ∧ q" />);
    expect(screen.getByText(/2 letras/)).toBeTruthy();
    clic('Todo F');
    fireEvent.click(celda(1, 'p ∧ q'));
    clic('Revisar columna');
    expect(screen.getByText(/p ∧ q: bien a la primera/)).toBeTruthy();
    expect(screen.getByText(/Columnas bien a la primera: 1 de 1/)).toBeTruthy();
    clic('Contingencia');
    expect(screen.getByText('Correcto')).toBeTruthy();
    expect(screen.getByText(/Justificación para el examen/)).toBeTruthy();
  });

  it('marca los renglones mal y deja corregirlos antes de seguir', () => {
    render(<ResolverTabla formula="p ∨ q" />);
    clic('Todo V');
    clic('Revisar columna');
    expect(screen.getByText(/Un renglón está mal/)).toBeTruthy();
    expect(celda(4, 'p ∨ q').getAttribute('data-estado')).toBe('mal');
    fireEvent.click(celda(4, 'p ∨ q'));
    expect(celda(4, 'p ∨ q').getAttribute('data-estado')).toBeNull();
    clic('Revisar columna');
    expect(screen.getByText(/Columnas bien a la primera: 0 de 1/)).toBeTruthy();
  });

  it('«Ver la respuesta» llena la columna y deja pasar a la siguiente', () => {
    render(<ResolverTabla formula="¬p ∧ q" />);
    clic('Todo V');
    clic('Revisar columna');
    clic('Ver la respuesta');
    clic('Siguiente columna →');
    expect(screen.getByText('Columna 2 de 2')).toBeTruthy();
  });

  it('el problema del examen: (p ∨ q) ∧ (¬p ∧ ¬q) termina en contradicción', () => {
    render(<ResolverTabla formula="(p ∨ q) ∧ (¬p ∧ ¬q)" />);
    // Se resuelve con la respuesta de cada columna; aquí importa llegar al final.
    for (let k = 0; k < 5; k++) {
      clic('Todo V');
      clic('Revisar columna');
      if (screen.queryByText('Ver la respuesta')) { clic('Ver la respuesta'); clic('Siguiente columna →'); }
    }
    clic('Contradicción');
    expect(screen.getByText('Correcto')).toBeTruthy();
  });

  it('equivalencias: De Morgan sí, la versión mal recordada no', () => {
    render(<ResolverTabla formula="¬(p ∧ q) ↔ (¬p ∧ ¬q)" final="equivalencia" />);
    for (let k = 0; k < 6; k++) {
      clic('Todo V');
      clic('Revisar columna');
      if (screen.queryByText('Ver la respuesta')) { clic('Ver la respuesta'); clic('Siguiente columna →'); }
    }
    clic('No lo son');
    expect(screen.getByText('Correcto')).toBeTruthy();
    expect(screen.getByText(/En el renglón 2/)).toBeTruthy();
  });
});

describe('la sección se dibuja', () => {
  it('las tres pestañas', () => {
    for (const vista of ['conectores', 'resolver', 'comprobar'] as const) {
      const { unmount } = render(<Tablas vista={vista} />);
      expect(screen.getByText('Tablas a mano, columna por columna')).toBeTruthy();
      unmount();
    }
  });

  it('cada problema abre', () => {
    for (const p of PROBLEMAS) {
      const { unmount } = render(<Tablas vista="resolver" problema={p.id} />);
      expect(screen.getByText(/Columna 1 de/)).toBeTruthy();
      unmount();
    }
  });

  it('tapar los conectores deja llenarlos', () => {
    render(<Tablas vista="conectores" />);
    clic('Tapar los resultados y llenarlos de memoria');
    expect(screen.getAllByText('Revisar').length).toBe(5);
  });
});

describe('problemas', () => {
  it('incluyen todas las leyes y la fórmula que confundió en la práctica', () => {
    const formulas = PROBLEMAS.map((p) => p.formula);
    expect(formulas).toContain('(p ∨ q) ∧ (¬p ∧ ¬q)');
    expect(PROBLEMAS.filter((p) => p.final === 'equivalencia').length).toBeGreaterThanOrEqual(9);
  });

  it('las leyes verdaderas son tautología y las trampas no', () => {
    const trampas = ['de-morgan-mal', 'reciproca', 'inversa'];
    for (const p of PROBLEMAS.filter((x) => x.final === 'equivalencia')) {
      expect(clasificar(analizar(p.formula)) === 'tautologia', p.id).toBe(!trampas.includes(p.id));
    }
  });

  it('las rutas llevan a cada problema', () => {
    expect(interpretar('tablas')).toEqual({ pagina: 'tablas', vista: 'conectores' });
    expect(interpretar('tablas-resolver-de-morgan-1')).toEqual({ pagina: 'tablas', vista: 'resolver', problema: 'de-morgan-1' });
    expect(interpretar('tablas-comprobar')).toEqual({ pagina: 'tablas', vista: 'comprobar' });
  });
});
