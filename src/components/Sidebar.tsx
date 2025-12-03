"use client";
import { useState } from "react";
import Image from "next/image";
import { CardProps } from "@/lib/data";

interface SideBarProps {
  projectData: CardProps[];
  cardRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

export function SideBar({ projectData, cardRefs }: SideBarProps) {
  const [showProjects, setShowProjects] = useState(false);

  const sortedData = projectData.sort(
    (a, b) => Number(b.year) - Number(a.year)
  );

  const handleScroll = (title: string) => {
    cardRefs.current[title]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      className="hidden z-20 md:block h-screen fixed left-0 top-0 px-6 py-8"
      onMouseLeave={() => setShowProjects(false)}
      onMouseEnter={() => setShowProjects(true)}
    >
      <Image
        src="/home.svg"
        alt={"home"}
        width={40}
        height={40}
        onClick={scrollToTop}
        onMouseEnter={() => setShowProjects(true)}
        className="cursor-pointer mb-6 ml-1 select-none"
        unoptimized
      />
      <div
        className={`space-y-4 transition-all duration-700 ${
          showProjects ? "duration-700 opacity-100" : "duration-2100 opacity-0"
        }`}
      >
        {sortedData.map((project, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-white md:hover:bg-white/60 transition-colors duration-300 rounded-lg p-2"
            onClick={() => handleScroll(project.title)}
          >
            <p className="hidden xl:block xl:w-[300px]">{project.title}</p>
            {project.iconUrl && (
              <Image
                src={project.iconUrl}
                alt={project.iconUrl.replace(/^.*\/([^/]+)\.[^/.]+$/, "$1")}
                width={30}
                height={30}
                className="block xl:hidden"
                unoptimized
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
