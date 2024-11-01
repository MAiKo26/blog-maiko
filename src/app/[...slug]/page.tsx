import "@/styles/prism.css";

import PostBanner from "@/components/layouts/PostBanner";
import PostLayout from "@/components/layouts/PostLayout";
import PostSimple from "@/components/layouts/PostSimple";
import { components } from "@/components/MDXComponents";
import siteMetadata from "@/content/siteMetadata";
import type { Post, Authors } from "contentlayer/generated";
import { allPosts, allAuthors } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXLayoutRenderer } from "pliny/mdx-components.js";
import {
  allCoreContent,
  coreContent,
  sortPosts,
} from "pliny/utils/contentlayer.js";
import { DateFilteringHelper } from "@/lib/DateFilteringHelper";

const defaultLayout = "PostLayout";
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

type Params = Promise<{ slug: string[] }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const slugJoined = decodeURI(slug.join("/"));
  const allPostsDateFiltered = DateFilteringHelper(allPosts);
  const post = allPostsDateFiltered.find((p) => p.slug === slugJoined);
  const authorList = post?.authors || ["default"];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === "string" ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes("http") ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  return DateFilteringHelper(allPosts).map((p) => ({
    slug: p.slug.split("/").map((name) => decodeURI(name)),
  }));
};

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const slugJoined = decodeURI(slug.join("/"));
  // Filter out drafts in production
  const sortedCoreContents = DateFilteringHelper(
    allCoreContent(sortPosts(allPosts)),
  );
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slugJoined);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = DateFilteringHelper(allPosts).find(
    (p) => p.slug === slugJoined,
  ) as Post;
  const authorList = post?.authors || ["default"];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd["author"] = authorDetails.map((author) => {
    return {
      "@type": "Person",
      name: author.name,
    };
  });

  const Layout =
    layouts[(post.layout as keyof typeof layouts) || defaultLayout];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
      >
        <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        />
      </Layout>
    </>
  );
}
