"use client";

import { Card, CardContainer } from "@/components/Card";
import { introContent, cardData } from "@/lib/data";
import { Button } from "@/components/Button";

export default function PageContent() {
  const workProjects = cardData
    .filter((card) => card.type === "work")
    .sort(
      (a, b) =>
        Number.parseInt(b.year.slice(-4)) - Number.parseInt(a.year.slice(-4)),
    );
  const otherProjects = cardData
    .filter((card) => card.type === "other")
    .sort(
      (a, b) =>
        Number.parseInt(b.year.slice(-4)) - Number.parseInt(a.year.slice(-4)),
    );
  const { title, description } = introContent;

  return (
    <section className="container space-y-6 mt-8">
      <h1 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-[#4AE54A]/60">
        {title}
      </h1>

      <div
        className="flex space-x-4 relative w-full max-w-md md:max-w-lg mx-auto bg-teal-100 border-2 border-teal-400 rounded-2xl p-3
          before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-t-[22px] before:border-t-teal-400
          after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-t-[20px] after:border-t-teal-100"
      >
        <img src="/hi.svg" alt="hi" width={40} height={40} />
        <p>{description}</p>
      </div>

      <Button
        onClick={() =>
          document.getElementById("contact-heading")?.scrollIntoView({ behavior: "smooth" })
        }
        className="bg-lime-200 hover:bg-lime-300/80"
      >
        <img
          className="select-none"
          alt="autonavi"
          src="/autonavi.svg"
          height={20}
          width={20}
        />
        Contact Me
      </Button>

      {workProjects.length > 0 && (
        <section aria-label="Work Projects" className="space-y-6">
          <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-purple-300 pb-4">
            Work Projects
          </h2>
          <CardContainer>
            {workProjects.map((card, index) => (
              <Card key={index} {...card} id={card.title} />
            ))}
          </CardContainer>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section aria-label="Other Projects" className="space-y-6">
          <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-pink-300 pb-4">
            Other Projects
          </h2>
          <CardContainer>
            {otherProjects.map((card, index) => (
              <Card key={index} {...card} id={card.title} />
            ))}
          </CardContainer>
        </section>
      )}
    </section>
  );
}
