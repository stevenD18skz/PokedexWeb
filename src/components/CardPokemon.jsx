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
      className={`hover:scale w-full transform overflow-hidden rounded-3xl bg-gray-200 shadow-xl shadow-gray-500/50 transition duration-500 hover:-translate-y-3 hover:shadow-gray-600/70`}
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
        <p className="">
          No°:{" "}
          {data.id.toString().length === 1
            ? "00" + data.id
            : data.id.toString().length === 2
              ? "0" + data.id
              : data.id}
        </p>
        <p className="text-3xl capitalize">{data.name}</p>
        <TypeSquare types={data.types} />

        <p className="text-center">LINE ENVOLVING</p>
        <div className="flex justify-between">
          {data.preEvolution !== "nn" ? (
            <a
              className="relative inline-block font-semibold text-cyan-500 underline transition-colors duration-300 hover:text-blue-600"
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
              className="relative inline-block font-semibold text-cyan-500 underline transition-colors duration-300 hover:text-blue-600"
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
