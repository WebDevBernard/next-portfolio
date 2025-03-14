import fsp from "fs/promises";
import path from "path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/Code";

export type PostsFrontmatter = {
  title: string;
  description: string;
  date: string;
  image: { url: string; width: number; height: number };
};

const POSTS_PATH = path.join(process.cwd(), "src/content");

export const getPostFilePaths = cache(async () => {
  const dirFiles = await fsp.readdir(POSTS_PATH);

  // Only include md(x) files
  return dirFiles.filter((filepath) => /.mdx?$/.test(filepath));
});

export const getCompiledMDX = cache(async (postSlug: string) => {
  const postFilePath = path.join(POSTS_PATH, `${postSlug}.mdx`);
  const source = await fsp.readFile(postFilePath);
  return compileMDX<PostsFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: { Button, Code },
  });
});

export const getLatestPostSummaries = cache(async () => {
  const filePaths = await getPostFilePaths();
  const posts = await Promise.all(
    filePaths.map(async (filepath) => {
      const slug = filepath.replace(/.mdx?$/, "");
      return { slug, ...(await getCompiledMDX(slug)) };
    })
  );
  posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return posts.map((post) => ({ slug: post.slug, ...post.frontmatter }));
});

export const getPostsSitemap = cache(async () => {
  const filePaths = await getPostFilePaths();
  return await Promise.all(
    filePaths.map(async (filepath) => {
      const slug = filepath.replace(/.mdx?$/, "");
      return { slug, ...(await fsp.stat(path.join(POSTS_PATH, filepath))) };
    })
  );
});
