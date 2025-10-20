import { useRegistro } from '../context/RegistroCtx';
import { useNavigate } from 'react-router-dom';

export default function RegistroDatos() {
  const {
    nacimiento, setNacimiento,
    altura, setAltura,
    peso, setPeso,
    tono, setTono,
    cuerpo, setCuerpo,
    gym, setGym,
    mental, setMental,
  } = useRegistro();
  const nav = useNavigate();

  const puedeContinuar =
    nacimiento && altura && peso && tono && cuerpo && gym !== '' && mental;

  const siguiente = () => {
    if (!puedeContinuar) return;
    nav('/registro/verificacion');
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 20 }}>
      <h2>Tus datos</h2>

      <label>Fecha de nacimiento</label>
      <input type="date" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} />

      <label>Altura (cm)</label>
      <input type="number" value={altura} onChange={(e) => setAltura(Number(e.target.value))} />

      <label>Peso (kg)</label>
      <input type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} />

      <label>Tono de piel</label>
      <select value={tono} onChange={(e) => setTono(e.target.value)}>
        <option value="">Selecciona</option>
        <option value="Claro">Claro</option>
        <option value="Moreno claro">Moreno claro</option>
        <option value="Moreno">Moreno</option>
        <option value="Oscuro">Oscuro</option>
      </select>

      <label>Tipo de cuerpo</label>
      <select value={cuerpo} onChange={(e) => setCuerpo(e.target.value as any)}>
        <option value="">Selecciona</option>
        <option value="delgado">Delgado</option>
        <option value="atletico">Atlético</option>
        <option value="llenito">Llenito</option>
      </select>

      <label>¿Asistes al gym?</label>
      <select value={gym === '' ? '' : gym ? 'si' : 'no'} onChange={(e) => setGym(e.target.value === 'si' ? true : e.target.value === 'no' ? false : '')}>
        <option value="">Selecciona</option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>

      <label>¿Open mind o conservador?</label>
      <select value={mental} onChange={(e) => setMental(e.target.value as any)}>
        <option value="">Selecciona</option>
        <option value="openmind">Open mind</option>
        <option value="conservador">Conservador</option>
      </select>

      <button disabled={!puedeContinuar} onClick={siguiente} style={{ marginTop: 20 }}>
        Continuar
      </button>
    </div>
  );
}