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
    <div className="w-[500px] h-[336px]">
      <Image
        width={500}
        height={336}
        className={cn(
          "rounded-2xl border-4 object-cover w-full h-full border-white cursor-pointer",
          bounce && "animate-[wiggle_1s_ease-in-out]"
        )}
        src={"/opengraph-image.webp"}
        alt="github_avatar"
        onClick={handleClick}
        priority
      />
    </div>
  );
};
export default Avatar;
