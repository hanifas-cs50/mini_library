"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Books({ dashboard = false }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const allBooks = [
      {
        title: "Echoes of the Forgotten",
        author: "Liana Morrell",
        available_qty: 7,
      },
      {
        title: "The Clockmaker's Secret",
        author: "Thomas Everhart",
        available_qty: 3,
      },
      {
        title: "Beneath Crimson Skies",
        author: "Amira Kline",
        available_qty: 9,
      },
      {
        title: "The Algorithm of Fate",
        author: "Neil Corvan",
        available_qty: 5,
      },
      {
        title: "Letters to Nowhere",
        author: "Harper Quinn",
        available_qty: 2,
      },
      {
        title: "Steel & Stardust",
        author: "Orion Vale",
        available_qty: 8,
      },
      {
        title: "Whispers in the Library",
        author: "Eleanor Frost",
        available_qty: 4,
      },
      {
        title: "Fragments of Tomorrow",
        author: "Kaito Wren",
        available_qty: 6,
      },
      {
        title: "Of Ash and Amber",
        author: "Selene Arlow",
        available_qty: 1,
      },
      {
        title: "The Wandering Signal",
        author: "Dr. Ezra Malin",
        available_qty: 10,
      },
    ];

    if (dashboard) {
      setBooks(
        allBooks.filter((book, i) => {
          if (i < 5) return book;
        })
      );
    } else {
      setBooks(allBooks);
    }
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-400 border border-gray-500">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-center text-sm font-semibold">#</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">Author</th>
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
                    href={`/admin/books/${i}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="w-full text-sm text-white bg-red-500/80 hover:bg-red-500 cursor-pointer"
                    type="button"
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
  );
}
