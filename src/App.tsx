import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistroPaso1 from './pages/RegistroPaso1';
import RegistroPaso2 from './pages/RegistroPaso2';
import RegistroDatos from './pages/RegistroDatos';
import Verificacion from './pages/Verificacion';
import SubirFotos from './pages/SubirFotos';
import Feed from './pages/Feed';
import ProfileWall from './pages/ProfileWall';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<RegistroPaso1 />} />
        <Route path="/registro/paso2" element={<RegistroPaso2 />} />
        <Route path="/registro/datos" element={<RegistroDatos />} />
        <Route path="/registro/verificacion" element={<Verificacion />} />
        <Route path="/perfil/fotos" element={<SubirFotos />} />
        <Route path="/feed" element={<h1>Feed principal (próximamente)</h1>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed" element={<ProfileWall />} />
      </Routes>
    </BrowserRouter>
  );
}