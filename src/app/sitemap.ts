import { getPostsSitemap } from "@/lib/mdxUtils";
import { MetadataRoute } from "next";

export const BASE_URL = "https://bernardyang.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
    },
    {
      url: BASE_URL + "/contact-me",
    },
  ];
}
