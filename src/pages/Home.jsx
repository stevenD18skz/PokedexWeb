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

export function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFiltred, setPokemonFiltred] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [characterSearch, setCharacterSearch] = useState("");

  // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const getEvolutionChain = (chain, currentPokemon) => {
      let preEvolution = "nn";
      let evolution = "nn";
      const findEvolutions = (
        chain,
        currentPokemon,
        previousPokemon = null,
      ) => {
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
      return res;
    };

    const fetchPokemonData = async () => {
      try {
        setIsLoading(true); // Set loading to true before the fetch

        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=300",
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

  useEffect(() => {
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

export default HomePage;
