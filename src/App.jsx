//Importaciones de bibliotecas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//importaciones de las paginas
import HomePage from "./pages/Home.jsx";
import Pokedex from "./pages/Pokedex.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";
import DamageCalculator from "./pages/DamageCalculator.jsx";
import CaptureCalculator from "./pages/CaptureCalculator.jsx";
import Quiz from "./pages/Quiz.jsx";

//importacinon de hooks y contextos
import { PokemonProvider } from "./context/PokemonProvider.jsx";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/pokedex/" element={<Pokedex />} />
          <Route path="/pokedex/:mainId" element={<PokemonDetail />} />
          <Route path="/damageCalculator" element={<DamageCalculator />} />
          <Route path="/captureCalculator" element={<CaptureCalculator />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
