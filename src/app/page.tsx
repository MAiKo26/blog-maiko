import { sortPosts, allCoreContent } from "pliny/utils/contentlayer.js";
import { allPosts } from "contentlayer/generated";
import Main from "./Main";

export default async function Page() {
  const sortedPosts = sortPosts(allPosts);
  const posts = allCoreContent(sortedPosts);
  return <Main posts={posts} />;
}
