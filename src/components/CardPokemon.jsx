//Importacion de bibliotecas
import React from "react";

//Importacion de componentes
import TypeSquare from "./TypeSquare";

export default function CardPokemon({ data }) {
  const dataColor = {
    green: {
      shadow: "#025951",
      hoverShadow: "#025951",
      backG: "#038C3E",
    },
  };

  const dynamicBackgroundColor = {
    backgroundColor: data.color,
  };

  return (
    <div
      className={`
      w-full bg-gray-200 rounded-3xl shadow-xl shadow-gray-500/50 overflow-hidden 
    hover:shadow-green-600/70 transform transition duration-500 hover:-translate-y-3 hover:scale
    `}
    >
      <a href={`http://localhost:5173/pokedex/${data.name}`}>
        <img
          style={{ backgroundColor: dynamicBackgroundColor.backgroundColor }}
          className={`w-full rounded-t-3xl`}
          src={data.image}
          alt={data.name}
        />
      </a>

      <div className="p-3">
        <p className="">No°: {data.id} </p>
        <p className="text-3xl capitalize">{data.name}</p>
        <TypeSquare types={data.types} />

        <p className="text-center">LINE ENVOLVING</p>
        <div className="flex justify-between">
          {data.preEvolution !== "nn" ? (
            <a
              className="relative inline-block text-cyan-500 underline hover:text-blue-600 font-semibold transition-colors duration-300"
              href={`/pokedex/${data.preEvolution}`}
            >
              {" "}
              {data.preEvolution}
            </a>
          ) : (
            <p></p>
          )}

          {data.evolution !== "nn" ? (
            <a
              className="relative inline-block text-cyan-500 underline hover:text-blue-600 font-semibold transition-colors duration-300"
              href={`/pokedex/${data.evolution}`}
            >
              {" "}
              {data.evolution}
            </a>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
