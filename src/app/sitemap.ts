import { MetadataRoute } from "next";
import { baseUrl } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: baseUrl,
    },
    {
      url: baseUrl + "/contact-me",
    },
  ];
}
