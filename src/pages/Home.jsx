//Importaciones de bibliotecas
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//Importaciones de componentes
import NavBar from "../components/NavBar";
import CardPokemon from "../components/CardPokemon";
import SearchBar from "../components/SearchBar";
import LoadingIcon from "../components/LoadingIcon";

export function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFiltred, setPokemonFiltred] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [characterSearch, setCharacterSearch] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // Número de Pokémon por página

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true); // Set loading to true before the fetch

        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=61"
        );
        const results = response.data.results;

        const promises = results.map(async (result) => {
          const res = await axios.get(result.url);
          const speciesRes = await axios.get(res.data.species.url);
          const evolutionRes = await axios.get(
            speciesRes.data.evolution_chain.url
          );
          const evolutionChain = getEvolutionChain(
            evolutionRes.data.chain,
            res.data.name
          );
          return {
            id: res.data.id,
            name: res.data.name,
            color: speciesRes.data.color.name,
            types: res.data.types.map((typeInfo) => typeInfo.type.name),
            image: res.data.sprites.other["official-artwork"].front_default,
            preEvolution: evolutionChain.preEvolution,
            evolution: evolutionChain.evolution,
          };
        });

        const pokemonData = await Promise.all(promises);
        setPokemonList(pokemonData);
        setPokemonFiltred(pokemonData);
      } catch (error) {
        console.error("Error fetching data from PokeAPI", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching or error
      }
    };

    fetchPokemonData();
  }, []);

  const getEvolutionChain = (chain, currentPokemon) => {
    let preEvolution = "nn";
    let evolution = "nn";
    const findEvolutions = (chain, currentPokemon, previousPokemon = null) => {
      if (chain.species.name === currentPokemon) {
        if (previousPokemon) {
          preEvolution = previousPokemon;
        }
        if (chain.evolves_to.length > 0) {
          evolution = chain.evolves_to[0].species.name;
        }
      } else {
        chain.evolves_to.forEach((evoChain) => {
          findEvolutions(evoChain, currentPokemon, chain.species.name);
        });
      }
    };
    findEvolutions(chain, currentPokemon);
    return { preEvolution, evolution };
  };

  useEffect(() => {
    const personajesFiltrados = pokemonList.filter((poke) =>
      poke?.name.toLowerCase().includes(characterSearch.toLowerCase())
    );
    setPokemonFiltred(personajesFiltrados);
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
  }, [characterSearch, pokemonList]);



  // Calcular los Pokémon de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonFiltred.slice(indexOfFirstItem, indexOfLastItem);

  

  // Manejadores de cambio de página
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="bg-gray-500 font-mono min-h-screen">
      <NavBar />
      <div className="w-8/12 m-auto p-4 bg-gray-300 min-h-screen">
        <SearchBar
          characterSearch={characterSearch}
          setCharacterSearch={setCharacterSearch}
        />

        {isLoading ? (
          <LoadingIcon />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {currentItems.map((pokemon) => (
                <CardPokemon key={pokemon.id} data={pokemon} />
              ))}
            </div>


            <div className="flex  flex-col items-center mt-20">

              <p>
                {`Showing ${indexOfFirstItem + 1} to ${ currentPage === Math.ceil(pokemonFiltred.length/itemsPerPage) ? pokemonFiltred.length : indexOfLastItem} of ${pokemonFiltred.length} Entries`}
              </p>

              <div className="flex justify-center mt-4"> 

                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 m-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={indexOfLastItem >= pokemonFiltred.length}
                  className="px-4 py-2 m-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>

              </div>


              <p>orden</p>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
