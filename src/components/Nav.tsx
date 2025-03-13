import Image from "next/image";
import { navItems } from "@/lib/data";
import renameAltTags from "@/lib/renameAltTags";
import Link from "next/link";
import HomeIcon from "./HomeIcon";

export function Navbar() {
  return (
    <aside className="mb-8 tracking-tight px-4">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row justify-end relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row items-center space-x-2 md:space-x-8">
            <HomeIcon />
            {Object.entries(navItems).map(([path, { src }]) => {
              return (
                <a
                  key={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
                  href={path}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src={src}
                    alt={renameAltTags(src)}
                    width={40}
                    height={40}
                    className="text-zinc-60"
                  />
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
