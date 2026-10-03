import type { ComponentType } from 'react';
import type { IdTema } from '../../tipos';
import Aplicaciones from './Aplicaciones';
import Casos from './Casos';
import Conceptos from './Conceptos';
import Enfoques from './Enfoques';
import Etica from './Etica';
import Historia from './Historia';
import Logica from './Logica';
import QueEs from './QueEs';
import Ramas from './Ramas';

export const LECCIONES: Record<IdTema, ComponentType> = {
  'que-es': QueEs,
  historia: Historia,
  conceptos: Conceptos,
  enfoques: Enfoques,
  ramas: Ramas,
  aplicaciones: Aplicaciones,
  etica: Etica,
  logica: Logica,
  casos: Casos,
};
