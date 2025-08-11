import Signup from "@/components/pages/auth/Signup";
import Link from "next/link";

export default function Page() {
  return (
    <main className="full-container items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Sign Up to Mini Library</h1>

      <Signup />

      <p className="font-medium text-xs">
        Already have an account?{" "}
        <Link className="text-blue-500/80 hover:text-blue-500 hover:underline transition-all" href="/signin">
          Sign in
        </Link>
      </p>
    </main>
  );
}
