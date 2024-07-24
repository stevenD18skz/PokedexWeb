// PokemonContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const PokemonContext = createContext();

export const useListPokemon = () => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return res;
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true); // Set loading to true before the fetch

        const cachedPokemon = localStorage.getItem("pokemonData");
        if (cachedPokemon) {
          setPokemonList(JSON.parse(cachedPokemon));
          setIsLoading(false);
          return;
        }

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
        localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching data from PokeAPI", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching or error
      }
    };

    if (pokemonList.length === 0) {
      fetchPokemonData();
    }
  }, [pokemonList]);

  return (
    <PokemonContext.Provider value={{ pokemonList, isLoading }}>
      {children}
    </PokemonContext.Provider>
  );
};
