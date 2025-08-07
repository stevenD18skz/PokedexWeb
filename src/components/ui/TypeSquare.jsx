//Importacion de bibliotecas
import { typeColors } from "../../utils/typeColors";

/**
 * OBSERVACIONES
 * -modificar si se decice usar un contextno para los colores
 */

import PropTypes from "prop-types";

export default function TypeSquare({ types }) {
  const typesLower = types.map((type) => type.toLowerCase());
  const bgClass = typesLower.map(
    (type) => typeColors[type]?.[0] || "bg-default",
  );
  const txColor = typesLower.map(
    (type) => typeColors[type]?.[1] || "bg-default",
  );

  return (
    <div className="text-center">
      {types.map((type, index) => (
        <div key={index} className="inline-block">
          <h1
            className={`m-1 px-5 ${bgClass[index]} rounded-3xl ${txColor[index]} text-center font-mono capitalize`}
          >
            {type}
          </h1>
        </div>
      ))}
    </div>
  );
}

TypeSquare.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};
