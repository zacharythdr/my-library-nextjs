"use client";

import { Form, Input, Button } from "@heroui/react";
import Image from "next/image";
import { useActionState } from "react";
import { loginAction } from "./action";

export default function Home() {
  const [_, action, pending] = useActionState(loginAction, null);
  return (
    <main className="flex min-h-screen">
      <Form action={action} className="w-full mx-auto my-auto max-w-xs">
        <Input
          isRequired
          errorMessage="Please enter a valid Username"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your Username"
        />
        <Button disable={pending} type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </main>
  );
}
