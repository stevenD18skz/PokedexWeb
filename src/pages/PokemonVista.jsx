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

  //relative top-32

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
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen font-mono text-gray-200">
      <NavBar />

      <div className="w-11/12 md:w-8/12 lg:w-6/12 m-auto p-4 bg-red-600 rounded-lg shadow-lg mt-10 relative overflow-hidden">
        {/* Contenedor de la imagen sobresaliendo */}
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-40">
          <img
            src={pokemonData.image}
            alt="image"
            className="rounded-full shadow-lg border-4 border-red-600"
          />
        </div>

        <div className="pt-24 pb-8 relative z-20 bg-gray-800 rounded-xl shadow-md">
          <button
            onClick={() => navigate("/home")}
            className="m-8 p-2 px-3 rounded bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-white"
          >
            Volver
          </button>

          <p className="capitalize text-6xl text-gray-200 font-bold text-center my-6">
            {pokemonData.name}
          </p>

          <div className="w-full p-8 pt-24 rounded-xl bg-gray-800 text-center shadow-lg mt-6">
            <p className="font-bold my-6 text-3xl text-green-400">ABOUT</p>
            <p className="font-bold my-6 text-3xl text-green-400">BASE STATS</p>

            {pokemonData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-10/12 m-auto mb-4 p-2 bg-gray-700 rounded-lg shadow-md"
              >
                <p className="w-1/4 border-r-2 border-solid border-gray-600 pr-2">
                  {stat.stat.name.toUpperCase()}
                </p>
                <div className="flex justify-evenly w-3/4 items-center">
                  <p className="w-1/5">
                    {stat.base_stat.toString().length === 2
                      ? "0" + stat.base_stat
                      : "" + stat.base_stat}
                  </p>
                  <div className="w-8/12 h-6 rounded-full bg-green-400 overflow-hidden">
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
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen font-mono text-gray-200">
      <NavBar />

      <div className="w-11/12 md:w-8/12 lg:w-6/12 m-auto p-4 bg-red-600 rounded-lg shadow-lg mt-10">
        <button
          onClick={() => navigate("/home")}
          className="m-8 p-2 px-3 rounded bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-white"
        >
          Volver
        </button>

        <p className="capitalize text-6xl text-gray-200 font-bold text-center my-6">
          {pokemonData.name}
        </p>

        <div className="z-10 flex justify-center">
          <img
            src={pokemonData.image}
            alt="image"
            className="rounded-full shadow-lg"
          />
        </div>

        <div className="w-full p-8 pt-24 rounded-xl bg-gray-800 text-center shadow-lg mt-6">
          <p className="font-bold my-6 text-3xl text-green-400">ABOUT</p>
          <p className="font-bold my-6 text-3xl text-green-400">BASE STATS</p>

          {pokemonData.stats.map((stat, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-10/12 m-auto mb-4 p-2 bg-gray-700 rounded-lg shadow-md"
            >
              <p className="w-1/4 border-r-2 border-solid border-gray-600 pr-2">
                {stat.stat.name.toUpperCase()}
              </p>
              <div className="flex justify-evenly w-3/4 items-center">
                <p className="w-1/5">
                  {stat.base_stat.toString().length === 2
                    ? "0" + stat.base_stat
                    : "" + stat.base_stat}
                </p>
                <div className="w-8/12 h-6 rounded-full bg-green-400 overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}
