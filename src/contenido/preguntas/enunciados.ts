// Tablas desde cero: te dan solo la frase, como en el examen. Cada problema
// va en el orden en que se resuelve a mano:
//   1. Sacar las proposiciones simples, en positivo.
//   2. Simbolizar la frase con esas letras.
//   3. Decir cuántos renglones lleva la tabla.
//   4. Hacer la tabla y clasificarla (tautología, contradicción o contingencia).
// La clasificación la calcula el motor; aquí solo se escribe la fórmula.

import { analizar, variables } from '../../logica/motor';
import type { Props } from '../../tipos';
import { inciso as I, preguntasDe } from '../fabrica';

const P = preguntasDe('logica');
const RENGLONES = ['2', '4', '8', '16'];
const EXP = ['⁰', '¹', '²', '³', '⁴'];

interface Datos {
  titulo: string;
  frase: string;
  props: Props;
  /** Frases que parecen proposiciones y no lo son, con el porqué. */
  distractores: [string, string][];
  formula: string;
  pista?: string;
}

function desdeEnunciado({ titulo, frase, props, distractores, formula, pista }: Datos) {
  const n = variables(analizar(formula)).length;
  return P.caso(
    titulo,
    `«${frase}» Saca tú las proposiciones, simbolízala, haz su tabla y clasifícala.`,
    [
      I.multi(
        '¿Cuáles son sus proposiciones simples? Van en positivo: sin «no» y sin conectores.',
        [...props.map(([, s]) => s), ...distractores.map(([d]) => d)],
        props.map((_, i) => i),
        `Las proposiciones: ${props.map(([l, s]) => `**${l}** = «${s}»`).join(', ')}. `
          + distractores.map(([d, por]) => `«${d}» no: ${por}.`).join(' '),
      ),
      I.simbolizar(frase, props, formula, pista),
      I.opcion('¿Cuántos renglones tiene su tabla?', RENGLONES, RENGLONES.indexOf(String(2 ** n)),
        `${n} ${n === 1 ? 'letra distinta' : 'letras distintas'}: 2${EXP[n]} = ${2 ** n}. Cada letra duplica los renglones.`),
      I.clasificar(formula, 'Haz la tabla completa y clasifícala.'),
    ],
  );
}

const PREMISAS = '«Por lo tanto» es la flecha principal: (todo lo de antes, unido con ∧) → (lo que sigue).';

export const PREGUNTAS_ENUNCIADOS = [
  desdeEnunciado({
    titulo: 'Desde la frase: el paraguas',
    frase: 'Si llueve y no traigo paraguas, me mojo.',
    props: [['p', 'llueve'], ['q', 'traigo paraguas'], ['r', 'me mojo']],
    distractores: [['no traigo paraguas', 'es la negación de q, se escribe ¬q'], ['llueve y no traigo paraguas', 'tiene un «y»: son dos proposiciones juntas']],
    formula: '(p ∧ ¬q) → r',
    pista: '«Si A, B» es A → B, y «no traigo paraguas» va como ¬q.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: apruebo o no',
    frase: 'O apruebo el examen o no lo apruebo.',
    props: [['p', 'apruebo el examen']],
    distractores: [['no apruebo el examen', 'es la negación de p: ¬p'], ['apruebo el examen o no lo apruebo', 'tiene un «o»: es la frase completa']],
    formula: 'p ∨ ¬p',
    pista: '«O… o…» es ∨, y «no lo apruebo» es ¬p.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: la beca que no llegó',
    frase: 'Si apruebo, me dan la beca; además, apruebo y no me dan la beca.',
    props: [['p', 'apruebo'], ['q', 'me dan la beca']],
    distractores: [['no me dan la beca', 'es la negación de q: ¬q'], ['si apruebo, me dan la beca', 'es una implicación completa: p → q']],
    formula: '(p → q) ∧ (p ∧ ¬q)',
    pista: '«Además» une las dos partes con ∧.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: humo o fuego',
    frase: 'Hay humo o hay fuego, pero no hay humo y no hay fuego.',
    props: [['p', 'hay humo'], ['q', 'hay fuego']],
    distractores: [['no hay humo', 'es ¬p'], ['no hay fuego', 'es ¬q']],
    formula: '(p ∨ q) ∧ (¬p ∧ ¬q)',
    pista: '«Pero» funciona como «y»: ∧.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: estudio y apruebo',
    frase: 'Si estudio, apruebo; y estudio. Por lo tanto, apruebo.',
    props: [['p', 'estudio'], ['q', 'apruebo']],
    distractores: [['por lo tanto, apruebo', '«por lo tanto» es el conector; la proposición es «apruebo»'], ['si estudio, apruebo', 'es la implicación completa: p → q']],
    formula: '((p → q) ∧ p) → q',
    pista: PREMISAS,
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: apruebo, luego estudié',
    frase: 'Si estudio, apruebo; y apruebo. Por lo tanto, estudio.',
    props: [['p', 'estudio'], ['q', 'apruebo']],
    distractores: [['si estudio, apruebo', 'es la implicación completa: p → q'], ['por lo tanto, estudio', '«por lo tanto» es el conector; la proposición es «estudio»']],
    formula: '((p → q) ∧ q) → p',
    pista: PREMISAS,
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: el motor sin corriente',
    frase: 'Si hay corriente, el motor enciende. El motor no enciende. Por lo tanto, no hay corriente.',
    props: [['p', 'hay corriente'], ['q', 'el motor enciende']],
    distractores: [['el motor no enciende', 'es ¬q'], ['no hay corriente', 'es ¬p']],
    formula: '((p → q) ∧ ¬q) → ¬p',
    pista: 'Las dos primeras oraciones son las premisas, unidas con ∧. ' + PREMISAS,
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: el cine',
    frase: 'Voy al cine si y solo si termino la tarea.',
    props: [['p', 'voy al cine'], ['q', 'termino la tarea']],
    distractores: [['si y solo si termino la tarea', '«si y solo si» es el conector ↔, no parte de la proposición']],
    formula: 'p ↔ q',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: la alarma imposible',
    frase: 'La alarma suena si y solo si no suena.',
    props: [['p', 'la alarma suena']],
    distractores: [['la alarma no suena', 'es ¬p'], ['suena si y solo si no suena', 'es la frase completa: p ↔ ¬p']],
    formula: 'p ↔ ¬p',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: el motor se apaga',
    frase: 'El motor se apaga si la temperatura es alta o la presión es baja.',
    props: [['p', 'la temperatura es alta'], ['q', 'la presión es baja'], ['r', 'el motor se apaga']],
    distractores: [['si la temperatura es alta', '«si» es parte del conector →, no de la proposición'], ['la temperatura es alta o la presión es baja', 'tiene un «o»: son dos proposiciones']],
    formula: '(p ∨ q) → r',
    pista: '«A si B» se escribe B → A: la condición va a la izquierda aunque en la frase vaya al final.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: humo o calor',
    frase: 'Si el sensor detecta humo, entonces detecta humo o detecta calor.',
    props: [['p', 'el sensor detecta humo'], ['q', 'el sensor detecta calor']],
    distractores: [['detecta humo o detecta calor', 'tiene un «o»: es p ∨ q']],
    formula: 'p → (p ∨ q)',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: actualizado y protegido',
    frase: 'Si el sistema está actualizado y protegido, entonces está actualizado.',
    props: [['p', 'el sistema está actualizado'], ['q', 'el sistema está protegido']],
    distractores: [['el sistema está actualizado y protegido', 'tiene un «y»: es p ∧ q']],
    formula: '(p ∧ q) → p',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: ni llueve ni hace frío',
    frase: 'Ni llueve ni hace frío, y llueve.',
    props: [['p', 'llueve'], ['q', 'hace frío']],
    distractores: [['no llueve', 'es ¬p'], ['ni llueve ni hace frío', 'es ¬p ∧ ¬q: dos proposiciones negadas']],
    formula: '(¬p ∧ ¬q) ∧ p',
    pista: '«Ni A ni B» es ¬A ∧ ¬B.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: la puerta',
    frase: 'No es cierto que la puerta esté abierta y no esté abierta.',
    props: [['p', 'la puerta está abierta']],
    distractores: [['la puerta no está abierta', 'es ¬p'], ['no es cierto que', 'es la negación de todo lo que sigue: ¬( … )']],
    formula: '¬(p ∧ ¬p)',
    pista: '«No es cierto que…» niega todo lo que sigue: ¬( … ).',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: la beca con cuatro letras',
    frase: 'Me dan la beca si tengo promedio de 9 o hago servicio social, y no debo materias.',
    props: [['p', 'tengo promedio de 9'], ['q', 'hago servicio social'], ['r', 'debo materias'], ['s', 'me dan la beca']],
    distractores: [['no debo materias', 'es ¬r'], ['tengo promedio de 9 o hago servicio social', 'tiene un «o»: es p ∨ q']],
    formula: '((p ∨ q) ∧ ¬r) → s',
    pista: '«A si B» es B → A. Todo lo que va después del «si» es la condición: (p ∨ q) ∧ ¬r.',
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: el día inhábil',
    frase: 'Si el día es inhábil, no se cocina; por lo tanto, si se cocina, el día no es inhábil.',
    props: [['p', 'el día es inhábil'], ['q', 'se cocina']],
    distractores: [['no se cocina', 'es ¬q'], ['el día no es inhábil', 'es ¬p']],
    formula: '(p → ¬q) → (q → ¬p)',
    pista: PREMISAS,
  }),
  desdeEnunciado({
    titulo: 'Desde la frase: clase o día inhábil',
    frase: 'Hay clase o es día inhábil.',
    props: [['p', 'hay clase'], ['q', 'es día inhábil']],
    distractores: [['hay clase o es día inhábil', 'tiene un «o»: es la frase completa']],
    formula: 'p ∨ q',
  }),
];
