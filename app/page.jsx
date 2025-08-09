import Link from "next/link";

export default function Page() {
  return (
    <main className="full-container items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">React Mini Library</h1>
      <Link className="w-max blue-button" href="/signin">Sign in</Link>
    </main>
  );
}
