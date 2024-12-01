import { getAllPosts } from "@/lib/actions";
import Main from "./Main";
import { Suspense, use } from "react";
import { BlogPostsSkeleton } from "@/components/skeletons/BlogPostsSkeleton";

export default async function Page() {
  const postsPromise = getAllPosts(); // Start fetching posts here

  return (
    <Suspense fallback={<BlogPostsSkeleton />}>
      {/* Use postsPromise here */}
      <PostsWrapper postsPromise={postsPromise} />
    </Suspense>
  );
}

// Wrapper component to "suspend" rendering on postsPromise
async function PostsWrapper({ postsPromise }: { postsPromise: Promise<any> }) {
  const posts = await postsPromise; // React will suspend rendering until this resolves
  return <Main posts={posts} />;
}
