"use client";

import { contactContent } from "@/lib/data";
import { ContactForm } from "@/components/Form/ContactForm";

export default function ContactSection() {
  return (
    <section
      aria-label="Contact"
      className="flex flex-col items-center justify-center space-y-12 relative w-full max-w-md md:max-w-lg mx-auto"
    >
      <h2
        id="contact-heading"
        className="scroll-mt-24 underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-orange-300 pb-4"
      >
        {contactContent.title}
      </h2>
      <p
        className="relative rounded-2xl p-3 bg-yellow-100 border-yellow-400 border-2
          before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-b-[22px] before:border-b-yellow-400
          after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-top-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-b-[20px] after:border-b-yellow-100"
      >
        {contactContent.description}
      </p>
      <ContactForm />
    </section>
  );
}
