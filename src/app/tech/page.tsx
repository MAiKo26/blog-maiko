import ListLayout from "@/components/layouts/ListLayoutWithTags";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import { allTeches } from "contentlayer/generated";
import { genPageMetadata } from "@/app/seo";
import tagData from "@/tags/tag-data-tech.json";
const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: "Blog" });

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allTeches));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      tagData={tagData}
    />
  );
}
