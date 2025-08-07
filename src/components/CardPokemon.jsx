//Importacion de bibliotecas
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Importacion de componentes
import TypeSquare from "./TypeSquare";

export default function CardPokemon({ data }) {
  const colorBase = data.color;

  const difusionTailwind = `w-full rounded-t-3xl bg-gradient-to-b from-${colorBase}-300 via-${colorBase}-600`;

  return (
    <div
      className={`w-full transform overflow-hidden rounded-3xl bg-gray-900 shadow-xl shadow-gray-500/50 transition duration-500 hover:-translate-y-3 hover:shadow-gray-600/70`}
    >
      <Link to={`/pokedex/${data.name}`}>
        <img className={difusionTailwind} src={data.image} alt={data.name} />
      </Link>

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

CardPokemon.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    preEvolution: PropTypes.string.isRequired,
    evolution: PropTypes.string.isRequired,
  }).isRequired,
};
