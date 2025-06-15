import React from "react";
import { getUsername } from "../utils/getUsername";
import Image from "next/image";
import Form from "./form";
import DeleteButton from "./DeleteButton";
import SeeDetail from "./SeeDetail";
import EditButton from "./EditButton";
import Greeting from "./greeting";
import { FaStar } from "react-icons/fa";

export default async function Page() {
  const username = await getUsername();
  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE?filterKey=username&filterValue=${username}`
  );
  const { data } = await res.json();

  return (
    <>
      <div className="bg-[#fcf6ec] p-10 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-crimson text-5xl mb-5 font-bold text-[#553e2c]">
            My Library 📚
          </h1>
          <Greeting username={username} />

          <Form mode="create" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 ">
            {data.map((book) => (
              <div
                key={book._id}
                className="bg-white/60  backdrop-blur-md p-4 rounded-xl shadow-md flex flex-col items-center text-center space-y-4"
              >
                <h3 className="font-bold text-2xl font-crimson text-[#553e2c]">
                  {book.title}
                </h3>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                  unoptimized
                />
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < book.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2 items-center max-w-md">
                  <SeeDetail id={book._id} />
                  <EditButton id={book._id} />
                  <DeleteButton id={book._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-[#f0eadd] text-center py-4 text-sm text-[#553e2c] font-medium">
        © Zachary Theodore
      </footer>
    </>
  );
}
