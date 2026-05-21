"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type Slide, carouselSlides } from "@/lib/data";
import BulldogBelly from "@/components/BulldogJiggle";

function CarouselCard({
  slide,
  index,
  isSelected,
  carouselRotateY,
  scale,
  onSelect,
}: {
  slide: Slide;
  index: number;
  isSelected: boolean;
  carouselRotateY: number;
  scale: number;
  onSelect: (index: number) => void;
}) {
  const isInteractive = slide.interactive && isSelected;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const tiltRotateX = useTransform(springY, [0, 1], [10, -10]);
  const tiltRotateY = useTransform(springX, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const animateRotateY = isInteractive ? 0 : carouselRotateY;
  const opacity = isSelected ? 1 : 0.6;

  return (
    <motion.div
      onClick={() => onSelect(index)}
      onMouseMove={isSelected && !isInteractive ? handleMouseMove : undefined}
      onMouseLeave={isSelected && !isInteractive ? handleMouseLeave : undefined}
      initial={{ rotateY: 0, scale: 1, opacity: 1 }}
      animate={{ rotateY: animateRotateY, scale, opacity }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{
        rotateX: isSelected && !isInteractive ? tiltRotateX : 0,
        ...(isSelected && !isInteractive ? { rotateY: tiltRotateY } : {}),
        transformPerspective: isInteractive ? "none" : 800,
      }}
      className={`relative ${isInteractive ? "cursor-default" : isSelected ? "cursor-default" : "cursor-pointer"}`}
    >
      {isInteractive ? (
        <BulldogBelly src={slide.image} />
      ) : (
        <img
          src={slide.image}
          alt={slide.title}
          width={500}
          height={336}
          className="w-full h-auto object-cover rounded-2xl select-none"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-white select-none [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
        <h3 className="font-semibold">{slide.title}</h3>
        <p className="text-sm text-zinc-300 ">{slide.description}</p>
      </div>
    </motion.div>
  );
}

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
      if (!emblaApi || index === selectedIndex) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, selectedIndex],
  );

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden mask-gradient py-8 px-4 md:px-0">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex items-center">
          {carouselSlides.map((slide, index) => {
            const isSelected = index === selectedIndex;
            const totalSlides = carouselSlides.length;
            const relativePos =
              (index - selectedIndex + totalSlides) % totalSlides;
            const isLeft = relativePos > totalSlides / 2;
            const carouselRotateY = isSelected ? 0 : isLeft ? 15 : -15;
            const scale = isSelected ? 1 : 0.85;

            return (
              <div
                key={slide.id}
                className="embla__slide shrink-0 w-full md:w-2/3 lg:w-1/2 p-2"
              >
                <div className="mx-auto max-w-125">
                  <CarouselCard
                    slide={slide}
                    index={index}
                    isSelected={isSelected}
                    carouselRotateY={carouselRotateY}
                    scale={scale}
                    onSelect={handleSlideClick}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
