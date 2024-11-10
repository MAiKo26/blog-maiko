import { Post } from "contentlayer/generated";

// src/lib/github.ts
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
const REPO_OWNER = "MAiKo26";
const REPO_NAME = "blog-maiko";
const BRANCH = "staging";
const CONTENT_PATH = ".contentlayer/generated/Post";

type GitHubTreeItem = {
  path: string;
  type: string;
  sha: string;
  url: string;
};

async function fetchGitHubApi(endpoint: string) {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      // Add auth token if you need higher rate limits
      // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
    },
    next: { revalidate: 1 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getMainIndex(): Promise<Post[]> {
  const treeResponse = await fetchGitHubApi(
    `/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`,
  );

  const indexFile = treeResponse.tree.filter(
    (item: GitHubTreeItem) =>
      item.path.startsWith(CONTENT_PATH) && item.path.endsWith("_index.json"),
  );

  const posts = await Promise.all(
    indexFile.map(async (file: GitHubTreeItem) => {
      const response = await fetch(
        `${GITHUB_RAW_BASE}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`,
        { next: { revalidate: 3600 } },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${file.path}`);
      }

      const content = await response.json();

      // Convert the object with numeric keys to an array
      const contentArray = Object.values(content);

      return contentArray;
    }),
  );

  // Flatten the array if `indexFile` has multiple entries
  return posts.flat();
}

export async function getMDXBySlug(slug: string): Promise<Post> {
  const posts = await getMainIndex();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  return post;
}
