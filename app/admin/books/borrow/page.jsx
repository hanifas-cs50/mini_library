import Borrow from "@/components/pages/admin/books/Borrow";

export default function Page() {
  return (
    <section className="full-container gap-8 rounded bg-white shadow">
      <h1 className="font-bold text-2xl">Borrows List</h1>
      <Borrow />
    </section>
  );
}
