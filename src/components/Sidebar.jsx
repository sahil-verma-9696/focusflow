import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white">
      <nav className="p-4">
        <ul>
          <li><Link href="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</Link></li>
          <li><Link href="/workspace" className="block p-2 hover:bg-gray-700">Workspace</Link></li>
          <li><Link href="/settings" className="block p-2 hover:bg-gray-700">Settings</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
