import { FrontMatter, Post } from "@/interfaces/posts-interface";

export function DateFilteringHelper(post: Post[] | FrontMatter[]) {
  return post.filter((post) => {
    const { date } = post;
    const BlogDate = new Date(date);
    const Today = new Date();
    return BlogDate <= Today;
  });
}
