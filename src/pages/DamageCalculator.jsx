//Importacion de bibliotecas
import React, { useState } from "react";

//Importacion de componentes
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import CardPokemon from "../components/CardPokemon";
import Input from "../components/Input";

//Importacion de contexto y hooks
import { useListPokemon } from "../context/PokemonContext";

import "../assets/eye-off.svg";
import "../assets/eye.svg";

export default function DamageCalculator() {
  const { pokemonList, isLoading } = useListPokemon();
  const { isPassword, setIsPassword } = useState();

  console.log(pokemonList[3]);

  if (isLoading) {
    return <div>cargando</div>;
  }

  const handleClick = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <NavBar></NavBar>
      <div
        className="mx-auto flex min-h-screen w-11/12 items-center justify-around bg-slate-400"
        style={{
          backgroundImage: "url('../../body_gray_bg.png')",
        }}
      >
        <div className="w-2/12 rounded-lg bg-gradient-to-b from-red-400 via-red-600 to-red-900">
          <img className="" src={pokemonList[3].image} alt="pokemon atacante" />
          <p>Nvl: </p>
          <input type="text" placeholder="aaaa" />:<p>Atck: 410</p>
          <input type="text" placeholder="eeee" />:
        </div>

        <div>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-4 py-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          ></button>

          <p>Total</p>
          <Input></Input>
        </div>

        <div className="w-2/12 rounded-lg bg-red-400">
          <img className="" src={pokemonList[3].image} alt="pokemon atacante" />
        </div>
      </div>
    </div>
  );
}
