"use client";
import { useRef, useEffect, useState } from "react";
import { Card, CardContainer } from "@/components/Card";
import { introContent, cardData, contactContent } from "@/lib/data";
import Image from "next/image";
import ButtonLink from "@/components/Button";
import { SideBar } from "@/components/Sidebar";
import { ContactForm } from "@/components/Form/ContactForm";

import Carousel from "@/components/Carousel";
export default function Page() {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contactRef = useRef<HTMLDivElement | null>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const [isContactFormInView, setIsContactFormInView] = useState(false);

  useEffect(() => {
    const currentRef = contactFormRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set to true, never back to false
        if (entry.isIntersecting) {
          setIsContactFormInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const workProjects = cardData
    .filter((card) => card.type === "work")
    .sort((a, b) => Number(b.year) - Number(a.year));
  const otherProjects = cardData
    .filter((card) => card.type === "other")
    .sort((a, b) => Number(b.year) - Number(a.year));
  const { title, description, contactUrl } = introContent;

  const handleContactScroll = () => {
    contactRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="container space-y-6">
      <SideBar
        projectData={cardData}
        cardRefs={cardRefs}
        isContactFormInView={isContactFormInView}
      />
      <h1 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-8 decoration-[#4AE54A]/60">
        {title}
      </h1>

      <Carousel />

      <span
        className="relative bg-teal-100 border-2 border-teal-400 rounded-2xl p-3 
  before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-t-[22px] before:border-t-teal-400
  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-t-[20px] after:border-t-teal-100"
      >
        <Image src="/hi.svg" alt={"hi"} width={40} height={40} unoptimized />
        <p className="">{description}</p>
      </span>
      <ButtonLink
        src="/autonavi.svg"
        href={"/"}
        className="bg-lime-200 hover:bg-lime-300/80"
        onClick={handleContactScroll}
      >
        Contact Me
      </ButtonLink>
      {/* Work Projects */}
      {workProjects && workProjects.length > 0 && (
        <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-8 decoration-purple-300">
          Work Projects
        </h2>
      )}
      <CardContainer>
        {workProjects.map((card, index) => (
          <Card
            key={index}
            {...card}
            ref={(el) => {
              cardRefs.current[card.title] = el;
            }}
          />
        ))}
      </CardContainer>
      {/* Other Projects */}
      {otherProjects && otherProjects.length > 0 && (
        <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-8 decoration-pink-300">
          Other Projects
        </h2>
      )}
      <CardContainer>
        {otherProjects.map((card, index) => (
          <Card
            key={index}
            {...card}
            ref={(el) => {
              cardRefs.current[card.title] = el;
            }}
          />
        ))}
      </CardContainer>
      {/* Contact Section */}
      <div
        ref={contactRef}
        className="flex flex-col items-center justify-center space-y-12"
      >
        <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-8 decoration-orange-300">
          {contactContent.title}
        </h2>
        <p
          className="relative rounded-2xl p-3 bg-yellow-100 border-yellow-400 border-2
  before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-b-[22px] before:border-b-yellow-400
  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-top-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-b-[20px] after:border-b-yellow-100"
        >
          {contactContent.description}
        </p>
        <div
          ref={contactFormRef}
          className="w-full flex flex-col items-center justify-center  space-y-12"
        >
          {isContactFormInView && <ContactForm />}
        </div>
      </div>
    </section>
  );
}
