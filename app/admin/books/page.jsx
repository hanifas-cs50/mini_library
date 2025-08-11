import Books from "@/components/pages/admin/books/Books";

export default function Page() {
  return (
    <section className="full-container gap-8 rounded bg-white shadow">
      <h1 className="font-bold text-2xl">Books List</h1>
      <Books />
    </section>
  );
}
