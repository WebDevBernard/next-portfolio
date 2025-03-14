// ShadCN Components
import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const formButtonClass = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium 
transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none 
[&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring 
focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
aria-invalid:border-destructive rounded-lg gap-4 text-zinc-800 font-semibold outline-none border-zinc-800 border-2 shadow-[0_6px_0_rgb(3,7,18)] 
ease-out transition-all cursor-pointer h-10 rounded-md px-6 py-2.5 flex-1 active:shadow-[0_2px_0px_rgb(3,7,18)] active:translate-y-1`;

const inputClass = `text-md font-semibold text-zinc-800 py-5 px-6 inset-shadow-[0_6px_0_rgb(243,244,246)] 
rounded-lg border-2 border-zinc-600 bg-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
focus-visible:ring-4 focus-visible:ring-blue-400/50 focus-visible:outline-none focus:inset-shadow-white 
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`;

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputClass, className)}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(inputClass, className, "min-h-32")}
      {...props}
    />
  );
}

interface ButtonProps {
  isVerified: boolean;
  hasSubmitted: boolean;
  children: React.ReactNode;
  className?: string;
}

function Button({
  isVerified,
  hasSubmitted,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={!isVerified || hasSubmitted}
      type="submit"
      className={cn(
        formButtonClass,
        className,
        "bg-lime-300 hover:bg-lime-400/80"
      )}
    >
      <Image
        src="/autonavi.svg"
        alt="autonavi"
        width={40}
        height={40}
        className="text-zinc-700 select-none"
        unoptimized
      />
      {children}
    </button>
  );
}

export { Textarea, Input, Button };
