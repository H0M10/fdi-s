# FDI Estudio — notas para Claude

App de estudio para el examen de Fundamentos de IA de Hanniel (UTEQ, LITIID003-C3).
Vite + React 18 + TypeScript. Sin librería de UI ni de rutas.

## De dónde sale el contenido

Del vault de Obsidian en `Desktop/IAWHTS`:

- `01-Materias/Fundamentos de IA/Temas/` — una nota por tema, ya procesada
- `01-Materias/Fundamentos de IA/Apuntes/` — los apuntes originales, literales
- `01-Materias/Fundamentos de IA/Examen Unidad 1.md` — el formato del examen según los compañeros
- `_Adjuntos/IMG-20260930-WA0074.jpg` y `WA0076.jpg` — fotos del cuaderno (antecedentes y línea del tiempo)

**Regla del vault que también aplica aquí:** lo que dijo el profesor no se cambia. Si el apunte
tiene un error, se anota aparte como corrección. En las lecciones eso se marca con los bloques
`<Profe>`, `<Correccion>` y `<Agregado>` de `src/componentes/Leccion.tsx`.

Correcciones importantes que ya están marcadas:
- «procesamiento de lenguaje **corporal**» → es **natural**
- ARCO: el apunte dice «accesibilidad» y le falta la R → **Acceso, Rectificación**, Cancelación, Oposición
- ML contra DL: el apunte dice que la diferencia es etiquetado/no etiquetado → eso es supervisado/no supervisado
- Modelo: no es «un conjunto de algoritmos»; motor de inferencia: no produce el modelo
- Nombres del cuaderno: Hacks → Hobbes, Lock → Locke, Bolt → Boole

## Arquitectura

- `src/tipos.ts` — los tipos de pregunta. Leer primero.
- `src/logica/motor.ts` — parser y evaluador de lógica proposicional
- `src/contenido/preguntas/*.ts` — el banco, un archivo por tema
- `src/contenido/lecciones/*.tsx` — una lección por tema
- `src/componentes/Pregunta.tsx` — cómo se contesta cada tipo
- `src/componentes/ResolverTabla.tsx` — resolver una tabla columna por columna (sección Tablas, preguntas de clasificar y lección)
- `src/paginas/Tablas.tsx` y `src/contenido/problemasTablas.ts` — la sección Tablas y sus problemas
- `src/rutas.ts` — navegación por hash (`#tema-ramas`, `#simulacro`, `#tablas-resolver-<id>`…)

### La decisión que más importa

Las preguntas de tipo `tabla`, `clasificar` y `conclusion` **no llevan la respuesta escrita**.
La calcula el motor. Para `conclusion`, la correcta es la única opción que se sigue de las
premisas (`opcionQueSeSigue`); una opción con `formula: null` significa «ninguna se sigue».

No cambiar eso por respuestas escritas a mano. Es lo que garantiza que el banco de lógica no
tenga errores.

### Preguntas de identificar enfoques

Todas van con `P.enfoques` (o `inciso.enfoques` dentro de un caso): selección múltiple, las
mismas cinco opciones en el mismo orden y la pregunta «¿Qué enfoque o enfoques…?», sea uno
o varios los correctos. Hanniel pidió que el formato no le diga cuántos marcar. Una prueba
rechaza cualquier pregunta de una sola respuesta con enfoques como opciones.

Convención para que la selección múltiple sea justa:
- Un límite fijo aparte («nunca más de 8 horas», «no cocina en días inhábiles») cuenta como
  **reglas**. Lo que se quiere lograr («lo menos posible», «el menor costo») es
  **optimización**, y el recurso que se reparte («con el material que tiene») no es una regla.
- Un camino de A a B, aunque sea el más corto, es **búsqueda**. Elegir una cantidad, un orden
  o un acomodo es **optimización**.
- Deep learning se marca sin machine learning.

### Preguntas de identificar ramas

Igual que los enfoques: `P.ramas` / `inciso.ramas`, las once ramas en el mismo orden y «¿Qué
rama o ramas…?». Hanniel recuerda que en el examen dan un ejemplo y se dicen todas las ramas.
Convención:
- Se marca lo que se puede señalar en el texto del caso.
- Si el sistema aplica una regla para decidir («si registra 3 faltas, bloquea»), es también
  representación del conocimiento y razonamiento.
- Si dice que el modelo se entrenó con datos, también es aprendizaje automático.
- Lo deducible pero no escrito va en `tambien` (se muestra en ámbar: marcarlo o no, da igual).
  La explicación tiene que decir «también se vale»; una prueba lo exige.

### Justificar

Hanniel recuerda que en las preguntas avanzadas cada inciso (rama, enfoque, ética) se
justifica. En `casos.ts`, `justificable()` pide escribir el porqué antes de revisar en todo
inciso de identificar, y muestra la guía de `CRITERIOS` (fabrica.ts) para compararla. No se
califica la justificación: solo la selección.

### Ids de las preguntas

Se derivan con un hash del enunciado (`src/contenido/fabrica.ts`), no de la posición. Se pueden
reordenar preguntas sin perder el progreso guardado. Cambiar el texto de una pregunta le
reinicia su progreso, y está bien.

## Antes de dar algo por terminado

```bash
npx tsc --noEmit && npm test && npm run build
```

Las 614 pruebas tienen que pasar. Si se agrega una pregunta de conclusiones y la prueba dice
que tiene dos respuestas válidas, es que una de las opciones «incorrectas» en realidad también
se sigue de las premisas (pasa mucho con ¬p ∨ ¬q cuando la correcta es ¬p ∧ ¬q). Hay que
cambiar esa opción, no la prueba.

## Cuidado al escribir archivos

En esta máquina el Bash de las herramientas colapsa `\\` en `\` dentro de heredocs. Para
cualquier archivo con barras invertidas (regex, LaTeX) usar la herramienta de escritura de
archivos, no `cat <<EOF`.

## Pendientes que dependen de la clase

Están marcados con ❓ en las notas del vault:
- 1957 «Razonar», 2016 «Chatbot» y 2021 «Biomedicina»: cada año marca la primera vez que
  pasó algo (lo aclaró Hanniel), pero no recuerda qué. En la app van como interpretación
  probable (GPS, Tay, AlphaFold 2) y **sin preguntas**, para no evaluar algo no confirmado
- La quinta habilidad de la inteligencia
- La definición cortada de la rama 1

Resuelto: «Ktd» **sí era el PID** (Hanniel confirmó: tres componentes, uno con integral). El
profesor lo usó para el caso del aerogenerador: el PID reacciona tarde ante ráfagas, y el
estado del arte usa IA para llegar a la inferencia antes que en tiempo real. El simulador
`src/logica/pid.ts` lo ilustra; sus afirmaciones están probadas en `pid.test.ts`.
