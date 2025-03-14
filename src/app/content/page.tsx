import { getLatestPostSummaries } from "@/lib/mdxUtils";
import Link from "next/link";

const BlogIndexPage = async () => {
  const posts = await getLatestPostSummaries();

  return (
    <div className="prose mx-auto max-w-5xl">
      <h1>Blogs</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/content/${post.slug}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>{new Date(post.date).toDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogIndexPage;
