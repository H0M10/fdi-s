import { ComparadorU2 } from './paginas/Paginas';

export default function App() {
  return (
    <>
      <header className="barra">
        <div className="barra-fila">
          <button
            className="marca"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            FDI Estudio <span>Guía Completa Unidad 2</span>
          </button>
          <nav className="nav" aria-label="Temas Unidad 2">
            {[
              ['#guia-t1', '1. Problemas'],
              ['#guia-t2', '2. Espacio'],
              ['#guia-t3', '3. BFS y DFS'],
              ['#guia-t4', '4. Greedy y A*'],
              ['#guia-t5', '5. Local'],
              ['#guia-t6', '6. Genéticos'],
              ['#guia-comparar', '7. Tabla y Examen'],
            ].map(([href, nombre]) => (
              <a
                key={href}
                href={href}
                style={{
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--tinta)',
                }}
              >
                {nombre}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <ComparadorU2 />
      </main>
    </>
  );
}
