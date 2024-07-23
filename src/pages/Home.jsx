//Importaciones de bibliotecas
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//Importaciones de componentes
import NavBar from "../components/NavBar";
import CardPokemon from "../components/CardPokemon";
import SearchBar from "../components/SearchBar";
import LoadingIcon from "../components/LoadingIcon";
import SideBar from "../components/SideBar";

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
          "https://pokeapi.co/api/v2/pokemon?limit=20",
        );
        const results = response.data.results;

        const promises = results.map(async (result) => {
          const res = await axios.get(result.url);
          const speciesRes = await axios.get(res.data.species.url);
          const evolutionRes = await axios.get(
            speciesRes.data.evolution_chain.url,
          );
          const evolutionChain = getEvolutionChain(
            evolutionRes.data.chain,
            res.data.name,
          );
          const pokeEvolutionChain = getEvolutionChainFull(
            evolutionRes.data.chain,
          );

          return {
            id: res.data.id,
            name: res.data.name,
            color: speciesRes.data.color.name,
            types: res.data.types.map((typeInfo) => typeInfo.type.name),
            image: res.data.sprites.other["official-artwork"].front_default,
            preEvolution: evolutionChain.preEvolution,
            evolution: evolutionChain.evolution,
            evolutionChain: pokeEvolutionChain,
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

  const getEvolutionChainFull = (chain) => {
    const res = [];

    const findEvolutions = (chain, level = 0) => {
      const newElement = { name: chain.species.name, level };
      res.push(newElement);

      if (Array.isArray(chain.evolves_to) && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution) => {
          const evolutionLevel =
            evolution.evolution_details.length > 0
              ? evolution.evolution_details[0].min_level
              : 0;
          findEvolutions(evolution, evolutionLevel);
        });
      }
    };

    findEvolutions(chain);
    console.log(res);
    return res;
  };

  useEffect(() => {
    const personajesFiltrados = pokemonList.filter((poke) =>
      poke?.name.toLowerCase().includes(characterSearch.toLowerCase()),
    );
    setPokemonFiltred(personajesFiltrados);
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
  }, [characterSearch, pokemonList]);

  // Calcular los Pokémon de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonFiltred.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pokemonFiltred.length / itemsPerPage);
  // Manejadores de cambio de página
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-500 font-mono">
        <NavBar />
        <SideBar></SideBar>
        <div className="m-auto min-h-screen w-8/12 bg-gray-300 p-4 pt-20">
          <SearchBar />
          <LoadingIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-500 font-mono">
      <NavBar />
      <SideBar></SideBar>
      <div className="m-auto min-h-screen w-8/12 bg-gray-300 p-4 pt-20">
        <SearchBar
          characterSearch={characterSearch}
          setCharacterSearch={setCharacterSearch}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((pokemon) => (
            <CardPokemon key={pokemon.id} data={pokemon} />
          ))}
        </div>

        {/**paginacion */}

        <div className="mb-4 mt-20 text-center">
          <p className="mx-auto mb-2">
            {`Showing ${indexOfFirstItem + 1} to ${currentPage === Math.ceil(pokemonFiltred.length / itemsPerPage) ? pokemonFiltred.length : indexOfLastItem} of ${pokemonFiltred.length} Entries`}
          </p>

          <div className="mx-auto flex w-full items-center justify-between border-t-2 border-gray-200">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex cursor-pointer items-center pt-3 text-gray-600 hover:text-indigo-700"
            >
              &lt;
              <p className="ml-3 text-lg font-medium leading-none">Previous</p>
            </button>

            <div className="flex justify-evenly">
              {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                  &lt;
                </button>
              )}

              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;
                const isEllipsisBefore = currentPage > 3 && pageNumber === 2;
                const isEllipsisAfter =
                  currentPage < totalPages - 2 && pageNumber === totalPages - 1;
                const isPageNumberVisible =
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  Math.abs(pageNumber - currentPage) <= 1;

                if (isEllipsisBefore) {
                  return (
                    <p key={pageNumber} className="mx-2">
                      ...
                    </p>
                  );
                }

                if (isEllipsisAfter) {
                  return (
                    <p key={pageNumber} className="mx-2">
                      ...
                    </p>
                  );
                }

                if (isPageNumberVisible) {
                  return (
                    <p
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`mr-4 cursor-pointer border-t ${
                        currentPage === pageNumber
                          ? "border-indigo-400 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-indigo-400 hover:text-indigo-700"
                      } px-2 pt-3 text-lg font-medium leading-none`}
                    >
                      {pageNumber}
                    </p>
                  );
                }

                return null;
              })}

              {currentPage < totalPages && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                  &gt;
                </button>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={indexOfLastItem >= pokemonFiltred.length}
              className="flex cursor-pointer items-center pt-3 text-gray-600 hover:text-indigo-700"
            >
              <p className="mr-3 text-lg font-medium leading-none">Next</p>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 7.33333L12.8333 4"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 0.666687L12.8333 4.00002"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

*/
