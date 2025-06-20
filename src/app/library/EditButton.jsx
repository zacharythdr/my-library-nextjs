"use client";

import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Form from "./form";
import { getBookByID } from "./action";

export default function EditButton({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [book, setBook] = useState(null);

  const handleSuccess = () => {
    onOpenChange(false);
  };

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
      <button
        onClick={onOpen}
        className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        title="Edit"
      >
        <FaEdit className="text-xl" />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className=" bg-white/50 backdrop-blur-md w-full mx-auto my-auto max-w-lg rounded-lg shadow-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {book?.title ?? "Loading..."}
              </ModalHeader>
              <ModalBody>
                {book ? (
                  <Form
                    key={book._id}
                    mode="edit"
                    defaultValues={book}
                    onSuccess={() => {
                      handleSuccess();
                    }}
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
