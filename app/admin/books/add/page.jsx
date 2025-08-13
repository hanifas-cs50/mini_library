import AddForm from "@/components/pages/admin/books/AddForm";

export default function Page() {
  return (
    <section className="full-container gap-4 rounded bg-white shadow">
      <h1 className="font-bold text-center text-2xl">Add Book</h1>
      <AddForm />
    </section>
  );
}
