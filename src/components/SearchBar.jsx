//Importacion de bibliotecas
import React from "react";

export default function SearchBar({ characterSearch, setCharacterSearch }) {
  return (
    <div className="mx-auto mb-4 w-full py-2 pb-6">
      <div id="search-bar" className="w-120 z-10 rounded-md bg-white shadow-xl">
        <form className="flex items-center justify-center p-2">
          <input
            type="text"
            placeholder="Search here"
            className="w-full rounded-md px-2 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={characterSearch}
            name={characterSearch}
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
