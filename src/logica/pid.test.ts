// Las afirmaciones que hace la lección sobre el PID, comprobadas con la
// simulación. Si alguna fallara, la lección estaría diciendo algo que el
// simulador no muestra.

import { describe, expect, it } from 'vitest';
import { PRESETS, simular } from './pid';

const correr = (nombre: string) => simular(PRESETS.find((p) => p.nombre === nombre)!.g);

describe('simulador del aerogenerador', () => {
  const sin = correr('Sin control');
  const p = correr('Solo P');
  const pi = correr('PI');
  const pid = correr('PID');
  const pred = correr('PID + predicción');

  it('sin control, la ráfaga deja la velocidad alejada para siempre', () => {
    expect(sin.errorFinal).toBeGreaterThan(0.4);
  });

  it('solo con P mejora, pero queda un error permanente', () => {
    expect(p.errorFinal).toBeLessThan(sin.errorFinal);
    expect(p.errorFinal).toBeGreaterThan(0.1);
  });

  it('la integral elimina ese error permanente', () => {
    expect(pi.errorFinal).toBeLessThan(0.02);
  });

  it('la derivada reduce el pico respecto al PI', () => {
    expect(pid.desviacionMaxima).toBeLessThan(pi.desviacionMaxima);
  });

  it('el PID también termina sin error', () => {
    expect(pid.errorFinal).toBeLessThan(0.02);
  });

  it('anticipar la ráfaga baja el pico a menos de la tercera parte, con el mismo PID', () => {
    expect(pred.desviacionMaxima).toBeLessThan(pid.desviacionMaxima / 3);
  });

  const cruces = (r: ReturnType<typeof simular>) => {
    const v = r.velocidad.filter((_, i) => r.t[i] > 3);
    return v.reduce((n, x, i) => n + (i > 0 && (v[i - 1] - 1) * (x - 1) < 0 ? 1 : 0), 0);
  };

  it('el PI se pasa del valor deseado y oscila', () => {
    expect(cruces(pi)).toBeGreaterThanOrEqual(2);
    expect(Math.min(...pi.velocidad)).toBeLessThan(1);
  });

  it('con la derivada oscila menos que el PI', () => {
    expect(cruces(pid)).toBeLessThan(cruces(pi));
  });

  it('con predicción, la velocidad baja un poco antes de que llegue la ráfaga', () => {
    const antes = pred.velocidad.filter((_, i) => pred.t[i] > 2.5 && pred.t[i] < 3);
    expect(Math.min(...antes)).toBeLessThan(0.99);
  });

  it('antes de la ráfaga, todo está en el valor deseado', () => {
    const i = pid.t.findIndex((t) => t > 2.5);
    expect(Math.abs(pid.velocidad[i] - 1)).toBeLessThan(0.001);
  });
});
