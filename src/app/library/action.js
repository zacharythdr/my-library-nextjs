"use server";

import { revalidatePath } from "next/cache";
import { getUsername } from "../utils/getUsername";

export async function createBookAction(_, formData) {
  console.log("hit create");

  const title = formData.get("title");
  const review = formData.get("review");
  const rating = formData.get("rating");
  const image = formData.get("image");

  const username = await getUsername();
  console.log(title, review, rating, image, username);

  await fetch("https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ title, review, rating, image, username }]),
  });

  revalidatePath("/library");

  return {
    status: "Success",
    message: "A book has been added!",
  };
}
