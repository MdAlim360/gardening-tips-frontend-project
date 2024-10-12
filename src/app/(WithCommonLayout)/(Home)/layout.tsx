"use client";

import LeftSidebar from "@src//components/LeftSidebar";
import NavBar from "@src//components/navbar";
import RightSidebar from "@src//components/RightSidebar";
import { useEffect, useState, ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i)); // Initial items
  const [loading, setLoading] = useState(false);

  // Function to load more items (simulating an API call)
  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 20 }, (_, i) => prev.length + i),
      ]);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user has reached the bottom of the page
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      {/* Navbar - Fixed and Full width */}
      <div className="w-full fixed top-0 z-10">
        <NavBar />
      </div>

      {/* Layout Grid */}
      <div className="flex justify-center mt-16">
        {/* Left Sidebar - Independent scroll and hidden scrollbar */}
        <div className="mt-16 bg-gray-100 h-screen sticky top-0 w-1/5 p-4 overflow-y-auto scrollable-content hidden lg:block">
          <LeftSidebar />
        </div>

        {/* Main Content - Central feed with independent scroll */}
        <div className="bg-gray-200 w-full max-w-3xl mx-4 md:mx-6 lg:mx-8 overflow-auto scrollable-content mt-16">
          {children}
          {/* Content Feed - Simulating posts/items */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border"
              >
                Item {item}
              </div>
            ))}
          </div>
          {/* Loading more feedback */}
          {loading && <div className="text-center p-4">Loading more...</div>}
        </div>

        {/* Right Sidebar - Independent scroll and hidden scrollbar */}
        <div className="mt-16 bg-gray-100 h-screen sticky top-0 w-1/5 p-4 overflow-y-auto scrollable-content hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
