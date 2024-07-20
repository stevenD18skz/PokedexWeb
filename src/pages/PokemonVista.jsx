//Importaciones de bibliotecas
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Importaciones de componentes
import NavBar from "../components/NavBar";
import LoadingIcon from "../components/LoadingIcon";

export function PokemonVista() {
  const { poke } = useParams(); // Obtiene el ID o nombre del obra del pokemon
  const [pokemonData, setPokemonData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke}`
        );
        const results = response.data;

        const final = {
          id: results.id,
          name: results.name,
          types: results.types.map((typeInfo) => typeInfo.type.name),
          image: results.sprites.other["official-artwork"].front_default,
          stats: results.stats,
        };
        setPokemonData(final);
      } catch (error) {
        console.error("Error fetching data from PokeAPI", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (isLoading) {
    return <LoadingIcon></LoadingIcon>;
  }

  return (
    <div className="bg-gray-500 font-mono">
      <NavBar></NavBar>

      <div className="w-8/12 m-auto p-4 bg-green-500 min-h-screen flex">
        <div className="w-full rounded-xl bg-gray-100 text-center">
          <img className="z-10 m-auto" src={pokemonData.image} alt="image" />

          <p className="text-center font-bold my-6 text-3xl text-green-700">
            ABOUT
          </p>
          <p className="text-center font-bold my-6 text-3xl text-green-700">
            BASE STATS
          </p>

          {pokemonData.stats.map((stat, index) => (
            <div key={index} className="flex justify-evenly w-10/12 m-auto">
              <p className="w-1/4 border-r-2 border-solid border-r-gray-700">
                {stat.stat.name.toUpperCase()}
              </p>

              <div className="flex justify-evenly w-3/4 items-center">
                <p className="w-1/5">
                  {stat.base_stat.toString().length === 2
                    ? "0" + stat.base_stat
                    : "" + stat.base_stat}
                </p>
                <div className="w-8/12 h-3/6 rounded-full bg-green-400">
                  <div
                    className="rounded-full h-full bg-green-700"
                    style={{
                      width: `${((stat.base_stat * 100) / 160).toString()}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/home")}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
