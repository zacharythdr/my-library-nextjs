"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function SeeDetail({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://v1.appbackend.io/v1/rows/LSHWjLWo4iOE/${id}`
        );
        const data = await res.json();

        setBook(data);
        console.log(book, "book");
      } catch (error) {
        console.error("Failed to fetch book detail:", error);
      }
    };

    if (isOpen) {
      fetchBook();
    }
  }, [isOpen, id]);

  return (
    <>
      <Button onPress={onOpen}>See Detail</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {book?.title ?? "Loading..."}
              </ModalHeader>
              <ModalBody>
                {book ? (
                  <>
                    <p>
                      <strong>Review:</strong> {book.review}
                    </p>
                    <p>
                      <strong>Rating:</strong> {book.rating}/5
                    </p>
                    <p>
                      <strong>Belongs To:</strong> {book.username}
                    </p>
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
