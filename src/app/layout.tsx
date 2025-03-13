import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Nav";
import { Reddit_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { cn } from "@/lib/utils";
import { baseUrl } from "./baseUrl";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Portfolio | Bernard Yang",
    template: "%s | Bernard Yang",
  },
  description:
    "I am Bernard Yang, I work in the insurance industry. The site is a collection of projects I've built for work and things that have interested me.",
  openGraph: {
    title: "Bernard Yang Portfolio",
    description:
      "I am Bernard Yang, I work in the insurance industry. The site is a collection of projects I've built for work and things that have interested me.",
    url: baseUrl,
    siteName: "Bernard Yang Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: `${baseUrl}/opengraph-image.png` }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const font = Reddit_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-indigo-900/10 hero-bg-check lg:mx-auto",
        font.className
      )}
    >
      <body className="antialiased mx-4 mt-8 bg-transparent">
        <ScrollToTop />
        <Navbar /> <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
