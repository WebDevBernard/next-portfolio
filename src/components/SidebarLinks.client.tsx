"use client";

import Image from "next/image";
import { CardProps } from "@/lib/data";

interface SidebarLinksProps {
  projectData: CardProps[];
}

export function SidebarLinks({ projectData }: SidebarLinksProps) {
  const handleScroll = (title: string) => {
    document.getElementById(title)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {projectData.map((project, index) => (
        <div
          key={index}
          className="cursor-pointer hover:bg-white md:hover:bg-white/60 transition-colors duration-300 rounded-lg p-2"
          onClick={() => handleScroll(project.title)}
        >
          <p className="hidden xl:block xl:w-[16rem]">{project.title}</p>
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
    </>
  );
}
