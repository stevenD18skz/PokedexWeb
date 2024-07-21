//Importacion de bibliotecas
import React from "react";

export default function SearchBar({ characterSearch, setCharacterSearch }) {
  return (
    <div className="w-11/12 mb-4 p-2 pb-6 mx-auto">
      <div
        id="search-bar"
        className="w-120 bg-white rounded-md shadow-xl z-10"
      >
        <form className="flex items-center justify-center p-2">
          <input
            type="text"
            placeholder="Search here"
            className="w-full rounded-md px-2 py-1 
            focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent
            "
            value={characterSearch}
            name={characterSearch}
            onChange={(e) => setCharacterSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-800 text-white rounded-md px-4 py-1 ml-2
             hover:bg-gray-700 
             focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
