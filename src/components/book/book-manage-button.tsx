"use client";
import { deleteBook } from "@/services/book-service";
import { useState } from "react";
import { ConfirmationModal } from "../ui/confirmation-modal";
import Alert from "../ui/alert";
import { redirect } from "next/navigation";
import { Loading } from "../ui/loading";
import Link from "next/link";

const BookManageButton = ({ id }: { id: string }) => {
  const [isModal, setIsModal] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertProps, setAlertProps] = useState({
    type: "error",
    message: "Failed to delete book. Please try again in a while.",
  });
  const deleteConfirmProps = {
    message: "Are you sure you want to delete this book?",
    confirmLabel: "Yes",
    confirmAction: () => {
      setIsModal(false);
      setIsLoading(true);

      deleteBook(id).then((body) => {
        setIsLoading(false);
        if (body) {
          setAlertProps(() => {
            return {
              type: "success",
              message: "Successfully deleted book. Redirecting to dashboard.",
            };
          });
          setIsAlert(true);
          setTimeout(() => {
            redirect("/");
          }, 3000);
        } else {
          setIsAlert(true);
        }
      });
    },
    cancelLabel: "No",
    cancelAction: () => {
      setIsModal(false);
    },
  };

  return (
    <span className="flex flex-row gap-4 justify-between text-xl items-center font-bold">
      <Link href={`${id}/edit`} data-testid={`edit-${id}`}>
        <button className="bg-transparent py-2 px-4 text-blue-700 border border-blue-500 rounded">
          Edit
        </button>
      </Link>
      <span>
        {isModal && <ConfirmationModal {...deleteConfirmProps} />}
        {isAlert && <Alert {...alertProps} />}
        {isLoading && <Loading />}
        <button
          className="bg-transparent py-2 px-4 text-red-700 rounded"
          onClick={() => setIsModal(true)}
        >
          X
        </button>
      </span>
    </span>
  );
};

export { BookManageButton };
