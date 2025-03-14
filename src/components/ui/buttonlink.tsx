import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  src?: string;
  submit?: boolean;
  customKey?: React.Key;
  hidden?: boolean;
}

export const buttonClass = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium 
transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none 
[&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring 
focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
aria-invalid:border-destructive rounded-lg gap-4 text-zinc-800 font-semibold outline-none border-zinc-800 border-2 shadow-[0_6px_0_rgb(3,7,18)] 
ease-out transition-all cursor-pointer h-10 rounded-md px-6 py-2.5 flex-1`;

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  className = "",
  src,
  customKey,
  hidden,
}) => {
  // handles external links
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : "_self";
  const rel = isExternal ? "noopener noreferrer" : undefined;

  const content = hidden ? (
    src && (
      <Image
        alt={src.replace(/^.*\/([^/]+)\.[^/.]+$/, "$1")}
        src={src}
        height={40}
        width={40}
        unoptimized
      />
    )
  ) : (
    <>
      {src && (
        <span className="flex flex-row items-center gap-2">
          <Image
            className="select-none"
            alt={src.replace(/^.*\/([^/]+)\.[^/.]+$/, "$1")}
            src={src}
            height={20}
            width={20}
            unoptimized
          />
          {children}
        </span>
      )}
    </>
  );

  return (
    <Link
      key={customKey}
      href={href || "/"}
      target={target}
      rel={rel}
      className={cn(
        className,
        !hidden &&
          `${buttonClass} hover:shadow-[0_2px_0px_rgb(3,7,18)] hover:translate-y-1`
      )}
    >
      {content}
    </Link>
  );
};

export default ButtonLink;
