"use client";

import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";

import PeopleCard from "../../../people/component/PeopleCard";

// FollowerCard component to fetch and display individual follower's data
function FollowerCard({ followerId }: { followerId: string }) {
  const { data: followerData, isLoading } = useGetSingleUserQuery(followerId, {
    skip: !followerId,
  });

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (!followerData) {
    return <p>No data available for this user.</p>;
  }

  return <PeopleCard user={followerData.data} />;
}

function FollowersPage({ params }: { params: { followers: string } }) {
  const { followers } = params;
  const { data: currentUser } = useGetSingleUserQuery(followers);

  return (
    <div className="mt-16">
      <h1>Followers</h1>
      <div>
        {currentUser && currentUser?.data?.followers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentUser?.data?.followers?.map((followerId: string) => (
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
