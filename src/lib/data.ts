export const siteDescription =
  "I am Bernard Yang. I work in the insurance industry. This site is a collection of projects I've built for work and things that have interested me.";

export const contactEmail = "bernard@bernardyang.com";

export const baseUrl = "https://bernardyang.com";
// Links to bernardyang.com open in the same tab; all other external URLs open in a new tab.
export const subDomainInNewTab = "bernardyang.com";

// ── Types ──

export interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  interactive?: boolean;
}

export interface CardProps {
  id?: string;
  type: "work" | "other";
  title: string;
  description: string;
  year: string;
  iconUrl: string;
  websiteUrl?: string;
  gitHubUrl?: string;
}

// ── Content ──

export const navItems = {
  "https://www.linkedin.com/in/bernard-yang/": {
    src: "/linkedin-outline.svg",
    label: "LinkedIn",
  },
  "https://github.com/WebDevBernard": {
    src: "/github-outline.svg",
    label: "GitHub",
  },
};

export const introContent = {
  title: "Hi, I'm Bernard",
  description: siteDescription,
};

export const contactContent = {
  title: "Contact Me",
  description: `You can reach out to me by either filling out the form below or sending an email to ${contactEmail}.`,
};

export const emailInfo = {
  from: `Bernard Yang <${contactEmail}>`,
  to: [contactEmail],
};

export const carouselSlides: Slide[] = [
  {
    id: 3,
    title: "Forbidden Burrito",
    description: "Poke that belly!",
    image: "/Bulldog-1.webp",
    interactive: true,
  },
  {
    id: 1,
    title: "Obedient Bulldog",
    description: "Does whatever he's told",
    image: "/Bulldog.webp",
  },
  {
    id: 2,
    title: "Classic Tuna",
    description: "Even cats like Big Tuna",
    image: "/Bulldog-2.webp",
  },
];

export const cardData: CardProps[] = [
  {
    type: "work",
    title: "HWI Website",
    description:
      "Work website I built using Payload CMS and NextJS front-end. Github link to official Payload CMS 3.0 Website Template.",
    iconUrl: "/payload.svg",
    year: "2025–2026",
    websiteUrl: "https://hwi.bernardyang.com/",
    gitHubUrl:
      "https://github.com/payloadcms/payload/tree/main/templates/website",
  },
  {
    type: "work",
    title: "ICBC E-Stamp Tool",
    description:
      "A Python script I made to help insurance brokers stamp and organize ICBC policy documents. Built with PyMuPDF.",
    iconUrl: "/python.svg",
    year: "2024–2026",
    gitHubUrl: "https://github.com/WebDevBernard/ICBC_E-Stamp_Tool",
  },
  {
    type: "other",
    title: "M+ Run Count",
    description:
      "A graph of character count in World of Warcraft Mythic+ dungeons. Built with AWS Lambda/Eventbridge, React and Chart.js.",
    iconUrl: "/nodejs.svg",
    year: "2022",
    websiteUrl: "https://mythicplus.bernardyang.com/",
    gitHubUrl: "https://github.com/WebDevBernard/MythicPlus-RunCount",
  },
];
