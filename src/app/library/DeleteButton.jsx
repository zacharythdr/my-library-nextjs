"use client";

import { useActionState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteBookAction } from "./action";

export default function DeleteButton({ id }) {
  const [_, action, pending] = useActionState(deleteBookAction, null);
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <MdDelete className="text-xl" />
      </button>
    </form>
  );
}
