// Tipos del contenido de la app.
//
// La regla de diseno mas importante esta en las preguntas de logica:
// las de tipo 'tabla', 'clasificar' y 'conclusion' NO llevan la respuesta
// escrita a mano. La calcula el motor de logica a partir de la formula.
// Asi es imposible que el banco tenga una respuesta de logica equivocada,
// y el archivo contenido.test.ts lo comprueba pregunta por pregunta.

export type IdTema =
  | 'que-es'
  | 'historia'
  | 'conceptos'
  | 'enfoques'
  | 'ramas'
  | 'aplicaciones'
  | 'etica'
  | 'logica'
  | 'casos';

export interface Tema {
  id: IdTema;
  titulo: string;
  corto: string;
  resumen: string;
  /** Cómo aparece este tema en el examen, según los compañeros. */
  enExamen: string;
}

/** Proposiciones del enunciado: [letra, significado]. */
export type Props = [string, string][];

export interface POpcion {
  tipo: 'opcion';
  enunciado: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export interface PMulti {
  tipo: 'multi';
  enunciado: string;
  opciones: string[];
  correctas: number[];
  explicacion: string;
}

export interface PVF {
  tipo: 'vf';
  enunciado: string;
  verdadera: boolean;
  explicacion: string;
}

/** Escribir la fórmula. Se revisa por equivalencia lógica, no por texto. */
export interface PSimbolizar {
  tipo: 'simbolizar';
  enunciado: string;
  props: Props;
  respuesta: string;
  pista?: string;
}

/** Llenar la columna final. La respuesta la calcula el motor. */
export interface PTabla {
  tipo: 'tabla';
  enunciado?: string;
  formula: string;
}

/** Tautología, contradicción o contingencia. La respuesta la calcula el motor. */
export interface PClasificar {
  tipo: 'clasificar';
  enunciado?: string;
  formula: string;
}

/**
 * ¿Qué se concluye de las premisas? La opción correcta la calcula el motor:
 * es la única cuya fórmula se sigue de las premisas. Una opción con
 * formula null significa «ninguna de las anteriores se sigue».
 */
export interface PConclusion {
  tipo: 'conclusion';
  enunciado: string;
  props: Props;
  premisas: string[];
  opciones: { texto: string; formula: string | null }[];
  explicacion: string;
}

export type Inciso =
  | POpcion
  | PMulti
  | PVF
  | PSimbolizar
  | PTabla
  | PClasificar
  | PConclusion;

export interface PCaso {
  tipo: 'caso';
  titulo: string;
  escenario: string;
  incisos: Inciso[];
}

export type Pregunta = { id: string; tema: IdTema } & (Inciso | PCaso);

export type Clase = 'tautologia' | 'contradiccion' | 'contingencia';
