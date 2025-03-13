import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-md font-semibold text-zinc-800 py-5 px-6 inset-shadow-[0_6px_0_rgb(243,244,246)] border-2 border-zinc-600 rounded-xl bg-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",
        "focus-visible:ring-4 focus-visible:ring-blue-400/50 focus-visible:outline-none focus:inset-shadow-white",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
