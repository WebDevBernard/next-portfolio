"use client";

import { Card, CardContainer } from "@/components/Card";
import { cardData, type CardProps } from "@/lib/data";

export default function ProjectCards({ type }: { type: CardProps["type"] }) {
  const projects = cardData
    .filter((card) => card.type === type)
    .sort(
      (a, b) =>
        Number.parseInt(b.year.slice(-4)) - Number.parseInt(a.year.slice(-4)),
    );

  if (projects.length === 0) return null;

  return (
    <CardContainer>
      {projects.map((card, index) => (
        <Card key={index} {...card} id={card.title} />
      ))}
    </CardContainer>
  );
}
