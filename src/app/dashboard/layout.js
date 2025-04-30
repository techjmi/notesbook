import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gray-200 p-4 border-b md:border-b-0 md:border-r border-gray-300">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard/notes" className="text-gray-800 hover:underline">
              Notes
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="text-gray-800 hover:underline">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="md:w-3/4 w-full p-4">
        {children}
      </div>
    </div>
  );
}
