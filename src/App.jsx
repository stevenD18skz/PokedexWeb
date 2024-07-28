//Importaciones de bibliotecas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//importaciones de las paginas
import HomePage from "./pages/Home.jsx";
import PokemonVista from "./pages/PokemonVista.jsx";
import DamageCalculator from "./pages/DamageCalculator.jsx";
import Pokedex from "./pages/Pokedex.jsx";

//importacinon de hooks y contextos
import { PokemonProvider } from "./context/PokemonContext.jsx";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/pokedexConsole/" element={<Pokedex />} />
          <Route path="/pokedex/:mainId" element={<PokemonVista />} />
          <Route path="/damageCalculator" element={<DamageCalculator />} />
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
