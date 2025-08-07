//Importaciones de bibliotecas
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//Importaciones de componentes
import NavBar from "../components/ui/NavBar";
import LoadingIcon from "../components/ui/LoadingIcon";
import TypeSquare from "../components/ui/TypeSquare";

//imprtacino de custom hooks
import { usePokemon } from "../hooks/usePokemon";

export default function PokemonDetail() {
  const { mainId } = useParams(); // Constante que almacena el nombre o el ID del Pokémon

  const { pokemon, loading } = usePokemon(
    `https://pokeapi.co/api/v2/pokemon/${mainId}`,
  );

  const navigate = useNavigate();

  if (loading) {
    return <LoadingIcon />;
  }

  if (!pokemon) {
    return <div>Error loading Pokémon data.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 pt-20 font-mono">
      <NavBar />
      <div className="mx-auto flex w-full flex-col rounded-lg bg-white p-4 shadow-lg xl:w-10/12">
        {/* HEADER */}
        <div className="flex justify-between">
          <button
            onClick={() =>
              navigate(`/pokedex/${pokemon.id === 1 ? 400 : pokemon.id - 1}`)
            }
            className="my-auto rounded-lg bg-red-500 px-5 py-0.5"
          >
            &lt;
          </button>

          <p className="my-6 text-center text-6xl font-bold capitalize text-gray-700">
            {pokemon.name}
          </p>

          <button
            onClick={() =>
              navigate(`/pokedex/${pokemon.id === 400 ? 1 : pokemon.id + 1}`)
            }
            className="my-auto rounded-lg bg-red-500 px-5 py-0.5"
          >
            &gt;
          </button>
        </div>

        {/** image - stat */}
        <div className="flex flex-col items-center justify-around">
          {/* Image */}
          <div className="">
            <img
              src={pokemon.image}
              alt="image"
              className="rounded-full bg-green-400 shadow-lg"
            />
          </div>

          {/* Stats */}
          <div className="rounded-xl bg-gray-100 p-6 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-cyan-700">ABOUT</h2>
            <p className="mb-12 text-xl italic text-cyan-900">
              {pokemon.about}
            </p>
            <h2 className="text-3xl font-bold text-cyan-700">BASE STATS</h2>

            {pokemon.stats?.map((stat, index) => (
              <div
                key={index}
                className="m-auto mb-4 flex w-10/12 items-center justify-between rounded-lg bg-white p-2 shadow-md"
              >
                <p className="w-1/4 border-r-2 border-solid border-gray-300 pr-2 text-gray-700">
                  {stat.stat.name.toUpperCase()}
                </p>
                <div className="flex w-3/4 items-center justify-evenly">
                  <p className="w-1/5 text-gray-700">
                    {stat.base_stat.toString().length === 2
                      ? "0" + stat.base_stat
                      : "" + stat.base_stat}
                  </p>
                  <div className="h-6 w-8/12 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(stat.base_stat * 100) / 160}%`,
                        backgroundColor:
                          stat.base_stat >= 80
                            ? "#388E3C"
                            : stat.base_stat >= 40
                              ? "#FBC02D"
                              : "#D32F2F",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evolution Line */}
        <div className="my-28 w-full rounded-xl bg-gray-100 py-12 text-center shadow-lg">
          <h2 className="text-4xl text-cyan-700">EVOLUTION</h2>
          <div className="mt-8 flex flex-col items-center justify-evenly gap-y-20 md:flex-row">
            {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 ? (
              pokemon.evolutionChain.map((evo, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    {evo.name !== pokemon.name ? (
                      <Link to={`/pokedex/${evo.name}`}>
                        <img
                          className="bg-green-00 rounded-full border-4"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${evo.id}.gif`}
                          alt={evo.name}
                        />
                      </Link>
                    ) : (
                      <img
                        className="bg-green-00 rounded-full border-4"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${evo.id}.gif`}
                        alt={evo.name}
                      />
                    )}

                    <h3 className="capitalize text-gray-700">{evo.name}</h3>
                    <TypeSquare types={["grass", "poison"]} />
                  </div>
                  {index < pokemon.evolutionChain.length - 1 && (
                    <p className="mx-4 rounded-full bg-gray-300 px-4 py-1">
                      {pokemon.evolutionChain[index + 1].level} Lvl.
                    </p>
                  )}
                </React.Fragment>
              ))
            ) : (
              <p>Loading evolution data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
