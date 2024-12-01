import { getPostBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  slug: string[];
}

export async function MarkdownRenderer({ slug }: MarkdownRendererProps) {
  const post = await getPostBySlug(slug.join("/"));

  if (!post) {
    return notFound();
  }

  return (
    <ReactMarkdown
      components={{
        // Optional: Add custom component rendering if needed
        img: ({ node, ...props }) => (
          <img
            {...props}
            className="mx-auto max-w-full rounded-lg shadow-md"
            alt={props.alt || "Blog post image"}
          />
        ),
      }}
      children={post.content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
}
