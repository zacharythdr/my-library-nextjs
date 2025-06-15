"use server";

import { revalidatePath } from "next/cache";
import { getUsername } from "../utils/getUsername";
import { redirect } from "next/navigation";

export async function createBookAction(_, formData) {
  const title = formData.get("title");
  const review = formData.get("review");
  const rating = formData.get("rating");
  const image = formData.get("image");

  const username = await getUsername();

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

export async function deleteBookAction(_, formData) {
  const id = formData.get("id");

  await fetch("https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });

  revalidatePath("/library");

  return {
    status: "Success",
    message: "A book has been deleted!",
  };
}

export async function getBookByID(id) {
  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE/${id}`
  );
  const data = await res.json();

  return data;
}

export async function updateBookAction(_, formData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const review = formData.get("review");
  const rating = formData.get("rating");
  const image = formData.get("image");

  const username = await getUsername();

  console.log(id, title, review, rating, image, username, "edit");

  await fetch("https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id, title, review, rating, image, username }),
  });

  revalidatePath("/library");
  return { status: "Success", message: "A book has been updated!" };
}
