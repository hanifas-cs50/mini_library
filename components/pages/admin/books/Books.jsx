"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/components/elements/admin/Pagination";

export default function Books({ dashboard = false }) {
  const [books, setBooks] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = dashboard ? 5 : 10;

  async function getBooks() {
    try {
      const response = await fetch(
        `/api/books?page=${page}&limit=${limit}&type=${type}&search=${search}`
      );
      if (!response.ok) throw new Error("Failed to fetch books");
      const result = await response.json();
      setBooks(result.data);
      setTotalPage(parseInt(result.totalPages, 10));
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to fetch book");

      const result = await response.json();
      console.log(result);
      await getBooks();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  async function handleSearch() {
    setSearch(search.toLowerCase());
    await getBooks();
  }

  useEffect(() => {
    getBooks();
  }, [page]);

  return (
    <>
      {!dashboard && (
        <div className="flex items-center justify-between">
          <div className="flex items-stretch">
            <input
              name="search"
              className="px-3 py-2 border-2 border-gray-300 bg-white focus:border-green-500 rounded-l text-sm outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="pr-2 py-2 border-y-2 border-gray-300 text-sm bg-white outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>
                Type
              </option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
            <input
              type="submit"
              value="Search"
              className="px-3 py-2 text-white bg-green-600/80 hover:bg-green-600 border border-green-600 rounded-r text-sm font-medium cursor-pointer transition-colors"
              onClick={() => handleSearch()}
            />
          </div>

          <Link
            href="/admin/books/add"
            className="px-3 py-2 font-medium text-sm text-white rounded bg-blue-500/80 hover:bg-blue-500 cursor-pointer transition-colors"
          >
            Add &#43;
          </Link>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-400 border border-gray-500">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-semibold">#</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Author
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Qty</th>
            {!dashboard && (
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {books.map((book, i) => (
            <tr className="hover:bg-slate-100" key={i}>
              <td className="px-4 py-2 text-center text-sm">{i + 1}</td>
              <td className="px-4 py-2 text-sm">{book.title}</td>
              <td className="px-4 py-2 text-sm">{book.author}</td>
              <td className="px-4 py-2 text-sm">{book.available_qty}</td>
              {!dashboard && (
                <td className="h-[50px]">
                  <div className="h-full w-full flex justify-stretch">
                    <Link
                      className="w-full flex items-center justify-center text-sm text-white bg-blue-500/80 hover:bg-blue-500"
                      href={`/admin/books/${book.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="w-full text-sm text-white bg-red-500/80 hover:bg-red-500 cursor-pointer"
                      type="button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!dashboard && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={totalPage}
        />
      )}
    </>
  );
}
