"use client";

import Carousel from "@/components/Carousel";

export default function CarouselSection() {
  return (
    <section
      aria-label="Ghibli Bulldogs"
      className="space-y-6 flex flex-col items-center"
    >
      <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-yellow-300 pb-4">
        Ghibli Bulldogs
      </h2>
      <Carousel />
      <p
        className="text-center relative rounded-2xl p-3 bg-blue-100 border-blue-300 border-2
          w-full max-w-md md:max-w-lg mx-auto
          before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-b-[22px] before:border-b-blue-300
          after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-top-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-b-[20px] after:border-b-blue-100"
      >
        Ghibli-style bulldogs generated in Sora.
      </p>
    </section>
  );
}
