"use client";
import { useState } from "react";
import Image from "next/image";
import { CardProps } from "@/lib/data";
import renameAltTags from "@/lib/renameAltTags";

interface SideBarProps {
  projectData: CardProps[];
  cardRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

export function SideBar({ projectData, cardRefs }: SideBarProps) {
  const [showProjects, setShowProjects] = useState(false);

  const handleScroll = (title: string) => {
    cardRefs.current[title]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <aside
      className="hidden md:block h-screen fixed left-0 top-0 z-10 px-6 py-8"
      onMouseLeave={() => setShowProjects(false)}
      onMouseEnter={() => setShowProjects(true)}
    >
      <Image
        src="./code.svg"
        alt={"code"}
        width={40}
        height={40}
        onMouseEnter={() => setShowProjects(true)}
        className="cursor-pointer mb-4 select-none"
      />

      <div
        className={`space-y-4 transition-all duration-700 ${
          showProjects ? "duration-700 opacity-100" : "duration-2100 opacity-0"
        }`}
      >
        {projectData.map((project, index) => (
          <div
            key={index}
            className="text-zinc-700 cursor-pointer"
            onClick={() => handleScroll(project.title)}
          >
            <p className="hidden xl:block xl:w-[300px]text-zinc-700">
              {project.title}
            </p>
            {project.iconUrl && (
              <Image
                src={project.iconUrl}
                alt={renameAltTags(project.iconUrl)}
                width={30}
                height={30}
                className="mb-4 ml-1 block xl:hidden"
                unoptimized
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
