import React, { useState, useEffect } from "react";
import axios from "axios";

export const usePokemon = (url) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching data from PokeAPI", error);
      } finally {
        setLoading(false); // Set loading to false after fetching or error
      }
    };

    fetchPokemon();
  }, [url]);

  return { pokemon, loading };
};
