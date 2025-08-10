import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <section className="full-container gap-8 rounded bg-white shadow">
      <h1 className="text-2xl font-bold">Hello, {session?.user?.name}</h1>
    </section>
  );
}
