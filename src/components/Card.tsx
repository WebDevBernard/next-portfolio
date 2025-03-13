import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CardProps } from "@/lib/data";
import renameAltTags from "@/lib/renameAltTags";
import { changeBgColor } from "@/lib/changeBgColor";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
type CardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, year, iconUrl, websiteUrl, gitHubUrl }, ref) => {
    const bgColor = changeBgColor(year);
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
        <div>
          <span className="flex items-center gap-4 mb-2">
            {iconUrl && (
              <Image
                src={iconUrl}
                alt={renameAltTags(iconUrl)}
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
              <Button
                asChild
                variant="fontawesome"
                size={"lg"}
                className={cn(
                  "bg-slate-200/40 hover:bg-slate-300/10 hero-bg flex-1 py-2"
                )}
              >
                <a
                  className="flex flex-row items-center gap-2"
                  href={websiteUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Globe className="w-5 h-5" />
                  View Website
                </a>
              </Button>
            )}
            {gitHubUrl && (
              <Button
                asChild
                variant="fontawesome"
                size={"lg"}
                className={cn(
                  "bg-purple-300 hover:bg-purple-400/90 flex-1 py-2"
                )}
              >
                <a
                  className="flex flex-row items-center gap-2"
                  href={gitHubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    className="select-none"
                    src="./github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  View Github
                </a>
              </Button>
            )}
          </div>
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
