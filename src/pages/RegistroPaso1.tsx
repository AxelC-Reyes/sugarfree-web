import { useRegistro } from '../context/RegistroCtx';
import { useNavigate } from 'react-router-dom';

export default function RegistroPaso1() {
  const { setGenero } = useRegistro();
  const nav = useNavigate();

  const seleccionar = (g: 'hombre' | 'mujer') => {
    setGenero(g);
    nav('/registro/paso2');
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>¿Qué eres?</h2>
      <div style={{ marginTop: 20, display: 'flex', gap: 20, justifyContent: 'center' }}>
        <button onClick={() => seleccionar('hombre')}>Hombre</button>
        <button onClick={() => seleccionar('mujer')}>Mujer</button>
      </div>
    </div>
  );
}