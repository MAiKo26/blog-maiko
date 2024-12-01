import "@/styles/prism.css";

import PostLayout from "@/components/layouts/PostLayout";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import siteMetadata from "@/constants/siteMetadata";
import { getFrontMatterBySlug } from "@/lib/actions";
import { Metadata } from "next";
import { FrontMatter } from "@/interfaces/posts-interface";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MarkdownSkeleton } from "@/components/skeletons/MarkdownSkeleton";
import PostLayoutSkeleton from "@/components/skeletons/PostLayoutSkeleton";

async function fetchFrontMatter(slug: string): Promise<FrontMatter | null> {
  const frontMatter = await getFrontMatterBySlug(slug);

  return frontMatter;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const { slug } = await params;

  const FrontMatter = await fetchFrontMatter(slug.join("/"));
  if (!FrontMatter) {
    return;
  }

  const publishedAt = new Date(FrontMatter.date).toISOString();
  const modifiedAt = new Date(
    FrontMatter.lastmod || FrontMatter.date,
  ).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (FrontMatter.images) {
    imageList =
      typeof FrontMatter.images === "string"
        ? [FrontMatter.images]
        : FrontMatter.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes("http") ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: FrontMatter.title,
    description: FrontMatter.summary,
    openGraph: {
      title: FrontMatter.title,
      description: FrontMatter.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      images: ogImages,
      authors: siteMetadata.author,
    },
    twitter: {
      card: "summary_large_image",
      title: FrontMatter.title,
      description: FrontMatter.summary,
      images: imageList,
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  const FrontMatter = await fetchFrontMatter(slug.join("/"));

  if (!FrontMatter) {
    notFound();
  }

  return (
    <Suspense fallback={<PostLayoutSkeleton />}>
      <PostLayout FrontMatter={FrontMatter}>
        <article className="prose lg:prose-xl">
          <Suspense fallback={<MarkdownSkeleton />}>
            <MarkdownRenderer slug={slug} />
          </Suspense>
        </article>
      </PostLayout>
    </Suspense>
  );
}
