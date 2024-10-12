"use client";

import PostCard from "@src//components/modules/post/PostCard";
import { useGetAllPostQuery } from "@src//redux/features/post/postManagement";
import { useAppSelector } from "@src//redux/hooks";

function FavoritePage() {
  const currentUser: any = useAppSelector((state) => state.auth.user);
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!posts || !currentUser) {
    return <div>No posts or user data available.</div>;
  }

  const favoritePosts = posts.data.result.filter((post) =>
    post.favorite.includes(currentUser.id),
  );

  console.log(favoritePosts);

  return (
    <div className="">
      <h1 className="mt-16 font-medium text-md">Favorite Posts</h1>
      <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-lg shadow-md">
        {favoritePosts
          ?.filter((post) => !post.isDeleted) // Exclude posts with isDeleted true
          .map((post) => <PostCard key={post._id} {...post} />)}
      </div>
    </div>
  );
}

export default FavoritePage;
