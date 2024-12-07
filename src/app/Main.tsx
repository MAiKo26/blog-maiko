"use client";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import { Button } from "@/components/ui/button";
import siteMetadata from "@/constants/siteMetadata";
import { FrontMatter } from "@/interfaces/posts-interface";
import { DateFilteringHelper } from "@/lib/DateFilteringHelper";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

const MAX_DISPLAY = 20;

export default function Home({ posts }: { posts: FrontMatter[] }) {
  const [maxPosts, setMaxPosts] = useState(MAX_DISPLAY);
  const postsFiltered = DateFilteringHelper(posts);
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!postsFiltered.length && "No posts found."}
          {postsFiltered.slice(0, maxPosts).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {postsFiltered.length > maxPosts && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Button
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            onClick={() => setMaxPosts(maxPosts + 20)}
          >
            Load More
          </Button>
        </div>
      )}
      {/* <div className="flex items-center justify-center pt-4">
        <NewsletterForm />
      </div> */}
    </>
  );
}
