"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {Book, Review} from "@/types";

const BookRow: React.FC<{ book: Book }> = ({ book }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <tr
                onClick={() => setExpanded(!expanded)}
                className={`cursor-pointer hover:bg-blue-300 transition-colors ${
                    !expanded ? "border-t border-gray-200" : "bg-blue-100"
                }`}
            >
                <td className="py-2 px-4">{book.index}</td>
                <td className="py-2 px-4">{book.isbn}</td>
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4">{book.authors.join(", ")}</td>
                <td className="py-2 px-4 flex items-center justify-between">
                    {book.publisher}
                    <span className="ml-2 text-gray-500">
                        {expanded ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </span>
                </td>
            </tr>

            {expanded && (
                <tr>
                    <td colSpan={5} className="bg-gray-50 p-4 rounded-md shadow-md border border-gray-200">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Book Cover */}
                            <div className="mx-auto">
                                <div
                                    className="relative w-60 bg-cover bg-center rounded-md shadow-sm"
                                    style={{
                                        backgroundImage: `url(${book.cover})`,
                                        paddingBottom: "120%",
                                    }}
                                >
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white rounded-b-md">
                                        <h2 className="text-lg font-bold truncate">{book.title}</h2>
                                        <p className="truncate italic">by {book.authors.join(", ")}</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
                                    <p className="text-gray-600 italic">by {book.authors.join(", ")}</p>

                                    <div className="mt-4 space-y-2">
                                        {/* Publisher */}
                                        <div className="flex items-center">
                                            <span className="font-semibold text-gray-700">Publisher:</span>
                                            <span className="ml-2 text-gray-900">{book.publisher}</span>
                                        </div>

                                        {/* Likes */}
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                                                </svg>
                                            </button>
                                            <span className="ml-2 font-bold text-blue-600">{book.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Reviews:</h3>
                                <div className="space-y-4">
                                    {book.reviews.map((review: Review, idx: number) => (
                                        <div
                                            key={idx}
                                            className="p-4 bg-white rounded-md shadow-md border border-gray-200 flex items-start gap-4"
                                        >
                                            <img
                                                src={review.avatar}
                                                alt={review.author}
                                                className="w-12 h-12 rounded-full shadow"
                                            />
                                            <div>
                                                <p className="text-gray-600 italic">
                                                    &#34;{review.text}&#34;
                                                </p>
                                                <p className="mt-2 text-sm font-semibold text-gray-800">
                                                    - {review.author}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default BookRow;
