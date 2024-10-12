"use client";

import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";

import PeopleCard from "../../../people/component/PeopleCard";

function FollowerCard({ followingId }: { followingId: string }) {
  const { data: followingData, isLoading } = useGetSingleUserQuery(
    followingId,
    {
      skip: !followingId,
    },
  );

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (!followingData) {
    return <p>No data available for this user.</p>;
  }

  return <PeopleCard user={followingData.data} />;
}

function FollowersPage({ params }: { params: { following: string } }) {
  const { following } = params;
  const { data: currentUser } = useGetSingleUserQuery(following);

  return (
    <div className="mt-16">
      <h1>Following</h1>
      <div>
        {currentUser && currentUser?.data?.following?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentUser?.data?.following?.map((followingId: string) => (
              <FollowerCard key={followingId} followingId={followingId} />
            ))}
          </div>
        ) : (
          <p>No following found.</p>
        )}
      </div>
    </div>
  );
}

export default FollowersPage;
