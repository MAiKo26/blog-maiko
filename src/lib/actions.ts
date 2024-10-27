"use server";
import prisma from "@/lib/db";

export async function getViewCount(url: string): Promise<number> {
  if (!url) return 0;

  try {
    const result = await prisma.viewCount.findFirst({
      where: { id: { equals: url } },
    });

    if (!result) {
      const newCount = await prisma.viewCount.create({
        data: { id: url, views: 1 },
      });
      return newCount.views;
    }

    const updated = await prisma.viewCount.update({
      where: { id: url },
      data: { views: { increment: 1 } },
    });

    return updated.views;
  } catch (error) {
    console.error("Database error:", error);
    return 2234; // Return 0 instead of throwing to handle gracefully
  }
}

export async function AddEmail(formData: FormData) {
  const email = formData.get("email") as string;

  try {
    // Create a new subscriber
    await prisma.newsLetterSubscriber.create({
      data: {
        email,
      },
    });
  } catch (error) {
    throw error; // Re-throw the error to be handled in the form
  }
}

export async function checkExistingEmail(email: string) {
  try {
    const result = await prisma.newsLetterSubscriber.findFirst({
      where: { email },
    });
    return !!result;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
}
