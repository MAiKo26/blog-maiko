// Utility type for GitHub repository contents
export type GitHubTreeItem = {
  path: string;
  type: string;
  sha: string;
  url: string;
  download_url: string | null;
};

// Post interface as specified
export interface Series {
  order: number;
  title: string;
}

export interface Post extends FrontMatter {
  content: string;
}

export interface FrontMatter {
  title: string;
  date: string;
  series: Series;
  tags: string[];
  draft: boolean;
  summary: string;
  images: string[];
  slug: string;
  lastmod?: string;
}
