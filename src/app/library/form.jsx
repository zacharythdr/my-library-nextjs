"use client";

import { Button, Input, Textarea } from "@heroui/react";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { createBookAction, updateBookAction } from "./action";

export default function Form({
  defaultValues = {},
  mode = "create",
  onSuccess,
}) {
  const actionFn = mode === "edit" ? updateBookAction : createBookAction;
  const [state, action, pending] = useActionState(actionFn, null);

  useEffect(() => {
    if (state?.status === "Success") {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={action}>
      {mode === "edit" && (
        <input type="hidden" name="id" value={defaultValues._id}></input>
      )}
      <Input
        name="title"
        placeholder="Title of the book"
        defaultValue={defaultValues.title || ""}
      />
      <Textarea
        name="review"
        placeholder="Your Review"
        defaultValue={defaultValues.review || ""}
      />
      <Input
        name="rating"
        placeholder="Rating"
        type="number"
        defaultValue={defaultValues.rating || ""}
      />
      <Input
        name="image"
        placeholder="Image Url"
        defaultValue={defaultValues.image || ""}
      />
      <Button type="submit" isDisabled={pending}>
        {pending
          ? "Submitting..."
          : mode === "edit"
          ? "Update Book"
          : "Add Book"}
      </Button>
    </form>
  );
}
