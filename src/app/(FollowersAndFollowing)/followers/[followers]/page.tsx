"use client";

import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";
import PeopleCard from "../../../../components/people-component/PeopleCard";

// Define the type for a User
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  picture: string;
  coverPhoto: string;
  followers: string[]; // Array of follower IDs
  following: string[]; // Array of following IDs
  role: string;
  status: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string; // Date string
  updatedAt: string; // Date string
  password: string; // Hashed password
  __v: number;
}

// FollowerCard component to fetch and display individual follower's data
function FollowerCard({ followerId }: { followerId: string }) {
  // Don't pass any generics, RTK Query handles that internally
  const {
    data: followerData,
    isLoading,
    error,
  } = useGetSingleUserQuery(followerId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !followerData) {
    return <p>No data available for this user.</p>;
  }

  return <PeopleCard user={followerData.data} />;
}

function FollowersPage({ params }: { params: { followers: string } }) {
  const { followers } = params;

  // Let the query infer the types by itself
  const {
    data: currentUser,
    isLoading,
    error,
  } = useGetSingleUserQuery(followers);

  if (isLoading) {
    return <p>Loading followers...</p>;
  }

  if (error || !currentUser?.data?.followers) {
    return <p>No followers found.</p>;
  }

  return (
    <div className="mt-32 max-w-7xl mx-auto">
      <h1>Followers</h1>
      <div>
        {currentUser.data.followers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentUser.data.followers.map((followerId: string) => (
              <FollowerCard key={followerId} followerId={followerId} />
            ))}
          </div>
        ) : (
          <p>No followers found.</p>
        )}
      </div>
    </div>
  );
}

export default FollowersPage;
