"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { githubAvatar } from "@/lib/data";
const Avatar = () => {
  const [bounce, setBounce] = useState(false);

  const handleClick = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 1000);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Image
      width={500}
      height={500}
      className={cn(
        "rounded-2xl border-4 object-cover border-white relative cursor-pointer transition-opacity duration-700",
        "pointer-events-none xl:pointer-events-auto",
        bounce && "animate-[wiggle_1s_ease-in-out]"
      )}
      src={"/opengraph-image.webp"}
      alt="github_avatar"
      onClick={handleClick}
      loading="eager"
      unoptimized
    />
  );
};
export default Avatar;
