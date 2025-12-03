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
    <>
      {showScrollButton && (
        <Image
          onClick={scrollToTop}
          width={50}
          height={50}
          className="fixed bottom-25 right-8 cursor-pointer z-20 hover:bg-white/60 p-2 rounded-lg transition-all duration-700"
          src="/top.svg"
          alt={"top"}
          unoptimized
        />
      )}
    </>
  );
};
