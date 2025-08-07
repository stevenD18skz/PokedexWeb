import { useState } from "react";
import PropTypes from "prop-types";

export default function Autocomplete({
  value,
  formulario,
  setFormulario,
  options,
}) {
  const [inputValue, setInputValue] = useState(formulario[value] || "");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowOptions(true);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(newValue.toLowerCase()),
      ),
    );
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions(options);
    setShowOptions(false);
    setFormulario((prevState) => ({
      ...prevState,
      [value]: option,
    }));
  };

  return (
    <div className="relative m-auto w-8/12">
      <label htmlFor={value} className="absolute -top-2 bg-cyan-300">
        {value}
      </label>
      <input
        id={value}
        name={value}
        type="text"
        className="w-full rounded-lg border-2 border-cyan-900 p-2 text-lg hover:border-blue-400 focus:border-red-500"
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)} // Delay to allow option click
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-full rounded-lg border border-gray-700 bg-white shadow-lg">
          {filteredOptions.map(
            (option, index) =>
              index < 5 && (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  value: PropTypes.string.isRequired,
  formulario: PropTypes.object.isRequired,
  setFormulario: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
