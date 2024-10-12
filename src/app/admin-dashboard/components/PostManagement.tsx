import { useGetAllPostQuery } from "@src//redux/features/post/postManagement";

export function PostManagement() {
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="mb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border">
          <thead>
            <tr>
              <th className="py-1 px-2 border text-sm">Post ID</th>
              <th className="py-1 px-2 border text-sm">Tag</th>
              <th className="py-1 px-2 border text-sm">Category</th>
              <th className="py-1 px-2 border text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.data?.result?.map((post) => (
              <tr key={post._id}>
                <td className="py-1 px-2 border text-sm truncate">
                  {post._id}
                </td>
                <td className="py-1 px-2 border text-sm truncate">
                  {post.tag}
                </td>
                <td className="py-1 px-2 border text-sm truncate">
                  {post.category}
                </td>
                <td className="py-1 px-2 border text-sm">
                  <button className="text-blue-500 mr-2">Edit</button>
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
