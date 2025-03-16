"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { avatarSublink, githubAvatar } from "@/lib/data";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ContextMenu";
import Link from "next/link";
const Avatar = () => {
  const [bounce, setBounce] = useState(false);

  const handleClick = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 1000);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Image
          width={90}
          height={90}
          className={cn(
            "rounded-lg border-2 border-zinc-700 relative cursor-pointer",
            bounce && "animate-[wiggle_1s_ease-in-out]"
          )}
          src={githubAvatar}
          alt="github_avatar"
          onClick={handleClick}
          loading="eager"
          unoptimized
        />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Link href={avatarSublink}>Click to play game</Link>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Avatar;
