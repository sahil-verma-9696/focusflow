import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 h-full overflow-y-scroll">
        <Navbar />

        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}
