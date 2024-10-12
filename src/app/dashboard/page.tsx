"use client";
// Import the verified icon
import Link from "next/link";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useGetMyPostQuery } from "@src//redux/features/post/postManagement";
import PostCard from "@src//components/modules/post/PostCard";
import { useAppSelector } from "@src//redux/hooks";

// Modal styles
const modalStyles = {
  content: {
    position: "fixed", // Ensure it's fixed on the screen
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    zIndex: 9999,
  },
};

function ProfilePage() {
  const user: any = useAppSelector((state) => state.auth.user);

  const { data: posts, isLoading } = useGetMyPostQuery(user.id);

  console.log(posts);

  return (
    <div className="pt-16 flex flex-col items-center max-w-6xl mx-auto bg-gray-100">
      {/* Cover Photo Section */}
      <h1 className="pt-16 text-lg font-medium">User Dashboard</h1>
      {/* Navigation Links Section */}
      <div className="mt-32 md:mt-24 lg:mt-8 flex gap-8 border-t border-gray-300 w-full justify-center py-4">
        <Link
          className="text-lg text-blue-500 font-semibold"
          href={`/followers/${user.id}`}
        >
          Followers
        </Link>
        <Link
          className="text-lg text-blue-500 font-semibold"
          href={`/following/${user.id}`}
        >
          Following
        </Link>

        <Link
          className="text-lg text-blue-500 font-semibold"
          href={`/post/favorite`}
        >
          Favorite
        </Link>
      </div>

      <div className="pt-16" />

      {/* Example of Posts Section */}
      <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {posts?.data
          ?.filter((post) => !post.isDeleted) // Exclude posts with isDeleted true
          .map((post) => <PostCard key={post._id} {...post} />)}
      </div>
    </div>
  );
}

export default ProfilePage;
