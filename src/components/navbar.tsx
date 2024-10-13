"use client";

import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/react";
import {
  FaHome,
  FaUsers,
  FaImages,
  FaStar,
  FaNewspaper,
  FaUserCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { baseApi } from "../redux/api/baseApi";
import { logout } from "../redux/features/auth/authSlice";

import { SearchIcon } from "./icons";

function NavBar() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const user: any = useAppSelector((state) => state.auth.user);
  console.log(user);
  const [activeLink, setActiveLink] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useAppDispatch();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    // Logout action
    dispatch(logout());

    // Reset API state
    dispatch(baseApi.util.resetApiState());

    // Clear the access token cookie
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login";
    // Close modal
    toggleModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div
      className={`flex  bg-white w-full justify-between items-center px-4 py-2 relative ${isScrolled ? "shadow-md" : ""}`}
    >
      {/* Left side: Logo and Search */}
      <div className="flex gap-2 items-center">
        {/* <h1 className="text-3xl font-bold">Fac</h1> */}
        <Link href={"/"}>
          {" "}
          <img
            alt=""
            className="w-28 md:w-40"
            src="https://i.ibb.co.com/5knZ9X6/628.jpg"
          />
        </Link>
        <Input
          isClearable
          className="w-44 rounded-full"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          radius="lg"
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      {/* Center: Icons with Hover Text Below */}
      <div className="-ml-48 flex gap-12 items-center">
        <Link
          className={`relative pl-0 md:pl-44 lg:pl-0 hidden md:flex items-center justify-center group ${activeLink === "home" ? "text-green-500" : "text-black"} transition-colors duration-200`}
          href="/"
          onClick={() => handleLinkClick("home")}
        >
          <FaHome className="text-2xl " />
          <span className="absolute top-8 opacity-0 group-hover:opacity-100 text-sm bg-gray-700 text-white px-2 py-1 rounded-md transition-opacity duration-300">
            Home
          </span>
        </Link>
        <Link
          className={`relative hidden md:flex items-center justify-center group ${activeLink === "people" ? "text-green-500" : "text-black"} transition-colors duration-200`}
          href="/people"
          onClick={() => handleLinkClick("people")}
        >
          <FaUsers className="text-2xl" />
          <span className="absolute top-8 opacity-0 group-hover:opacity-100 text-sm bg-gray-700 text-white px-2 py-1 rounded-md transition-opacity duration-300">
            People
          </span>
        </Link>
        <Link
          className={`relative hidden md:flex items-center justify-center group ${activeLink === "gallery" ? "text-green-500" : "text-black"} transition-colors duration-200`}
          href="/gallery"
          onClick={() => handleLinkClick("gallery")}
        >
          <FaImages className="text-2xl" />
          <span className="absolute top-8 opacity-0 group-hover:opacity-100 text-sm bg-gray-700 text-white px-2 py-1 rounded-md transition-opacity duration-300">
            Gallery
          </span>
        </Link>
        <Link
          className={`relative hidden md:flex items-center justify-center group ${activeLink === "premium" ? "text-green-500" : "text-black"} transition-colors duration-200`}
          href="/premium"
          onClick={() => handleLinkClick("premium")}
        >
          <FaStar className="text-2xl" />
          <span className="absolute top-8 opacity-0 group-hover:opacity-100 text-sm bg-gray-700 text-white px-2 py-1 rounded-md transition-opacity duration-300">
            Premium
          </span>
        </Link>
        <Link
          className={`relative hidden md:flex items-center justify-center group ${activeLink === "news" ? "text-green-500" : "text-black"} transition-colors duration-200`}
          href="/gallery"
          onClick={() => handleLinkClick("news")}
        >
          <FaNewspaper className="text-2xl" />
          <span className="absolute top-8 opacity-0 group-hover:opacity-100 text-sm bg-gray-700 text-white px-2 py-1 rounded-md transition-opacity duration-300">
            News
          </span>
        </Link>
      </div>

      {/* Right side: Avatar or Register/Login */}
      {user ? (
        <div className="flex items-center relative">
          <Image
            alt={user.name}
            className="w-12 h-12 rounded-full cursor-pointer object-cover"
            height={50}
            src={user.picture}
            width={50}
            onClick={toggleModal}
          />
          {isModalOpen && (
            <div
              ref={modalRef}
              className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-10"
              style={{ top: "100%" }}
            >
              <Link
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-black"
                href={`/profile/${user.id}`}
                onClick={toggleModal}
              >
                <FaUserCircle /> Profile
              </Link>
              <Link
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-black"
                href={user.role === "admin" ? "/admin-dashboard" : "/dashboard"}
                onClick={toggleModal}
              >
                <FaTachometerAlt />{" "}
                {user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
              </Link>

              <Link
                className="flex md:hidden items-center gap-2 px-4 py-2 hover:bg-gray-100 text-black"
                href={`/premium`}
                onClick={toggleModal}
              >
                <FaStar /> Premium
              </Link>
              <Link
                className="flex md:hidden items-center gap-2 px-4 py-2 hover:bg-gray-100 text-black"
                href={`/people`}
                onClick={toggleModal}
              >
                <FaUsers /> People
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-black"
                onClick={handleLogout}
              >
                <FaUserCircle /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <h1>register</h1>
          <h1>login</h1>
        </div>
      )}
    </div>
  );
}

export default NavBar;
