import { getPostsSitemap } from "@/lib/mdxUtils";
import { MetadataRoute } from "next";

export const BASE_URL = "https://bernardyang.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsSitemap();

  return [
    {
      url: BASE_URL,
    },
    {
      url: BASE_URL + "/contact-me",
    },
    {
      url: BASE_URL + "/content",
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/content/${post.slug}`,
      lastModified: post.mtime,
    })),
  ];
}
