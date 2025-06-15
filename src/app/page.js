"use client";

import { Form, Input, Button } from "@heroui/react";
import Image from "next/image";
import { useActionState } from "react";
import { loginAction } from "./action";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [_, action, pending] = useActionState(loginAction, null);
  return (
    <div className="flex min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1569878766010-17bff0a1987d?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="library background"
        fill
        className="object-cover z-0"
      />

      <div className="p-10 bg-white/50 backdrop-blur-md not-only:w-full mx-auto my-auto max-w-md rounded-lg shadow-md">
        <h1 className="font-crimson text-5xl font-bold text-[#553e2c] ">
          Welcome To My Library! 📚
        </h1>
        <Form action={action} className="my-2">
          <Input
            isRequired
            errorMessage="Please enter your name"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your name - type 'ary' for example"
            className="w-full py-3 rounded-lg  "
          />
          <Button
            disable={pending}
            type="submit"
            variant="bordered"
            className="font-crimson w-full py-3 rounded-lg bg-[#5D796B] text-white hover:bg-gray-800 transition-colors duration-200"
          >
            Enter Library
            <FaArrowRight className="ml-2 transition-colors duration-200 group-hover:text-yellow-400" />
          </Button>
        </Form>
      </div>
    </div>
  );
}
