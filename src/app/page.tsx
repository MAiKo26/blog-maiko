import { sortPosts, allCoreContent } from "pliny/utils/contentlayer.js";
import { allAnimangas, allTeches, allTvshows } from "contentlayer/generated";
import Main from "./Main";

export default async function Page() {
  const sortedPosts = sortPosts([...allAnimangas, ...allTeches, ...allTvshows]);
  const posts = allCoreContent(sortedPosts);
  return <Main posts={posts} />;
}
