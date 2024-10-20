/* eslint-disable @next/next/no-async-client-component */
"use client";
import {Post, Admin} from "@prisma/client";
import {useEffect, useState} from "react";
import {
  createAuthor,
  createPost,
  deletePost,
  getAllAuthors,
  getAllPosts,
  getFirstPost,
  updatePost,
} from "./actions";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [authors, setAuthors] = useState<Admin[] | null>(null);
  const [triggerFetch, setTriggerFetch] = useState(false); // State to trigger refetch

  useEffect(() => {
    async function getAll() {
      const posts = await getAllPosts();
      setPosts(posts);
    }

    async function getFirst() {
      const post = await getFirstPost();
      setPost(post);
    }

    async function getAuthors() {
      const authors = await getAllAuthors();
      setAuthors(authors);
    }

    getAuthors();
    getAll();
    getFirst();
  }, [triggerFetch]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Create da</h1>
      <form
        action={async (formData) => {
          await createAuthor(formData);
          setTriggerFetch(!triggerFetch);
        }}
      >
        <div>
          <label>id :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="id"
          />
        </div>
        <div>
          <label>username :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="username"
          />
        </div>
        <div>
          <label>password :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="password"
            name="password"
          />
        </div>
        <button>Submit</button>
      </form>
      <h1>Create Post</h1>
      <form action={createPost}>
        <div>
          <label>id :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="number"
            name="id"
          />
        </div>
        <div>
          <label>Created At :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="date"
            name="createdAt"
          />
        </div>

        <div>
          <label>image</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="image"
          />
        </div>
        <div>
          <label>title</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="title"
          />
        </div>
        <div>
          <label>authorId :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="authorId"
          />
        </div>
        <button>Submit</button>
      </form>
      <h1>Display First Post</h1>
      <div> {post?.authorId}</div>
      <div> {post?.content}</div>
      <div> {post?.createdAt.getMinutes()}</div>
      <div> id: {post?.id}</div>
      <div> {post?.image}</div>
      <div> {post?.published}</div>
      <div> {post?.title}</div>
      <h1>Display All Posts</h1>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            {post.id}
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.authorId}</p>
          </div>
        ))}
      <h1>Display Authors</h1>
      <div>
        {authors &&
          authors.map((author, index) => (
            <div key={index}>
              {author.id}
              {author.username}
              {author.password}
            </div>
          ))}
      </div>
      <h1>Delete Post</h1>
      <form action={deletePost}>
        <input
          className="border border-black text-black font-bold"
          type="text"
          name="id"
        />
        <button>Submit</button>
      </form>
      <h1>Update Post</h1>
      <form action={updatePost}>
        <div>
          <label>id :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="id"
          />
        </div>
        <div>
          <label>Created At :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="date"
            name="createdAt"
          />
        </div>

        <div>
          <label>image</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="image"
          />
        </div>
        <div>
          <label>title</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="title"
          />
        </div>
        <div>
          <label>authorId :</label>{" "}
          <input
            className="border border-black text-black font-bold"
            type="text"
            name="authorId"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
