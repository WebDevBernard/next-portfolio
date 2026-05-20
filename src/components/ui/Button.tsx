"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { subDomainInNewTab } from "@/lib/data";

export const buttonClass = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium
transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
[&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring
focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive rounded-lg gap-4 text-zinc-700 font-semibold outline-none border-2 border-zinc-400 shadow-[0_6px_0_rgb(161,161,170)]
ease-out transition-all cursor-pointer h-10 px-6 py-2.5 flex-1 active:shadow-[0_2px_0px_rgb(161,161,170)] active:translate-y-1`;

// ── ButtonLink (<a> variant) ──────────────────────────────────────────────

interface ButtonLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  src?: string;
  hidden?: boolean;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  className,
  src,
  hidden,
  ariaLabel,
  onClick,
}) => {
  const isExternal = href.startsWith("http");
  const isInternal = href.endsWith(subDomainInNewTab);
  const target = isExternal && !isInternal ? "_blank" : "_self";
  const rel = isExternal && !isInternal ? "noopener noreferrer" : undefined;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const content = hidden ? (
    src && (
      <img
        alt=""
        src={src}
        height={40}
        width={40}
      />
    )
  ) : (
    <>
      {src && (
        <span className="flex flex-row items-start gap-2">
          <img
            className="select-none"
            alt=""
            src={src}
            height={20}
            width={20}
          />
          {children}
        </span>
      )}
    </>
  );

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={cn(className, !hidden && buttonClass)}
      onClick={handleClick}
    >
      {content}
    </a>
  );
};

// ── Button (<button> variant) ─────────────────────────────────────────────

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  className,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonClass, className)}
    >
      {children}
    </button>
  );
}

export { Button };
export default ButtonLink;
