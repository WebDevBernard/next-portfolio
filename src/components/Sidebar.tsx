"use client";

import { useState } from "react";
import Image from "next/image";
import { CardProps } from "@/lib/data";
import { SidebarLinks } from "./SidebarLinks.client";

interface SideBarProps {
  projectData: CardProps[];
}

export function SideBar({ projectData }: SideBarProps) {
  const [showProjects, setShowProjects] = useState(false);
  const sortedData = [...projectData].sort(
    (a, b) => Number(b.year) - Number(a.year),
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      className="hidden z-20 md:flex justify-between flex-col h-screen fixed left-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] top-0 py-4"
      onMouseLeave={() => setShowProjects(false)}
      onMouseEnter={() => setShowProjects(true)}
    >
      <div
        className={`space-y-2 transition-all duration-700 ${
          showProjects ? "duration-700 opacity-100" : "duration-2100 opacity-0"
        }`}
      >
        <Image
          src="/pin.svg"
          alt="pin"
          width={50}
          height={50}
          onClick={scrollToTop}
          onMouseEnter={() => setShowProjects(true)}
          className="cursor-pointer mt-4 select-none"
          unoptimized
        />
        <SidebarLinks projectData={sortedData} />
      </div>
    </aside>
  );
}
