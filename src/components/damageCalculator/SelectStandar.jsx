import PropTypes from "prop-types";

export default function SelectStandar({ value, formulario, setFormulario }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el estado del formulario con el valor seleccionado
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="select__wrapper">
      <label
        htmlFor={value}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {value}
      </label>
      <select
        id={value}
        name={value}
        value={formulario[value] || ""}
        onChange={handleChange}
        className="m-auto block w-8/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="">-- Select an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}

SelectStandar.propTypes = {
  value: PropTypes.string.isRequired,
  formulario: PropTypes.object.isRequired,
  setFormulario: PropTypes.func.isRequired,
};
