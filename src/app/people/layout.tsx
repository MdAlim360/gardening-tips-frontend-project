"use client";

import LeftSidebar from "@src//components/LeftSidebar";
import NavBar from "@src//components/navbar";
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
      <div className="w-full fixed z-10">
        <NavBar />
      </div>

      <div className="flex">
        {/* Left Sidebar - Fixed width and scrollable */}
        <div className="pt-32 hidden bg-gray-200 md:flex  sticky top-0 h-screen w-1/4 overflow-y-auto">
          <LeftSidebar />
        </div>

        {/* Main content */}
        <div className="bg-gray-200 mt-16 w-full overflow-auto">{children}</div>
      </div>
    </>
  );
}
