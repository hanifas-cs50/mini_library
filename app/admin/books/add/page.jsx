import BookForm from "@/components/pages/admin/books/BookForm";

export default function Page() {
  return (
    <section className="full-container gap-4 rounded bg-white shadow">
      <h1 className="mb-6 font-bold text-center text-2xl">Add Book</h1>
      <BookForm />
    </section>
  );
}
