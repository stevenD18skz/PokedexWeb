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
  const { poke } = useParams();
  const [pokemonData, setPokemonData] = useState({
    id: "",
    name: "",
    types: "",
    image: "",
    stats: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const chain = [
    { name: "caterpie", level: 0 },
    { name: "metapod", level: 7 },
    { name: "butterfree", level: 10 },
  ];

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke}`,
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-slate-800 font-mono">
      <NavBar></NavBar>
      <div className="m-auto w-full rounded-lg bg-green-800 p-4 shadow-lg md:w-8/12 xl:w-10/12">
        {/* HEADER */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/home")}
            className="my-auto mr-4 rounded-full p-2 text-gray-200 shadow-lg transition-all duration-300 hover:text-cyan-500"
          >
            🢘
          </button>

          <p className="my-6 text-center text-6xl font-bold capitalize text-gray-200">
            {pokemonData.name}
          </p>
        </div>

        {/* image */}
        <div className="z-10 flex justify-center">
          <img
            src={pokemonData.image}
            alt="image"
            className="rounded-full shadow-lg"
          />
        </div>

        {/* stats */}
        <div className="mt-6 w-full rounded-xl bg-gray-300 p-8 pt-24 text-center shadow-lg">
          <p className="my-6 text-3xl font-bold text-green-400">ABOUT</p>
          <p className="my-6 text-3xl font-bold text-green-400">BASE STATS</p>

          {pokemonData.stats.map((stat, index) => (
            <div
              key={index}
              className="m-auto mb-4 flex w-10/12 items-center justify-between rounded-lg bg-gray-200 p-2 shadow-md"
            >
              <p className="w-1/4 border-r-2 border-solid border-gray-600 pr-2">
                {stat.stat.name.toUpperCase()}
              </p>
              <div className="flex w-3/4 items-center justify-evenly">
                <p className="w-1/5">
                  {stat.base_stat.toString().length === 2
                    ? "0" + stat.base_stat
                    : "" + stat.base_stat}
                </p>
                <div className="h-6 w-8/12 overflow-hidden rounded-full bg-slate-500">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(stat.base_stat * 100) / 160}%`,
                      backgroundColor:
                        (stat.base_stat * 100) / 160 > 66
                          ? "#388E3C"
                          : (stat.base_stat * 100) / 160 > 33
                            ? "#FBC02D"
                            : "#D32F2F",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* line evolution */}
        <div className="my-28 w-full rounded-xl bg-gray-400 py-12 text-center">
          <h2 className="text-4xl">EVOLUTION</h2>
          <div className="mt-8 flex items-center justify-evenly">
            <div className="">
              <img
                className=""
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
                alt="primera forma"
              />
            </div>
            <p className="rounded-full bg-gray-300 px-4 py-1">16 Lvl.</p>
            <div className="">
              <img
                className=""
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"
                alt="primera forma"
              />
            </div>
            <p className="rounded-full bg-gray-300 px-4 py-1">32 Lvl.</p>
            <div className="">
              <img
                className=""
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"
                alt="primera forma"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
