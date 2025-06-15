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
import { getBookByID } from "./action";

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
