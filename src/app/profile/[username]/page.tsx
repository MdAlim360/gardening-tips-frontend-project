"use client";
import { Image } from "@nextui-org/react";
import { FaCheckCircle } from "react-icons/fa"; // Import the verified icon
import Link from "next/link";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";
import { useGetMyPostQuery } from "@src//redux/features/post/postManagement";
import VerifyUserModal from "@src//components/modules/verifyUserModal";
import EditModal from "@src//components/modal";
import PostModal from "@src//components/modules/postModal";
import PostCard from "@src//components/modules/post/PostCard";

function ProfilePage({ params }) {
  const { username } = params;
  const { data: user, isLoading: isUserLoading } =
    useGetSingleUserQuery(username);
  const { data: posts, isLoading: isPostsLoading } =
    useGetMyPostQuery(username);

  // Calculate total upvotes across all posts
  const totalUpvotes =
    posts?.data
      ?.filter((post) => !post.isDeleted)
      .reduce((acc, post) => acc + post.upvote.length, 0) || 0;

  // Check if the user is verified
  const isUserVerified = user?.data?.status === "verified";

  if (isUserLoading || isPostsLoading) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <div className="pt-16 flex flex-col items-center max-w-6xl mx-auto bg-gray-100">
      {/* Cover Photo Section */}
      <div className="relative w-full">
        <Image
          alt={user?.data?.name || "User Cover Photo"}
          className="object-cover"
          height={300}
          src={user?.data?.coverPhoto || "https://via.placeholder.com/850x300"}
          width={"100%"}
        />

        {/* Profile Picture Overlapping the Cover Photo */}
        <div className="absolute flex flex-col md:flex-row justify-center items-center gap-0 md:gap-4 left-36 md:left-8 -bottom-28 md:bottom-[-90px]">
          <Image
            alt={user?.data?.name || "User Profile Picture"}
            className="rounded-full border-4 border-white object-cover"
            height={120}
            src={user?.data?.picture || "https://via.placeholder.com/150"}
            width={120}
          />
          <div className="items-center gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{user?.data?.name}</h1>
              {/* Render the verified icon next to the name if the user is verified */}
              {isUserVerified && (
                <FaCheckCircle className="text-blue-500" title="Verified" />
              )}
            </div>
            <h1>{user?.data?.followers?.length || 0} Followers</h1>
          </div>
        </div>
      </div>

      {/* Navigation Links Section */}
      <div className="mt-32 md:mt-24 lg:mt-8 flex flex-col text-center md:text-start md:flex-row gap-8 border-t border-gray-300 w-full justify-center py-4">
        <Link
          className="text-lg text-blue-500 font-semibold"
          href={`/followers/${username}`}
        >
          Followers
        </Link>
        <Link
          className="text-lg text-blue-500 font-semibold"
          href={`/following/${username}`}
        >
          Following
        </Link>
        <Link
          className="text-lg text-blue-500 font-semibold"
          href={`/post/favorite`}
        >
          Favorite
        </Link>

        {/* Conditionally render the Verify link */}
        {isUserVerified ? (
          <h1 className="text-lg text-green-500 font-semibold">Verified</h1>
        ) : totalUpvotes > 0 ? (
          <VerifyUserModal userId={username} />
        ) : (
          <button
            disabled
            className="text-lg text-gray-400 font-semibold"
            title="Not enough upvotes to verify"
          >
            Verify (Upvotes Required)
          </button>
        )}

        <div className="pl-40 md:pl-0">
          <EditModal userId={username} />
        </div>
      </div>

      <div className="pt-16">
        <PostModal userId={username} />
      </div>

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
