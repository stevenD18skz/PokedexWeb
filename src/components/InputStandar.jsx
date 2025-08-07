import PropTypes from "prop-types";

import "../styles/input.css";

export default function InputStandar({ value, formulario, setFormulario }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = Number(value);

    // Establecer límites para el valor
    if (name === "Level" || name === "Atck") {
      newValue = Math.max(0, Math.min(newValue, 100)); // Limitar entre 0 y 100
    }

    setFormulario((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <div className="input__wrapper">
      <input
        id={value}
        name={value}
        type="number"
        className="input__field"
        placeholder={`Enter ${value}`}
        value={formulario[value] || ""}
        onChange={handleChange}
      />
      <label htmlFor={value} className="input__label">
        {value}
      </label>
    </div>
  );
}

InputStandar.propTypes = {
  value: PropTypes.string.isRequired,
  formulario: PropTypes.object.isRequired,
  setFormulario: PropTypes.func.isRequired,
};
