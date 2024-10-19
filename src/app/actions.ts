"use server";

import {Dispatch, SetStateAction} from "react";
import prisma from "@/lib/db"; // Assuming prisma is properly configured in your project

// Fixing the parameter to include setPosts as a setter function
export async function save(
  setPosts: Dispatch<
    SetStateAction<
      {
        id: number;
        createdAt: Date;
        image: string;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string;
      }[]
    >
  >,
  formData: FormData
) {
  // Log the name value from formData
  console.log(formData.get("name"));

  try {
    // Create an admin (if necessary)
    await prisma.admin.create({
      data: {
        id: "admin2", // hardcoded id for this example
        username: "test", // hardcoded username
        password: "test", // hardcoded password
        Post: {
          create: {
            title: formData.get("name") as string, // dynamic title from formData
            image: "https://nextjs.org/static/favicon/favicon-32x32.png", // sample image URL
          },
        },
      },
    });

    // Fetch all admins to verify creation
    const admins = await prisma.admin.findMany();
    console.log(admins);
  } catch (error) {
    console.error("Error creating admin or post:", error);
  }

  try {
    // Fetch all posts and update the state
    const posts = await prisma.post.findMany();
    console.log(posts);
    setPosts(posts); // Update the posts state
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
