import { useGetAllUsersQuery } from "@src//redux/features/user/userManagement";

export function UserManagement() {
  const { data: users, isLoading } = useGetAllUsersQuery("");

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="mb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-sm">User ID</th>
              <th className="py-2 px-4 border text-sm">Name</th>
              <th className="py-2 px-4 border text-sm">Email</th>
              <th className="py-2 px-4 border text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border text-sm truncate">
                  {user._id}
                </td>
                <td className="py-2 px-4 border text-sm truncate">
                  {user.name}
                </td>
                <td className="py-2 px-4 border text-sm truncate">
                  {user.email}
                </td>
                <td className="py-2 px-4 border text-sm">
                  <button className="text-blue-500 mr-2">Make Admin</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
