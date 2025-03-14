import { getCompiledMDX, getPostFilePaths } from "@/lib/mdxUtils";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  const postFilePaths = await getPostFilePaths();

  return postFilePaths.map((path) => ({
    slug: path.replace(/.mdx?$/, ""),
  }));
};

const getPostData = async (postSlug: string) => {
  try {
    return await getCompiledMDX(postSlug);
  } catch (e) {
    notFound();
  }
};

type PageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { slug } = await params;
    const { frontmatter } = await getCompiledMDX(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: "article",
        url: `/content/${slug}`,
      },
    };
  } catch (e) {
    notFound();
  }
};

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { content, frontmatter } = await getPostData(slug);
  const { title, date, description } = frontmatter;

  return (
    <article className="mx-auto max-w-5xl prose">
      <h1>{title}</h1>
      <p>{new Date(date).toDateString()}</p>
      {content}
    </article>
  );
};

export default BlogPostPage;
