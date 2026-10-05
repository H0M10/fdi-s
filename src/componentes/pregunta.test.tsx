// @vitest-environment jsdom
//
// Prueba haciendo clic dos cosas de las preguntas de identificar: las
// opciones que «también se valen» y escribir la justificación antes de
// revisar, como en las preguntas avanzadas del examen.

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { inciso, justificable } from '../contenido/fabrica';
import type { Pregunta as TPregunta } from '../tipos';
import { Pregunta } from './Pregunta';

afterEach(() => cleanup());

const clic = (texto: string | RegExp) => fireEvent.click(screen.getByText(texto));
const comoPregunta = (i: object) => ({ id: 'x', tema: 'casos', ...i }) as TPregunta;

const ramas = inciso.ramas(['Visión por computadora'], 'Interpreta imágenes. Aprendizaje automático también se vale.', undefined, ['Aprendizaje automático']);

describe('«también se vale»', () => {
  it('marcar la correcta y la opcional cuenta como bien', () => {
    let nota = -1;
    render(<Pregunta p={comoPregunta(ramas)} onListo={(f) => { nota = f; }} />);
    clic('Visión por computadora');
    clic('Aprendizaje automático');
    clic('Revisar');
    expect(nota).toBe(1);
    expect(screen.getByText(/la que también se valía/)).toBeTruthy();
  });

  it('marcar solo la correcta también cuenta como bien', () => {
    let nota = -1;
    render(<Pregunta p={comoPregunta(ramas)} onListo={(f) => { nota = f; }} />);
    clic('Visión por computadora');
    clic('Revisar');
    expect(nota).toBe(1);
  });

  it('marcar una que no se vale cuenta como mal', () => {
    let nota = -1;
    render(<Pregunta p={comoPregunta(ramas)} onListo={(f) => { nota = f; }} />);
    clic('Visión por computadora');
    clic('Percepción computacional (P.C.)');
    clic('Revisar');
    expect(nota).toBe(0);
  });

  it('las once ramas salen siempre en el mismo orden', () => {
    render(<Pregunta p={comoPregunta(ramas)} onListo={() => {}} />);
    const textos = screen.getAllByRole('button').map((b) => b.textContent).filter((t) => t && !t.includes('Revisar'));
    expect(textos[0]).toContain('Representación del conocimiento');
    expect(textos[10]).toContain('Sistemas cognitivos');
  });
});

describe('simbolizar', () => {
  const props: [string, string][] = [['p', 'estudio'], ['q', 'apruebo']];
  const mp = inciso.simbolizar('Si estudio, apruebo; y estudio. Por lo tanto, apruebo.', props, '((p → q) ∧ p) → q');
  const escribir = (f: string) => {
    fireEvent.change(screen.getByLabelText('Fórmula'), { target: { value: f } });
    clic('Revisar');
  };

  it('otra tautología con otras letras no cuenta, aunque dé la misma tabla', () => {
    let nota = -1;
    render(<Pregunta p={comoPregunta(mp)} onListo={(f) => { nota = f; }} />);
    escribir('p ∨ ¬p');
    expect(nota).toBe(0);
  });

  it('una fórmula equivalente con las mismas letras sí cuenta', () => {
    let nota = -1;
    render(<Pregunta p={comoPregunta(mp)} onListo={(f) => { nota = f; }} />);
    escribir('(p ∧ (p → q)) → q');
    expect(nota).toBe(1);
  });
});

describe('justificar', () => {
  const riesgo = justificable(inciso.opcion('¿Qué riesgo es?', ['Privacidad', 'Error'], 0, 'Graba conversaciones que no necesita.'));

  it('elegir una opción no contesta: primero se justifica y luego se revisa', () => {
    let nota = -1;
    render(<Pregunta p={comoPregunta(riesgo)} onListo={(f) => { nota = f; }} />);
    clic('Privacidad');
    expect(nota).toBe(-1);
    fireEvent.change(screen.getByPlaceholderText(/porque en el caso/), { target: { value: 'Porque escucha todo el tiempo' } });
    clic('Revisar');
    expect(nota).toBe(1);
    expect(screen.getByText(/Porque escucha todo el tiempo/)).toBeTruthy();
    expect(screen.getByText(/Tenía que decir/)).toBeTruthy();
  });

  it('sin escribir nada también se puede revisar, pero avisa', () => {
    render(<Pregunta p={comoPregunta(riesgo)} onListo={() => {}} />);
    clic('Error');
    clic('Revisar');
    expect(screen.getByText(/No escribiste justificación/)).toBeTruthy();
  });

  it('en selección múltiple, igual', () => {
    const multi = justificable(ramas);
    render(<Pregunta p={comoPregunta(multi)} onListo={() => {}} />);
    clic('Visión por computadora');
    fireEvent.change(screen.getByPlaceholderText(/porque en el caso/), { target: { value: 'Usa cámaras' } });
    clic('Revisar');
    expect(screen.getByText(/Usa cámaras/)).toBeTruthy();
  });
});
