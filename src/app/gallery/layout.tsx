"use client";

import NavBar from "@src//components/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      {children}
    </>
  );
}
