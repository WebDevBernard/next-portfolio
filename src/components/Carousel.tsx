"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Obedient Bulldog",
    description: "Does whatever he's told",
    image: "/Bulldog.webp",
  },
  {
    id: 2,
    title: "Classic Tuna",
    description: "Even cats like Big Tuna",
    image: "/Bulldog-2.webp",
  },
  {
    id: 3,
    title: "Forbidden Burrito",
    description: "Real bulldog also has belly",
    image: "/Bulldog-1.webp",
  },
];

const Carousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleSlideClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      if (index === selectedIndex) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi, selectedIndex]
  );

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden mask-gradient">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide flex-shrink-0 w-full md:w-2/3 lg:w-1/2 p-2"
            >
              <div
                onClick={() => handleSlideClick(index)}
                className="relative rounded-2xl border-4 border-white overflow-hidden cursor-pointer mx-auto max-w-[500px]"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={500}
                  height={336}
                  className="w-full h-auto object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-white drop-shadow-lg">
                  <h3 className="font-semibold">{slide.title}</h3>
                  <p className="text-sm text-zinc-300 ">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
