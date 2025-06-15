import React from "react";
import { getUsername } from "../utils/getUsername";
import Image from "next/image";
import Form from "./form";
import DeleteButton from "./DeleteButton";
import SeeDetail from "./SeeDetail";
import EditButton from "./EditButton";
import Greeting from "./greeting";

export default async function Page() {
  const username = await getUsername();
  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE?filterKey=username&filterValue=${username}`
  );
  const { data } = await res.json();

  return (
    <div>
      <h1 className="font-crimson text-5xl font-bold text-[#553e2c]">
        My Library 📚
      </h1>
      <Greeting username={username} />
      
      <Form mode="create" />
      <div>
        {data.map((book) => {
          return (
            <div key={book._id}>
              <Image
                src={book.image}
                alt={book.title}
                width={200}
                height={200}
                unoptimized
              ></Image>
              <h3>{book.title}</h3>
              <p>{book.rating}/5</p>
              <SeeDetail id={book._id}></SeeDetail>
              <DeleteButton id={book._id}></DeleteButton>
              <EditButton id={book._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
