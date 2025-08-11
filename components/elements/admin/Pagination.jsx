export default function Pagination({ currentPage, setPage, totalPages }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="h-14 w-full px-4 flex justify-center items-center">
      {prevPage ? (
        <button
          className="px-2 py-1 rounded bg-gray-100 border cursor-pointer"
          type="button"
          onClick={() => setPage(prevPage)}
        >
          &#9664;
        </button>
      ) : (
        <span className="px-2 py-1 text-gray-400 rounded bg-gray-100 border cursor-not-allowed">
          &#9664;
        </span>
      )}

      <span className="px-4 py-1">
        {currentPage} / {totalPages}
      </span>

      {nextPage ? (
        <button
          className="px-2 py-1 rounded bg-gray-100 border cursor-pointer"
          type="button"
          onClick={() => setPage(nextPage)}
        >
          &#9654;
        </button>
      ) : (
        <span className="px-2 py-1 text-gray-400 rounded bg-gray-100 border cursor-not-allowed">
          &#9654;
        </span>
      )}
    </div>
  );
}
