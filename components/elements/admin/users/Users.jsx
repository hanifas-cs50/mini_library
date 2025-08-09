"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Users({ dashboard = false }) {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const allUsers = [
      { name: "Joeseph Bartolozzi", username: "joeseph" },
      { name: "Lucy Fernandez", username: "lucy23" },
      { name: "Haruki Mori", username: "haruki.m" },
      { name: "Elena Rose", username: "elena_rose" },
      { name: "Noah Lee", username: "noah_lee" },
      { name: "Mira Devlin", username: "mira_dev" },
      { name: "Xavier Tran", username: "xavier12" },
      { name: "Sophia Williams", username: "sophia_w" },
      { name: "Kaito Tanaka", username: "kaito.dev" },
      { name: "Nina Arkadie", username: "nina_ark" },
    ];
    if (dashboard) {
      setUser(
        allUsers.filter((user, i) => {
          if (i < 5) return user;
        })
      );
    } else {
      setUser(allUsers);
    }
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-400 border border-gray-500">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-center text-sm font-semibold">#</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
          <th className="px-4 py-2 text-left text-sm font-semibold">
            Username
          </th>
          {!dashboard && (
            <th className="px-4 py-2 text-center text-sm font-semibold">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-400">
        {users.map((user, i) => (
          <tr className="hover:bg-slate-100" key={i}>
            <td className="px-4 py-2 text-center text-sm">{i + 1}</td>
            <td className="px-4 py-2 text-sm">{user.name}</td>
            <td className="px-4 py-2 text-sm">{user.username}</td>
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
