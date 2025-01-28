"use client";

import React, { useEffect, useState } from "react";
import BookRow from "./BookRow";
import { Book } from "@/types";
import { fetchBooks } from "@/app/utils/books";
import {FIRST_PAGE_LIMIT, OTHER_PAGES_LIMIT} from "@/app/constants/constants";

interface TableProps {
  language: string;
  seed: number;
  avgLikes: number;
  avgReviews: number;
  view: "table" | "gallery";
  onBooksUpdate: (books: Book[]) => void;
}

const Table: React.FC<TableProps> = ({
  language,
  seed,
  avgLikes,
  avgReviews,
  view,
  onBooksUpdate,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [resetTrigger, setResetTrigger] = useState(false);

  const loadBooks = async () => {
    try {
      const isFirstPage = page === 1 || resetTrigger;
      const limit = isFirstPage ? FIRST_PAGE_LIMIT : OTHER_PAGES_LIMIT;
      const newBooks = await fetchBooks({
        language,
        seed,
        avgLikes,
        avgReviews,
        page,
        limit,
      });
      const updatedBooks = isFirstPage ? newBooks : [...books, ...newBooks];
      setBooks(updatedBooks);
      onBooksUpdate(updatedBooks);
      setResetTrigger(false);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    setBooks([]);
    setPage(1);
    setResetTrigger(true);
    loadBooks();
  }, [language, seed, avgLikes, avgReviews]);

  useEffect(() => {
    if (page === 1 || !resetTrigger) {
      loadBooks();
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <div className="relative min-h-screen">
        {view === "table" ? (
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="sticky top-0 bg-white bg-gradient-to-t from-gray-200 to-blue-50 shadow">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  #
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  ISBN
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  Title
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  Author(s)
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  Publisher
                </th>
              </tr>
              </thead>
              <tbody>
              {books.map((book, idx) => (
                  <BookRow key={`${seed}-${page}-${idx}`} book={book} />
              ))}
              </tbody>
            </table>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {books.map((book, idx) => (
                  <div
                      key={`${seed}-${page}-${idx}`}
                      className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                  >
                    <div
                        className="relative w-full bg-cover bg-center h-72"
                        style={{
                          backgroundImage: `url(${book.cover})`,
                        }}
                    >
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
                        <h2 className="text-lg font-bold truncate">{book.title}</h2>
                        <p className="truncate italic text-sm">
                          by {book.authors.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <h2 className="text-xl font-bold text-gray-800 truncate">
                          {book.title}
                        </h2>
                        <p className="text-sm text-gray-600 italic">
                          by {book.authors.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                              type="button"
                              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
                              title="Likes"
                          >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                            >
                              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                            </svg>
                          </button>
                          <span className="ml-2 text-blue-600 font-bold">
                      {book.likes}
                    </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {book.reviews.length} review
                          {book.reviews.length !== 1 && "s"}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default Table;
