//Importaciones de bibliotecas
import React from "react";
import { useParams } from "react-router-dom";

//Importaciones de componentes
import NavBar from "../components/NavBar";

export function ModalPokemon() {
  const { poke } = useParams(); // Obtiene el ID de obra del pokemon

  return (
    <div className="bg-gray-500 font-mono">
      <NavBar></NavBar>
      <div className="w-8/12 m-auto p-4 bg-gray-300 min-h-screen">

      


      </div>
    </div>
  );
}
