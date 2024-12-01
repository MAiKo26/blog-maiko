import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { slug } from "github-slugger";
import siteMetadata from "../data/siteMetadata.js";

const outputFolder = process.env.EXPORT ? "out" : "public";

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/${post.category}/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/${post.category}/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`;

const generateRss = (config, posts, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join("")}
    </channel>
  </rss>
`;

async function generateRSS(config, allBlogs, page = "feed.xml") {
  const publishPosts = allBlogs.filter((post) => post.draft !== true);
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts));
    writeFileSync(`./${outputFolder}/${page}`, rss);
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) =>
        post.tags.map((t) => slug(t)).includes(tag),
      );
      const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`);
      const rssPath = path.join(outputFolder, "tags", tag);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, page), rss);
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, allPosts);
  console.log("RSS feed generated...");
};
export default rss;
