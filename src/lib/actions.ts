import {
  FrontMatter,
  GitHubTreeItem,
  Post,
} from "@/interfaces/posts-interface";
import matter from "gray-matter";

async function fetchBaseUrls(): Promise<string[]> {
  const url =
    "https://api.github.com/repos/MAiKo26/blog-maiko-content/contents/posts";
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      // Add caching to reduce unnecessary fetches
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
  const baseUrls: GitHubTreeItem[] = await response.json();

  return baseUrls.map((item) => item.url);
}

async function fetchFromGitHub(url: string): Promise<GitHubTreeItem[]> {
  console.log(`Fetching from ${url}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      // Add caching to reduce unnecessary fetches
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });

  if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
  return response.json();
}

async function fetchFrontMatter(fileUrl: string): Promise<FrontMatter | null> {
  try {
    const response = await fetch(fileUrl);
    const fileData = await response.text();

    // Use gray-matter to extract only the front matter
    const { data: frontmatter } = matter(fileData);

    const slug = fileUrl
      .replace(
        "https://raw.githubusercontent.com/MAiKo26/blog-maiko-content/main/posts/",
        "",
      )
      .replace(".mdx", "");

    if (!frontmatter) {
      return null;
    }

    return {
      title: frontmatter.title,
      date: frontmatter.date,
      series: frontmatter.series,
      tags: frontmatter.tags,
      draft: frontmatter.draft,
      summary: frontmatter.summary,
      images: frontmatter.images,
      slug,
    };
  } catch (error) {
    console.error("Error parsing front matter:", { fileUrl, error });
    return null;
  }
}

// Existing fetchPostContent function remains the same
async function fetchPostContent(slug: string): Promise<Post | null> {
  try {
    // Construct the full file URL based on the slug
    const fileUrl = `https://raw.githubusercontent.com/MAiKo26/blog-maiko-content/main/posts/${slug}.mdx`;

    const response = await fetch(fileUrl);
    const fileData = (await response.text()).replaceAll(
      "../../assets",
      "https://raw.githubusercontent.com/MAiKo26/blog-maiko-content/main/assets",
    );

    const { data: frontmatter, content } = matter(fileData);

    return {
      title: frontmatter.title || "",
      date: frontmatter.date || "",
      series: frontmatter.series || { order: 0, title: "" },
      tags: frontmatter.tags || [],
      draft: frontmatter.draft || false,
      summary: frontmatter.summary || "",
      images: frontmatter.images || [],
      slug,
      content,
    };
  } catch (error) {
    console.error("Error parsing post content:", { slug, error });
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    // Reuse getAllFrontMatters and fetch full content only for needed posts
    const frontMatters = await getAllFrontMatters();

    // Fetch full content for each front matter
    const posts = await Promise.all(
      frontMatters.map(async (frontMatter) => {
        const fullPost = await fetchPostContent(frontMatter.slug);
        return fullPost;
      }),
    );

    return posts.filter((post): post is Post => post !== null);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

export async function getAllFrontMatters(): Promise<FrontMatter[]> {
  try {
    const baseUrls = await fetchBaseUrls();
    const allFiles = (await Promise.all(baseUrls.map(fetchFromGitHub))).flat();

    // Filter only MDX files
    const mdxFiles = allFiles.filter((file) =>
      file?.download_url?.endsWith(".mdx"),
    );

    // Fetch front matter for each file concurrently
    const frontMatters = await Promise.all(
      mdxFiles.map((file) =>
        file.download_url ? fetchFrontMatter(file.download_url) : null,
      ),
    );

    // Filter out null results and sort by date
    return frontMatters
      .filter((matter): matter is FrontMatter => matter !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  } catch (error) {
    console.error("Error fetching front matters:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return fetchPostContent(slug);
}

export async function getFrontMatterBySlug(
  slug: string,
): Promise<FrontMatter | null> {
  return fetchFrontMatter(
    `https://raw.githubusercontent.com/MAiKo26/blog-maiko-content/main/posts/${slug}.mdx`,
  );
}
