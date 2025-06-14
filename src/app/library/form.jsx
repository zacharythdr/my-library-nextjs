"use client";

import { Button, Input, Textarea } from "@heroui/react";
import React from "react";
import { useActionState } from "react";
import { createBookAction } from "./action";

export default function Form({ username }) {
  const [state, action, pending] = useActionState(createBookAction, null);

  return (
    <form action={action}>
      <Input name="title" placeholder="Title of the book"></Input>
      <Textarea name="review" placeholder="Your Review"></Textarea>
      <Input name="rating" placeholder="Rating" type="number"></Input>
      <Input name="image" placeholder="Image Url"></Input>
      <Button type="submit">Add Book</Button>
    </form>
  );
}
