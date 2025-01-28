"use client";

import React from "react";
import {Book} from "@/types";

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="p-4 border rounded-md shadow-md bg-white hover:shadow-lg transition-shadow">
            {/* Book Cover */}
            <div
                className="relative w-full bg-cover bg-center rounded-md shadow-sm"
                style={{
                    backgroundImage: `url(${book.cover})`,
                    paddingBottom: "150%",
                }}
            >
                {/* Overlay Title and Author */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white rounded-b-md">
                    <h2 className="text-lg font-bold truncate">{book.title}</h2>
                    <p className="truncate italic">by {book.authors.join(", ")}</p>
                </div>
            </div>

            {/* Book Info */}
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h2>
                <p className="text-sm text-gray-600 italic truncate">by {book.authors.join(", ")}</p>
                <p className="mt-2 text-sm text-gray-700">
                    <span className="font-medium">Publisher:</span> {book.publisher}
                </p>
                <div className="mt-2 flex items-center">
                    {/* Likes Button */}
                    <button
                        type="button"
                        className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    >
                        <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                        >
                            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                        </svg>
                    </button>
                    <span className="ml-2 text-blue-600 font-semibold">{book.likes}</span>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
