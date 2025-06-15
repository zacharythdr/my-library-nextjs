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
    <div className="">
      <form action={action} className="space-y-2">
        {mode === "edit" && (
          <input type="hidden" name="id" value={defaultValues._id}></input>
        )}
        <Input
          label="Title"
          variant="faded"
          isRequired
          name="title"
          placeholder="Title of the book"
          defaultValue={defaultValues.title || ""}
          className="w-full py-3 rounded-lg"
        />
        <Textarea
          label="Review"
          variant="faded"
          isRequired
          name="review"
          placeholder="Your Review"
          defaultValue={defaultValues.review || ""}
          className="w-full py-3 rounded-lg"
        />
        <Input
          label="Rating"
          variant="faded"
          isRequired
          name="rating"
          placeholder="Rating"
          type="number"
          defaultValue={defaultValues.rating || ""}
          className="w-full py-3 rounded-lg"
        />
        <Input
          label="Image Url"
          variant="faded"
          isRequired
          name="image"
          placeholder="Image Url"
          defaultValue={defaultValues.image || ""}
          className="w-full py-3 rounded-lg"
        />
        <Button
          type="submit"
          isDisabled={pending}
          className="font-crimson w-full py-3 mb-5 rounded-lg bg-[#5D796B] text-white hover:bg-gray-800 transition-colors duration-200"
        >
          {pending
            ? "Submitting..."
            : mode === "edit"
            ? "Update Book"
            : "Add Book"}
        </Button>
      </form>
    </div>
  );
}
