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
export const githubAvatar =
  "https://avatars.githubusercontent.com/u/72034695?v=4";
export const navItems = {
  "/": {
    src: "/home.svg",
  },
  "contact-me": {
    src: "/autonavi.svg",
  },
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
      "Work website I built using Payload headless CMS and NextJS front-end. Created using the official PayloadCMS website template.  This project integrates Cloudflare R2, Cloudflare Turnstile, Resend API, React Hook Form + Zod, PostgreSQL, and Google Maps Embed API.",
    iconUrl: "/payload.svg",
    year: "2025",
    websiteUrl: "https://hwi-website.vercel.app/",
  },
  {
    type: "work",
    title: "ICBC E-Stamp Tool",
    description:
      "A Python script I made to help insurance brokers stamp ICBC policy documents.  With one click, it can generate a 'stamped' customer copy pdf with the appropriate agency number and transaction date.  View Github to learn how to create the exe file.",
    iconUrl: "/python.svg",
    year: "2024",
    gitHubUrl: "https://github.com/WebDevBernard/ICBC_E-Stamp_Tool",
  },
  {
    type: "other",
    title: "Mythic+ Run Count",
    description:
      "A graph of character count in World of Warcraft Mythic+ dungeons.  Uses AWS Lambda and Eventbridge to automate an API call and display data using React and Chart.js.  This a data anaylsis project that is no longer active.  You can view Github to see how the API calls worked.",
    iconUrl: "/nodejs.svg",
    year: "2022",
    websiteUrl: "https://mythicplus.bernardyang.com/",
    gitHubUrl: "https://github.com/WebDevBernard/MythicPlus-RunCount",
  },
  {
    type: "other",
    title: "React Memory Game",
    description:
      "This is a Net Ninja tutorial I remade and improved with TypeScript, a React Custom Hook, score keeping with local storage, responsive design, and CSS animations.  Even though it is a tutorial, I'm putting it here since it is a good practice project to learn React.",
    iconUrl: "/nextjs.svg",
    year: "2025",
    websiteUrl: "https://game.bernardyang.com/",
    gitHubUrl: "https://github.com/WebDevBernard/react-game-ts",
  },
];
