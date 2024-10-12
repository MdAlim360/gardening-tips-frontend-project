"use client";

import { useUpdateUserMutation } from "@src//redux/features/user/userManagement";
import { useAppSelector } from "@src//redux/hooks";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

// Define types for the User and Props
interface User {
  _id: string;
  name: string;
  picture: string;
  followers: string[]; // Assuming followers are user IDs
  following: string[]; // Assuming following are user IDs
}

interface PeopleCardProps {
  user: User;
}

function PeopleCard({ user }: PeopleCardProps) {
  const currentUser = useAppSelector((state: any) => state.auth.user); // Get the current user

  const [updateUser] = useUpdateUserMutation();
  const [isFollowing, setIsFollowing] = useState(false); // State to track if the current user is following the displayed user
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false); // State to track if the user is already followed by the current user

  useEffect(() => {
    // Check if the current user is already following this user
    if (currentUser?.following?.includes(user._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }

    // Check if this user is already in the current user's followers
    if (user.followers.includes(currentUser?.id)) {
      setIsAlreadyFollowed(true);
    } else {
      setIsAlreadyFollowed(false);
    }
  }, [currentUser, user]);

  const handleFollow = async () => {
    try {
      // Step 1: Update current user's following array
      await updateUser({
        id: currentUser?.id,
        payload: {
          following: [...currentUser?.following, user._id], // Add the followed user's ID
        },
      }).unwrap();

      // Step 2: Update followed user's followers array
      await updateUser({
        id: user._id, // Followed user's ID
        payload: {
          followers: [...user.followers, currentUser?.id], // Add the current user's ID to the followers array
        },
      }).unwrap();

      // Update the state to reflect that the user is now following
      setIsFollowing(true);
      setIsAlreadyFollowed(true); // Update followers
      toast.success(`Successfully followed ${user.name}!`);
    } catch (error) {
      toast.error("Failed to follow user.");
    }
  };

  const handleUnfollow = async () => {
    try {
      // Step 1: Remove from current user's following array
      await updateUser({
        id: currentUser?.id,
        payload: {
          following: currentUser?.following.filter(
            (id: string) => id !== user._id,
          ), // Remove the followed user's ID
        },
      }).unwrap();

      // Step 2: Remove from followed user's followers array
      await updateUser({
        id: user._id,
        payload: {
          followers: user.followers.filter(
            (id: string) => id !== currentUser?.id,
          ), // Remove the current user's ID
        },
      }).unwrap();

      // Update the state to reflect that the user is no longer following
      setIsFollowing(false);
      setIsAlreadyFollowed(false); // Update followers state
      toast.success(`Successfully unfollowed ${user.name}!`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("Failed to unfollow user.");
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        alt={`${user.name}'s profile`}
        className="w-full h-40 mx-auto object-cover"
        src={user.picture}
      />

      <div className="mt-12 pb-4 px-2 flex justify-between items-center">
        <button className="text-black hover:underline">{user.name}</button>
        <button
          className={`${
            isFollowing || isAlreadyFollowed
              ? "bg-gray-500"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white px-4 py-1 rounded`}
          onClick={
            isFollowing || isAlreadyFollowed ? handleUnfollow : handleFollow
          }
        >
          {isFollowing || isAlreadyFollowed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default PeopleCard;
