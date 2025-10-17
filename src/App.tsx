import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistroPaso1 from './pages/RegistroPaso1';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<RegistroPaso1 />} />
      </Routes>
    </BrowserRouter>
  );
}