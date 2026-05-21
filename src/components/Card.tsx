"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CardProps } from "@/lib/data";
import ButtonLink from "@/components/ui/Button";

type CardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const colorMap: Record<string, string> = {
  "2022": "#bef264",
  "2023": "#fde047",
  "2024": "#fdba74",
  "2025": "#fca5a5",
  "2026": "#6ee7b7",
  "2027": "#7dd3fc",
  "2028": "#a5b4fc",
  "2029": "#c4b5fd",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 8 },
  },
};

function Card({
  id,
  title,
  description,
  year,
  iconUrl,
  websiteUrl,
  gitHubUrl,
}: CardProps) {
  const parts = String(year).split("–");
  const start = Number.parseInt(parts[0]);
  const end = Number.parseInt(parts[1] ?? parts[0]);
  const years = Array.from({ length: end - start + 1 }, (_, i) => String(start + i));
  return (
    <motion.div
      id={id}
      variants={cardVariants}
      className="card col-span-2 max-w-lg rounded-lg p-6 space-y-6 flex flex-col justify-between relative min-h-full"
    >
      <div className="absolute right-6 -top-3 flex items-center gap-1.5">
        {years.map((y) => (
          <span
            key={y}
            style={{ backgroundColor: colorMap[y] }}
            className="rounded-lg px-2.5 py-0.5 text-sm"
          >
            {y}
          </span>
        ))}
      </div>
      <div className="space-y-4">
        <span className="flex items-center gap-2">
          {iconUrl && (
            <img
              src={iconUrl}
              alt=""
              width={20}
              height={20}
            />
          )}
          <h4>{title}</h4>
        </span>
        <p>{description}</p>
      </div>
      <div
        className={cn(
          "flex flex-col gap-4",
          websiteUrl && gitHubUrl && "flex-row flex-wrap",
        )}
      >
        {websiteUrl && (
          <ButtonLink
            src="/globe.svg"
            href={websiteUrl}
            className="bg-slate-200/40 hover:bg-slate-300/50"
          >
            View Website
          </ButtonLink>
        )}
        {gitHubUrl && (
          <ButtonLink
            src="/github.svg"
            href={gitHubUrl}
            className="bg-purple-200 hover:bg-purple-300/80"
          >
            View Github
          </ButtonLink>
        )}
      </div>
    </motion.div>
  );
}

function CardContainer({ children, className }: CardContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "grid grid-cols-2 justify-center justify-items-center items-center gap-y-12",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export { Card, CardContainer };
