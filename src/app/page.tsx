import { getMainIndex } from "@/lib/github";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import Main from "./Main";
import { Suspense } from "react";

export default async function Page() {
  const githubPosts = await getMainIndex();
  const sortedPosts = sortPosts(githubPosts);
  const posts = allCoreContent(sortedPosts);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main posts={posts} />
    </Suspense>
  );
}
