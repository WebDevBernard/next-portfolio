"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { bulldogSayings, cardData, navItems } from "@/lib/data";
import ButtonLink from "@/components/ui/Button";
export function Header({ pathname }: { pathname: string }) {
  const isHome = pathname === "/";
  const sortedData = [...cardData].sort(
    (a, b) =>
      Number.parseInt(b.year.slice(-4)) - Number.parseInt(a.year.slice(-4)),
  );

  const [scrollY, setScrollY] = useState(0);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [jiggling, setJiggling] = useState(false);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const projectsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const handleBulldogClick = () => {
    if (jiggling) return;
    setJiggling(true);
    setTimeout(() => setJiggling(false), 500);

    setDialogueIndex((prev) => (prev + 1) % bulldogSayings.length);
    setBubbleOpen(true);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setBubbleOpen(false), 2500);
  };

  // click-outside + Escape to close dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        projectsOpen &&
        projectsRef.current &&
        !projectsRef.current.contains(e.target as Node)
      ) {
        setProjectsOpen(false);
      }
      if (
        socialsOpen &&
        socialsRef.current &&
        !socialsRef.current.contains(e.target as Node)
      ) {
        setSocialsOpen(false);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProjectsOpen(false);
        setSocialsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [projectsOpen, socialsOpen]);

  useEffect(() => {
    setScrollY(window.scrollY);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fade = Math.min(Math.max((scrollY - 100) / 200, 0), 1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToProject = (title: string) => {
    const el = document.getElementById(title);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 80, damping: 8 }}
      className="sticky top-4 z-20 max-w-5xl w-[calc(100%-2rem)] mx-auto bg-[#fafafa] border-2 border-zinc-400 rounded-lg shadow-[0_6px_0_rgb(161,161,170)] relative overflow-visible flex items-start justify-between gap-4 md:gap-6 px-4 py-2 min-w-0"
    >
      <div className="flex items-center gap-4 min-w-0 flex-wrap">
          <div className="relative shrink-0">
            <img
              src="/bulldog-profile.webp"
              alt="Profile"
              width={40}
              height={40}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onClick={handleBulldogClick}
              className={`${
                jiggling ? "animate-belly-wobble" : ""
              } rounded-md border-2 border-zinc-500 cursor-pointer select-none`}
            />
            {bubbleOpen && (
              <div
                className="absolute -left-2 top-full mt-2 bg-yellow-50 border-2 border-yellow-400 rounded-md px-3 py-1.5 text-sm  text-zinc-800 whitespace-nowrap
                before:content-[''] before:absolute before:left-4 before:-top-[14px] before:border-l-[12px] before:border-l-transparent before:border-r-[12px] before:border-r-transparent before:border-b-[14px] before:border-b-yellow-400
                after:content-[''] after:absolute after:left-[20px] after:-top-[11px] after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-b-[12px] after:border-b-yellow-50"
              >
                {bulldogSayings[dialogueIndex]}
              </div>
            )}
          </div>
          <nav className="flex items-center gap-3">
            {/* Projects: inline on md+, dropdown on smaller screens — only on home */}
            {isHome && (
              <div className="hidden md:flex items-center gap-1 min-w-0">
                {sortedData.map((project) => (
                  <button
                    key={project.title}
                    className="cursor-pointer hover:text-zinc-500 transition-colors duration-300 rounded-lg p-2 whitespace-nowrap text-sm"
                    onClick={() => scrollToProject(project.title)}
                  >
                    {project.title}
                  </button>
                ))}
              </div>
            )}
            {isHome && (
              <div
                ref={projectsRef}
                className="relative shrink-0 md:hidden"
                onMouseEnter={() => setProjectsOpen(true)}
                onMouseLeave={() => setProjectsOpen(false)}
              >
                <button className="text-sm text-zinc-700 cursor-pointer flex items-center gap-1">
                  Projects
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${projectsOpen ? "-rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {projectsOpen && (
                  <>
                    <div className="absolute left-0 top-full h-4 w-52" />
                    <div className="absolute left-0 top-[calc(100%+12px)] min-w-52 rounded-md border-2 border-zinc-400 bg-[#fafafa] shadow-[0_4px_0_rgb(161,161,170)] py-1 z-10">
                      {sortedData.map((project) => (
                        <button
                          key={project.title}
                          className="flex items-center gap-4 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-500 hover:[&_img]:brightness-125 cursor-pointer transition-colors w-full text-left"
                          onClick={() => {
                            setProjectsOpen(false);
                            const el = document.getElementById(project.title);
                            if (el) {
                              const top =
                                el.getBoundingClientRect().top +
                                window.scrollY -
                                120;
                              window.scrollTo({ top, behavior: "smooth" });
                            }
                          }}
                        >
                          {project.iconUrl && (
                            <img
                              src={project.iconUrl}
                              alt=""
                              width={20}
                              height={20}
                              className="transition"
                            />
                          )}
                          {project.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            {/* Socials: icon buttons on md+, dropdown on smaller screens */}
            <div className="hidden md:flex flex-row items-center gap-3 shrink-0">
              {Object.entries(navItems).map(([path, { src, label }]) => (
                <ButtonLink key={path} href={path} src={src} hidden ariaLabel={label} className="hover:brightness-125 transition" />
              ))}
            </div>
            <div
              ref={socialsRef}
              className="relative shrink-0 md:hidden"
              onMouseEnter={() => setSocialsOpen(true)}
              onMouseLeave={() => setSocialsOpen(false)}
            >
              <button className="text-sm text-zinc-700 cursor-pointer flex items-center gap-1">
                Socials
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${socialsOpen ? "-rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {socialsOpen && (
                <>
                  <div className="absolute left-0 top-full h-4 w-36" />
                  <div className="absolute left-0 top-[calc(100%+12px)] w-36 rounded-md border-2 border-zinc-400 bg-[#fafafa] shadow-[0_4px_0_rgb(161,161,170)] py-1 z-10">
                    {Object.entries(navItems).map(([path, { src }]) => (
                      <a
                        key={path}
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-500 hover:[&_img]:brightness-125 transition-colors"
                        onClick={() => setSocialsOpen(false)}
                      >
                        <img src={src} alt="" width={28} height={28} class="transition" />
                        {src.includes("linkedin") ? "LinkedIn" : "GitHub"}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isHome && (
            <a
              href="/"
              className="flex items-center gap-1.5 rounded-md border-2 border-zinc-400 px-2.5 py-1 text-sm  text-zinc-700 bg-white hover:bg-zinc-100 active:translate-y-0.5 active:shadow-[0_2px_0_rgb(161,161,170)] transition-all cursor-pointer shadow-[0_4px_0_rgb(161,161,170)] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 outline-none"
            >
              <img src="/home.svg" alt="" width={16} height={16} />
              Home
            </a>
          )}
          <button
            onClick={scrollToTop}
            className="rounded-md border-2 border-zinc-400 p-1.5 text-zinc-600 bg-white hover:bg-zinc-100 active:translate-y-0.5 active:shadow-[0_2px_0_rgb(161,161,170)] transition-all cursor-pointer shadow-[0_4px_0_rgb(161,161,170)] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 outline-none"
            style={{
              opacity: fade,
              pointerEvents: fade > 0 ? "auto" : "none",
            }}
          >
            <img src="/top.svg" alt="Top" width={16} height={16} />
          </button>
        </div>
    </motion.header>
  );
}
