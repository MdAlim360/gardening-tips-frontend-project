import Link from "next/link";
import {
  FaHome,
  FaImages,
  FaNewspaper,
  FaStar,
  FaUsers,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";

export default function RightSidebar() {
  return (
    <div className="w-64 h-full p-4">
      <ul className="space-y-4">
        {/* Home */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="#"
          >
            <FaHome className="text-green-500" />
            <span className="text-gray-700">Home</span>
          </Link>
        </li>

        {/* Friends */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="#"
          >
            <FaUsers className="text-green-500" />
            <span className="text-gray-700">Friends</span>
          </Link>
        </li>

        {/* Saved */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="#"
          >
            <IoSaveSharp className="text-green-500" />
            <span className="text-gray-700">Saved</span>
          </Link>
        </li>

        {/* Most Recent */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="#"
          >
            <FaNewspaper className="text-green-500" />
            <span className="text-gray-700">Most Recent</span>
          </Link>
        </li>

        {/* Photos */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="#"
          >
            <FaImages className="text-green-500" />
            <span className="text-gray-700">Photos</span>
          </Link>
        </li>

        {/* Favorites */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="#"
          >
            <FaStar className="text-green-500" />
            <span className="text-gray-700">Premium</span>
          </Link>
        </li>

        {/* About Us */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="aboutus"
          >
            <FaInfoCircle className="text-green-500" />
            <span className="text-gray-700">About Us</span>
          </Link>
        </li>

        {/* Contact Us */}
        <li>
          <Link
            className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
            href="contact"
          >
            <FaPhone className="text-green-500" />
            <span className="text-gray-700">Contact Us</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
