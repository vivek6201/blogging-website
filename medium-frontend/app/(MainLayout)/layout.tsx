import Navbar from "@/components/common/Navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[70px_1fr]">
      <Navbar />
      {children}
    </div>
  );
}
