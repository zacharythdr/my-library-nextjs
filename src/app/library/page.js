import React from "react";
import { getUsername } from "../utils/getUsername";

export default async function Page() {
  const username = await getUsername();

  return <p>Hello {username}!</p>;
}
