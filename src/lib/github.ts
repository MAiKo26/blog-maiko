// src/lib/github.ts
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
const REPO_OWNER = "MAiKo26";
const REPO_NAME = "blog-maiko";
const BRANCH = "master";
const CONTENT_PATH = "src/content/posts";

type GitHubTreeItem = {
  path: string;
  type: string;
  sha: string;
  url: string;
};

type BlogPost = {
  title: string;
  date: string;
  slug: string;
  content: string;
  excerpt?: string;
};

async function fetchGitHubApi(endpoint: string) {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      // Add auth token if you need higher rate limits
      // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getAllMDXFiles() {
  // First, get the tree of the content directory
  const treeResponse = await fetchGitHubApi(
    `/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`,
  );

  // Filter for MDX files in the content path
  const mdxFiles = treeResponse.tree.filter(
    (item: GitHubTreeItem) =>
      item.path.startsWith(CONTENT_PATH) && item.path.endsWith(".mdx"),
  );

  // Fetch content for each MDX file
  const posts = await Promise.all(
    mdxFiles.map(async (file: GitHubTreeItem) => {
      const response = await fetch(
        `${GITHUB_RAW_BASE}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`,
        { next: { revalidate: 3600 } },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${file.path}`);
      }

      const content = await response.text();

      // Extract frontmatter with regex for simplicity
      // You might want to use gray-matter here for more robust parsing
      const frontmatterRegex = /---\n([\s\S]*?)\n---/;
      const frontmatterMatch = content.match(frontmatterRegex);
      const frontmatter = frontmatterMatch ? frontmatterMatch[1] : "";

      // Parse frontmatter
      const titleMatch = frontmatter.match(/title:\s*(.*)/);
      const series = frontmatter.match(/series:\s*(.*)/);
      const dateMatch = frontmatter.match(/date:\s*(.*)/);
      const tags = frontmatter.match(/tags:\s*(.*)/);
      const lastmod = frontmatter.match(/lastmod:\s*(.*)/);
      const draft = frontmatter.match(/draft:\s*(.*)/);
      const summary = frontmatter.match(/summary:\s*(.*)/);
      const images = frontmatter.match(/images:\s*(.*)/);
      const authors = frontmatter.match(/authors:\s*(.*)/);
      const layout = frontmatter.match(/layout:\s*(.*)/);
      const bibliography = frontmatter.match(/bibliography:\s*(.*)/);
      const canonicalUrl = frontmatter.match(/canonicalUrl:\s*(.*)/);
      const category = frontmatter.match(/category:\s*(.*)/);

      // Generate slug from file path
      const slug = file.path
        .replace(CONTENT_PATH + "/", "")
        .replace(/\.mdx$/, "")
        .split("/");

      return {
        title: titleMatch ? titleMatch[1].trim() : "Untitled",
        date: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
        slug,
        content: content.replace(frontmatterRegex, "").trim(),
        series: series ? series[1].trim() : null,
        tags: tags ? JSON.parse(tags[1].trim()) : [],
        lastmod: lastmod ? new Date(lastmod[1].trim()).toISOString() : null,
        draft: draft ? draft[1].trim() === "true" : false,
        summary: summary ? summary[1].trim() : "",
        images: images ? JSON.parse(images[1].trim()) : [],
        authors: authors ? JSON.parse(authors[1].trim()) : [],
        layout: layout ? layout[1].trim() : "post",
        bibliography: bibliography ? JSON.parse(bibliography[1].trim()) : [],
        canonicalUrl: canonicalUrl ? canonicalUrl[1].trim() : "",
        category: category ? category[1].trim() : "posts",
      };
    }),
  );

  // Sort posts by date
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getMDXBySlug(slug: string): Promise<BlogPost> {
  const posts = await getAllMDXFiles();
  const post = posts.find((post) => post.slug.join("/") === slug);

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  return post;
}
