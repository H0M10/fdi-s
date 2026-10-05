# FDI Estudio

App para estudiar el examen de **Fundamentos de IA**: cada tema explicado con los ejemplos de
clase, un banco de preguntas para practicar y un simulacro con el mismo formato del examen.

## Qué tiene

| Tema | Preguntas |
|---|---|
| Enfoques de la IA | 66 |
| Ramas de la IA | 39 |
| Ética e implicaciones sociales | 33 |
| Lógica y tablas de verdad | 86 (110 incisos) |
| Casos tipo examen | 19 (76 incisos) |
| Conceptos base | 17 |
| ¿Qué es la IA? | 9 |
| Antecedentes e historia | 25 |
| Aplicaciones y estado del arte | 25 |
| **Total** | **320 preguntas · 401 incisos** |

- **Lecciones** por tema, separando lo que dijo el profesor, los errores del apunte corregidos
  y lo que se agregó.
- **Práctica** que prioriza lo que nunca has contestado y lo que fallaste.
- **Simulacro** de 18 preguntas: 8 de opción múltiple y 10 casos con incisos, como reportaron
  los compañeros que ya presentaron el examen.
- **Repaso** de lo que has fallado.
- **Constructor de tablas** de verdad con todos los pasos intermedios.
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

**458 pruebas.** Verifican cinco cosas:

- **El motor de lógica** (`src/logica/motor.test.ts`): los cinco conectores, el orden de los
  renglones, De Morgan, la contrapositiva, las reglas de inferencia y sus falacias.
- **El banco de preguntas** (`src/contenido/contenido.test.ts`): que no haya ids repetidos ni
  opciones duplicadas, que cada fórmula se pueda leer, que cada respuesta de simbolizar use
  exactamente las proposiciones dadas, y que cada pregunta de conclusiones tenga **una sola**
  respuesta válida.
- **El simulador PID** (`src/logica/pid.test.ts`): que muestre lo que dice la lección (solo P
  deja error, la integral lo quita, la predicción baja el pico a menos de un tercio).
- **Que todo se dibuje** (`src/render.test.ts`): las 9 lecciones y las 320 preguntas.

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
