import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <nav className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <Link href={"/admin/users"}>Manage Users</Link>
          </li>
          <li className="mb-4">
            <Link href={"/admin/posts"}>Manage Posts</Link>
          </li>
          <li className="mb-4">
            <Link href={"/admin/payments"}>Payment History</Link>
          </li>
          <li className="mb-4">
            <Link href={"/admin/analytics"}>Analytics</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
