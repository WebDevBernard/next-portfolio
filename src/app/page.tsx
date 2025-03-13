"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContainer } from "@/components/Card";
import { introContent, cardData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { SideBar } from "@/components/Sidebar";
import Avatar from "@/components/Avatar";
export default function Page() {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const workProjects = cardData.filter((card) => card.type === "work");
  const otherProjects = cardData.filter((card) => card.type === "other");

  const { title, description, contactUrl } = introContent;

  return (
    <section className="flex flex-col items-center justify-center max-w-5xl lg:mx-auto gap-y-6 ">
      <SideBar projectData={cardData} cardRefs={cardRefs} />
      <Avatar />
      <h1 className="text-4xl font-semibold text-center tracking-tighter text-zinc-800">
        {title}
      </h1>
      <span className="flex flex-row items-start gap-2">
        <Image src="./hi.svg" alt={"hi"} width={40} height={40} unoptimized />
        <p className="max-w-xl flex text-center text-zinc-700 ">
          {description}
        </p>
      </span>
      <Button
        asChild
        className="bg-yellow-300 hover:bg-yellow-400/90"
        variant={"fontawesome"}
        size={"lg"}
      >
        <Link href={contactUrl}>
          <Image
            src="./autonavi.svg"
            alt={"autonavi"}
            width={40}
            height={40}
            className="text-zinc-700"
            unoptimized
          />
          Contact Me
        </Link>
      </Button>
      {/* Work Projects */}
      {workProjects && workProjects.length > 0 && (
        <h2 className="text-4xl font-semibold tracking-tighter text-zinc-800">
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
        <h2 className="text-4xl font-semibold tracking-tighter text-zinc-800">
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
    </section>
  );
}
