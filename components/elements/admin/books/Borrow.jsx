"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DATE_FORMAT = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Borrow({ dashboard = false, overdue = false }) {
  const [borrows, setBorrow] = useState([]);

  const isOverdue = (borrow_date, return_date) => {
    if (return_date) return false;
    const diffTime = new Date() - new Date(borrow_date);
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convert milliseconds to days: 1000 ms * 60 sec * 60 min * 24 hr
    return diffDays > 7;
  };

  useEffect(() => {
    const allBorrows = [
      {
        username: "joeseph",
        title: "Echoes of the Forgotten",
        borrow_date: "2025-08-01 14:30:00",
        return_date: "2025-08-06 11:45:00",
      },
      {
        username: "lucy23",
        title: "Steel & Stardust",
        borrow_date: "2025-07-28 10:15:00",
        return_date: null,
      },
      {
        username: "haruki.m",
        title: "The Clockmaker's Secret",
        borrow_date: "2025-08-03 09:20:00",
        return_date: "2025-08-07 16:00:00",
      },
      {
        username: "elena_rose",
        title: "Fragments of Tomorrow",
        borrow_date: "2025-08-05 13:00:00",
        return_date: null,
      },
      {
        username: "noah_lee",
        title: "The Wandering Signal",
        borrow_date: "2025-07-30 15:40:00",
        return_date: "2025-08-04 10:30:00",
      },
      {
        username: "mira_dev",
        title: "Of Ash and Amber",
        borrow_date: "2025-08-02 11:00:00",
        return_date: "2025-08-06 09:45:00",
      },
      {
        username: "xavier12",
        title: "Letters to Nowhere",
        borrow_date: "2025-08-04 12:25:00",
        return_date: null,
      },
      {
        username: "sophia_w",
        title: "Beneath Crimson Skies",
        borrow_date: "2025-07-29 08:50:00",
        return_date: "2025-08-03 17:30:00",
      },
      {
        username: "kaito.dev",
        title: "The Algorithm of Fate",
        borrow_date: "2025-08-01 14:05:00",
        return_date: null,
      },
      {
        username: "nina_ark",
        title: "Whispers in the Library",
        borrow_date: "2025-07-31 10:10:00",
        return_date: "2025-08-05 15:15:00",
      },
    ];

    let result = allBorrows;

    if (overdue) {
      result = allBorrows.filter(({ borrow_date, return_date }) =>
        isOverdue(borrow_date, return_date)
      );
    }

    if (dashboard) {
      result = result.filter((borrow, i) => {
        if (!borrow.return_date) return borrow;
      });
      result = result.slice(0, 4);
    }

    setBorrow(result);
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-400 border border-gray-500">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold">
            Username
          </th>
          <th className="px-4 py-2 text-left text-sm font-semibold">
            Book Title
          </th>
          {!dashboard && (
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Borrow Date
            </th>
          )}
          {!(dashboard && overdue) && (
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Return Date
            </th>
          )}
          {!(dashboard && !overdue) && (
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Days Late
            </th>
          )}
          {!dashboard && (
            <th className="px-4 py-2 text-center text-sm font-semibold">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-400">
        {borrows.map((borrow, i) => (
          <tr className="hover:bg-slate-100" key={i}>
            <td className="px-4 py-2 text-sm">{borrow.username}</td>
            <td className="px-4 py-2 text-sm">{borrow.title}</td>
            {!dashboard && (
              <td className="px-4 py-2 text-sm">
                {new Date(borrow.borrow_date).toLocaleString(
                  "id-ID",
                  DATE_FORMAT
                )}
              </td>
            )}
            {!(dashboard && overdue) && (
              <td
                className={`px-4 py-2 text-sm ${
                  borrow.return_date ? "" : "font-medium text-red-500"
                }`}
              >
                {borrow.return_date
                  ? new Date(borrow.return_date).toLocaleString(
                      "id-ID",
                      DATE_FORMAT
                    )
                  : "Not yet returned"}
              </td>
            )}
            {!(dashboard && !overdue) && (
              <td className="px-4 py-2 text-sm">
                {!borrow.return_date &&
                isOverdue(borrow.borrow_date, borrow.return_date)
                  ? Math.floor(
                      (new Date() - new Date(borrow.borrow_date)) /
                        (1000 * 60 * 60 * 24) -
                        7
                    )
                  : "-"}
              </td>
            )}
            {!dashboard && (
              <td className="h-[50px]">
                <div className="h-full w-full flex justify-stretch">
                  <Link
                    className="w-full flex items-center justify-center text-sm text-white bg-blue-500/80 hover:bg-blue-500"
                    href={`/admin/books/borrow/${i}`}
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
