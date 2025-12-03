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

export const baseUrl: string = "https://bernardyang.com";
// By default all https opens on new tab except for subdomains. You can still make subdomains open in new tab by putting a "/" at the end of the href
export const subDomainInNewTab = "bernardyang.com";
export const githubAvatar = "https://avatars.githubusercontent.com/u/72034695?v=4";
export const navItems = {
  "https://www.linkedin.com/in/bernard-yang/": {
    src: "/linkedin-outline.svg",
  },
  "https://github.com/WebDevBernard": {
    src: "/github-outline.svg",
  },
};

export const introContent = {
  title: "Welcome to my portfolio website",
  description:
    "I am Bernard Yang, I work in the insurance industry. This site is a collection of projects I've built for work and things that have interested me.",
  contactUrl: "/contact-me",
};

export const homeMetaData = {
  title: {
    default: "Portfolio | Bernard Yang",
    template: "%s | Bernard Yang",
  },
  description:
    "I am Bernard Yang, I work in the insurance industry. This site is a collection of projects I've built for work and things that have interested me.",
  openGraph: {
    title: "Bernard Yang Portfolio",
    description:
      "I am Bernard Yang, I work in the insurance industry. This site is a collection of projects I've built for work and things that have interested me.",
    url: baseUrl,
    siteName: "Bernard Yang Portfolio",
  },
};

export const contactContent = {
  title: "Contact Me",
  description:
    "You can reach out to me by either filling out this form or sending an email to mail@bernardyang.com",
};

export const contactMeMeta = {
  title: "Contact Me",
  description:
    "You can reach out to me by sending an email to mail@bernardyang.com",
};

export const emailInfo = {
  from: "Bernard Yang <mail@bernardyang.com>",
  to: ["mail@bernardyang.com"],
};

export const cardData: CardProps[] = [
  {
    type: "work",
    title: "Horizon West Insurance Website",
    description:
      "Work website I built using Payload CMS and NextJS front-end.  Github link to official Payload CMS 3.0 Website Template.",
    iconUrl: "/payload.svg",
    year: "2025",
    websiteUrl: "https://hwi.bernardyang.com/",
    gitHubUrl:
      "https://github.com/payloadcms/payload/tree/main/templates/website",
  },
  {
    type: "work",
    title: "ICBC E-Stamp Tool",
    description:
      "A Python script I made to help insurance brokers stamp ICBC policy documents.  Built with PyMuPDF.",
    iconUrl: "/python.svg",
    year: "2024",
    gitHubUrl: "https://github.com/WebDevBernard/ICBC_E-Stamp_Tool",
  },
  {
    type: "other",
    title: "Mythic+ Run Count",
    description:
      "A graph of character count in World of Warcraft Mythic+ dungeons.  Built with AWS Lambda/Eventbridge, React and Chart.js.",
    iconUrl: "/nodejs.svg",
    year: "2022",
    websiteUrl: "https://mythicplus.bernardyang.com/",
    gitHubUrl: "https://github.com/WebDevBernard/MythicPlus-RunCount",
  },
];
