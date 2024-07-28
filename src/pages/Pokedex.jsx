//Importaciones de bibliotecas
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//Importaciones de componentes
import NavBar from "../components/NavBar";
import CardPokemon from "../components/CardPokemon";
import SearchBar from "../components/SearchBar";
import LoadingIcon from "../components/LoadingIcon";
import Pagination from "../components/Pagination";

//importacion de hooks y contextos
import { useListPokemon } from "../context/PokemonContext";

export default function Pokedex() {
  const { pokemonList, isLoading } = useListPokemon();
  const [pokemonFiltred, setPokemonFiltred] = useState([]);
  const [characterSearch, setCharacterSearch] = useState("");

  // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setPokemonFiltred(pokemonList);
    const personajesFiltrados = pokemonList.filter((poke) =>
      poke?.name.toLowerCase().includes(characterSearch.toLowerCase()),
    );
    setPokemonFiltred(personajesFiltrados);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [characterSearch, pokemonList]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-500 pt-20 font-mono">
        <NavBar />
        <div className="m-auto min-h-screen w-full bg-gray-300 p-4 md:w-10/12 lg:w-9/12">
          <SearchBar />
          <LoadingIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-500 pt-20 font-mono">
      <NavBar />
      <div className="m-auto min-h-screen w-full bg-gray-300 p-4 md:w-10/12 lg:w-9/12">
        <SearchBar
          characterSearch={characterSearch}
          setCharacterSearch={setCharacterSearch}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((pokemon) => (
            <CardPokemon key={pokemon.id} data={pokemon} />
          ))}
        </div>

        {/** paginación */}
        <Pagination
          pokemonFiltred={pokemonFiltred}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </div>
  );
}
