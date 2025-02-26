import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        {/* Add sidebar links here */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}
