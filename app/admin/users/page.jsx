import Users from "@/components/pages/admin/users/Users";

export default function Page() {
  return (
    <section className="full-container gap-4 rounded bg-white shadow">
      <h1 className="mb-6 font-bold text-center text-2xl">Users List</h1>
      <Users />
    </section>
  );
}
