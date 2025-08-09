import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 w-full px-8 py-2 z-50">
      <div className="h-14 w-full max-w-screen-xl mx-auto px-6 grid grid-cols-3 items-center bg-white shadow">
        <button className="justify-self-start" type="button">
          [User Username]
        </button>
        <Link className="justify-self-center font-bold text-lg" href="/user">
          Mini Library
        </Link>
        <div className="relative justify-self-end flex gap-6">
          <Link className="py-2 grid hover:underline" href="/user">
            Home
          </Link>
          <Link className="py-2 grid hover:underline" href="/user/settings">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
