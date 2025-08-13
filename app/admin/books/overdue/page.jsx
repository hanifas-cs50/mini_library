import Borrow from "@/components/pages/admin/borrow/Borrow";

export default function Page() {
  return (
    <section className="full-container gap-8 rounded bg-white shadow">
      <h1 className="font-bold text-2xl">Overdue List</h1>

      <Borrow overdue={true} />
    </section>
  );
}
