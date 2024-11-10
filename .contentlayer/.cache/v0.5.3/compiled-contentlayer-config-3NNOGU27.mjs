var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/content/siteMetadata.js
var require_siteMetadata = __commonJS({
  "src/content/siteMetadata.js"(exports, module) {
    "use strict";
    var siteMetadata2 = {
      title: "maiko26 Blog",
      author: "Mohamed Aziz Karoui",
      language: "en-us",
      theme: "system",
      // system, dark or light
      siteUrl: "https://blog.maiko26.tn",
      siteRepo: "https://github.com/maiko26/blog-maiko",
      siteLogo: `${process.env.BASE_PATH || ""}/images/logo.png`,
      socialBanner: `${process.env.BASE_PATH || ""}/images/twitter-card.webp`,
      email: "contact.mohamedazizkaroui@gmail.com",
      github: "https://github.com/maiko26",
      x: "https://twitter.com/maiko26_",
      youtube: "https://youtube.com/@maiko26-dev",
      linkedin: "https://www.linkedin.com/in/mohamed-aziz-karoui",
      locale: "en-US",
      // set to true if you want a navbar fixed to the top
      stickyNav: false,
      analytics: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
        // umamiAnalytics: {
        // We use an env variable for this site to avoid other users cloning our analytics ID
        // umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
        // You may also need to overwrite the script if you're storing data in the US - ex:
        // src: 'https://us.umami.is/script.js'
        // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
        // },
        // plausibleAnalytics: {
        //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
        // If you are hosting your own Plausible.
        //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
        // },
        // simpleAnalytics: {},
        // posthogAnalytics: {
        //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
        // },
        googleAnalytics: {
          googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }
      },
      newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
        // Please add your .env file and modify it according to your selection
        provider: "buttondown"
      },
      // comments: {
      //   // If you want to use an analytics provider you have to add it to the
      //   // content security policy in the `next.config.js` file.
      //   // Select a provider and use the environment variables associated to it
      //   // https://vercel.com/docs/environment-variables
      //   provider: "giscus", // supported providers: giscus, utterances, disqus
      //   giscusConfig: {
      //     // Visit the link below, and follow the steps in the 'configuration' section
      //     // https://giscus.app/
      //     repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      //     repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      //     category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      //     categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      //     mapping: "pathname", // supported options: pathname, url, title
      //     reactions: "1", // Emoji reactions: 1 = enable / 0 = disable
      //     // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      //     metadata: "0",
      //     // theme example: light, dark, dark_dimmed, dark_high_contrast
      //     // transparent_dark, preferred_color_scheme, custom
      //     theme: "light",
      //     // theme when dark mode
      //     darkTheme: "transparent_dark",
      //     // If the theme option above is set to 'custom`
      //     // please provide a link below to your custom theme css file.
      //     // example: https://giscus.app/themes/custom_example.css
      //     themeURL: "",
      //     // This corresponds to the `data-lang="en"` in giscus's configurations
      //     lang: "en",
      //   },
      // },
      search: {
        provider: "kbar",
        // kbar or algolia
        kbarConfig: {
          searchDocumentsPath: `${process.env.BASE_PATH || ""}/search.json`
          // path to load documents to search
        }
        // provider: 'algolia',
        // algoliaConfig: {
        //   // The application ID provided by Algolia
        //   appId: 'R2IYF7ETH7',
        //   // Public API key: it is safe to commit it
        //   apiKey: '599cec31baffa4868cae4e79f180729b',
        //   indexName: 'docsearch',
        // },
      }
    };
    module.exports = siteMetadata2;
  }
});

// contentlayer.config.ts
var import_siteMetadata = __toESM(require_siteMetadata());
import {
  defineDocumentType,
  makeSource,
  defineNestedType
} from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import { slug } from "github-slugger";
import path from "path";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkAlert } from "remark-github-blockquote-alert";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings
} from "pliny/mdx-plugins/index.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";

// src/lib/DateFilteringHelper.ts
function DateFilteringHelper(post) {
  return post.filter((post2) => {
    const { date } = post2;
    const BlogDate = new Date(date);
    const Today = /* @__PURE__ */ new Date();
    return BlogDate <= Today;
  });
}

// contentlayer.config.ts
var root = process.cwd();
var isProduction = process.env.NODE_ENV === "production";
var icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "json", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
function createTagCount(allItems) {
  const tagCount = {};
  allItems.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync(`./src/tags/tag-data.json`, JSON.stringify(tagCount));
}
function createSearchIndex(allItems) {
  if (import_siteMetadata.default?.search?.provider === "kbar" && import_siteMetadata.default.search.kbarConfig.searchDocumentsPath) {
    writeFileSync(
      `public/${path.basename(import_siteMetadata.default.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(
        allCoreContent(sortPosts(allItems)).map((item) => ({
          ...item,
          path: item.path.replace(/^posts\//, "")
        }))
      )
    );
  }
}
var Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      required: true
    },
    order: {
      type: "number",
      required: true
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    series: { type: "nested", of: Series },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" },
    category: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : import_siteMetadata.default.socialBanner,
        url: `${import_siteMetadata.default.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" },
    category: { default: "authors", type: "string" }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["content-header"]
          },
          content: icon
        }
      ],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "src/data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    const { allPosts } = await importData();
    createTagCount(DateFilteringHelper(allPosts));
    createSearchIndex(DateFilteringHelper(allPosts));
  }
});
export {
  Authors,
  Post,
  Series,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-3NNOGU27.mjs.map