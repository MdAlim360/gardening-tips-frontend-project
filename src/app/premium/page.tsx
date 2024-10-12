"use client";

import PostCard from "@src//components/modules/post/PostCard";
import { useGetAllPostQuery } from "@src//redux/features/post/postManagement";
import React from "react";

// Define types based on your post structure (adjust as needed)
interface Post {
  _id: string;
  title: string;
  content: string;
  tag: string;
  isDeleted: boolean;
  following: string[];
  followers: string[];
  comments: string[];
  upvote: string[];
  downvote: string[];
  category: string;
  post: string;

  picture: string;
  user: string;
  favorite: string[];
}

function PremiumPage() {
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mt-32 md:mt-40 max-w-7xl px-6 md:px-12 lg:px-20 mx-auto">
      <h1 className="text-lg md:text-xl lg:text-2xl text-center font-medium py-4">
        All Premium Posts
      </h1>
      {posts?.data?.result.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {posts.data.result
            .filter((post: Post) => !post.isDeleted && post.tag === "Premium")
            .map((post: Post) => (
              // eslint-disable-next-line prettier/prettier
              <PostCard
                key={post._id}
                createdAt={""}
                updatedAt={""}
                {...post}
              />
            ))}
        </div>
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}

export default PremiumPage;
