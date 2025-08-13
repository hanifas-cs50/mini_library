import Borrow from "@/components/pages/admin/borrow/Borrow";
import Link from "next/link";

export default function Page() {
  return (
    <section className="full-container gap-8 rounded bg-white shadow">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Borrows List</h1>
        <Link
          href="/admin/books/borrow/add"
          className="px-3 py-2 font-medium text-sm text-white rounded bg-blue-500/80 hover:bg-blue-500 cursor-pointer transition-colors"
        >
          Add &#43;
        </Link>
      </div>
      <Borrow />
    </section>
  );
}
