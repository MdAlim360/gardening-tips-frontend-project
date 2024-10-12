"use client";
import PostCard from "@src//components/modules/post/PostCard";
import { useGetSinglePostQuery } from "@src//redux/features/post/postManagement";
import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";
import React, { useEffect, useState } from "react";

function SinglePost({ params }) {
  const { postId } = params;
  const { data: post, isLoading: postLoading } = useGetSinglePostQuery(postId);
  const [postUserName, setPostUserName] = useState<string | null>(null);

  // Fetch post user
  const userId = post?.data?.user;
  const { data: postUser, isLoading: userLoading } =
    useGetSingleUserQuery(userId);

  useEffect(() => {
    if (postUser) {
      setPostUserName(postUser.name);
    }
  }, [postUser]);

  if (postLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (!post || !post.data) {
    return <div>No post found</div>;
  }

  const postData = post.data;

  return (
    <div className="max-w-7xl mx-auto mt-16">
      {/* Pass the data to the PostCard component */}
      <PostCard
        _id={postData._id}
        category={postData.category}
        comments={postData.comments}
        createdAt={postData.createdAt}
        downvote={postData.downvote}
        favorite={[]}
        isDeleted={postData.isDeleted}
        picture={postData.picture}
        post={postData.post}
        tag={postData.tag}
        updatedAt={""}
        upvote={postData.upvote}
        user={postUserName || "Unknown User"}
      />
    </div>
  );
}

export default SinglePost;
