import Navbar from "@/components/ui/admin/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="h-full pt-18 p-8">{children}</main>
    </>
  );
}
