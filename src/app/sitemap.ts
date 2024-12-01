import siteMetadata from "@/constants/siteMetadata";
import { DateFilteringHelper } from "@/lib/DateFilteringHelper";
import { getAllPosts } from "@/lib/actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = DateFilteringHelper(posts)
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.slug}`,
      lastModified: post.lastmod || post.date,
    }));

  const routes = ["", "tags", "privacy-policy"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
