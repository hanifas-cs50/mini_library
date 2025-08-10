import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Books from "@/components/elements/admin/books/Books";
import Borrow from "@/components/elements/admin/books/Borrow";
import Users from "@/components/elements/admin/users/Users";
import Overview from "@/components/ui/admin/Overview";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <section className="full-container gap-12 rounded bg-white shadow">
      <h1 className="font-medium text-center text-2xl">Welcome, {session.user?.name}</h1>

      <Overview />

      <div className="grid grid-cols-2 gap-8">
        <Link href="/admin/users">
          <h3 className="mb-2 font-medium text-center text-lg">Users List</h3>
          <Users dashboard={true} />
        </Link>
        <Link href="/admin/books">
          <h3 className="mb-2 font-medium text-center text-lg">Books List</h3>
          <Books dashboard={true} />
        </Link>
        <Link href="/admin/books/borrow">
          <h3 className="mb-2 font-medium text-center text-lg">Borrow List</h3>
          <Borrow dashboard={true} />
        </Link>
        <Link href="/admin/books/overdue">
          <h3 className="mb-2 font-medium text-center text-lg">Overdue List</h3>
          <Borrow dashboard={true} overdue={true} />
        </Link>
      </div>
    </section>
  );
}
