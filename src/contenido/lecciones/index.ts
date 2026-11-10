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
import CasosU2 from './u2/CasosU2';
import Ciega from './u2/Ciega';
import Espacio from './u2/Espacio';
import Geneticos from './u2/Geneticos';
import Heuristica from './u2/Heuristica';
import Local from './u2/Local';
import Problemas from './u2/Problemas';

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
  'u2-problemas': Problemas,
  'u2-espacio': Espacio,
  'u2-ciega': Ciega,
  'u2-heuristica': Heuristica,
  'u2-local': Local,
  'u2-geneticos': Geneticos,
  'u2-casos': CasosU2,
};
