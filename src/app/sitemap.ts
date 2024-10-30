import { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import siteMetadata from "@/content/siteMetadata";
import { DateFilteringHelper } from "@/lib/DateFilteringHelper";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = DateFilteringHelper(allPosts)
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }));

  const routes = ["", "tags", "privacy-policy"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
