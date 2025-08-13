"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/components/elements/admin/Pagination";

export default function Users({ dashboard = false }) {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = dashboard ? 5 : 10;

  async function getUsers() {
    try {
      const response = await fetch(
        `/api/users?page=${page}&limit=${limit}&type=${type}&search=${search}`
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const result = await response.json();
      setUsers(result.data);
      setTotalPage(parseInt(result.totalPages, 10));
    } catch (error) {
      console.error(error);
      setUsers([]);
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
    await getUsers();
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  return (
    <>
      {!dashboard && (
        <div className="w-full flex items-stretch">
            <input
              name="search"
              className="w-full px-3 py-2 border-2 border-gray-300 bg-white focus:border-green-500 rounded-l text-sm outline-none"
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
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="role">Role</option>
            </select>
            <input
              type="submit"
              value="Search"
              className="px-3 py-2 text-white bg-green-600/80 hover:bg-green-600 border border-green-600 rounded-r text-sm font-medium cursor-pointer transition-colors"
              onClick={() => handleSearch()}
            />
          </div>
      )}
      <table className="min-w-full divide-y divide-gray-400 border border-gray-500">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-semibold">#</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Username
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Role</th>
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
              <td className="px-4 py-2 text-center text-sm">
                {(page - 1) * limit + (i + 1)}
              </td>
              <td className="px-4 py-2 text-sm">{user.name}</td>
              <td className="px-4 py-2 text-sm">{user.username}</td>
              <td className="px-4 py-2 text-sm">{user.role}</td>
              {!dashboard && (
                <td className="h-[50px]">
                  <div className="h-full w-full flex justify-stretch">
                    <Link
                      className="w-full flex items-center justify-center text-sm text-white bg-blue-500/80 hover:bg-blue-500"
                      href={`/admin/users/${user.id}`}
                    >
                      Edit
                    </Link>
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

{
  /* <button
      className="w-full text-sm text-white bg-red-500/80 hover:bg-red-500 cursor-pointer"
      type="button"
      onClick={() => handleDelete(user.id)}
    >
      Delete
    </button> */
}
