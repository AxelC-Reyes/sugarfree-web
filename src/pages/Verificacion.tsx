import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Verificacion() {
  const [ineFile, setIneFile] = useState<File | null>(null);
  const [selfieBlob, setSelfieBlob] = useState<Blob | null>(null);
  const nav = useNavigate();

  const puedeContinuar = ineFile && selfieBlob;

  const siguiente = () => {
    if (!puedeContinuar) return;
    nav('/perfil/fotos');
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 20 }}>
      <h2>Verificación de identidad</h2>

      <label>Foto frontal de INE o Licencia</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setIneFile(e.target.files?.[0] || null)}
      />

      <label>Selfie (simulada)</label>
      <button
        onClick={() => {
          const canvas = document.createElement('canvas');
          canvas.width = 200;
          canvas.height = 200;
          const ctx = canvas.getContext('2d')!;
          ctx.fillStyle = '#ff4455';
          ctx.fillRect(0, 0, 200, 200);
          ctx.fillStyle = '#fff';
          ctx.font = '20px sans-serif';
          ctx.fillText('SELFIE', 60, 100);
          canvas.toBlob((blob) => blob && setSelfieBlob(blob), 'image/jpeg');
        }}
      >
        Simular selfie
      </button>
      {selfieBlob && <p>✅ Selfie capturada</p>}

      <button disabled={!puedeContinuar} onClick={siguiente} style={{ marginTop: 20 }}>
        Continuar
      </button>
    </div>
  );
}