"use client";
import { createBook, updateBook } from "@/services/book-service";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Alert from "../ui/alert";
import { Loading } from "../ui/loading";
import { redirect } from "next/navigation";
import Image from "next/image";

const BookForm = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [book, setBook] = useState({
    id: props.id,
    title: props.title,
    author: props.author,
    isbn: props.isbn,
    publicationYear: props.publicationYear,
    description: props.description,
  });
  const [submitResult, setSubmitResult] = useState({
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
    description: "",
  });

  async function onUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await updateBook(props.id, book).then((body) => {
      setIsSaved(true);
      if (body?.errors) {
        validateErrors(body.errors);
      } else if (body?.id) {
        setSubmitResult({
          type: "success",
          message: "Successfully updated entry. Redirecting to book details.",
        });
        setTimeout(() => {
          redirect(`/books/${body.id}`);
        }, 3000);
      } else {
        setSubmitResult({
          type: "error",
          message: "Unable to update entry, please try again in a while.",
        });
      }
      setIsLoading(false);
    });
  }

  async function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await createBook(book).then((body) => {
      setIsSaved(true);
      if (body?.errors) {
        validateErrors(body.errors);
      } else if (body?.id) {
        setSubmitResult({
          type: "success",
          message: "Successfully created entry. Redirecting to book details.",
        });
        setTimeout(() => {
          redirect(`/books/${body.id}`);
        }, 3000);
      } else {
        setSubmitResult({
          type: "error",
          message: "Unable to create entry, please try again in a while",
        });
      }
      setIsLoading(false);
    });
  }

  function validateErrors({ ...errorsObj }) {
    setErrors(() => {
      return {
        title: errorsObj?.title,
        author: errorsObj?.author,
        isbn: errorsObj?.isbn,
        publicationYear: errorsObj?.publicationYear,
        description: errorsObj?.description,
      };
    });
  }

  function onChange(
    key: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setBook((oldBook) => {
      return {
        ...oldBook,
        [key]: event?.target?.value,
      };
    });
  }

  return (
    <>
      {isLoading && <Loading />}
      <form
        className="flex flex-row mx-20 my-10 gap-10"
        onSubmit={props?.id ? onUpdate : onCreate}
      >
        <Image
          className="h-full w-2/5"
          src="/file.svg"
          alt="Book image"
          width={0}
          height={50}
        />
        <div className="flex flex-col gap-2 text-xl w-full">
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="font-bold mb-2">
              Title:
            </label>
            <input
              id="title"
              className="w-full px-4 py-2"
              type="text"
              placeholder="Title"
              value={book.title}
              onChange={(e) => onChange("title", e)}
            />
            {errors.title && (
              <div className="text-xs italic text-red-500">*{errors.title}</div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="author" className="font-bold mb-2">
              Author:
            </label>
            <input
              id="author"
              className="w-full px-4 py-2"
              type="text"
              placeholder="Author"
              value={book.author}
              onChange={(e) => onChange("author", e)}
            />
            {errors.author && (
              <div className="text-xs italic text-red-500">
                *{errors.author}
              </div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="isbn" className="font-bold mb-2">
              ISBN:
            </label>
            <input
              id="isbn"
              className="w-full px-4 py-2"
              type="text"
              placeholder="0000000000"
              value={book.isbn}
              onChange={(e) => onChange("isbn", e)}
            />
            {errors.isbn && (
              <div className="text-xs italic text-red-500">*{errors.isbn}</div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="publicationYear" className="font-bold mb-2">
              Published on:
            </label>
            <input
              id="publicationYear"
              className="w-full px-4 py-2"
              type="text"
              placeholder="YYYY"
              value={book.publicationYear}
              onChange={(e) => onChange("publicationYear", e)}
            />
            {errors.publicationYear && (
              <div className="text-xs italic text-red-500">
                *{errors.publicationYear}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <textarea
              id="description"
              className="w-full min-h-40 px-4 py-2"
              placeholder="Describe the book"
              value={book?.description || ""}
              onChange={(e) => onChange("description", e)}
            />
            {errors.description && (
              <div className="text-xs italic text-red-500">
                *{errors.description}
              </div>
            )}
          </div>
          {isSaved && (
            <Alert type={submitResult?.type} message={submitResult?.message} />
          )}
          <div className="text-5xl mb-2 flex flex-row justify-between items-center font-bold mt-6">
            <span className="flex flex-row gap-4 justify-between text-xl items-center font-base">
              <button
                type="submit"
                className="bg-transparent py-2 px-4 text-blue-700 border border-blue-500 rounded disabled:text-gray-700 disabled:border-gray-500"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <Link
                data-testid="cancel"
                href={book?.id ? `/books/${book.id}` : "/"}
              >
                <button
                  className="bg-transparent py-2 px-4 text-red-700 border border-red-500 rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export { BookForm };
