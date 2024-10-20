"use server";

import prisma from "@/lib/db";
import {revalidatePath} from "next/cache";

export async function createPost(formData: FormData) {
  try {
    const result = await prisma.post.create({
      data: {
        image: formData.get("image") as string,
        title: formData.get("title") as string,
        authorId: formData.get("authorId") as string,
        id: Number(formData.get("id")),
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}
export async function deletePost(formData: FormData) {
  try {
    const result = await prisma.post.delete({
      where: {id: Number(formData.get("id"))},
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}
export async function updatePost(formData: FormData) {
  try {
    const result = await prisma.post.update({
      where: {id: Number(formData.get("id"))},
      data: {
        image: formData.get("image") as string,
        title: formData.get("title") as string,
        authorId: formData.get("authorId") as string,
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}
export async function createAuthor(formData: FormData) {
  try {
    const result = await prisma.admin.create({
      data: {
        id: formData.get("id") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
}
export async function getFirstPost() {
  try {
    const result = await prisma.post.findFirst();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAllPosts() {
  try {
    const result = await prisma.post.findMany();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllAuthors() {
  try {
    const result = await prisma.admin.findMany();
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
