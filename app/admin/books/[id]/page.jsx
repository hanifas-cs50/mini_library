import EditForm from "@/components/pages/admin/books/EditForm";

export default async function Page({ params }) {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 
    const response = await fetch(`${baseUrl}/api/books/${id}`);

    if (!response.ok) throw new Error("Failed to fetch book");

    const result = await response.json();

    return (
      <section className="full-container gap-8 rounded bg-white shadow">
        <h1 className="font-bold text-2xl">Book Edit</h1>
        <EditForm data={result} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="full-container gap-8 rounded bg-white shadow">
        <h1 className="font-bold text-2xl">Book Edit</h1>
        <h1 className="font-medium">{error.message}</h1>
      </section>
    );
  }
}
