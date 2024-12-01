import { slug } from "github-slugger";
import siteMetadata from "@/constants/siteMetadata";
import ListLayout from "@/components/layouts/ListLayoutWithTags";
import { genPageMetadata } from "@/app/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/actions";
import { countingTags } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { tag } = await params;
  const tagDecoded = decodeURI(tag);
  return genPageMetadata({
    title: tagDecoded,
    description: `${siteMetadata.title} ${tagDecoded} tagged content`,
    alternates: {
      canonical: "./",
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/tags/${tagDecoded}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagData = countingTags(await getAllPosts());
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }));
  return paths;
};
type Params = Promise<{ tag: string }>;

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const tagDecoded = decodeURI(tag);
  // Capitalize first letter and convert space to dash
  const title =
    tagDecoded[0].toUpperCase() + tagDecoded.split(" ").join("-").slice(1);
  const allPosts = await getAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.tags && post.tags.map((t) => slug(t)).includes(tagDecoded),
  );

  if (filteredPosts.length === 0) {
    return notFound();
  }
  return <ListLayout posts={filteredPosts} title={title} />;
}
