"use client";
import { useRef } from "react";
import { Card, CardContainer } from "@/components/Card";
import { introContent, cardData, contactContent } from "@/lib/data";
import Image from "next/image";
import ButtonLink from "@/components/Button";
import { SideBar } from "@/components/Sidebar";
import { ContactForm } from "@/components/Form/ContactForm";
import Avatar from "@/components/Avatar";
export default function Page() {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contactRef = useRef<HTMLDivElement | null>(null);

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
      <SideBar projectData={cardData} cardRefs={cardRefs} />
      <h1 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-8 decoration-[#4AE54A]/60">
        {title}
      </h1>
      <div>
        <Avatar />
        <p className="flex justify-end px-2 pt-1 text-xs">
          Picture of an AI Generated Bag of Potatoes
        </p>
      </div>

      <span className="bg-white/60 rounded-2xl p-3">
        <Image src="/hi.svg" alt={"hi"} width={40} height={40} unoptimized />
        <p className="">{description}</p>
      </span>
      <ButtonLink
        src="/autonavi.svg"
        href={contactUrl}
        className="bg-stone-200 hover:bg-stone-300/80"
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

        <p className=" bg-white/60 rounded-2xl p-3">
          {contactContent.description}
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
