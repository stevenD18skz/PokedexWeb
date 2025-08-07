// src/context/useListPokemon.js
import { useContext } from "react";
import { PokemonContext } from "./PokemonContext";

export const useListPokemon = () => {
  return useContext(PokemonContext);
};
