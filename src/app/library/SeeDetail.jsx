"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { getBookByID } from "./action";
import Image from "next/image";

export default function SeeDetail({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookByID(id);
      setBook(data);
    };

    if (isOpen) {
      fetchBook();
    }
  }, [isOpen, id]);

  return (
    <>
      <Button
        className="font-crimson  rounded-lg bg-[#5D796B] text-white hover:bg-gray-800 transition-colors duration-200"
        onPress={onOpen}
      >
        See Detail
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-white/70 backdrop-blur-md w-full mx-auto my-auto max-w-xl rounded-lg shadow-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#553e2c] text-2xl font-jost">
                {book?.title ?? "Loading..."}
              </ModalHeader>
              <ModalBody>
                {book ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={200}
                          height={200}
                          unoptimized
                        ></Image>
                      </div>
                      <div className="col-span-2 flex flex-col gap-y-2">
                        <p>
                          <strong className="text-[#553e2c]">Review:</strong>{" "}
                          {book.review}
                        </p>
                        <p className="flex gap-m-2">
                          <strong className="text-[#553e2c]">Rating:</strong>{" "}
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-xl ${
                                i < book.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </p>
                        <p>
                          <strong className="text-[#553e2c]">
                            Belongs To:
                          </strong>{" "}
                          {book.username}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Loading detail...</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
