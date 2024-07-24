import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemon = (url) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

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

    const getEvolutionChainFull = async (chain) => {
      const res = [];
      const findEvolutions = async (chain, level = 0) => {
        const speciesRes = await axios.get(chain.species.url);
        const newElement = {
          name: chain.species.name,
          id: speciesRes.data.id,
          level,
        };
        res.push(newElement);

        if (Array.isArray(chain.evolves_to) && chain.evolves_to.length > 0) {
          for (const evolution of chain.evolves_to) {
            const evolutionLevel =
              evolution.evolution_details.length > 0
                ? evolution.evolution_details[0].min_level
                : 0;
            await findEvolutions(evolution, evolutionLevel);
          }
        }
      };
      await findEvolutions(chain);
      return res;
    };

    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        const speciesRes = await axios.get(res.data.species.url);
        const evolutionRes = await axios.get(
          speciesRes.data.evolution_chain.url,
        );
        const evolutionChain = getEvolutionChain(
          evolutionRes.data.chain,
          res.data.name,
        );
        const pokeEvolutionChain = await getEvolutionChainFull(
          evolutionRes.data.chain,
        );

        const fullData = {
          id: res.data.id,
          name: res.data.name,
          color: speciesRes.data.color.name,
          types: res.data.types.map((typeInfo) => typeInfo.type.name),
          image: res.data.sprites.other["official-artwork"].front_default,
          spriteImage: res.data.sprites.front_default,
          preEvolution: evolutionChain.preEvolution,
          evolution: evolutionChain.evolution,
          evolutionChain: pokeEvolutionChain,
        };

        console.log(fullData);

        setPokemon(fullData);
      } catch (error) {
        console.error("Error fetching data from PokeAPI", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [url]);

  return { pokemon, loading };
};
