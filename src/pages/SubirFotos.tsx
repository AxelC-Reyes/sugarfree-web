import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubirFotos() {
  const [files, setFiles] = useState<File[]>([]);
  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = Array.from(e.target.files || []);
    if (files.length + nuevos.length > 6) return alert('Máximo 6 fotos');
    setFiles([...files, ...nuevos]);
  };

  const quitar = (index: number) => setFiles(files.filter((_, i) => i !== index));

  const puedeContinuar = files.length >= 3;

  const siguiente = () => {
    if (!puedeContinuar) return;
    // Aquí subiremos a Firebase Storage luego
    nav('/feed');
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
      <h2>Sube al menos 3 fotos</h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        disabled={files.length >= 6}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 20 }}>
        {files.map((f, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(f)} alt="" style={{ width: '100%', height: 120, objectFit: 'cover' }} />
            <button onClick={() => quitar(i)} style={{ position: 'absolute', top: 4, right: 4 }}>✖</button>
          </div>
        ))}
      </div>

      <p>{files.length}/6  {files.length < 3 && '(mínimo 3)'}</p>

      <button disabled={!puedeContinuar} onClick={siguiente} style={{ marginTop: 20 }}>
        Continuar
      </button>
    </div>
  );
}