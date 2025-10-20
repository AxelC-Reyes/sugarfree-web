import { createContext, useContext, useState, type ReactNode } from 'react';

type Genero = 'hombre' | 'mujer' | null;
type Rol    = 'sugarbaby' | 'sugardaddy' | 'sugarmommy' | null;
type Cuerpo = 'delgado' | 'atletico' | 'llenito';
type Mental = 'openmind' | 'conservador';

interface RegistroCtxType {
  genero: Genero;
  setGenero: (g: Genero) => void;
  rol: Rol;
  setRol: (r: Rol) => void;
  nacimiento: string;
  setNacimiento: (d: string) => void;
  altura: number | '';
  setAltura: (a: number | '') => void;
  peso: number | '';
  setPeso: (p: number | '') => void;
  tono: string;
  setTono: (t: string) => void;
  cuerpo: Cuerpo | '';
  setCuerpo: (c: Cuerpo | '') => void;
  gym: boolean | '';
  setGym: (g: boolean | '') => void;
  mental: Mental | '';
  setMental: (m: Mental | '') => void;
}

const RegistroCtx = createContext<RegistroCtxType>({} as RegistroCtxType);

export const RegistroProvider = ({ children }: { children: ReactNode }) => {
  const [genero, setGenero] = useState<Genero>(null);
  const [rol, setRol] = useState<Rol>(null);
  const [nacimiento, setNacimiento] = useState('');
  const [altura, setAltura] = useState<number | ''>('');
  const [peso, setPeso] = useState<number | ''>('');
  const [tono, setTono] = useState('');
  const [cuerpo, setCuerpo] = useState<Cuerpo | ''>('');
  const [gym, setGym] = useState<boolean | ''>('');
  const [mental, setMental] = useState<Mental | ''>('');

  return (
    <RegistroCtx.Provider
      value={{
        genero, setGenero,
        rol, setRol,
        nacimiento, setNacimiento,
        altura, setAltura,
        peso, setPeso,
        tono, setTono,
        cuerpo, setCuerpo,
        gym, setGym,
        mental, setMental,
      }}
    >
      {children}
    </RegistroCtx.Provider>
  );
};

export const useRegistro = () => useContext(RegistroCtx);