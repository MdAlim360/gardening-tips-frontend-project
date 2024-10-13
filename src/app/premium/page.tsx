"use client";

import dynamic from "next/dynamic";
const PostCard = dynamic(() => import("@src/components/modules/post/PostCard"));
import { useGetAllPostQuery } from "@src//redux/features/post/postManagement";
import React from "react";

// Define types based on your post structure (adjust as needed)
interface Post {
  _id: string;
  title: string;
  content: string;
  tag: string;
  isDeleted: boolean;
  following: any;
  followers: any;
  comments: any;
  upvote: any;
  downvote: any;
  category: any;
  post: string;
  picture: string;
  user: string;
  favorite: any;
  updatedAt: string;
  createdAt: string;
}

function PremiumPage() {
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(posts);
  // Check if posts is defined and has results
  const premiumPosts = posts?.data?.result.filter(
    (post: Post) => !post.isDeleted && post.tag === "Premium"
  );

  return (
    <div className="mt-32 md:mt-40 max-w-7xl px-6 md:px-12 lg:px-20 mx-auto">
      <h1 className="text-lg md:text-xl lg:text-2xl text-center font-medium py-4">
        All Premium Posts
      </h1>
      {premiumPosts && premiumPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {premiumPosts.map((post: Post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              category={post.category}
              comments={post.comments}
              createdAt={post.createdAt}
              downvote={post.downvote}
              favorite={post.favorite || []} // Ensure favorite is an array
              isDeleted={post.isDeleted}
              picture={post.picture}
              post={post.post}
              tag={post.tag}
              updatedAt={post.updatedAt || ""} // Ensure updatedAt is a string
              upvote={post.upvote}
              user={post?.user}
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
