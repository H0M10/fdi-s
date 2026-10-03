import { useNotacion } from '../notacion';
import { analizar, aTexto, evaluar, filas, pasos, variables } from '../logica/motor';

/** Tabla completa con columnas intermedias, de adentro hacia afuera. */
export function TablaVerdad({ formula, soloFinal = false }: { formula: string; soloFinal?: boolean }) {
  const { simbolo } = useNotacion();
  const arbol = analizar(formula);
  const vars = variables(arbol);
  const columnas = soloFinal ? [{ texto: aTexto(arbol), nodo: arbol }] : pasos(arbol);
  const renglones = filas(vars);

  return (
    <div className="marco">
      <table className="tv">
        <thead>
          <tr>
            {vars.map((v) => <th key={v} className="letra">{v}</th>)}
            {columnas.map((c, k) => (
              <th key={c.texto} className={[k === 0 ? 'sep' : '', k === columnas.length - 1 ? 'final' : ''].join(' ')}>
                {c.texto}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renglones.map((env, i) => (
            <tr key={i}>
              {vars.map((v) => (
                <td key={v} className={`letra ${env[v] ? 'v' : 'f'}`} style={{ fontWeight: 400 }}>{simbolo(env[v])}</td>
              ))}
              {columnas.map((c, k) => {
                const val = evaluar(c.nodo, env);
                return (
                  <td key={c.texto} className={[val ? 'v' : 'f', k === 0 ? 'sep' : '', k === columnas.length - 1 ? 'final' : ''].join(' ')}>
                    {simbolo(val)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
