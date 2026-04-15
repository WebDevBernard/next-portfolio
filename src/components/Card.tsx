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

function Card({
  id,
  title,
  description,
  year,
  iconUrl,
  websiteUrl,
  gitHubUrl,
}: CardProps) {
  const bgColor = colorMap[String(year)];
  return (
    <div
      id={id} // ✅
      className="card col-span-2 max-w-lg rounded-lg p-6 space-y-6 flex flex-col justify-between relative min-h-full"
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="absolute right-6 -top-3 rounded-lg px-4.5"
      >
        {year}
      </div>
      <div className="space-y-4">
        <span className="flex items-center space-x-2">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt={iconUrl.replace(/^.*\/([^/]+)\.[^/.]+$/, "$1")}
              width={20}
              height={20}
              unoptimized
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
            className="bg-slate-200/40 hover:bg-slate-300/10"
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
    </div>
  );
}

function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 justify-center items-center gap-y-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { Card, CardContainer };
