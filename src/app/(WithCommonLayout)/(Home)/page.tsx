"use client";

// import PostCard from "@src/components/modules/post/PostCard";
import { useGetAllPostQuery } from "@src/redux/features/post/postManagement";
import { useGetSingleUserQuery } from "@src/redux/features/user/userManagement";
import { useAppSelector } from "@src/redux/hooks";
import { useState } from "react";
import dynamic from "next/dynamic";
const PostCard = dynamic(() => import("@src/components/modules/post/PostCard"));
// Define types for Post and User (modify according to your API response)
// interface Post {
//   _id: string;
//   post: string;
//   isDeleted: boolean;
//   category: string;
//   upvotes: number;
//   tag: string;
// }

// interface User {
//   id: string;
//   status: "verified" | "unverified";
// }

export default function HomePage() {
  // const { isFallback } = useRouter();

  // if (isFallback) {
  //   return <h1>Fallback</h1>;
  // }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentUser: any = useAppSelector((state) => state.auth.user);
  const { data: user } = useGetSingleUserQuery(currentUser?.id);
  console.log(user);
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Function to handle search and filtering
  const filteredPosts = () => {
    // Ensure posts and posts.data.result exist
    if (!posts?.data?.result || posts?.data?.result.length === 0) {
      return []; // Return an empty array if no data is available
    }

    // Filter posts based on criteria
    return posts?.data?.result
      .filter((post: any) => !post.isDeleted) // Exclude posts with isDeleted true
      .filter((post: any) =>
        post.post.toLowerCase().includes(searchTerm.toLowerCase())
      ) // Check if post content is defined and matches search term
      .filter((post: any) =>
        categoryFilter ? post.category === categoryFilter : true
      ) // Filter by category if a filter is applied
      .sort((a: any, b: any) => b.upvotes - a.upvotes); // Sort by highest upvotes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl mt-6 p-4 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Posts</h2>

      {/* Search Input */}
      <input
        className="w-full mb-4 p-2 border rounded"
        placeholder="Search posts..."
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Category Filter Dropdown */}
      <select
        className="w-full mb-4 p-2 border rounded"
        value={categoryFilter}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        <option value="Flowers">Flowers</option>
        <option value="Landscaping">Landscaping</option>
        <option value="Vegetables">Vegetables</option>
      </select>

      {!isLoading && filteredPosts().length > 0 ? (
        filteredPosts().map((post: any) => {
          const isPremium = post.tag === "Premium";
          const isUnverified = user?.data?.status === "unverified";

          return (
            <div key={post._id} className="relative mb-4">
              {/* Post content, blurred for unverified users if post is premium */}
              <div
                className={`p-4 ${isPremium && isUnverified ? "blur-sm" : ""}`}
              >
                <PostCard {...post} />
              </div>

              {/* Lock overlay for unverified users */}
              {isPremium && isUnverified && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="text-white text-4xl">🔒</div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>Loading or no posts available.</p>
      )}
    </div>
  );
}
