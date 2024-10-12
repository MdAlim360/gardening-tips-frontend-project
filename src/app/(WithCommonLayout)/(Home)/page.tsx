"use client";

import PostCard from "@src//components/modules/post/PostCard";
import { useGetAllPostQuery } from "@src//redux/features/post/postManagement";
import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";
import { useAppSelector } from "@src//redux/hooks";
import { useState } from "react";

const HomePage = () => {
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);
  const currentUser: any = useAppSelector((state) => state.auth.user);
  const { data: user } = useGetSingleUserQuery(currentUser.id);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Function to handle search and filtering
  const filteredPosts = () => {
    if (!posts?.data?.result) return [];

    return posts.data.result
      .filter((post) => !post.isDeleted) // Exclude posts with isDeleted true
      .filter(
        (post) =>
          post.post &&
          post.post.toLowerCase().includes(searchTerm.toLowerCase()), // Check if title is defined
      )
      .filter((post) =>
        categoryFilter ? post.category === categoryFilter : true,
      )
      .sort((a, b) => b.upvotes - a.upvotes); // Sort by highest upvotes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
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
        {/* Add other categories as options here */}
        <option value="Flowers">Flowers</option>
        <option value="Landscaping">Landscaping</option>
        <option value="Vegetables">Vegetables</option>
        {/* Add more categories as needed */}
      </select>

      {!isLoading && filteredPosts().length > 0 ? (
        filteredPosts().map((post) => {
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
};

export default HomePage;
