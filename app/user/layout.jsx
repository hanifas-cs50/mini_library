import Navbar from "@/components/ui/user/Navbar";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="h-full pt-18 p-8">{children}</main>
    </>
  );
}
