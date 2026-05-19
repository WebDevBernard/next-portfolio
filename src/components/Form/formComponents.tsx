import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

const inputClass = `w-full text-md font-semibold text-zinc-800 py-5 px-6 inset-shadow-[0_6px_0_rgb(240,240,240)]
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

interface SubmitButtonProps {
  isVerified: boolean;
  isLoading: boolean;
  hasSubmitted: boolean;
  children: React.ReactNode;
  className?: string;
}

function SubmitButton({
  isVerified,
  isLoading,
  hasSubmitted,
  children,
  className,
}: SubmitButtonProps) {
  const disabled = isLoading || hasSubmitted;

  let text = children;
  if (isLoading) text = "Loading, please wait...";

  return (
    <Button
      type="submit"
      disabled={disabled}
      className={cn("bg-lime-200 hover:bg-lime-300/80 w-full py-2 h-auto", className)}
    >
      {isLoading ? (
        <svg
          className="animate-spin text-zinc-700"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        <img
          src="/autonavi.svg"
          alt="autonavi"
          width={24}
          height={24}
          className="text-zinc-700 select-none"
        />
      )}
      {text}
    </Button>
  );
}

export { Textarea, Input, SubmitButton as Button };
