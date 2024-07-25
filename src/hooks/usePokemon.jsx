import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemon = (url) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        console.log(speciesRes.data.flavor_text_entries[0].language.name);
        console.log(speciesRes.data.flavor_text_entries[0].version.name);

        const aboutFiltred = speciesRes.data.flavor_text_entries.filter(
          (txt) => txt.language.name === "es" && txt.version.name === "x",
        );
        console.log();

        const evolutionRes = await axios.get(
          speciesRes.data.evolution_chain.url,
        );
        const pokeEvolutionChain = await getEvolutionChainFull(
          evolutionRes.data.chain,
        );

        const fullData = {
          id: res.data.id,
          name: res.data.name,
          color: speciesRes.data.color.name,
          types: res.data.types.map((typeInfo) => typeInfo.type.name),
          stats: res.data.stats,
          image: res.data.sprites.other["official-artwork"].front_default,
          spriteImage: res.data.sprites.front_default,
          evolutionChain: pokeEvolutionChain,
          about: aboutFiltred[0].flavor_text,
        };
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
