//Importaciones de bibliotecas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//importaciones de las paginas
import { HomePage } from "./pages/Home.jsx";
import { PokemonVista } from "./pages/PokemonVista.jsx";
import DamageCalculator from "./pages/DamageCalculator.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pokedex/:poke" element={<PokemonVista />} />
        <Route path="/damageCalculator" element={<DamageCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
