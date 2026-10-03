import { useEffect } from 'react';
import { cambiarNotacion, useNotacion } from './notacion';
import { Constructor, Inicio, PaginaTema, Repaso } from './paginas/Paginas';
import { Simulacro } from './paginas/Simulacro';
import { ir, useRuta } from './rutas';

const NAV = [
  ['inicio', 'Temas'],
  ['simulacro', 'Simulacro'],
  ['repaso', 'Repaso'],
  ['tablas', 'Tablas'],
] as const;

export default function App() {
  const ruta = useRuta();
  const { modo } = useNotacion();

  useEffect(() => { window.scrollTo({ top: 0 }); }, [ruta.pagina, ruta.pagina === 'tema' ? ruta.tema : '']);

  return (
    <>
      <header className="barra">
        <div className="barra-fila">
          <button className="marca" onClick={() => ir('inicio')}>FDI Estudio <span>(p ∧ q) → r</span></button>
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
        {ruta.pagina === 'inicio' && <Inicio />}
        {ruta.pagina === 'tema' && <PaginaTema key={ruta.tema} id={ruta.tema} practicar={ruta.practicar} />}
        {ruta.pagina === 'simulacro' && <Simulacro />}
        {ruta.pagina === 'repaso' && <Repaso />}
        {ruta.pagina === 'tablas' && <Constructor />}
      </main>
    </>
  );
}
