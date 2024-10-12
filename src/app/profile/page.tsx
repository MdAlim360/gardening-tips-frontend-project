"use client";
import { Image } from "@nextui-org/react";
import { useAppSelector } from "@src//redux/hooks";
import Link from "next/link";

function ProfilePage() {
  const user: any = useAppSelector((state) => state.auth.user);

  return (
    <div className="pt-16 flex  flex-col items-center max-w-6xl mx-auto bg-gray-100">
      {/* Cover Photo Section */}
      <div className="relative w-full">
        <Image
          alt={user.name}
          className="object-cover"
          height={300}
          src={user.coverPhoto || "https://via.placeholder.com/850x300"}
          width={"100%"}
        />

        {/* Profile Picture Overlapping the Cover Photo (left side) */}
        <div className="absolute flex justify-center items-center gap-4 left-8 bottom-[-100px]">
          {" "}
          {/* Positioning to the left side */}
          <Image
            alt={user.name}
            className="rounded-full border-4 border-white object-cover"
            height={120}
            src={user.picture || "https://via.placeholder.com/150"}
            width={120}
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <h1>{user.followers.length} Followers</h1>
          </div>
        </div>
      </div>

      {/* Navigation Links Section */}
      <div className="mt-8 flex gap-8 border-t border-gray-300 w-full justify-center py-4 bg-white">
        <Link className="text-lg text-blue-500 font-semibold" href="#">
          Posts
        </Link>
        <Link className="text-lg text-blue-500 font-semibold" href="#">
          Followers
        </Link>
        <Link className="text-lg text-blue-500 font-semibold" href="#">
          Following
        </Link>
        <Link className="text-lg text-blue-500 font-semibold" href="#">
          About
        </Link>
      </div>

      {/* Main Content Section (Example of Posts Section) */}
      <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {/* Display posts or other content here */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p>Post 1 content goes here...</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>Post 2 content goes here...</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
