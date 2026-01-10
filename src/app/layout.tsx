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
    images: [{ url: `${baseUrl}/opengraph-image.webp` }],
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
    <html lang="en" className={cn("hero-bg", font.className)}>
      <body className="antialiased mt-8 bg-transparent mx-auto max-w-[96rem]">
        <Scroll /> <Navbar />
        <div className="mx-auto px-4 max-w-5xl">
          <div className="relative">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
