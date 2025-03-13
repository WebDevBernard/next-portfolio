"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
export const ScrollToTop = () => {
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
          className="fixed bottom-14 right-8 cursor-pointer z-20"
          src="./top.svg"
          alt={"top"}
          unoptimized
        />
      )}
    </>
  );
};
