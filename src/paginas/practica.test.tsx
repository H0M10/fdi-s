// @vitest-environment jsdom
//
// Prueba el recorrido de la práctica haciendo clic, como lo haría quien
// estudia. Existe por un error real: al terminar las preguntas de un tema,
// la práctica regresaba a la primera sin avisar y sin mostrar el
// resultado, y parecía que no avanzaba.

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { deTema } from '../contenido/preguntas';
import { reiniciar } from '../progreso';
import type { Pregunta } from '../tipos';
import { Practica } from './Practica';

// Tres preguntas sencillas para probar el flujo sin depender del contenido.
const P: Pregunta[] = [
  { id: 't-1', tema: 'que-es', tipo: 'opcion', enunciado: 'Uno', opciones: ['Bien uno', 'Mal uno'], correcta: 0, explicacion: 'x' },
  { id: 't-2', tema: 'que-es', tipo: 'opcion', enunciado: 'Dos', opciones: ['Bien dos', 'Mal dos'], correcta: 0, explicacion: 'x' },
  { id: 't-3', tema: 'que-es', tipo: 'opcion', enunciado: 'Tres', opciones: ['Bien tres', 'Mal tres'], correcta: 0, explicacion: 'x' },
];

const clic = (texto: string | RegExp) => fireEvent.click(screen.getByText(texto));
const enunciadoActual = () => ['Uno', 'Dos', 'Tres'].find((e) => screen.queryByText(e))!;
const contestar = (bien: boolean) => {
  const e = enunciadoActual().toLowerCase();
  clic(`${bien ? 'Bien' : 'Mal'} ${e}`);
};

beforeEach(() => reiniciar());
afterEach(() => cleanup());

describe('práctica de un tema', () => {
  it('al terminar muestra el resultado, en lugar de volver a empezar', () => {
    render(<Practica preguntas={P} />);
    contestar(true); clic('Siguiente →');
    contestar(true); clic('Siguiente →');
    contestar(true);
    expect(screen.getByText('Ver mi resultado')).toBeTruthy();
    clic('Ver mi resultado');
    expect(screen.getByText('Terminaste la ronda')).toBeTruthy();
    expect(screen.getByText('100 %')).toBeTruthy();
    expect(screen.getByText('3 de 3 bien')).toBeTruthy();
  });

  it('dice el porcentaje cuando fallas, y ofrece repetir solo lo fallado', () => {
    render(<Practica preguntas={P} />);
    contestar(true); clic('Siguiente →');
    contestar(false); clic('Siguiente →');
    contestar(true); clic('Ver mi resultado');
    expect(screen.getByText('67 %')).toBeTruthy();
    clic('Repetir la que fallé');
    expect(screen.getByText('Pregunta 1 de 1')).toBeTruthy();
  });

  it('cuenta lo saltado como no contestado', () => {
    render(<Practica preguntas={P} />);
    contestar(true); clic('Siguiente →');
    clic('Saltar');
    clic('Saltar y terminar');
    expect(screen.getByText('33 %')).toBeTruthy();
    expect(screen.getByText(/saltaste 2/)).toBeTruthy();
  });

  it('ofrece pasar al siguiente tema al terminar', () => {
    let fue = false;
    render(<Practica preguntas={P} siguienteTema={{ numero: 2, titulo: 'Historia', ir: () => { fue = true; } }} />);
    contestar(true); clic('Siguiente →');
    contestar(true); clic('Siguiente →');
    contestar(true); clic('Ver mi resultado');
    clic(/Siguiente tema: 2\. Historia/);
    expect(fue).toBe(true);
  });

  it('la etiqueta «Nueva» no cambia en el momento de contestar', () => {
    render(<Practica preguntas={P} />);
    expect(screen.getByText('Nueva')).toBeTruthy();
    contestar(true);
    expect(screen.getByText('Nueva')).toBeTruthy();
    expect(screen.queryByText('Ya la habías acertado')).toBeNull();
  });

  it('el contador avanza: pregunta 1, 2, 3', () => {
    render(<Practica preguntas={P} />);
    expect(screen.getByText('Pregunta 1 de 3')).toBeTruthy();
    contestar(true); clic('Siguiente →');
    expect(screen.getByText('Pregunta 2 de 3')).toBeTruthy();
    contestar(true); clic('Siguiente →');
    expect(screen.getByText('Pregunta 3 de 3')).toBeTruthy();
  });
});

describe('el tema real «¿Qué es la IA?»', () => {
  it(`se puede recorrer completo y llegar al resultado`, () => {
    const preguntas = deTema('que-es');
    render(<Practica preguntas={preguntas} />);
    for (let i = 0; i < preguntas.length; i++) {
      expect(screen.getByText(`Pregunta ${i + 1} de ${preguntas.length}`)).toBeTruthy();
      clic(i === preguntas.length - 1 ? 'Saltar y terminar' : 'Saltar');
    }
    expect(screen.getByText('Terminaste la ronda')).toBeTruthy();
  });
});
