// Junta la compilación de dist/ en un solo HTML, con el CSS y el JS
// adentro. Sirve para abrir la app sin servidor, mandarla por WhatsApp o
// publicarla como Artifact.
//
// Produce dos archivos en dist-unico/:
//   index.html     el HTML completo, se abre con doble clic
//   artifact.html  el mismo contenido sin <html>, <head> ni <body>,
//                  que es el formato que pide el visor de Artifacts
//
// Uso: npm run build:unico

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const salida = join(raiz, 'dist-unico');

let html = readFileSync(join(dist, 'index.html'), 'utf8');

const css = [];
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/([^"]+\.css)"[^>]*>/g, (_, ruta) => {
  css.push(readFileSync(join(dist, ruta), 'utf8'));
  return '';
});

const js = [];
html = html.replace(/<script type="module"[^>]*src="\.\/([^"]+\.js)"[^>]*><\/script>/g, (_, ruta) => {
  // Un "</script" dentro del código cerraría la etiqueta antes de tiempo.
  js.push(readFileSync(join(dist, ruta), 'utf8').replace(/<\/script/gi, '<\\/script'));
  return '';
});

if (css.length === 0 || js.length === 0) {
  console.error('No se encontraron el CSS o el JS en dist/index.html. ¿Corriste npm run build?');
  process.exit(1);
}

const estilo = `<style>\n${css.join('\n')}\n</style>`;
const guion = `<script type="module">\n${js.join('\n')}\n</script>`;

// Versión completa: el CSS en el head, el JS al final del body.
// Ojo: el reemplazo va como función y no como texto. Si fuera texto,
// replace() interpretaría los "$&", "$`" y "$'" que aparecen dentro del
// código de React como patrones especiales, y duplicaría pedazos del HTML.
const completo = html
  .replace('</head>', () => `${estilo}\n</head>`)
  .replace('</body>', () => `${guion}\n</body>`);

// Versión para Artifact: el visor pone su propio esqueleto, así que solo
// van el título, las fuentes, el estilo, el contenedor y el script.
const titulo = html.match(/<title>[\s\S]*?<\/title>/)[0];
const fuentes = (html.match(/<link rel="(?:preconnect|stylesheet)"[^>]*>/g) ?? []).join('\n');
const artifact = [titulo, fuentes, estilo, '<div id="root"></div>', guion].join('\n');

mkdirSync(salida, { recursive: true });
writeFileSync(join(salida, 'index.html'), completo);
writeFileSync(join(salida, 'artifact.html'), artifact);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
console.log(`dist-unico/index.html     ${kb(completo)}`);
console.log(`dist-unico/artifact.html  ${kb(artifact)}`);
