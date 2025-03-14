import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Nav";
import { Reddit_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { Scroll } from "@/components/Scroll";
import { cn } from "@/lib/utils";
import { baseUrl, homeMetaData } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: homeMetaData.title.default,
    template: homeMetaData.title.template,
  },
  description: homeMetaData.description,
  openGraph: {
    title: homeMetaData.openGraph.title,
    description: homeMetaData.openGraph.description,
    url: baseUrl,
    siteName: homeMetaData.openGraph.siteName,
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
        <Scroll />
        <Navbar /> <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
