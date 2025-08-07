import { useEffect } from "react";

import PropTypes from "prop-types";

export default function Pagination({
  pokemonFiltred,
  currentPage,
  setCurrentPage,
  setCurrentItems,
}) {
  // Manejadores de cambio de página
  const itemsPerPage = 21; // Número de Pokémon por página

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(pokemonFiltred.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, pokemonFiltred, setCurrentItems]);

  const totalPages = Math.ceil(pokemonFiltred.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="mb-4 mt-20 text-center">
      <p className="mx-auto mb-2">
        {`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${
          currentPage === totalPages
            ? pokemonFiltred.length
            : currentPage * itemsPerPage
        } of ${pokemonFiltred.length} Entries`}
      </p>

      <div className="mx-auto flex w-full items-center justify-between border-t-2 border-gray-200">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex cursor-pointer items-center pt-3 text-gray-600 hover:text-indigo-700"
        >
          &lt;
          <p className="ml-3 text-lg font-medium leading-none">Previous</p>
        </button>

        <div className="flex justify-evenly">
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>
              &lt;
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            const isEllipsisBefore = currentPage > 3 && pageNumber === 2;
            const isEllipsisAfter =
              currentPage < totalPages - 2 && pageNumber === totalPages - 1;
            const isPageNumberVisible =
              pageNumber === 1 ||
              pageNumber === totalPages ||
              Math.abs(pageNumber - currentPage) <= 1;

            if (isEllipsisBefore) {
              return (
                <p key={pageNumber} className="mx-2">
                  ...
                </p>
              );
            }

            if (isEllipsisAfter) {
              return (
                <p key={pageNumber} className="mx-2">
                  ...
                </p>
              );
            }

            if (isPageNumberVisible) {
              return (
                <p
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`mr-4 cursor-pointer border-t ${
                    currentPage === pageNumber
                      ? "border-indigo-400 text-indigo-700"
                      : "border-transparent text-gray-600 hover:border-indigo-400 hover:text-indigo-700"
                  } px-2 pt-3 text-lg font-medium leading-none`}
                >
                  {pageNumber}
                </p>
              );
            }

            return null;
          })}

          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              &gt;
            </button>
          )}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex cursor-pointer items-center pt-3 text-gray-600 hover:text-indigo-700"
        >
          <p className="mr-3 text-lg font-medium leading-none">Next</p>
          &gt;
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pokemonFiltred: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setCurrentItems: PropTypes.func.isRequired,
};
