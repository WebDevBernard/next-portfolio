"use client";
import { useRef } from "react";

import { Card, CardContainer } from "@/components/Card";
import { introContent, cardData } from "@/lib/data";
import Image from "next/image";
import ButtonLink from "@/components/Button";
import { SideBar } from "@/components/Sidebar";
import Avatar from "@/components/Avatar";
export default function Page() {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const workProjects = cardData
    .filter((card) => card.type === "work")
    .sort((a, b) => Number(b.year) - Number(a.year));
  const otherProjects = cardData
    .filter((card) => card.type === "other")
    .sort((a, b) => Number(b.year) - Number(a.year));

  const { title, description, contactUrl } = introContent;

  return (
    <section className="container">
      <SideBar projectData={cardData} cardRefs={cardRefs} />
      <Avatar />

      <h1>{title}</h1>
      <span>
        <Image src="/hi.svg" alt={"hi"} width={40} height={40} unoptimized />
        <p className="text-center">{description}</p>
      </span>

      <ButtonLink
        src="/autonavi.svg"
        href={contactUrl}
        className="bg-yellow-300 hover:bg-yellow-400/90"
      >
        Contact Me
      </ButtonLink>

      {/* Work Projects */}
      {workProjects && workProjects.length > 0 && <h2>Work Projects</h2>}
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
      {otherProjects && otherProjects.length > 0 && <h2>Other Projects</h2>}
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
    </section>
  );
}
