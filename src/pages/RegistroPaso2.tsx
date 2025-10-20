import { useRegistro } from '../context/RegistroCtx';
import { useNavigate } from 'react-router-dom';

export default function RegistroPaso2() {
  const { genero, setRol } = useRegistro();
  const nav = useNavigate();

  const seleccionar = (r: 'sugarbaby' | 'sugardaddy' | 'sugarmommy') => {
    setRol(r);
    nav('/registro/datos');
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>¿Cómo te identificas?</h2>
      <div style={{ marginTop: 20, display: 'flex', gap: 20, justifyContent: 'center' }}>
        <button onClick={() => seleccionar('sugarbaby')}>SugarBaby</button>
        <button onClick={() => seleccionar(genero === 'hombre' ? 'sugardaddy' : 'sugarmommy')}>
          {genero === 'hombre' ? 'SugarDaddy' : 'SugarMommy'}
        </button>
      </div>
    </div>
  );
}