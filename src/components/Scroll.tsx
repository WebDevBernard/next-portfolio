"use client";
import { useEffect, useState } from "react";

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
    <p
      className={`text-sm fixed bottom-8 right-[max(2rem,calc((100vw-96rem)/2+2rem))] z-20 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${
        showScrollButton
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      ⏫ Scroll to Top
    </p>
  );
};
