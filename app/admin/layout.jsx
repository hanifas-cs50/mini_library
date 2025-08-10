import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/ui/admin/Navbar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin")
  }

  if (session?.user?.role !== "admin") {
    redirect("/user");
  }

  return (
    <>
      <Navbar session={session} />
      <main className="h-full pt-18 p-8">{children}</main>
    </>
  );
}
