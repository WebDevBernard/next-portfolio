export type introProps = {
  title: string;
  description: string;
  contactUrl: string;
};

export type CardProps = {
  type: "work" | "other";
  title: string;
  description: string;
  year: string;
  iconUrl: string;
  buttonText?: string;
  websiteUrl?: string;
  gitHubUrl?: string;
};

export type ContactProps = {
  title: string;
  description: string;
};

export const navItems = {
  "https://www.linkedin.com/in/bernard-yang/": {
    src: "./linkedin-outline.svg",
  },
  "https://discord.com/users/695431067448115280": {
    src: "./discord-outline.svg",
  },
  "https://github.com/WebDevBernard": {
    src: "./github-outline.svg",
  },
};

export const introContent: introProps = {
  title: "Welcome to my portfolio website",
  description:
    "I am Bernard Yang, I work in the insurance industry. The site is a collection of projects I've built for work and things that have interested me.",
  contactUrl: "/contact-me",
};

export const cardData: CardProps[] = [
  {
    type: "work",
    title: "Horizon West Insurance Website",
    description:
      "NextJS PayloadCMS Website created using the official PayloadCMS website template.",
    iconUrl: "./payload.svg",
    year: "2025",
    websiteUrl: "https://hwi-website.vercel.app/",
  },
  {
    type: "work",
    title: "ICBC E-Stamp Tool",
    description:
      "A Python Script to automate stamping of ICBC policy documents.",
    iconUrl: "./python.svg",
    year: "2024",
    gitHubUrl: "https://github.com/WebDevBernard/ICBC_E-Stamp_Tool",
  },
  {
    type: "other",
    title: "Mythic+ Run Count",
    description:
      "A graph of character count in World of Warcraft Mythic+ dungeons.",
    iconUrl: "./nodejs.svg",
    year: "2022",
    websiteUrl: "https://mythicplus.vercel.app/",
    gitHubUrl: "https://github.com/WebDevBernard/MythicPlus-RunCount",
  },
];

export const contactContent: ContactProps = {
  title: "Contact Me",
  description:
    "You can reach out to me by either filling out this form or sending an email to mail@bernardyang.com",
};
