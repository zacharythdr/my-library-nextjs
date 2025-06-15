"use client";

import { useActionState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteBookAction } from "./action";

export default function DeleteButton({ id }) {
  const [_, action, pending] = useActionState(deleteBookAction, null);
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending}>
        <MdDelete className="cursor-pointer"></MdDelete>
      </button>
    </form>
  );
}
