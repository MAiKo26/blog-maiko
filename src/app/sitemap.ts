import { MetadataRoute } from "next";
import { allAnimangas, allTeches, allTvshows } from "contentlayer/generated";
import siteMetadata from "@/data/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = [...allAnimangas, ...allTeches, ...allTvshows]
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }));

  const routes = ["", "blog", "projects", "tags"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
