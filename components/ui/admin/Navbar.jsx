"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar({ session }) {
  return (
    <nav className="absolute left-0 top-0 w-full px-8 py-2 z-50">
      <div className="h-14 w-full max-w-screen-xl mx-auto px-6 grid grid-cols-3 items-center bg-white shadow">
        <div className="relative group">
          <button
            className="py-2 flex items-center gap-2 cursor-pointer"
            type="button"
          >
            {session?.user?.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 group-hover:rotate-180 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div className="absolute -left-2 top-10 p-1 gap-2 rounded bg-white shadow hidden group-hover:grid">
            <button
              type="button"
              className="px-3 py-2 font-medium text-white rounded bg-red-500/80 hover:bg-red-500 cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
        <Link className="justify-self-center font-bold text-lg" href="/admin">
          Mini Library
        </Link>
        <div className="justify-self-end flex gap-6">
          <Link className="py-2 grid hover:underline" href="/admin">
            Home
          </Link>
          <div className="relative group">
            <button
              className="py-2 flex items-center gap-2 cursor-pointer"
              type="button"
            >
              Books
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 group-hover:rotate-180 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div className="absolute -left-1 top-10 w-32 p-3 gap-2 rounded bg-white shadow hidden group-hover:grid">
              <Link className="hover:underline" href="/admin/books">
                Books List
              </Link>
              <Link className="hover:underline" href="/admin/books/borrow">
                Borrow List
              </Link>
              <Link className="hover:underline" href="/admin/books/overdue">
                Overdue List
              </Link>
            </div>
          </div>
          <Link className="py-2 grid hover:underline" href="/admin/users">
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
}

{
  /* <button className="flex items-center gap-2 cursor-pointer" type="button">
    Users
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </button>
  <button className="flex items-center gap-2 cursor-pointer" type="button">
    Books
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </button> */
}
