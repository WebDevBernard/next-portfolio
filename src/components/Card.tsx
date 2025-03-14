import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CardProps } from "@/lib/data";
import ButtonLink from "./Button";

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

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, year, iconUrl, websiteUrl, gitHubUrl }, ref) => {
    const bgColor = colorMap[String(year)];
    return (
      <div
        ref={ref}
        className={cn(
          "col-span-2 lg:col-span-1 rounded-lg p-6 flex flex-col justify-between shadow-[0_6px_0_rgb(63,63,70)] border-2 border-zinc-700 bg-slate-50 relative max-w-lg"
        )}
      >
        <div
          style={{ backgroundColor: bgColor }}
          className="absolute right-6 -top-3 rounded-lg px-4.5"
        >
          {year}
        </div>
        <span className="flex items-center gap-4 mb-2">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt={iconUrl.replace(/^.*\/([^/]+)\.[^/.]+$/, "$1")}
              width={20}
              height={20}
              unoptimized
            />
          )}
          <h4 className="text-lg tracking-tighter text-zinc-800">{title}</h4>
        </span>
        <p className="mb-4 max-w-xl flex text-zinc-700">{description}</p>
        <div
          className={cn(
            "flex flex-col gap-4",
            websiteUrl && gitHubUrl && "flex-row flex-wrap"
          )}
        >
          {websiteUrl && (
            <ButtonLink
              src="/globe.svg"
              href={websiteUrl}
              className="bg-slate-200/40 hover:bg-slate-300/10 hero-bg"
            >
              View Website
            </ButtonLink>
          )}
          {gitHubUrl && (
            <ButtonLink
              src="/github.svg"
              href={gitHubUrl}
              className="bg-purple-300 hover:bg-purple-400/90"
            >
              View Github
            </ButtonLink>
          )}
        </div>
      </div>
    );
  }
);

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 justify-center items-center gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";
export { Card, CardContainer };
