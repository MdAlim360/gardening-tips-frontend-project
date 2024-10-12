"use client";
import React from "react";
import { useGetAllUsersQuery } from "@src//redux/features/user/userManagement";
import { useAppSelector } from "@src//redux/hooks";
import Link from "next/link";

import PeopleCard from "./component/PeopleCard";

type User = {
  _id: string;
  name: string;
  picture: string;
  status: string;
  followers: string[]; // Include followers for updating
};

function PeoplePage() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const currentUser = useAppSelector((state) => state.auth.user); // Get the current user

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!data || !Array.isArray(data.data)) {
    return <div>No users available.</div>; // Handle the case when data is not available or is not an array
  }

  // Filter out the current user's own data
  const filteredUsers = data.data.filter(
    (user: User) => user._id !== currentUser.id,
  );

  return (
    <div className="grid mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {filteredUsers.map((user: User) => (
        <Link key={user?._id} href={`/profile/${user._id}`}>
          <PeopleCard key={user?._id} user={user} />
        </Link>
      ))}
    </div>
  );
}

export default PeoplePage;
