"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Scroll = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-5 right-8 z-20 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${
        showScrollButton
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <Image
        width={60}
        height={60}
        className="rounded p-2"
        src="/top.svg"
        alt={"top"}
        unoptimized
      />
      <p className="text-xs">Scroll to Top</p>
    </div>
  );
};
