import Signin from "@/components/elements/auth/Signin";
import Link from "next/link";

export default function Page() {
  return (
    <main className="full-container items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Sign In to Mini Library</h1>

      <Signin />

      <p className="font-medium text-xs">
        Don't have an account?{" "}
        <Link
          className="text-blue-500/80 hover:text-blue-500 hover:underline transition-all"
          href="/signup"
        >
          Sign up
        </Link>
      </p>

      <p className="font-medium text-xs">
        Preview?{" "}
        <Link
          className="text-blue-500/80 hover:text-blue-500 hover:underline transition-all"
          href="/admin"
        >
          Admin Preview
        </Link>
        {" or "}
        <Link
          className="text-blue-500/80 hover:text-blue-500 hover:underline transition-all"
          href="/user"
        >
          User Preview
        </Link>
      </p>
      
      {/* <p className="font-medium text-xs">
        API Preview?{" "}
        <Link
          className="text-blue-500/80 hover:text-blue-500 hover:underline transition-all"
          href="/api/users"
        >
          Users API
        </Link>
        {" or "}
        <Link
          className="text-blue-500/80 hover:text-blue-500 hover:underline transition-all"
          href="/api/books"
        >
          Books API
        </Link>
      </p> */}
    </main>
  );
}
