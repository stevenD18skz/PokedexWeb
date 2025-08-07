import PropTypes from "prop-types";

export default function SearchBar({ characterSearch, setCharacterSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
  };

  return (
    <div className="mx-auto mb-4 w-full py-2 pb-6">
      <div id="search-bar" className="w-120 z-10 rounded-md bg-white shadow-xl">
        <form
          className="flex items-center justify-center p-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search here"
            className="w-full rounded-md px-2 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={characterSearch || ""} // Asegúrate de que siempre sea una cadena
            onChange={(e) => setCharacterSearch(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 rounded-md bg-gray-800 px-4 py-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  characterSearch: PropTypes.string.isRequired,
  setCharacterSearch: PropTypes.func.isRequired,
};
