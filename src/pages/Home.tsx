export default function Home() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Bienvenido a SugarFree</h1>
      <p>Registro gratis. Verificación obligatoria.</p>
      <a href="/registro">
        <button style={{ padding: '10px 20px', fontSize: 16 }}>Empezar registro</button>
      </a>
    </div>
  );
}