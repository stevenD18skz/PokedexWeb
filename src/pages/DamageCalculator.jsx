//Importacion de bibliotecas
import { useState, useEffect } from "react";

//Importacion de componentes
import NavBar from "../components/NavBar";
import SelectStandar from "../components/SelectStandar";
import Autocomplete from "../components/AutoComplete";

//Importacion de contexto y hooks
import { useListPokemon } from "../context/PokemonContext";
import InputStandar from "../components/InputStandar";

import "../assets/eye-off.svg";
import "../assets/eye.svg";

export default function DamageCalculator() {
  const { pokemonList, isLoading } = useListPokemon();
  const [opcionesPoke, setOpcionesPoke] = useState([]);

  const [formulario, setFormulario] = useState({
    Level: 0,
    Atck: 0,
  });

  useEffect(() => {
    async function fectOption() {
      const res = await pokemonList.map((current) => {
        console.log(current);
        return current.name;
      });
      setOpcionesPoke(res);
      console.log(res);
    }

    fectOption();
  }, [pokemonList]);

  if (isLoading) {
    return <div>cargando</div>;
  }

  const options = opcionesPoke; // Opciones para el autocomplete

  return (
    <div className="min-h-screen bg-slate-800">
      <NavBar></NavBar>
      <div
        className="mx-auto mt-24 flex min-h-screen w-11/12 items-center justify-around bg-slate-400"
        style={{
          backgroundImage: "url('../../body_gray_bg.png')",
        }}
      >
        {/**POKEMON CARD 1 */}
        <div className="w-[30%]">
          <div className="mb-6">
            <SelectStandar
              value="Type" // Nombre del campo para el select
              formulario={formulario}
              setFormulario={setFormulario}
            />
            <hr className="my-5" />
            <Autocomplete
              value="Pokemon"
              formulario={formulario}
              setFormulario={setFormulario}
              options={options}
            />
          </div>
          <div className="rounded-2xl bg-[#8c1e1e]">
            <img
              className="w-full rounded-t-2xl bg-gradient-to-b from-rose-400 via-rose-600 to-rose-900"
              src={pokemonList[288].image}
              alt="pokemon atacante"
            />
            <div className="flex flex-col justify-evenly p-4">
              <InputStandar
                value={"Level"}
                formulario={formulario}
                setFormulario={setFormulario}
              ></InputStandar>
              <InputStandar
                value={"Atck"}
                formulario={formulario}
                setFormulario={setFormulario}
              ></InputStandar>
            </div>
          </div>
        </div>

        {/**SHOW TOTAL*/}
        <div className="flex w-[15%] flex-col items-center">
          <p>Total</p>
          <p>---</p>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-4 py-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          ></button>
        </div>

        {/**POKEMON CARD 2 */}
        <div className="w-[30%] rounded-2xl bg-[#a82828]">
          <img
            className=""
            src={pokemonList[212].image}
            alt="pokemon atacante"
            style={{
              maskImage: "linear-gradient(black 10%, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
