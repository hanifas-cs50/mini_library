import Users from "@/components/elements/admin/users/Users";

export default function Page() {
  return (
    <section className="full-container gap-8 rounded bg-white shadow">
      <h1 className="font-bold text-2xl">Users List</h1>
      <Users />
    </section>
  );
}
