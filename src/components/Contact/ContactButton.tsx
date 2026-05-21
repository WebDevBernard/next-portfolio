"use client";

import { contactHeadingRef } from "@/lib/refs";

export function ContactButton() {
  const handleClick = () => {
    const el = contactHeadingRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold
          transition-all cursor-pointer h-10 px-6 py-2.5 text-zinc-700 border-2 border-zinc-400
          shadow-[0_6px_0_rgb(161,161,170)] active:shadow-[0_2px_0px_rgb(161,161,170)] active:translate-y-1
          bg-lime-200 hover:bg-lime-300/80 flex-none outline-none
          focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <img
          className="select-none"
          alt="autonavi"
          src="/autonavi.svg"
          height={20}
          width={20}
        />
        Contact Me
      </button>
    </div>
  );
}
