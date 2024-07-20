//Importacion de bibliotecas
import React from "react";

export default function LoadingIcon({ characterSearch, setCharacterSearch }) {
  return (
    // Display loading indicator while data is fetching
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}
