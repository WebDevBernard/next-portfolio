"use client";

import { contactHeadingRef } from "@/lib/refs";

export function ContactSectionHeading({ title }: { title: string }) {
  return (
    <h2
      ref={(el) => {
        contactHeadingRef.current = el;
      }}
      className="scroll-mt-24 underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-orange-300 pb-4"
    >
      {title}
    </h2>
  );
}
