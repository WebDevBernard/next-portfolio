"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Avatar = () => {
  const [bounce, setBounce] = useState(false);

  const handleClick = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 1000);
  };

  return (
    <div className="w-full max-w-[500px] aspect-[500/336]">
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
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyMzAsMjMwLDIzMCk7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjpyZ2IoMjAwLDIwMCwyMDApO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzM2IiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+"
      />
    </div>
  );
};

export default Avatar;
