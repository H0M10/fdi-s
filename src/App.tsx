import { useEffect } from 'react';
import { cambiarNotacion, useNotacion } from './notacion';
import { ComparadorU2, Inicio, LaboratorioU2, PaginaTema, Repaso } from './paginas/Paginas';
import { Simulacro } from './paginas/Simulacro';
import { Tablas } from './paginas/Tablas';
import { ir, useRuta } from './rutas';

const NAV = [
  ['inicio', 'Temas'],
  ['comparar', 'Comparar U2'],
  ['simulacro', 'Simulacro'],
  ['lab', 'Lab U2'],
  ['repaso', 'Repaso'],
  ['tablas', 'Tablas U1'],
] as const;

export default function App() {
  const ruta = useRuta();
  const { modo } = useNotacion();

  const sub = ruta.pagina === 'tema' ? ruta.tema : ruta.pagina === 'tablas' ? `${ruta.vista}-${ruta.problema ?? ''}` : '';
  useEffect(() => { window.scrollTo({ top: 0 }); }, [ruta.pagina, sub]);

  return (
    <>
      <header className="barra">
        <div className="barra-fila">
          <button className="marca" onClick={() => ir('inicio')}>FDI Estudio <span>U1 · U2</span></button>
          <nav className="nav" aria-label="Secciones">
            {NAV.map(([id, nombre]) => (
              <button key={id} onClick={() => ir(id)}
                aria-current={(ruta.pagina === id || (id === 'inicio' && ruta.pagina === 'tema')) ? 'page' : undefined}>
                {nombre}
              </button>
            ))}
          </nav>
          <button className="boton fant chico" title="Cambiar la notación de las tablas"
            onClick={() => cambiarNotacion(modo === 'VF' ? '01' : 'VF')}
            style={{ fontFamily: 'var(--mono)' }}>
            {modo === 'VF' ? 'V/F' : '1/0'}
          </button>
        </div>
      </header>
      <main>
        {ruta.pagina === 'inicio' && <Inicio key={ruta.unidad ?? 2} unidadInicial={ruta.unidad ?? 2} />}
        {ruta.pagina === 'tema' && <PaginaTema key={ruta.tema} id={ruta.tema} practicar={ruta.practicar} />}
        {ruta.pagina === 'comparar' && <ComparadorU2 />}
        {ruta.pagina === 'simulacro' && <Simulacro key={ruta.unidad ?? 2} unidadInicial={ruta.unidad ?? 2} />}
        {ruta.pagina === 'lab' && <LaboratorioU2 />}
        {ruta.pagina === 'repaso' && <Repaso />}
        {ruta.pagina === 'tablas' && <Tablas vista={ruta.vista} problema={ruta.problema} />}
      </main>
    </>
  );
}
