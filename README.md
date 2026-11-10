# FDI Estudio

App para estudiar el examen de **Fundamentos de IA**: cada tema explicado con los ejemplos de
clase, un banco de preguntas para practicar y un simulacro con el mismo formato del examen.

## Qué tiene

| Tema | Preguntas |
|---|---|
| Enfoques de la IA | 67 |
| Ramas de la IA | 50 |
| Ética e implicaciones sociales | 33 |
| Lógica y tablas de verdad | 108 (183 incisos) |
| Casos tipo examen | 19 (76 incisos) |
| Conceptos base | 18 |
| ¿Qué es la IA? | 9 |
| Antecedentes e historia | 25 |
| Aplicaciones y estado del arte | 25 |
| **Unidad 2 · 1. Problemas de búsqueda** | 8 |
| **Unidad 2 · 2. Espacio de búsqueda y grafos** | 6 |
| **Unidad 2 · 3. Búsqueda ciega: BFS y DFS** | 8 |
| **Unidad 2 · 4. Búsqueda heurística: Greedy y A\*** | 7 |
| **Unidad 2 · 5. Búsqueda local: HC y SA** | 9 |
| **Unidad 2 · 6. Algoritmos genéticos (evolutivos)** | 10 |
| **Unidad 2 · Casos y código Python (U2)** | 12 (48 incisos) |
| **Total (U1 + U2)** | **414 preguntas · 582 incisos** |

- **Análisis completo de la Unidad 2** en [`ANALISIS_UNIDAD_2.md`](./ANALISIS_UNIDAD_2.md): apuntes corregidos, desglose de los 6 temas oficiales, pendientes por confirmar del Tema 1 (esposos celosos / fases / jarras `[2,0]`) y diccionario de código Python de los 20 notebooks de Google Colab (`U2/*.ipynb`).
- **Simuladores interactivos de la Unidad 2 (`#lab`)**:
  - **Simulador de Grafos**: ejecuta paso a paso BFS (`deque.popleft`), DFS (`pop` + `reversed`), Greedy ($f(n)=h(n)$) y A\* ($f(n)=g(n)+h(n)$) sobre los 5 grafos de clase y permite **aislar nodos** con un clic.
  - **Simulador de Búsqueda Local**: compara Hill Climbing y Simulated Annealing ($P = e^{\Delta/T}$) permitiendo cambiar $x_0$, $T_0$, $\alpha$, iteraciones y semilla.
  - **Simulador de Algoritmos Genéticos**: gráfica interactiva de convergencia (`------`) cambiando población, generaciones, tasa de mutación, Torneo vs Ruleta y elitismo.

- **Lecciones** por tema, separando lo que dijo el profesor, los errores del apunte corregidos
  y lo que se agregó.
- **Práctica** que prioriza lo que nunca has contestado y lo que fallaste.
- Las preguntas de **identificar ramas y enfoques** siempre dejan marcar varias, con la lista
  completa, para que el formato no delate cuántas son. En los **casos**, cada inciso de
  identificar pide escribir la justificación antes de revisar y luego muestra qué tenía que decir.
- **Simulacro** de 18 preguntas: 8 de opción múltiple (cada una a partir de un caso, sin
  definiciones ni flujos) y 10 casos con incisos, como reportaron
  los compañeros que ya presentaron el examen.
- **Repaso** de lo que has fallado.
- **Tablas**, una sección aparte de las preguntas para trabajar las tablas a mano:
  - memorizar los cinco conectores (taparlos y llenarlos de memoria, ronda rápida, columnas que
    conviene reconocer y atajos para razonar);
  - resolver 49 tablas columna por columna, con la regla de cada conector a la vista y los
    renglones mal marcados para corregirlos (incluye las leyes, que se comprueban con ↔);
  - desde la frase (17 problemas): sacar las proposiciones en positivo, simbolizar, contar los
    renglones, hacer la tabla y clasificarla, como en el examen;
  - comprobar cualquier fórmula con todos sus pasos intermedios.
- **Simulador del controlador PID** en un aerogenerador: qué hace cada componente y por qué
  hace falta anticipar.
- Notación **V/F o 1/0**, y modo oscuro automático.

El progreso se guarda en el navegador. No hay cuentas ni servidor.

## Usarla

```bash
npm install
npm run dev        # abre en http://localhost:5173
```

## Publicarla en GitHub Pages

1. Crea un repositorio vacío en GitHub y sube este proyecto:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/fdi-estudio.git
   git push -u origin main
   ```
2. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
3. Cada vez que hagas `git push`, se corre `.github/workflows/desplegar.yml`, que primero pasa las
   pruebas y luego publica. La dirección queda como `https://TU-USUARIO.github.io/fdi-estudio/`.

También funciona en Vercel sin configurar nada: importa el repositorio y listo.

## Un solo archivo

```bash
npm run build:unico
```

Genera `dist-unico/index.html`, que tiene todo adentro: se abre con doble clic, sin internet
(salvo las fuentes) y se puede mandar por WhatsApp.

## Pruebas

```bash
npm test
```

**742 pruebas.** Verifican sobre todo esto:

- **El motor de lógica** (`src/logica/motor.test.ts`): los cinco conectores, el orden de los
  renglones, De Morgan, la contrapositiva, las reglas de inferencia y sus falacias.
- **El banco de preguntas** (`src/contenido/contenido.test.ts`): que no haya ids repetidos ni
  opciones duplicadas, que cada fórmula se pueda leer, que cada respuesta de simbolizar use
  exactamente las proposiciones dadas, y que cada pregunta de conclusiones tenga **una sola**
  respuesta válida. Las de identificar enfoques van todas con selección múltiple, las mismas
  cinco opciones y la misma pregunta, para que el formato no delate si es uno o varios.
- **El simulador PID** (`src/logica/pid.test.ts`): que muestre lo que dice la lección (solo P
  deja error, la integral lo quita, la predicción baja el pico a menos de un tercio).
- **Que todo se dibuje** (`src/render.test.ts`): las 9 lecciones y las 354 preguntas.
- **La sección de tablas** (`src/paginas/tablas.test.tsx`): llenar una columna, equivocarse y
  corregir, que cada uno de los problemas abra, y que las leyes verdaderas den tautología y las
  trampas (recíproca, inversa, De Morgan mal recordada) no.

Las respuestas de tablas, clasificación y conclusiones **no están escritas a mano**: las calcula
el motor a partir de la fórmula. Así es imposible que el banco tenga una de esas respuestas mal.

## Agregar preguntas

Cada tema tiene su archivo en `src/contenido/preguntas/`. Ejemplo:

```ts
P.opcion(
  'Enunciado de la pregunta',
  ['Opción A', 'Opción B', 'Opción C'],
  0,                          // índice de la correcta
  'Explicación que se muestra al contestar. Admite **negritas**.',
),
```

Después corre `npm test`: si algo quedó mal construido, te dice cuál.
